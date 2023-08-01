import json as JSON
from channels.generic.websocket import AsyncWebsocketConsumer
from .serializers import serialize_user, serialize_character, serialize_chronicle
from .serializers import serialize_member
from .constants import GATEWAY_OPCODE, Group
from haven.models import Character
from chronicle.models import Member
from channels.db import database_sync_to_async
import logging

logger = logging.getLogger('DEBUG')
log = logging.getLogger()

class GatewayConsumer(AsyncWebsocketConsumer):
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    self.characters = None
    self.chronicles = None
    self.members = None
    self.user = None
    self.subscriptions = set()

  async def connect(self):
    await self.accept()
    self.user = self.scope['user']
    if not self.user.is_anonymous:
      await self.init_data()

    for subscription in self.subscriptions:
      await self.channel_layer.group_add(subscription, self.channel_name)
    await self.send(text_data=GatewayMessage().welcome())
    
  async def disconnect(self, close_code):
    for subscription in self.subscriptions:
      self.channel_layer.group_discard(subscription, self.channel_name)
    self.subscriptions.clear()

  async def receive(self, text_data=None):
    gateway = await GatewayMessage().loadJson(text_data)

    if (gateway.getOpcode() == GATEWAY_OPCODE.identify):
      data = {
        'characters': self.characters,
        'chronicles': self.chronicles,
        'members': self.members
      }
      await self.send(text_data=GatewayMessage().ready(self.user, data))
    elif (gateway.getOpcode() == GATEWAY_OPCODE.refresh):
      await self.refresh_data()
      data = {
        'characters': self.characters,
        'chronicles': self.chronicles,
        'members': self.members
      }
      await self.send(text_data=GatewayMessage().ready(self.user, data))
  
  async def character_update(self, event):
    await self.send(text_data=GatewayMessage().update_character(event))
    
  async def member_update(self, event):
    await self.send(text_data=GatewayMessage().update_member(event))

  async def user_update(self, event):
    await self.send(text_data=GatewayMessage().update_user(event))

  async def chronicle_update(self, event):
    await self.send(text_data=GatewayMessage().update_chronicle(event))

  @database_sync_to_async
  def init_data(self):
    if (self.user.is_anonymous): return None
    self.characters = {}        
    self.chronicles = {}
    self.members = {}
    self.subscriptions.add(Group.user_update(self.user.id))

    chronicle_set = self.user.chronicles.all()

    for chronicle in chronicle_set: 
      self.chronicles[chronicle.id] = (serialize_chronicle(chronicle))      
      self.subscriptions.add(Group.chronicle_update(chronicle.id))
      character_set_all = chronicle.character_set
      member = Member.objects.get(user=self.user, chronicle=chronicle)

      if (member.admin or member.storyteller):
        character_set = character_set_all.all().filter(splat__isnull=False)
      else: character_set = character_set_all.filter(user=self.user, splat__isnull=False)    
      if not self.members.get(chronicle.id): self.members[chronicle.id] = {}  
      
      for character in character_set:      
        self.characters[character.id] = (serialize_character(character))
        self.subscriptions.add(Group.character_update(character.id))
        if not self.members[chronicle.id].get(character.user_id):
          self.members[chronicle.id][character.user_id] = serialize_member(
            character.member)          
          self.subscriptions.add(Group.member_update(character.member.id))

    for character in Character.objects.filter(user=self.user, chronicle=None, splat__isnull=False):
      self.characters[character.id] = (serialize_character(character))
      self.subscriptions.add(Group.character_update(character.id))

  @database_sync_to_async
  def refresh_data(self):
    if (self.user.is_anonymous): return None
    self.characters = {}        
    self.chronicles = {}
    self.members = {}

    chronicle_set = self.user.chronicles.all()

    for chronicle in chronicle_set: 
      self.chronicles[chronicle.id] = (serialize_chronicle(chronicle))

      if Group.chronicle_update(chronicle.id) not in self.subscriptions:
        self.subscriptions.add(Group.chronicle_update(chronicle.id))

      character_set_all = chronicle.character_set
      member = Member.objects.get(user=self.user, chronicle=chronicle)

      if (member.admin or member.storyteller):
        character_set = character_set_all.all().filter(splat__isnull=False)
      else: character_set = character_set_all.filter(user=self.user, splat__isnull=False)    
      if not self.members.get(chronicle.id): self.members[chronicle.id] = {}  
      
      for character in character_set:      
        self.characters[character.id] = (serialize_character(character))
        if Group.character_update(character.id) not in self.subscriptions:
          self.subscriptions.add(Group.character_update(character.id))
        if not self.members[chronicle.id].get(character.user_id):
          self.members[chronicle.id][character.user_id] = serialize_member(
            character.member) 
          if Group.member_update(character.member.id) not in self.subscriptions:      
            self.subscriptions.add(Group.member_update(character.member.id))

    for character in Character.objects.filter(user=self.user, chronicle=None, splat__isnull=False):
      self.characters[character.id] = (serialize_character(character))
      if Group.character_update(character.id) not in self.subscriptions:
        self.subscriptions.add(Group.character_update(character.id))


class GatewayMessage():
  def __init__(self):
    self.data = {
      'op': None,
      'd': None,
      't': None
    }

  def getOpcode(self):
    return self.data.get('op')
   
  async def loadJson(self, json):
    self.data = JSON.loads(json)
    return self
    

  def toJson(self):
    return JSON.dumps(self.data)

  def welcome(self):
    self.data['op'] = GATEWAY_OPCODE.welcome
    return self.toJson()

  def ready(self, user, data):
    if (user.is_anonymous):
      self.data['op'] = GATEWAY_OPCODE.dispatch
      self.data['t'] = 'READY'
      self.data['d'] = {}
      return self.toJson()
  
    self.data['op'] = GATEWAY_OPCODE.dispatch
    self.data['t'] = 'READY'
    self.data['d'] = {
      'user': serialize_user(user),
      'members': data['members'],
      'characters': data['characters'],
      'chronicles': data['chronicles'],
    }
    return self.toJson()
  
  def update_character(self, event):
    self.data['op'] = GATEWAY_OPCODE.dispatch
    self.data['t'] = 'UPDATE_CHARACTER'
    self.data['d'] = {'character': event['character'], 'id': event['id']}

    return self.toJson()
  
  def update_member(self, event):
    self.data['op'] = GATEWAY_OPCODE.dispatch
    self.data['t'] = 'UPDATE_MEMBER'
    self.data['d'] = {'member': event['member']}

    return self.toJson()

  def update_user(self, event):
    self.data['op'] = GATEWAY_OPCODE.dispatch
    self.data['t'] = 'UPDATE_USER'
    self.data['d'] = {'user': event['user']}

    return self.toJson()

  def update_chronicle(self, event):
    self.data['op'] = GATEWAY_OPCODE.dispatch
    self.data['t'] = 'UPDATE_CHRONICLE'
    self.data['d'] = {'chronicle': event['chronicle']}

    return self.toJson()
