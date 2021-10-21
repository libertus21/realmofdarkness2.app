from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from django.http import JsonResponse

from .get_post import get_post

@csrf_exempt
def get_supporter_level(request):
    data = get_post(request)
    user_id = data['user_id']
    User = get_user_model()

    try:
        user = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        level = -1
    
    level = user.supporter
    
    return JsonResponse({"level": level})

@csrf_exempt
def set_supporter_level(request):
    data = get_post(request)
    user_data = data['user']
    level = data['level']
    User = get_user_model()

    try:
        user = User.objects.get(pk=user_data['id'])
        user.username = user_data['username']
        user.discriminator = user_data['discriminator']
        user.avatar_url = user_data['avatar_url']        
    except User.DoesNotExist:
        user = User.objects.create_user(user_data)
        
    user.supporter = level
    user.save()
    
    return JsonResponse({"saved": True})