import json as JSON
from channels.generic.websocket import AsyncWebsocketConsumer
from .serializers import serialize_user, serialize_character, serialize_chronicle
from .serializers import serialize_member
from .constants import GATEWAY_OPCODE, Group
from haven.models import Character
from chronicle.models import Member
from channels.db import database_sync_to_async
import logging
from django.db.models import Q

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
    self.sheetSubscription = None
    self.subscribed_character_ids = set()

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
    self.subscribed_character_ids.clear()
    self.sheetSubscription = None

  async def receive(self, text_data=None):
    gateway = await GatewayMessage().loadJson(text_data)

    if (gateway.getOpcode() == GATEWAY_OPCODE.identify):
      data = {
        'characters': self.characters,
        'chronicles': self.chronicles,
        'members': self.members
      }
      await self.send(text_data=GatewayMessage().ready(self.user, data))
    
    elif (gateway.getOpcode() == GATEWAY_OPCODE.request):
      if (gateway.getEvent() == 'sheet_subscribe'):
        id = gateway.getData().get('id', None)
        if (id):
          self.sheetSubscription = id
        else:
          self.sheetSubscription = None
        
  
  async def character_update(self, event):
    sub = None
    if (self.sheetSubscription in self.subscribed_character_ids):
      sub = self.sheetSubscription
    await self.send(text_data=GatewayMessage().update_character(event, sub))
    
  async def member_update(self, event):
    await self.send(text_data=GatewayMessage().update_member(event))

  async def user_update(self, event):
    await self.send(text_data=GatewayMessage().update_user(event))

  async def chronicle_update(self, event):
    await self.send(text_data=GatewayMessage().update_chronicle(event))

  async def character_new(self, event):
    if (await self.verify_new_character(event['tracker'])):    
      sub = Group.character_update(event['id'])
      await self.channel_layer.group_add(sub, self.channel_name)
      self.character_subscribe(event['id'])
      await self.send(text_data=GatewayMessage().update_character(
        event, None))        

  async def character_delete(self, event):
    id = event.get('id')
    if not id in self.subscribed_character_ids:
      return
    self.subscribed_character_ids.remove(id)
    self.subscriptions.remove(Group.character_update(id))
    await self.channel_layer.group_discard(Group.character_update(id), self.channel_name)

    await self.send(text_data=GatewayMessage().delete_character(id))    

  @database_sync_to_async
  def verify_new_character(self, character):
    if (str(self.user.id) == str(character['user'])):
      return True
    else:
      return Member.objects.filter(
          Q(user_id=self.user) & \
          Q(chronicle_id=character['chronicle']) & \
          (Q(admin=True) | \
          Q(storyteller=True))
        ).exists()
    

  @database_sync_to_async
  def init_data(self):
    if (self.user.is_anonymous): return None
    self.characters = {}        
    self.chronicles = {}
    self.members = {}
    self.subscriptions.add(Group.user_update(self.user.id))
    self.subscriptions.add(Group.character_new())
    self.subscriptions.add(Group.character_delete())

    chronicle_set = self.user.chronicles.all()

    for chronicle in chronicle_set: 
      self.chronicles[chronicle.id] = (serialize_chronicle(chronicle))      
      self.subscriptions.add(Group.chronicle_update(chronicle.id))
      character_set_all = chronicle.character_set
      member = Member.objects.get(user=self.user, chronicle=chronicle)

      if (member.admin or member.storyteller):
        character_set = \
          character_set_all.select_related('character5th__vampire5th').all()
      else: 
        character_set = character_set_all\
          .select_related('character5th__vampire5th').filter(user=self.user)    
      if not self.members.get(chronicle.id): self.members[chronicle.id] = {}  
      
      # We need to go through every character and serialize them
      for character in character_set:      
        self.characters[character.id] = (serialize_character(character))
        self.character_subscribe(character.id)
        if not self.members[chronicle.id].get(character.user_id):
          self.members[chronicle.id][character.user_id] = serialize_member(
            character.member)          
          self.subscriptions.add(Group.member_update(character.member.id))

    for character in Character.objects.filter(user=self.user, chronicle=None):
      self.characters[character.id] = (serialize_character(character))
      self.character_subscribe(character.id)

  def character_subscribe(self, id):
    self.subscribed_character_ids.add(str(id))
    self.subscriptions.add(Group.character_update(id))

class GatewayMessage():
  def __init__(self):
    self.data = {
      'op': None,
      'd': None,
      't': None
    }

  def getOpcode(self):
    return self.data.get('op')
  
  def getEvent(self):
    return self.data.get('t', None)
  
  def getData(self):
    return self.data.get('d', None)
   
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
  
  def update_character(self, event, sheet_id):
    self.data['op'] = GATEWAY_OPCODE.dispatch
    self.data['t'] = 'UPDATE_CHARACTER'
    sheet = None
    if (sheet_id == str(event['id']) and 'sheet' in event):
      tracker = event['tracker']
      sheet = event['sheet']
    else:
      tracker = event['tracker']    
    self.data['d'] = {'character': tracker, 'id': event['id']}

    if (sheet):
      self.data['d']['sheet'] = sheet

    return self.toJson()
  
  def delete_character(self, id):
    self.data['op'] = GATEWAY_OPCODE.dispatch
    self.data['t'] = 'DELETE_CHARACTER'
    self.data['d'] = {'id': id}
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