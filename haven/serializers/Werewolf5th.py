from rest_framework import serializers
from haven.models import Werewolf5th
from .Character5th import Character5thSerializer, Character5thDeserializer, Tracker5thSerializer

########################### Character Serializer ##############################
class Werewolf5thSerializer(Character5thSerializer):
  # Define SerializerMethodField for skills
  
  class Meta(Character5thSerializer.Meta):
    model = Werewolf5th
    fields = Character5thSerializer.Meta.fields + (
      'rage',
      'crinos',
    ) 

  def to_representation(self, instance):
    data = super().to_representation(instance)

    # Add the additional fields to the serialized data
    data['splat'] = 'werewolf5th'
    data['version'] = '5th'
    data['class'] = 'Werewolf5th' # Temporary value to denote new type

    return data

############################ Tracker Serializer ###############################
class W5TrackerSerializer(Tracker5thSerializer):
  class Meta(Tracker5thSerializer.Meta):
    model = Werewolf5th
    fields = Tracker5thSerializer.Meta.fields + (
      'rage',
      'crinos',
    )

  def to_representation(self, instance):
    data = super().to_representation(instance)

    # Add the additional fields to the serialized data
    data['splat'] = 'werewolf5th'
    data['version'] = '5th'
    data['class'] = 'Werewolf5th' # Temporary value to denote new type

    return data

############################ Character Deserializer ###########################
class Werewolf5thDeserializer(Character5thDeserializer):
  class Meta(Character5thDeserializer.Meta):
    model = Werewolf5th
    fields = '__all__'
  