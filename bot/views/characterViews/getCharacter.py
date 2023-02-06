from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse

from bot.serializers import serialize
from bot.functions import get_splat
from ..get_post import get_post


@csrf_exempt
def get_character(request):
  data = get_post(request)
  name = data['name']
  user_id = data['userId']
  splat = data.get('splat', None)
  pk = data.get('pk', None)
  character = get_splat(splat, name=name, user_id=user_id, id=pk)

  if not character:
    return HttpResponse(status=204)
  json = serialize(character.splat.slug, character)
  return JsonResponse({'character': json})