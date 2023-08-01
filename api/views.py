from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from haven.models import Vampire5th, Character
from haven.serializers import Vampire5thSerializer, Vampire5thDeserializer
from rest_framework import status


class CharacterSheetCreateV5(APIView):
  permission_classes = [IsAuthenticated]
  
  def get(self, request):
    # Get the current user
    user = request.user      
    # Get the 'name' parameter from the query parameters
    name = request.GET.get('name')    
    if not name: return Response(status=403)    
    # Create a new character instance with the given name
    character = Vampire5th.objects.create(
      user=user, 
      name=name,
      is_sheet=True,
    )
         
    # Return the PK of the newly created instance
    data = {'id': character.id}
    return Response(data)
  

class GetV5Character(APIView):
  permission_classes = [IsAuthenticated]

  def get(self, request):
    user = request.user
    id = request.GET.get('id')
    must_be_sheet = request.GET.get('sheet')

    try:
      # TODO we need to extend this to Storyteller characters
      character = Vampire5th.objects.get(pk=id, user=user)
    except Vampire5th.DoesNotExist:
      return Response({'message': 'Character does not exist!'}, status=404)
    
    if not character.is_sheet and must_be_sheet: 
      return Response(status=406)

    serializer = Vampire5thSerializer(character)
    return Response(serializer.data)
  
class CharacterUpdateV5(APIView):  
  permission_classes = [IsAuthenticated]

  def put(self, request, id): 
    user = request.user
    try:
      character = Vampire5th.objects.get(pk=id, user=user)
    except Vampire5th.DoesNotExist:
      return Response({"message": "Character not found"}, status=404)

    serializer = Vampire5thDeserializer(character, data=request.data, partial=True, context=request)
    
    if not serializer.is_valid():
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    serializer.save()
    return Response()

class GetClansData(APIView):  
  permission_classes = [IsAuthenticated]

  def get(self, request): 
    pass