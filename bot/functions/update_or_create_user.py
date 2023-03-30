from django.contrib.auth import get_user_model

def update_or_create_user(user_data):  
  if not user_data:
    return None
  
  User = get_user_model()
  try:
    user = User.objects.get(pk=user_data['id'])
    user.username = user_data['username']
    user.discriminator = user_data['discriminator']
    user.avatar_url = user_data['avatarURL']
    user.save()
  except User.DoesNotExist:
    user = User.objects.create_user(user_data)
  
  return user
