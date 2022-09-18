import json
from channels.generic.websocket import WebsocketConsumer

class GatewayConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        print("Opened Connection!")
        print(self.scope['user'])

    def discornnect(self, close_code):
        print(f'cloded: {close_code}')

    def receive(self, text_data=None):
        print(text_data)
        self.send(text_data=text_data)