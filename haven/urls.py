from django.urls import path
from . import views

app_name = 'haven'
urlpatterns = [
    path('', views.haven, name='haven'),
    path('new/', views.new, name='new'),
    path('new/vampire20th/', views.new_vampire20th, name='new_vampire20th'),
]