from django.urls import path
from . import views

app_name = 'bot'
urlpatterns = [
    path('character/get', views.get_character, name='get_character'),
    path('character/save', views.save_character, name='save_character'),
]