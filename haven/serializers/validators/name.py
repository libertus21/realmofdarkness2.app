from rest_framework import serializers
from haven.models import Character

def validate_name(self, value):
    if not value:
      raise serializers.ValidationError("You must input a Name.")
    elif len(value) > 50:
      m = "Name cannot be longer than 50 characters."
      raise serializers.ValidationError(m)
        
    user = self.context.user
    chars = Character.objects.filter(name=value, user=user)
    if chars:
      m = "You already have a Character with this name."
      raise serializers.ValidationError(m)
        
    return value