from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from haven.models import Vampire5th, Character, Splat
from ..Authenticate import authenticate

class GetNames(APIView):
  @csrf_exempt
  def post(self, request):
    authenticate(request)

    user_id = request.data.get('user_id', None)
    chronicle_id = request.data.get('guild_id', None)
    splat = request.data.get('splat', None)
    sheet_only = request.data.get('sheet_only', False)
    
    filter_args = {'user': user_id}
    if (sheet_only):
      filter_args['is_sheet'] = True
    if (chronicle_id):
      filter_args['chronicle'] = chronicle_id

    if splat:
      if isinstance(splat, str):
        splat_list = [splat]
      elif isinstance(splat, list):
        splat_list = splat
      else:
        splat_list = []

      vampire5th_names = []
      other_names = []

      if "vampire5th" in splat_list:
        vampire5th_names = Vampire5th.objects.filter(**filter_args).values_list('name', flat=True)
        splat_list.remove("vampire5th")
            
      if splat_list:
        filter_args['splat__slug__in'] = splat_list
        other_names = Character.objects.filter(**filter_args).values_list('name', flat=True)

      names = list(vampire5th_names) + list(other_names)
    else:
      names = Character.objects.filter(**filter_args).values_list('name', flat=True)
      
    return Response(data={'names': names})