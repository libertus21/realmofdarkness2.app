from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse

from ..get_post import get_post
from haven.models import Character
from bot.functions import update_or_create_guild, update_or_create_member
from bot.functions import update_or_create_user

@csrf_exempt
def name_list(request):
  data = get_post(request)
  user = data['user']
  guild = data.get('guild', None)

  if user: update_or_create_user(user)
  if guild:
    update_or_create_guild(guild)
    update_or_create_member(guild, user, user)
    chars = Character.objects.filter(user=user['id'], chronicle=guild['id'])
  else: chars = Character.objects.filter(user=user['id'])
    
  chars.select_related('splat', 'chronicle')

  name_list = []

  for char in chars:
    name_list.append({
      'id': str(char.id),
      'name': char.name,
      'splat': char.splat.slug,
      'guildName': char.chronicle.name if char.chronicle else None
    })

  if (len(name_list) == 0):
    return HttpResponse(status=204)
  
  return JsonResponse({'list': name_list})