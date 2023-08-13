from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.contrib.auth import get_user_model
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from ..get_post import get_post
from ..Authenticate import authenticate
from haven.models import Character
from haven.serializers import Vampire5thDeserializer, V5TrackerSerializer
from chronicle.models import Chronicle, Member
from gateway.constants import Group
from gateway.serializers import serialize_character


channel_layer = get_channel_layer()
User = get_user_model()

MAX_TRACKERS = 50

@csrf_exempt
@transaction.atomic
def new_character(request):
  data = get_post(request)
  character = data['character']

  if not character['id']:
    char = Character.objects.filter(
      name__iexact=character['name'], user=data['user_id'])
    if char:
      # 304 Not Modified - Character exists
      return HttpResponse(status=304)
        
    count = Character.objects.filter(user=data['user_id']).count()
    if (count > MAX_TRACKERS):
      # 409 Conflict - Too many Characters
      return HttpResponse(status=409)

  user = User.objects.get(pk=data['user_id'])
  guild = None
  member = None
  
  if (data['guild_id']):
    guild = Chronicle.objects.get(pk=data['guild_id'])
    member = Member.objects.get(chronicle=data['guild_id'], user=data['user_id'])

  character = Character.objects.create_partial_character(
    user=user,
    member=member,
    guild=guild, 
    data=character
  )
      
  async_to_sync(channel_layer.group_send)(
    Group.character_new(),
    {
      "type": "character.new",
      "id":  character.id,
      "tracker": serialize_character(character),
    }
  )
  # character is all saved and ready to go
  return HttpResponse(status=201)

class NewCharacter(APIView):  
  @csrf_exempt
  def post(self, request):
    authenticate(request)
    character = request.data['character']
    
    count = Character.objects.filter(user=character['user']).count()
    if (count > MAX_TRACKERS): # 409 Conflict - Too many Characters
      return HttpResponse(status=409)
    user = User.objects.get(pk=character['user'])
    serializer = Vampire5thDeserializer(data=character, context=user)
    if (serializer.is_valid()):
      instance = serializer.save()
    else:
      code = serializer.errors.get('code', status.HTTP_400_BAD_REQUEST)
      return Response(serializer.errors, status=code)
    
    async_to_sync(channel_layer.group_send)(
      Group.character_new(),
      {
        "type": "character.new",
        "id":  instance.id,
        "tracker": V5TrackerSerializer(instance).data,
        "class": "Vampire5th"
      }
    )  
    return Response(status=201)