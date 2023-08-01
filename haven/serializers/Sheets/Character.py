from rest_framework import serializers
from haven.models import Character


# Base serializer with common fields for Character
class CharacterSerializer(serializers.ModelSerializer):
  class Meta:
    model = Character
    fields = (
      'name', 
      'id', 
      'user', 
      'chronicle',
      'member',
      'is_sheet',
      'status',
      'created_at',
      'last_updated',
      'faceclaim',
      'theme',
    )
  
  def to_representation(self, instance):
    data = super().to_representation(instance)
    
    data['exp'] = {
      'current': instance.exp_current,
      'total': instance.exp_total,
    }
    return data
  
  def to_internal_value(self, data):
    if 'exp' in data:
      if 'total' in data['exp']: 
        data.setdefault('exp_total', data['exp']['total'])
      if 'currnet' in data['exp']:
        data.setdefault('exp_current', data['exp']['current'])
      data.pop('exp')

    return super().to_internal_value(data)