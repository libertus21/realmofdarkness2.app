from django.urls import path
from . import views

app_name = 'bot'
urlpatterns = [
    path('character/get', views.get_character, name='get_character'),
    path('character/save', views.save_character, name='save_character'),
    path('character/name_list', views.name_list, name='name_list'),
    path('character/delete', views.delete_characters, name='delete_characters'),
]