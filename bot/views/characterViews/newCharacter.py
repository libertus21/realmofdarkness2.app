from django.db import transaction
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

from ..get_post import get_post
from haven.models import Character
from bot.functions import update_or_create_user, update_or_create_guild
from bot.functions import update_or_create_member

@csrf_exempt
@transaction.atomic
def new_character(request):
  data = get_post(request)
  character = data['character']

  if not character['id']:
    char = Character.objects.filter(
      name__iexact=character['name'], user=data['user']['id'])
    if char:
      # 304 Not Modified - Character exists
      return HttpResponse(status=304)
        
    count = Character.objects.filter(user=data['user']['id']).count()
    if (count > 50):
      # 409 Conflict - Too many Characters
      return HttpResponse(status=409)

  user = update_or_create_user(data['user'])
  guild = update_or_create_guild(data['guild'])
  if (data['guild']): member = update_or_create_member(guild, user, data['user'])
  else: member = None

  Character.objects.create_partial_character(
    user=user,
    member=member,
    guild=guild, 
    data=character
  )
  # character is all saved and ready to go
  return HttpResponse(status=201)