from rest_framework.exceptions import NotFound
from django.conf import settings

def authenticate(request): 
  client_ip = request.META.get('REMOTE_ADDR')
  token = request.data.get('APIKey', None)

  if token != settings.API_KEY or client_ip not in ['127.0.0.1', 'localhost']:
    raise NotFound