import json
from channels.generic.websocket import WebsocketConsumer

class CharacterConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        print("Connection Recieved")

    def disconnect(self, close_code):
        print(f"Connection disconnected: {close_code}")

    def receive(self, text_data):
        print(f'Message recieved: {text_data}')