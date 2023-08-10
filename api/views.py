from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from gateway.constants import Group
from constants import CharacterSheetLimit
from haven.models import Vampire5th, Character, SheetStatus
from haven.serializers import Vampire5thSerializer, Vampire5thDeserializer, V5TrackerSerializer

channel_layer = get_channel_layer()

class CharacterSheetCreateV5(APIView):
  permission_classes = [IsAuthenticated]
  
  def get(self, request):
    # Get the current user
    user = request.user      
    # Get the 'name' parameter from the query parameters
    name = request.GET.get('name')    
    if not name: return Response(status=403)    

    # Check Sheet Limits
    count = Character.objects.filter(user=user, is_sheet=True, status__lt=SheetStatus.DEAD).count()
    max_active_sheets = CharacterSheetLimit.get_amount(user.supporter)
    
    if count > max_active_sheets:
      m = {'Error': [
        'You are at your character limit. You must delete or archive some characters before you can make a new one.',
        'Please look at our supporter tiers to access a higher limit.' 
      ]}
      return Response(m, status=status.HTTP_403_FORBIDDEN)

    # Create a new character instance with the given name
    character = Vampire5th.objects.create(
      user=user, 
      name=name,
      is_sheet=True,
    )
    
    async_to_sync(channel_layer.group_send)(
      Group.character_new(),
      {
        "type": "character.new",
        "id": character.id,
        "tracker": V5TrackerSerializer(character).data,
        "class": "Vampire5th"
      }
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
      return Response({'message': ['Character does not exist!']}, status=404)
    
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
      return Response({"message": ["Character not found"]}, status=404)

    serializer = Vampire5thDeserializer(character, data=request.data, partial=True, context=request)
    
    if not serializer.is_valid():
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    instance = serializer.save()
    async_to_sync(channel_layer.group_send)(
      Group.character_update(instance.id),
      {
        "type": "character.update",
        "id": instance.id,
        "tracker": V5TrackerSerializer(instance).data,
        "sheet": Vampire5thSerializer(instance).data,
        "class": "Vampire5th"
      }
    )  
    
    return Response()