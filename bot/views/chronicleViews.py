from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt

from chronicle.models import Chronicle, Member, StorytellerRole
from .get_post import get_post
from bot.functions import update_or_create_guild

@csrf_exempt
def member_delete(request):
  data = get_post(request)
  guild_id = data['guild_id']
  user_id = data['user_id']

  try:
    member = Member.objects.get(chronicle=int(guild_id), user=int(user_id)).prefetch_related('character_set')
  except Member.DoesNotExist:
    return JsonResponse({'removed': False})

  member.character_set.update(chronicle=None)
  member.delete()        

  return JsonResponse({'removed': True})

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
    
  return JsonResponse({'channel_id': guild.tracker_channel})

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
def set_guild(request):
  data = get_post(request)
  guild = data['guild']

  if (guild): 
    update_or_create_guild(guild)
  
  return HttpResponse(status=200)