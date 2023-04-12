import json as JSON
from channels.generic.websocket import WebsocketConsumer
from .serializers import serialize_user, serialize_character, serialize_chronicle
from .serializers import serialize_member
from .constants import GATEWAY_OPCODE
from haven.models import Character
from chronicle.models import Member, Chronicle
import logging

logger = logging.getLogger('DEBUG')
log = logging.getLogger()

class GatewayConsumer(WebsocketConsumer):
  def connect(self):
    self.accept()
    self.send(text_data=GatewayMessage().welcome())
    
  def disconnect(self, close_code):
    pass

  def receive(self, text_data=None):
    gateway = GatewayMessage().loadJson(text_data)

    if (gateway.getOpcode() == GATEWAY_OPCODE.identify):
      self.send(text_data=GatewayMessage().ready(self.scope['user']))

class GatewayMessage():
  def __init__(self):
    self.data = {
      'op': None,
      'd': None,
      't': None
    }

  def getOpcode(self):
    return self.data.get('op')
    
  def loadJson(self, json):
    self.data = JSON.loads(json)
    return self
    
  def toJson(self):
    return JSON.dumps(self.data)

  def welcome(self):
    self.data['op'] = GATEWAY_OPCODE.welcome
    return self.toJson()

  def ready(self, user):
    if (user.is_anonymous):
      self.data['op'] = GATEWAY_OPCODE.dispatch
      self.data['t'] = 'READY'
      self.data['d'] = {}
      return self.toJson()

    characters = {}        
    chronicles = {}
    members = {}

    chronicle_set = user.chronicles.all()
    
    for chronicle in chronicle_set: 
      chronicles[chronicle.id] = (serialize_chronicle(chronicle))
      character_set_all = chronicle.character_set
      member = Member.objects.get(user=user, chronicle=chronicle)
      
      if (member.admin or member.storyteller):
        character_set = character_set_all.all()
      else: character_set = character_set_all.filter(user=user)    
      if not members.get(chronicle.id): members[chronicle.id] = {}  
      for character in character_set:      
        characters[character.id] = (serialize_character(character))
        if not members[chronicle.id].get(character.user_id):
          members[chronicle.id][character.user_id] = serialize_member(
            character.member)

    for character in Character.objects.filter(user=user, chronicle=None):
      characters[character.id] = (serialize_character(character))
  
    self.data['op'] = GATEWAY_OPCODE.dispatch
    self.data['t'] = 'READY'
    self.data['d'] = {
      'user': serialize_user(user),
      'members': members,
      'characters': characters,
      'chronicles': chronicles,
    }
    return self.toJson()
