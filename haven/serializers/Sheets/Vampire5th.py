from rest_framework import serializers
from haven.models import Vampire5th
from .Sheet5th import Character5thSerializer
from ..validators import validate_name

class Vampire5thSerializer(Character5thSerializer):
  # Define SerializerMethodField for skills
  
  class Meta(Character5thSerializer.Meta):
    model = Vampire5th
    fields = Character5thSerializer.Meta.fields + (
      'clan',
      'sire',
      'generation',
      'predator_type',
    )

class Vampire5thDeserializer(serializers.ModelSerializer):
  class Meta():
    model = Vampire5th
    fields = '__all__'

  def validate_status(self, value):
    if self.instance.status > 3 and value <= 3:
      # TODO We need to check how many Active sheets there are
      # if they have hit their limit already we will raise an Error
      pass

    return value

  validate_name = validate_name
  
  def validate(self, data):
    data = super().validate(data)

    status = data.get('status')
    if status is None and self.instance.status > 3:
      raise serializers.ValidationError('This sheet cannot be edited')


    for field in ['strength', 'dexterity', 'stamina']:
      value = data.get(field)
      if value is not None and (value < 0 or value > 5):
        raise serializers.ValidationError()
    
    return data