from django.urls import path
from . import views

app_name = 'api'
urlpatterns = [
  path('sheets/new/v5', views.CharacterCreateV5.as_view()),
]