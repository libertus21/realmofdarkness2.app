from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse

from bot.serializers import serialize
from bot.functions import get_splat
from ..get_post import get_post


@csrf_exempt
def get_character(request):
  data = get_post(request)
  name = data['name']
  user_id = data['user_id']
  splat = data.get('splat', None)
  pk = data.get('pk', None)

  character = get_splat(splat, name=name, user_id=user_id, id=pk)
  
  user = {
    'id': character.user.id,
    'username': character.user.username,
    'discriminator': character.user.discriminator,
    'avatarURL': character.user.avatar_url,
    'displayName': character.member.nickname if character.member else None
  }

  if (character.chronicle):
    guild = {
      'id': character.chronicle.id,
      'name': character.chronicle.name,
      'iconURL': character.chronicle.icon_url
    }
  else: guild = None

  if not character:
    return HttpResponse(status=204)
  json = serialize(character.splat.slug, character) 
  json['user'] = user
  json['guild'] = guild
  return JsonResponse({'character': json})