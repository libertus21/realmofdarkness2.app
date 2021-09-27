# bot/routing.py
from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path('ws/bot', consumers.BotConsumer.as_asgi()),
]