from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from django.http import JsonResponse, HttpResponse

from .get_post import get_post
from chronicle.models import Member, Chronicle

User = get_user_model()

@csrf_exempt
def get_supporter_level(request):
  data = get_post(request)
  user_id = data['user_id']
  user = None

  try:
    user = User.objects.get(pk=user_id)
  except User.DoesNotExist:
    return HttpResponse(status=204)
  
  return JsonResponse({"level": user.supporter})

@csrf_exempt
def set_supporter_level(request):
    data = get_post(request)
    user_data = data['user']
    level = data['level']

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

@csrf_exempt
def update_user(request):
  data = get_post(request)
  user_data = data['user']

  try:
    user = User.objects.get(pk=user_data['id'])
    user.username = user_data['username']
    user.discriminator = user_data['discriminator']
    user.avatar_url = user_data['avatar_url']
    user.save()
  except User.DoesNotExist:
    if not user_data['create']: return HttpResponse(status=204)
    user = User.objects.create_user(user_data)
  
  if not user_data['member']:
    return HttpResponse()
  
  member_data = user_data['member']  
  try:
    member = Member.objects.get(chronicle=member_data['guild_id'], user=user)
    member.nickname = member_data['nickname']
    member.avatar_url = member_data['avatar_url']
    member.save()
  except Member.DoesNotExist:
    guild = Chronicle.objects.get(pk=member_data['guild_id'])
    member = Member.objects.create(
      chronicle=guild,
      user=user,
      nickname=member_data['nickname'],
      avatar_url=member_data['avatar_url']
    )
  return HttpResponse()