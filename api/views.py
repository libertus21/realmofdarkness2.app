from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from haven.models import Vampire5th


@method_decorator(login_required, name='dispatch')
class CharacterSheetCreateV5(APIView):
  permission_classes = [IsAuthenticated]
  
  def get(self, request, format=None):
    # Get the current user
    user = request.user        
    # Get the 'name' parameter from the query parameters
    name = request.GET.get('name')        
    # Create a new character instance with the given name
    character = Vampire5th.objects.create(
      user=user, 
      name=name,
      is_sheet=True,
    )
      
    # Return the PK of the newly created instance
    data = {'pk': character.pk}
    return Response(data)