from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

from chronicle.models import Chronicle, Member, StorytellerRole
from .get_post import get_post
from bot.models import Bot
from haven.models import Character
from gateway.serializers import serialize_chronicle
from gateway.constants import Group

channel_layer = get_channel_layer()

@csrf_exempt
def member_delete(request):
  data = get_post(request)
  guild_id = data['guild_id']
  user_id = data['member_id']

  try:
    member = Member.objects.get(chronicle=guild_id, user=user_id)
  except Member.DoesNotExist:
    return HttpResponse(status=204)

  for character in member.character_set.all():
    character.chronicle = None
    character.save()
    
  member.delete()        

  return HttpResponse()

@csrf_exempt
def set_tracker_channel(request):
  data = get_post(request)
  guild_id = data['guild_id']
  channel_id = data['channel_id']

  try:
    guild = Chronicle.objects.get(pk=guild_id)
  except Chronicle.DoesNotExist:
    return HttpResponse(status=418)
    
  if (guild.tracker_channel == channel_id):
    guild.tracker_channel = ''
    response = {"channel_id": None}
  else:
    guild.tracker_channel = channel_id
    response = {"channel_id": channel_id}
    
  guild.save()    
  return JsonResponse(response)

@csrf_exempt
def get_tracker_channel(request):
  data = get_post(request)
  
  try:
    guild = Chronicle.objects.get(pk=data['guild_id'])
  except Chronicle.DoesNotExist:
    return HttpResponse(status=418)
  
  if not guild.tracker_channel:
    return HttpResponse(status=204)
  else: return JsonResponse({'channel_id': guild.tracker_channel})

@csrf_exempt
def set_st_role(request):
  data = get_post(request)
  guild_id = data['guild_id']
  role_id = data['role_id']

  try:
    guild = Chronicle.objects.get(pk=guild_id)
  except Chronicle.DoesNotExist:
    return HttpResponse(status=418)

  role, created = StorytellerRole.objects.get_or_create(id=role_id, guild=guild)
    
  if not (created):
    role.delete()

  st_roles = StorytellerRole.objects.filter(guild=guild)
  role_ids = []

  for role in st_roles:
    role_ids.append(str(role.id))

  return JsonResponse({'roleIds': role_ids})

@csrf_exempt
def get_st_roles(request):
  data = get_post(request)

  st_roles = StorytellerRole.objects.filter(guild=int(data['guild_id']))
  role_ids = []

  for role in st_roles:
    role_ids.append(str(role.id))
    
  return JsonResponse({'roles': role_ids})

@csrf_exempt
def delete_st_role(request):
  data = get_post(request)
  role_id = data['role_id']

  try:
    StorytellerRole.objects.get(pk=role_id).delete()
  except StorytellerRole.DoesNotExist:
    return HttpResponse(status=204)
  
  return HttpResponse(status=200)


@csrf_exempt
def set_guild(request):
  data = get_post(request)
  guild = data['guild']
  bot = Bot.objects.get(pk=guild['bot'])
  try:
    chronicle = Chronicle.objects.get(pk=guild['id'])
    chronicle.name = guild['name']
    chronicle.owner_id = guild['owner_id']
    chronicle.icon_url = guild['icon_url']
  except Chronicle.DoesNotExist:
    chronicle = Chronicle(
      pk=guild['id'],
      name=guild['name'],
      owner_id=guild['owner_id'],
      icon_url=guild['icon_url'],  
    )
  chronicle.save()
  chronicle.bot.add(bot)
  
  
  async_to_sync(channel_layer.group_send)(
    Group.chronicle_update(chronicle.id),
      {
        "type": "chronicle.update",
        "chronicle": serialize_chronicle(chronicle)
      }
  ) 
  return HttpResponse(status=200)


@csrf_exempt
def delete_guild(request):
  data = get_post(request)
  guild_id = data['guild_id']

  try:
    Chronicle.objects.get(pk=guild_id).delete()
  except Chronicle.DoesNotExist:
    pass # No need to do anything
  
  return HttpResponse(status=200)

@csrf_exempt
def defaults_set(request):
  data = get_post(request)
  member = Member.objects.get(
    user_id=data['user_id'], 
    chronicle_id=data['guild_id']
  )

  if (data['disable']):
    member.default_character = None
    member.default_auto_hunger = False
    member.save()    
    return HttpResponse(status=200)

  try:
    character = Character.objects.get(
      user_id=data['user_id'], 
      name__iexact=data['name']
    )
  except Character.DoesNotExist:
    return HttpResponse(status=204)
  
  member.default_character = character
  member.default_auto_hunger = data['auto_hunger']
  member.save()    
  return HttpResponse(status=200)

@csrf_exempt
def defaults_get(request):
  data = get_post(request)
  member = Member.objects.get(
    user_id=data["user_id"],
    chronicle_id=data["guild_id"]
  )

  character_name = ''
  if not (member.default_character):
    return HttpResponse(status=204)
  else:
    character_name = member.default_character.name

  defaults = {
    "defaults": {
      "name": character_name,
      "auto_hunger": member.default_auto_hunger
    }
  }
    
  return JsonResponse(defaults)