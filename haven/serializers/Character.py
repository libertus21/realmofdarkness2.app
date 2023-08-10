from re import compile
from rest_framework import serializers
from rest_framework import status
from haven.models import Character, SheetStatus
from chronicle.models import Member
from constants import CharacterSheetLimit


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

  def to_internal_value(self, data):
    data.pop('member', None)
    data.pop('created_at', None)
    data.pop('last_updated', None)

    return super().to_internal_value(data)

  def validate_name(self, value):
    if not value:
      raise serializers.ValidationError("You must input a Name.")
    elif len(value) > 50:
      m = "Name cannot be longer than 50 characters."
      raise serializers.ValidationError(m, code=status.HTTP_409_CONFLICT)     

    if (self.instance): # Update a character   
      # We don't need to do anything if the name is the same
      if self.instance.name == value: return value
      user_id = self.context.data['character']['user']
    
    else: # New Character
      user_id = self.initial_data.get('user')
      if not user_id: raise serializers.ValidationError()
    
    chars = Character.objects.filter(name=value, user=user_id)
    if chars:
      m = "You already have a Character with this name."
      raise serializers.ValidationError(m, code=status.HTTP_304_NOT_MODIFIED)     
        
    return value
  
  def validate_user(self, value):
    if not self.instance and not value:      
      m = "User must be included with a new character"
      raise serializers.ValidationError(m)
    elif self.instance and self.instance.user != value:            
      m = "You cannot change a user after creation"
      raise serializers.ValidationError(m)

    return value

  def validate_status(self, value):
    if not value: return value
    elif value < SheetStatus.DRAFT or value > SheetStatus.ARCHIVE:
      raise serializers.ValidationError("Invalid Sheet Status.")
    return value
  
  def validate_faceclaim(self, value):
    pass

  def validate_theme(self, value):
    if not value: return value
    
    hex_color_pattern = compile(r'^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$')
    
    if not isinstance(value, str) or not hex_color_pattern.match(value):
      raise serializers.ValidationError("Invalid hex color value.")
    
    return value

  
  def validate(self, data):
    data = super().validate(data)

    if self.instance and data.get('status', 0) < 4: # Sheet update
      count = Character.objects.filter(user=self.instance.user, is_sheet=True, status__lt=SheetStatus.DEAD).count()
      max_active_sheets = CharacterSheetLimit.get_amount(self.instance.user.supporter)
      if count > max_active_sheets:
        m = f'You have {count} active sheets and your current limit is {max_active_sheets}.\nTo increase your limit please look at our supporter tiers.'
        raise serializers.ValidationError(m, code=status.HTTP_304_NOT_MODIFIED)

    char_status = data.get('status')
    if char_status is None and self.instance and self.instance.status > 3:
      raise serializers.ValidationError('This sheet cannot be edited',
        code=status.HTTP_304_NOT_MODIFIED)
    

    # Add member
    chronicle = data.get('chronicle', None)
    if not self.instance and chronicle: 
      # New Character
      data['member'] = Member.objects.get(chronicle=chronicle, user__id=data.get('user'))

    elif self.instance and self.instance.chronicle != chronicle:
      # Update character
      if chronicle:
        user = self.context.user
        data['member'] = Member.objects.get(chronicle=chronicle, user=user)
      else:
        data['member'] = None

    return data