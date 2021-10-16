from django.urls import path
from . import views

app_name = 'bot'
urlpatterns = [
    path('character/get', views.get_character),
    path('character/save', views.save_character),
    path('character/name_list', views.name_list),
    path('character/delete', views.delete_characters),
    path('chronicle/channel/set', views.set_tracker_channel),
    path('chronicle/channel/get', views.get_tracker_channel),
    path('chronicle/storyteller/role/set', views.set_st_role),
    path('chronicle/storyteller/role/get', views.get_st_roles),
    path('chronicle/storyteller/role/delete', views.delete_st_role),
]