# haven/routing.py
from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    #re_path('ws/character', consumers.CharacterConsumer.as_asgi()),
]