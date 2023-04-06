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
    if (user.supporter == 0 and level == 0): return HttpResponse(status=204)
  except User.DoesNotExist:
    user = User.objects.create_user(user_data)
      
  user.supporter = level
  user.save()    
  return HttpResponse()

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
  guild = Chronicle.objects.get(pk=member_data['guild_id'])
  try:
    member = Member.objects.get(chronicle=guild, user=user)
    member.nickname = member_data['nickname']
    member.avatar_url = member_data['avatar_url']
    member.admin = member_data['admin']
    member.storyteller = member_data['storyteller']
    member.save()
  except Member.DoesNotExist:
    try:
      member = Member.objects.create(
        chronicle=guild,
        user=user,
        nickname=member_data['nickname'],
        avatar_url=member_data['avatar_url'],
        admin=member_data['admin'],
        storyteller=member_data['storyteller']
      )
    except:
      print("Member was not created")
      print(user_data)
      print(guild.id, user.id, '\n\n')
  return HttpResponse()

@csrf_exempt
def get_admins_storytellers(request):
  data = get_post(request)
  guild_id = data['guild_id']

  storytellers = Member.objects.filter(chronicle=guild_id, storyteller=True)
  admins = Member.objects.filter(chronicle=guild_id, admin=True)

  storyteller_ids = []
  for st in storytellers:
    storyteller_ids.append(str(st.user.id))

  admin_ids = []
  for a in admins:
    admin_ids.append(str(a.user.id))
  
  members = storyteller_ids + list(set(admin_ids) - set(storyteller_ids))

  return JsonResponse({
    'admin_ids': admin_ids, 
    'storyteller_ids': storyteller_ids,
    'members': members
  })