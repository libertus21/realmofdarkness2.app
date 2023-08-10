from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

from bot.serializers import serialize
from bot.functions import get_splat
from haven.models import Vampire5th
from ..Authenticate import authenticate

from haven.serializers import V5TrackerSerializer

class GetCharacter(APIView):
  @csrf_exempt
  def post(self, request):
    authenticate(request)
    name = request.data.get('name', None)
    user_id = request.data.get('user_id', None)
    splat = request.data.get('splat_slug', None)
    pk = request.data.get('pk', None)

    character = get_splat(splat, name=name, user_id=user_id, id=pk)

    if not character:
      return HttpResponse(status=204)
    if (isinstance(character, Vampire5th)):
      return Response(data={'character': V5TrackerSerializer(character).data})

    json = serialize(character.splat.slug, character) 
    return Response(data={'character': json})