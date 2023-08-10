from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse

from ..get_post import get_post
from haven.models import Character

@csrf_exempt
def name_list(request):
  data = get_post(request)
  user_id = data['user_id']
  guild_id = data.get('guild_id', None)

  if guild_id:
    chars = Character.objects.filter(user=user_id, chronicle=guild_id)
  else: chars = Character.objects.filter(user=user_id)
    
  chars.select_related('splat', 'chronicle')

  name_list = []

  for char in chars:
    name_list.append({
      'id': str(char.id),
      'name': char.name,
      'splat': char.splat.slug if char.splat else None,
      'guildName': char.chronicle.name if char.chronicle else None
    })

  if (len(name_list) == 0):
    return HttpResponse(status=204)
  
  return JsonResponse({'list': name_list})