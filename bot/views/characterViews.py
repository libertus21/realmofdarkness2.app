from django.db import transaction
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from json import dumps

from bot.serializers import serialize
from bot.util import get_splat, get_name_list
from .get_post import get_post
from haven.models import Character, History, MoralityInfo
from bot.constants import Splats, Versions
from chronicle.models import Chronicle, Member


@csrf_exempt
def get_character(request):
    data = get_post(request)
    name = data['name']
    user_id = data['userId']
    splat = data.get('splat', '')
    pk = data.get('pk', '')

    if (pk): character = get_splat(splat, id=pk)
    else: character = get_splat(splat, name=name, user_id=user_id)

    if not character:
        return JsonResponse({'status': False})
    
    json = serialize(character.splat.slug, character)
    return JsonResponse({"status": True, 'character': json})

@csrf_exempt
def name_list(request):
    data = get_post(request)
    user_id = data['userId']
    guild_id = data.get('guildId', '')

    names = get_name_list(user_id, guild_id)

    if not names:
        return JsonResponse({'status': 'noChar'})
    
    return JsonResponse({"status": True, 'list': names})

@csrf_exempt
def delete_characters(request):
    data = get_post(request)
    id_list = data['ids']
    disconnect = data['disconnect']

    for id in id_list:
        char = Character.objects.get(pk=int(id))
        if disconnect:
            char.chronicle = None
            char.save()
        else:
            member = char.member
            char.delete()
            if (member):
                chars = member.character_set.all()
                if not chars and not member.user.registered:
                    # Only deletes the member if no characters and is not
                    # registered.
                    char.member.delete()
    
    return JsonResponse({"status": True})

@csrf_exempt
@transaction.atomic
def save_character(request):
    data = get_post(request)
    character = data['character']
    User = get_user_model()
    splatSlug = character['splat']

    if not character['id']:
        char = Character.objects.filter(
            name__iexact=character['name'], user=data['user']['id'])
        if char:
            return JsonResponse({'status': 'exists'})
        
        count = Character.objects.filter(user=data['user']['id']).count()
        if (count > 50):
            return JsonResponse({'status': 'charOverflow'})


    # Update or Create a User for this character
    d_user = data['user']
    try:
        user = User.objects.get(pk=d_user['id'])
        user.username = d_user['username']
        user.discriminator = d_user['discriminator']
        user.avatar_url = d_user['avatarURL']
        user.save()
    except User.DoesNotExist:
        user = User.objects.create_user(d_user)
    
    if (character['id']):
        char = get_splat(splatSlug, id=character['id'])
    else:
        char = Character.objects.create_partial_character(
            splatSlug, user, character, data['guild'])
        # character is all saved and ready to go
        return JsonResponse({'status': 'saved'})

    # Character is not new so we need to update everything.
    # If this character is apart of a guild, update or create the guild.
    g = data['guild']
    if (g['id']):
        try:
            guild = Chronicle.objects.get(pk=g['id'])
            guild.name = g['name']
            guild.icon_url = g['iconURL']
            guild.save()
        except Chronicle.DoesNotExist:
            guild = Chronicle.objects.create(
                id=g['id'],
                name=g['name'],
                icon_url=g['iconURL']
            )
        
        # if this is a guild then the user is a Member
        try:
            member = Member.objects.get(chronicle=guild, user=user)
            member.display_name = g['displayName']
            member.save()
        except Member.DoesNotExist:
            member = Member.objects.create(
                chronicle=guild,
                user=user,
                display_name=g['displayName']
            )

        char.chronicle = guild
        char.member = member

    # Update character relations

    char.name = character['name']
    char.faceclaim = character.get('thumbnail', '')
    # Character Vanity Colour
    char.colour.red = character['colour'][0]
    char.colour.green = character['colour'][1]
    char.colour.blue = character['colour'][2]
    char.colour.save()
    
    exp = char.trackable.get(slug='exp')
    exp.total = character['exp']['total']
    exp.current = character['exp']['current']
    exp.save()

    historyList = []
    for history in character['history']:
        if (history.get('id', None)):
            continue
        historyList.append(History(
            character=char,
            args=dumps(history.get('args', '')),
            notes=history.get('notes', ''),
            mode=history['mode']
        ))
    History.objects.bulk_create(historyList)
    history_list = History.objects.filter(character=char).order_by('-date')[30:]

    for history in history_list:
        history.delete()

    if Versions.v20.value == character['version']:
        willpower = char.trackable.get(slug='willpower')
        willpower.total = character['willpower']['total']
        willpower.current = character['willpower']['current']
        willpower.save()

        health = char.health.get(slug='health')
        health.total = character['health']['total']
        health.bashing = character['health']['bashing']
        health.lethal = character['health']['lethal']
        health.aggravated = character['health']['aggravated']
        health.save()

    elif Versions.v5.value == character['version']:
        health = char.damage.get(slug='health')
        health.total = character['health']['total']
        health.superficial = character['health']['superficial']
        health.aggravated = character['health']['aggravated']
        health.save()

        willpower = char.damage.get(slug='willpower')
        willpower.total = character['willpower']['total']
        willpower.superficial = character['willpower']['superficial']
        willpower.aggravated = character['willpower']['aggravated']
        willpower.save()
    
    if (splatSlug == Splats.vampire20th.value):
        blood = char.trackable.get(slug='blood')
        blood.total = character['blood']['total']
        blood.current = character['blood']['current']
        blood.save()

        char.morality.current = character['morality']['current']
        char.morality.morality_info = MoralityInfo.objects.get(
            slug=character['morality']['name'])
        char.morality.save()

    elif (splatSlug == Splats.human20th.value or splatSlug == Splats.ghoul20th.value):
        blood = char.trackable.get(slug='blood')
        blood.current = character['blood']
        blood.save()

        char.morality.current = character['morality']
        char.morality.save()

        if (splatSlug == Splats.ghoul20th.value):
            vitae = char.trackable.get(slug='vitae')
            vitae.current = character['vitae']
            vitae.save()

    elif (splatSlug == Splats.changeling20th.value):
        glamour = char.trackable.get(slug='glamour')
        glamour.total = character['glamour']['total']
        glamour.current = character['glamour']['current']
        glamour.save()

        banality = char.trackable.get(slug='banality')
        banality.total = character['banality']['total']
        banality.current = character['banality']['current']
        banality.save()

        nightmare = char.trackable.get(slug='nightmare')
        nightmare.current = character['nightmare']
        nightmare.save()

        imbalance = char.trackable.get(slug='imbalance')
        imbalance.current = character['imbalance']
        imbalance.save()

        chimerical = char.health.get(slug='chimerical')
        chimerical.total = character['chimerical']['total']
        chimerical.bashing = character['chimerical']['bashing']
        chimerical.lethal = character['chimerical']['lethal']
        chimerical.aggravated = character['chimerical']['aggravated']
        chimerical.save()

    elif (splatSlug == Splats.werewolf20th.value):
        rage = char.trackable.get(slug='rage')
        rage.total = character['rage']['total']
        rage.current = character['rage']['current']
        rage.save()

        gnosis = char.trackable.get(slug='gnosis')
        gnosis.total = character['gnosis']['total']
        gnosis.current = character['gnosis']['current']
        gnosis.save()

    elif (splatSlug == Splats.mage20th.value):
        arete = char.trackable.get(slug='arete')
        arete.current = character['arete']
        arete.save()

        quint_paradox = char.trackable.get(slug='quint_paradox')
        quint_paradox.total = character['quint_paradox']['total']
        quint_paradox.current = character['quint_paradox']['current']
        quint_paradox.save()

    elif (splatSlug == Splats.wraith20th.value):
        pathos = char.trackable.get(slug='pathos')
        pathos.current = character['pathos']
        pathos.save()

        corpus = char.trackable.get(slug='corpus')
        corpus.total = character['corpus']['total']
        corpus.current = character['corpus']['current']
        corpus.save()

    elif (splatSlug == Splats.demonTF.value):
        faith = char.trackable.get(slug='faith')
        faith.total = character['faith']['total']
        faith.current = character['faith']['current']
        faith.save()

        torment = char.trackable.get(slug='torment')
        torment.total = character['torment']['total']
        torment.current = character['torment']['current']
        torment.save()
    
    elif (splatSlug == Splats.vampire5th.value or splatSlug == Splats.mortal5th.value):
        char.humanity.current = character['humanity']['total']
        char.humanity.stains = character['humanity']['stains']
        char.humanity.save()

        if (splatSlug == Splats.vampire5th.value):
            hunger = char.trackable.get(slug='hunger')
            hunger.current = character['hunger']
            hunger.save()    
    
    elif (splatSlug == Splats.hunter5th.value):
        desperation = char.trackable.get(slug='desperation')
        desperation.current = character['desperation']
        desperation.save()  
        danger = char.trackable.get(slug='danger')
        danger.current = character['danger']
        danger.save()
        char.hunter5th.despair = character['despair']
        char.hunter5th.save()    
    
    char.save()
    
    return JsonResponse({'status': 'saved'})