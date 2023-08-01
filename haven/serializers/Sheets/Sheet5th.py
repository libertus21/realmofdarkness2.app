from rest_framework import serializers
from .Character import CharacterSerializer
from haven.models import Character5th

# Base serializer with common fields for Character5th
class Character5thSerializer(CharacterSerializer):
  class Meta(CharacterSerializer.Meta):
    model = Character5th
    fields = CharacterSerializer.Meta.fields + (
      'ambition',
      'desire',
    )

  def to_representation(self, instance):
    data = super().to_representation(instance)
    
    data['willpower'] = {
      'superficial': instance.willpower_superficial,
      'total': instance.willpower_total,
      'aggravated': instance.willpower_aggravated,
    }
    
    data['health'] = {
      'superficial': instance.health_superficial,
      'total': instance.health_total,
      'aggravated': instance.health_aggravated,
    }

    data['attributes'] = {
      'strength': instance.strength,
      'dexterity': instance.dexterity,
      'stamina': instance.stamina,
      'charisma': instance.charisma,
      'manipulation': instance.manipulation,
      'composure': instance.composure,
      'intelligence': instance.intelligence,
      'wits': instance.wits,
      'resolve': instance.resolve,
    }
        
    data['skills'] = {
      'athletics': {
        'value': instance.athletics,
        'spec': instance.athletics_spec,
      },
      'brawl': {
        'value': instance.brawl,
        'spec': instance.brawl_spec,
      },
      'craft': {
        'value': instance.craft,
        'spec': instance.craft_spec,
      },
      'drive': {
        'value': instance.drive,
        'spec': instance.drive_spec,
      },
      'firearms': {
        'value': instance.firearms,
        'spec': instance.firearms_spec,
      },
      'larceny': {
        'value': instance.larceny,
        'spec': instance.larceny_spec,
      },
      'melee': {
        'value': instance.melee,
        'spec': instance.melee_spec,
      },
      'stealth': {
        'value': instance.stealth,
        'spec': instance.stealth_spec,
      },
      'survival': {
        'value': instance.survival,
        'spec': instance.survival_spec,
      },
      'animal_ken': {
        'value': instance.animal_ken,
        'spec': instance.animal_ken_spec,
      },
      'etiquette': {
        'value': instance.etiquette,
        'spec': instance.etiquette_spec,
      },
      'insight': {
        'value': instance.insight,
        'spec': instance.insight_spec,
      },
      'intimidation': {
        'value': instance.intimidation,
        'spec': instance.intimidation_spec,
      },
      'leadership': {
        'value': instance.leadership,
        'spec': instance.leadership_spec,
      },
      'performance': {
        'value': instance.performance,
        'spec': instance.performance_spec,
      },
      'persuasion': {
        'value': instance.persuasion,
        'spec': instance.persuasion_spec,
      },
      'streetwise': {
        'value': instance.streetwise,
        'spec': instance.streetwise_spec,
      },
      'subterfuge': {
        'value': instance.subterfuge,
        'spec': instance.subterfuge_spec,
      },
      'academics': {
        'value': instance.academics,
        'spec': instance.academics_spec,
      },
      'awareness': {
        'value': instance.awareness,
        'spec': instance.awareness_spec,
      },
      'finance': {
        'value': instance.finance,
        'spec': instance.finance_spec,
      },
      'investigation': {
        'value': instance.investigation,
        'spec': instance.investigation_spec,
      },
      'medicine': {
        'value': instance.medicine,
        'spec': instance.medicine_spec,
      },
      'occult': {
        'value': instance.occult,
        'spec': instance.occult_spec,
      },
      'politics': {
        'value': instance.politics,
        'spec': instance.politics_spec,
      },
      'science': {
        'value': instance.science,
        'spec': instance.science_spec,
      },
      'technology': {
        'value': instance.technology,
        'spec': instance.technology_spec,
      },
    }
    return data  