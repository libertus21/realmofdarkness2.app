from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse

from bot.serializers import serialize
from bot.functions import get_splat
from ..get_post import get_post


@csrf_exempt
def get_character(request):
  data = get_post(request)
  name = data.get('name', None)
  user_id = data.get('user_id', None)
  splat = data.get('splat_slug', None)
  pk = data.get('pk', None)

  character = get_splat(splat, name=name, user_id=user_id, id=pk)
  if not character:
    return HttpResponse(status=204)

  json = serialize(character.splat.slug, character) 
  return JsonResponse({'character': json})