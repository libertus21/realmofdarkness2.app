from django.db import transaction
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.contrib.auth import get_user_model

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from ..Authenticate import authenticate
from ..get_post import get_post
from haven.models import MoralityInfo, Vampire5th, Werewolf5th
from haven.serializers import Vampire5thDeserializer, V5TrackerSerializer, Vampire5thSerializer, validation_error_handler
from haven.serializers import Werewolf5thDeserializer, W5TrackerSerializer, W5TrackerSerializer
from bot.constants import Splats
from bot.functions import get_splat
from gateway.constants import Group
from gateway.serializers import serialize_character

channel_layer = get_channel_layer()
User = get_user_model()

@csrf_exempt
@transaction.atomic
def save_character(request):
  data = get_post(request)
  char_data = data['character']
  splatSlug = char_data['splatSlug']
  
  if (char_data['id']):
    char = get_splat(splatSlug, id=char_data['id'])
  else:
    # 400 Bad Request
    return HttpResponse(status=400)

  # Update character relations
  char.name = char_data['name']
  char.faceclaim = char_data.get('thumbnail', '')
  # Character Vanity Colour
  char.theme = char_data['theme']
  
  exp = char.trackable.get(slug='exp')
  exp.total = char_data['exp']['total']
  exp.current = char_data['exp']['current']
  exp.save()


  if (splatSlug == Splats.vampire5th.slug):
    update_5th(char_data, char)
    update_vampire5th(char_data, char)
  elif (splatSlug == Splats.hunter5th.slug):
    update_5th(char_data, char)
    update_hunter5th(char_data, char)  
  elif (splatSlug == Splats.mortal5th.slug):  
    update_5th(char_data, char)
    update_mortal5th(char_data, char)  
  elif (splatSlug == Splats.vampire20th.slug):    
    update_20th(char_data, char)
    update_vampire20th(char_data, char)
  elif (splatSlug == Splats.werewolf20th.slug):  
    update_20th(char_data, char)
    update_werewolf20th(char_data, char)  
  elif (splatSlug == Splats.changeling20th.slug): 
    update_20th(char_data, char)
    update_changeling20th(char_data, char)   
  elif (splatSlug == Splats.mage20th.slug): 
    update_20th(char_data, char)
    update_mage20th(char_data, char)   
  elif (splatSlug == Splats.wraith20th.slug): 
    update_20th(char_data, char)
    update_wraith20th(char_data, char)   
  elif (splatSlug == Splats.ghoul20th.slug):
    update_20th(char_data, char)
    update_ghoul20th(char_data, char)    
  elif (splatSlug == Splats.human20th.slug): 
    update_20th(char_data, char)
    update_human20th(char_data, char)   
  elif (splatSlug == Splats.demonTF.slug):
    update_20th(char_data, char)
    update_demon20th(char_data, char)   

  char.save()
  async_to_sync(channel_layer.group_send)(
    Group.character_update(char.id),
    {
      "type": "character.update",
      "id": char.id,
      "tracker": serialize_character(char)
    }
  )  
  return HttpResponse(status=200)

# This API handles both creation and saving
class SaveCharacter(APIView):
  @csrf_exempt
  def post(self, request):
    authenticate(request)
    user_id = request.data['character']['user']
    id = request.data['character']['id']
    
    try:
      character = Vampire5th.objects.get(pk=id, user__id=user_id)
    except Vampire5th.DoesNotExist:
      return Response({"message": "Character not found"}, status=404)
    
    serializer = Vampire5thDeserializer(character, data=request.data['character'], context=request.data['character']['user'])
    
    if (serializer.is_valid()):
      instance = serializer.save()
    else:
      return validation_error_handler(serializer.errors)
        
    async_to_sync(channel_layer.group_send)(
      Group.character_update(instance.id),
      {
        "type": "character.update",
        "id": instance.id,
        "tracker":  V5TrackerSerializer(instance).data,
        "sheet": Vampire5thSerializer(instance).data,
        "class": "Vampire5th"
      }
    )  

    return Response(status=200) 


################### Update Version Specific ##################################
def update_5th(data, character):  
  health = character.damage.get(slug='health')
  health.total = data['health']['total']
  health.superficial = data['health']['superficial']
  health.aggravated = data['health']['aggravated']
  health.save()
    
  willpower = character.damage.get(slug='willpower')
  willpower.total = data['willpower']['total']
  willpower.superficial = data['willpower']['superficial']
  willpower.aggravated = data['willpower']['aggravated']
  willpower.save()


def update_20th(data, character):
  willpower = character.trackable.get(slug='willpower')
  willpower.total = data['willpower']['total']
  willpower.current = data['willpower']['current']
  willpower.save()
  
  health = character.health.get(slug='health')
  health.total = data['health']['total']
  health.bashing = data['health']['bashing']
  health.lethal = data['health']['lethal']
  health.aggravated = data['health']['aggravated']
  health.save()

######################## Update 5th Splats ###################################
def update_vampire5th(data, character):
  character.old_humanity.current = data['humanity']
  character.old_humanity.stains = data['stains']
  character.old_humanity.save()

  hunger = character.trackable.get(slug='hunger')
  hunger.current = data['hunger']
  hunger.save() 


def update_hunter5th(data, character):
  desperation = character.trackable.get(slug='desperation')
  desperation.current = data['desperation']
  desperation.save()  
  danger = character.trackable.get(slug='danger')
  danger.current = data['danger']
  danger.save()
  character.hunter5th.despair = data['despair']
  character.hunter5th.save()  


def update_mortal5th(data, character):
  character.old_humanity.current = data['humanity']
  character.old_humanity.stains = data['stains']
  character.old_humanity.save()


######################## Update 20th Splats ##################################
def update_vampire20th(data, character):  
  blood = character.trackable.get(slug='blood')
  blood.total = data['blood']['total']
  blood.current = data['blood']['current']
  blood.save()

  character.morality.current = data['morality']['current']
  character.morality.morality_info = MoralityInfo.objects.get(
    slug=data['morality']['name'])
  character.morality.save()


def update_ghoul20th(data, character):
  vitae = character.trackable.get(slug='vitae')
  vitae.current = data['vitae']
  vitae.save()
  
  blood = character.trackable.get(slug='blood')
  blood.current = data['blood']
  blood.save()

  character.morality.current = data['morality']
  character.morality.save()


def update_human20th(data, character):
  blood = character.trackable.get(slug='blood')
  blood.current = data['blood']
  blood.save()

  character.morality.current = data['morality']
  character.morality.save()


def update_werewolf20th(data, character):
  rage = character.trackable.get(slug='rage')
  rage.total = data['rage']['total']
  rage.current = data['rage']['current']
  rage.save()

  gnosis = character.trackable.get(slug='gnosis')
  gnosis.total = data['gnosis']['total']
  gnosis.current = data['gnosis']['current']
  gnosis.save()


def update_changeling20th(data, character):
  glamour = character.trackable.get(slug='glamour')
  glamour.total = data['glamour']['total']
  glamour.current = data['glamour']['current']
  glamour.save()

  banality = character.trackable.get(slug='banality')
  banality.total = data['banality']['total']
  banality.current = data['banality']['current']
  banality.save()

  nightmare = character.trackable.get(slug='nightmare')
  nightmare.current = data['nightmare']
  nightmare.save()

  imbalance = character.trackable.get(slug='imbalance')
  imbalance.current = data['imbalance']
  imbalance.save()

  chimerical = character.health.get(slug='chimerical')
  chimerical.total = data['chimerical']['total']
  chimerical.bashing = data['chimerical']['bashing']
  chimerical.lethal = data['chimerical']['lethal']
  chimerical.aggravated = data['chimerical']['aggravated']
  chimerical.save()


def update_mage20th(data, character):
  arete = character.trackable.get(slug='arete')
  arete.current = data['arete']
  arete.save()

  quint_paradox = character.trackable.get(slug='quint_paradox')
  quint_paradox.total = data['quintessence']
  quint_paradox.current = data['paradox']
  quint_paradox.save()


def update_wraith20th(data, character):
  pathos = character.trackable.get(slug='pathos')
  pathos.current = data['pathos']
  pathos.save()

  corpus = character.trackable.get(slug='corpus')
  corpus.total = data['corpus']['total']
  corpus.current = data['corpus']['current']
  corpus.save()


def update_demon20th(data, character):
  faith = character.trackable.get(slug='faith')
  faith.total = data['faith']['total']
  faith.current = data['faith']['current']
  faith.save()

  torment = character.trackable.get(slug='torment')
  torment.total = data['torment']['total']
  torment.current = data['torment']['current']
  torment.save()