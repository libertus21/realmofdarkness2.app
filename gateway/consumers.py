import json as JSON
from channels.generic.websocket import WebsocketConsumer
from .serializers import serialize_user, serialize_character
from .constants import GATEWAY_OPCODE
from haven.models import Character


class GatewayConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        print("Opened Connection!")
        print(self.scope['user'])
        m = GatewayMessage().welcome()
        print(m)
        self.send(text_data=m)

    def discornnect(self, close_code):
        print(f'cloded: {close_code}')

    def receive(self, text_data=None):
        gateway = GatewayMessage().loadJson(text_data)
        print(gateway.getOpcode())

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
        characters = {}
        for character in Character.objects.filter(user=user):
            characters[character.id] = (serialize_character(character))

        self.data['op'] = GATEWAY_OPCODE.dispatch
        self.data['t'] = 'READY'
        self.data['d'] = {
            'user': serialize_user(user),
            'characters': characters
        }
        return self.toJson()
