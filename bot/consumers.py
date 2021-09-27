import json
from channels.generic.websocket import JsonWebsocketConsumer
from haven.models import Character, AttributeLevel, AbilityLevel, VirtueLevel,\
    Discipline20th, Discipline20thLevel, Background20th, CharBackground20th

class BotConsumer(JsonWebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        print(f"Connection disconnected: {close_code}")

    def receive_json(self, content):

        print(content)

        self.handle_request(content)        
        
    def handle_request(self, request):
        if (request['request'] == "loadCharacter"):
            pass
        elif (request['request'] == "updateCharacter"):
            pass
