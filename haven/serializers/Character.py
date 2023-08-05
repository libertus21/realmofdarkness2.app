from rest_framework import serializers
from haven.models import Character
from chronicle.models import Member

########################### Character Serializer ##############################
# Base serializer with common fields for Character
class CharacterSerializer(serializers.ModelSerializer):
  class Meta:
    model = Character
    fields = (
      'name', 
      'id', 
      'is_sheet',
      'status',
      'faceclaim',
      'theme',
    )
  
  def to_representation(self, instance):
    data = super().to_representation(instance)

    data['user'] = str(instance.user.id) 
    data['chronicle'] = str(instance.chronicle.id) \
      if instance.chronicle else None
    data['member'] = str(instance.member.id) if instance.member else None
    
    data['exp'] = {
      'current': instance.exp_current,
      'total': instance.exp_total,
    }
    data['created_at'] = instance.created_at.timestamp()
    data['last_updated'] = instance.last_updated.timestamp()
    return data

############################ Character Deserializer ###########################
class CharacterDeserializer(serializers.ModelSerializer):
  class Meta():
    model = Character
    fields = '__all__'

  def validate_status(self, value):
    if self.instance.status > 3 and value <= 3:
      # TODO We need to check how many Active sheets there are
      # if they have hit their limit already we will raise an Error
      pass

    return value

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

  def validate_chronicle(self, value):
    if self.instance.chronicle != value:
      if value:
        user = self.context.user
        member = Member.objects.get(chronicle=value, user=user)
        if member: self.instance.member = member
      else: 
        self.instance.member = None
    return value

  
  def validate(self, data):
    data = super().validate(data)

    status = data.get('status')
    if status is None and self.instance.status > 3:
      raise serializers.ValidationError('This sheet cannot be edited')
    
    return data