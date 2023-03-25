from django.db import transaction
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.contrib.auth import get_user_model

from ..get_post import get_post
from haven.models import Character
from chronicle.models import Chronicle, Member

User = get_user_model()

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

  user = User.objects.get(pk=data['user_id'])
  if (data['guild_id']):
    guild = Chronicle.objects.get(pk=data['guild_id'])
    member = Member.objects.get(chronicle=data['guild_id'], user=data['user_id'])

  Character.objects.create_partial_character(
    user=user,
    member=member,
    guild=guild, 
    data=character
  )
  # character is all saved and ready to go
  return HttpResponse(status=201)