import json as JSON
from channels.generic.websocket import WebsocketConsumer
from .serializers import serialize_user, serialize_character, serialize_chronicle
from .constants import GATEWAY_OPCODE
from haven.models import Character
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
        for character in Character.objects.select_related('chronicle')\
            .filter(user=user):
            characters[character.id] = (serialize_character(character))
            chronicle = character.chronicle
            chronicles[chronicle.id] = (serialize_chronicle(chronicle))


        self.data['op'] = GATEWAY_OPCODE.dispatch
        self.data['t'] = 'READY'
        self.data['d'] = {
            'user': serialize_user(user),
            'characters': characters,
            'chronicles': chronicles,
        }
        logger.info("READY")
        return self.toJson()
