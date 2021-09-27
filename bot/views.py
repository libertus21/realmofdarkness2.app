from django.http import JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.contrib.auth import get_user_model
from chronicle.models import Chronicle, Member
from haven.models import Character, History, Morality
import json

@csrf_exempt
def get_character(request):
    post = get_post(request)
    print(post)



    return JsonResponse({"content": json.dumps(post)})

@csrf_exempt
def save_character(request):
    data = get_post(request)
    character = data['character']
    User = get_user_model()
    splatSlug = character['splat'].lower() + character['version']

    # Update or Create a User for this character
    duser = data['user']
    try:
        user = User.objects.get(pk=duser['id'])
        user.username = duser['username']
        user.discriminator = duser['discriminator']
        user.avatar_url = duser['avatarURL']
        user.save()
    except User.DoesNotExist:
        user = User.objects.create_user(duser)


    if (character['id']):
        char = Character.objects.get(pk=character['id'])
    else:
        # New character
        try:
            char = Character.objects.get(name=character['name'], player=user)
            # This is bad
            return JsonResponse({"content": json.dumps({'status': 'exists'})})
        except Character.DoesNotExist:
            # This is good
            char = Character.objects.create_character(splatSlug, user)
            

    # If this character is apart of a guild, update or create the guild.
    dguild = data['guild']
    if (dguild['id']):
        try:
            guild = Chronicle.objects.get(pk=dguild['id'])
            guild.name = dguild['name']
            guild.icon_url = dguild['iconURL']
        except Chronicle.DoesNotExist:
            guild = Chronicle(
                id=dguild['id'],
                name=dguild['name'],
                icon_url=dguild['iconURL']
            )
        guild.save()
        
        # if this is a guild then the user is a Member
        try:
            member = Member.objects.get(chronicle=guild, user=user)
            member.display_name = dguild['displayName']
        except Member.DoesNotExist:
            member = Member(
                chronicle=guild, 
                user=user, 
                display_name=dguild['displayName']
            )
        member.save()

        char.chronicle = guild
        char.member = member

    char.player = user
    
    if (splatSlug == 'vampire20th'):
        updateVampire20th(char, character)
    
    char.save()
    print(char.id)
    return JsonResponse({"content": json.dumps({'status': 'saved'})})

def get_post(request):
    if (request.method != 'POST'): 
        raise Http404    
    post = json.loads(request.body)

    # Change secret_key to an actual shared secret key
    if not post or post.get('APIKey', None) != settings.API_KEY: 
        raise Http404
    
    return post

def updateCharacter(character, data):
    character.name = data['name']
    character.faceclaim = data.get('thumbnail', '')
    character.discord_colour.red = data['colour'][0]
    character.discord_colour.green = data['colour'][1]
    character.discord_colour.blue = data['colour'][2]
    character.exp.total = data['exp']['total']
    character.exp.current = data['exp']['current']

    for history in data['history']:
        h = History(
            character=character,
            args=json.dumps(history.get('args', '')),
            notes=history.get('notes', ''),
            mode=history['mode']
        )
        h.save()

def update20th(character, data):
    character.willpower20th.total = data['willpower']['total']
    character.willpower20th.current = data['willpower']['current']
    character.health20th.total = data['health']['total']
    character.health20th.bashing = data['health']['bashing']
    character.health20th.lethal = data['health']['lethal']
    character.health20th.aggravated = data['health']['aggravated']

def updateVampire20th(character, data):
    updateCharacter(character, data)
    update20th(character, data)

    character.bloodpool.total = data['blood']['total']
    character.bloodpool.current = data['blood']['current']
    character.moralitylevel.level = data['morality']['current']
    character.moralitylevel.morality = Morality.objects.get(
        name=data['morality']['name'])

    return character
