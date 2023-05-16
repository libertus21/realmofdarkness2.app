from django.urls import path
from . import views

app_name = 'bot'
urlpatterns = [
  # Character
  path('character/get', views.get_character),
  path('character/new', views.new_character),
  path('character/save', views.save_character),
  path('character/name_list', views.name_list),
  path('character/delete', views.delete_characters),

  # Chronicle
  path('chronicle/set', views.set_guild),
  path('chronicle/delete', views.delete_guild),
  path('chronicle/channel/set', views.set_tracker_channel),
  path('chronicle/channel/get', views.get_tracker_channel),
  path('chronicle/storyteller/roles/set', views.set_st_role),
  path('chronicle/storyteller/roles/get', views.get_st_roles),  
  path('chronicle/storyteller/roles/delete', views.delete_st_role),
  path('chronicle/member/delete', views.member_delete),
  path('chronicle/member/defaults/set', views.defaults_set),
  path('chronicle/member/defaults/get', views.defaults_get),
  path('chronicle/storytellers/get', views.get_admins_storytellers),

  # User
  path('user/supporter/get', views.get_supporter_level),
  path('user/supporter/set', views.set_supporter_level),
  path('user/update', views.update_user),

  # Initiative Tracker
  path('initiative/set', views.init_set),
  path('initiative/get', views.init_get),
  path('initiative/delete', views.init_delete),

  # Stats
  path('stats/get', views.get_stats),
  path('stats/command/update', views.command_used),

  # Bot Info
  path('data/set', views.update_bot),
]