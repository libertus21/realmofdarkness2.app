from django.http import JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import transaction

from chronicle.models import Chronicle, Member
from haven.models import Character, History, Morality
from bot.util import get_splat, get_name_list
from bot.serializers import serialize
from json import dumps, loads

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

    for id in id_list:
        char = Character.objects.get(pk=int(id))
        member = char.member
        char.delete()
        if (member):
            chars = member.character_set.all()
            if not chars:
                char.member.delete()
    
    return JsonResponse({"status": True})

@csrf_exempt
@transaction.atomic
def save_character(request):
    data = get_post(request)
    character = data['character']
    User = get_user_model()
    splatSlug = character['splat'].lower() + character['version']
    return JsonResponse(data)

    if not character['id']:
        char = Character.objects.filter(
            name=character['name'], player=data['user']['id'])
        if char:
            return JsonResponse({'status': 'exists'})


    # Update or Create a User for this character
    u = data['user']
    user = User.objects.filter(pk=u['id'])
    if user:
        user.update(
            username=u['username'],
            discriminator=u['discriminator'],
            avatar_url=u['avatarURL'],
        )
        user = user[0]
    else:
        user = User.objects.create_user(u)


    if (character['id']):
        char = get_splat(splatSlug, id=character['id'])
    else:
        char = Character.objects.create_partial_character(splatSlug, user)            

    # If this character is apart of a guild, update or create the guild.
    g = data['guild']
    if (g['id']):
        guild, created = Chronicle.objects.update_or_create(
            id=g['id'],
            name=g['name'],
            icon_url=g['iconURL']
        )
        
        # if this is a guild then the user is a Member
        member, created = Member.objects.update_or_create(
            chronicle=guild, 
            user=user, 
            display_name=g['displayName']
        )

        char.chronicle = guild
        char.member = member

    # Update character relations

    char.name = character['name']
    char.faceclaim = character.get('thumbnail', '')
    char.discord_colour.red = character['colour'][0]
    char.discord_colour.green = character['colour'][1]
    char.discord_colour.blue = character['colour'][2]
    char.discord_colour.save()
    char.exp.total = character['exp']['total']
    char.exp.current = character['exp']['current']
    char.exp.save()

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

    if '20th' in splatSlug:
        char.willpower20th.total = character['willpower']['total']
        char.willpower20th.current = character['willpower']['current']
        char.willpower20th.save()
        #char.health20th.total = character['health']['total']
        #char.health20th.bashing = character['health']['bashing']
        #char.health20th.lethal = character['health']['lethal']
        #char.health20th.aggravated = character['health']['aggravated']
        #char.health20th.save()
    
    if (splatSlug == 'vampire20th'):
        char.bloodpool.total = character['blood']['total']
        char.bloodpool.current = character['blood']['current']
        char.bloodpool.save()
        char.moralitylevel.level = character['morality']['current']
        char.moralitylevel.morality = Morality.objects.get(
            name=character['morality']['name'])
        char.moralitylevel.save()
    
    char.save()
    
    return JsonResponse({'status': 'saved'})

def get_post(request):
    if (request.method != 'POST'): 
        raise Http404    
    post = loads(request.body)

    # Change secret_key to an actual shared secret key
    if not post or post.get('APIKey', None) != settings.API_KEY: 
        raise Http404
    
    return post