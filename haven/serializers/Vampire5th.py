from rest_framework import serializers
from haven.models import Vampire5th
import json
from .Character5th import Character5thSerializer, Character5thDeserializer, Tracker5thSerializer

########################### Character Serializer ##############################
class Vampire5thSerializer(Character5thSerializer):
  # Define SerializerMethodField for skills
  
  class Meta(Character5thSerializer.Meta):
    model = Vampire5th
    fields = Character5thSerializer.Meta.fields + (
      'clan',
      'sire',
      'generation',
      'predator_type',
      'humanity',
      'stains',
      'hunger',
      'resonance',
      'hunting_roll',
      'blood_potency',
      'disciplines'
    ) 

  def to_representation(self, instance):
    data = super().to_representation(instance)

    # Add the additional fields to the serialized data
    data['splat'] = 'vampire5th'
    data['version'] = '5th'
    data['class'] = 'Vampire5th' # Temporary value to denote new type

    return data

############################ Tracker Serializer ###############################
class V5TrackerSerializer(Tracker5thSerializer):
  class Meta(Tracker5thSerializer.Meta):
    model = Vampire5th
    fields = Tracker5thSerializer.Meta.fields + (
      'clan',
      'humanity',
      'stains',
      'hunger'
    )

  def to_representation(self, instance):
    data = super().to_representation(instance)

    # Add the additional fields to the serialized data
    data['splat'] = 'vampire5th'
    data['version'] = '5th'
    data['class'] = 'Vampire5th' # Temporary value to denote new type

    return data

############################ Character Deserializer ###########################
class Vampire5thDeserializer(Character5thDeserializer):
  class Meta(Character5thDeserializer.Meta):
    model = Vampire5th
    fields = '__all__'

  def validate_disciplines(self, disciplines):
    if not isinstance(disciplines, dict):
      raise serializers.ValidationError("Disciplines should be a dictionary.")
    
    allowed_discipline_keys = ['name', 'description', 'characteristics', 'custom', 'powers', 'source', 'value']
    
    for name, data in disciplines.items():
      if not isinstance(data, dict):
        raise serializers.ValidationError(f"Data for '{name}' should be a dictionary.")
      unexpected_keys = set(data.keys()) - set(allowed_discipline_keys)
      if unexpected_keys:
        raise serializers.ValidationError(f"Unexpected keys found in '{name}': {', '.join(unexpected_keys)}")

      # Validate Name
      if 'name' not in data:
        raise serializers.ValidationError("No name input")
      elif not isinstance(data['name'], str):
        raise serializers.ValidationError("Name not a String")
      elif len(data['name']) > 50:
        raise serializers.ValidationError("Name too long")
      
      # Validate Description
      if not isinstance(data['description'], list):
        raise serializers.ValidationError("description not a List")
      for item in data['description']:
        if not isinstance(item, str):
          raise serializers.ValidationError("item not a String")
      if len(' '.join(data['description'])) > 4000:
        raise serializers.ValidationError("Description is too long!")
      
      # Validate Description
      if not isinstance(data['characteristics'], list):
        raise serializers.ValidationError("Characteristics not a List")
      for item in data['characteristics']:
        if not isinstance(item, str):
          raise serializers.ValidationError("item not a String")
      if len(' '.join(data['characteristics'])) > 3000:
        raise serializers.ValidationError("Characteristics is too long!")
      
      # Validate custom
      if 'custom' not in data:
        raise serializers.ValidationError("No custom input")
      elif not isinstance(data['custom'], int):
        raise serializers.ValidationError("Custom not an Int")
      elif data['custom'] != 0:
        raise serializers.ValidationError("Invalid value for Custom")
      
      # Validate source
      if not isinstance(data['source'], str):
        raise serializers.ValidationError("Source not a String")
      elif len(data['source']) > 50:
        raise serializers.ValidationError("Source too long")
      
      # Validate value
      if 'value' not in data:
        raise serializers.ValidationError("No Value input")
      elif not isinstance(data['value'], int):
        raise serializers.ValidationError("Custom not an Int")
      elif data['value'] < 0 or data['value'] > 5:
        raise serializers.ValidationError("Invalid value for Value")
      
      # Validate powers
      if 'powers' not in data:
        raise serializers.ValidationError("No Powers input")
      elif not isinstance(data['powers'], list):
        raise serializers.ValidationError("Powers not a list")
      elif len(data['powers']) != 0:
        raise serializers.ValidationError("Invalid value for powers")

    return disciplines
    
  def validate(self, data):
    data = super().validate(data)
    # Validate Humanity
    if self.instance:
      humanity = data.get('humanity', None)
      stains = data.get('stains', None)
      
      if humanity == None: humanity = self.instance.humanity
      if stains == None: stains = self.instance.stains
      if (10 - humanity) < stains: 
        raise serializers.ValidationError("Too many stains") 

    return data
  