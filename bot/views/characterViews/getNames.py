from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from haven.models import Vampire5th, Character
from ..Authenticate import authenticate

class GetNames(APIView):
  @csrf_exempt
  def post(self, request):
    authenticate(request)

    user_id = request.data.get('user_id', None)
    chronicle_id = request.data.get('guild_id', None)
    splat = request.data.get('splat', None)
    sheet_only = request.data.get('splat', False)

    filter_args = {'user': user_id}
    if (sheet_only):
      filter_args['is_sheet'] = True
    if (chronicle_id):
      filter_args['chronicle'] = chronicle_id
    if splat != "vampire5th" and not None:
      filter_args['splat'] = splat

    if (splat == 'vampire5th'):
      characters = Vampire5th.objects.filter(**filter_args)
    else:
      characters = Character.objects.filter(**filter_args)
    
    names = []
    for character in characters:
      names.append(character.name)
    return Response(data={'names': names})