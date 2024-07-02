from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.contrib.auth import get_user_model
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from time import time

from ..get_post import get_post
from ..Authenticate import authenticate
from haven.models import Character
from haven.serializers import Vampire5thDeserializer, V5TrackerSerializer, validation_error_handler
from haven.serializers import Werewolf5thDeserializer, W5TrackerSerializer
from chronicle.models import Chronicle, Member
from gateway.constants import Group
from gateway.serializers import serialize_character
from bot.util import download_and_verify_image


channel_layer = get_channel_layer()
User = get_user_model()

MAX_TRACKERS = 50

@csrf_exempt
def new_character(request):
  data = get_post(request)
  character = data['character']
  
  image_url = character.get('avatar', None)
  image_file = None
  if image_url: image_file = download_and_verify_image(image_url)
  if image_url and not image_file: return HttpResponse(status=406)


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
  if image_file: character.avatar.save(image_file.name.replace("downloaded_image", f"{character.id}_{int(time())}"), image_file)
      
  async_to_sync(channel_layer.group_send)(
    Group.character_new(),
    {
      "type": "character.new",
      "id":  character.id,
      "tracker": serialize_character(character),
    }
  )
  return HttpResponse(status=201)

class NewCharacter(APIView):  
  @csrf_exempt
  def post(self, request):
    authenticate(request)
    character = request.data['character']
    image_url = character.get('avatar', None)
    image_file = None
    if image_url: image_file = download_and_verify_image(image_url)
    if image_url and not image_file: return HttpResponse(status=406)

    
    count = Character.objects.filter(user=character['user']).count()
    if (count > MAX_TRACKERS): # 409 Conflict - Too many Characters
      return HttpResponse(status=409)
    user = User.objects.get(pk=character['user'])
    
    print(request.data)
    char = Character.objects.filter(
      name__iexact=character['name'], user=character['user'])
    if char:
      # 304 Not Modified - Character exists
      return HttpResponse(status=304)

    if (character['class'] == 'Vampire5th'):
      serializer = Vampire5thDeserializer(
        data=character, 
        context={
          'user_id': user,
          'is_owner': True,
        }
      )  
      splat = "Vampire5th"
    elif (character['class'] == 'Werewolf5th'):    
      serializer = Werewolf5thDeserializer(data=character, context={
          'user_id': user,
          'is_owner': True,          
          'from_bot': True,
        })
      
    if (serializer.is_valid()):
      instance = serializer.save()
      print(image_file)
      if image_file: instance.avatar.save(image_file.name.replace("downloaded_image", f"{instance.id}_{int(time())}"), image_file)
    else:
      return validation_error_handler(serializer.errors)
    
    if (splat == 'Vampire5th'):
      tracker = V5TrackerSerializer(instance).data
    else:
      tracker = W5TrackerSerializer(instance).data
    
    async_to_sync(channel_layer.group_send)(
      Group.character_new(),
      {
        "type": "character.new",
        "id":  instance.id,
        "tracker": tracker,
        "class": character['class']
      }
    )  
    return Response(status=201)
  