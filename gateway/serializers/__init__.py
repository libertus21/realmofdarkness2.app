from .serializeCharacter import (serializeVampire20th, serializeChangeling20th, 
  serializeDemon20th, serializeGhoul20th, serializeHuman20th, 
  serializeMage20th, serializeMortal5th, serializeVampire5th, 
  serializeWerewolf20th, serializeWraith20th, serializeHunter5th)
from gateway.constants import Splats
from .serializeUser import serialize_user
from .serializeChronicle import serialize_chronicle
from .serializeMember import serialize_member

from haven.models import Vampire5th
from haven.serializers import V5TrackerSerializer

serializers = {
  Splats.changeling20th: serializeChangeling20th,
  Splats.demonTF: serializeDemon20th,
  Splats.mage20th: serializeMage20th,
  Splats.wraith20th: serializeWraith20th,
  Splats.werewolf20th: serializeWerewolf20th,
  Splats.vampire20th: serializeVampire20th,
  Splats.ghoul20th: serializeGhoul20th,
  Splats.human20th: serializeHuman20th,
  Splats.vampire5th: serializeVampire5th,
  Splats.mortal5th: serializeMortal5th,
  Splats.hunter5th: serializeHunter5th,
}

def serialize_character(base_character):
  character = get_derived_instance(base_character)

  if isinstance(character, Vampire5th):
    return V5TrackerSerializer(character).data
  else:
    return serializers[character.splat.slug](character)
  
def get_derived_instance(character):
  if hasattr(character, 'character5th'):
    # Check if it's a Vampire5th
    if hasattr(character.character5th, 'vampire5th'):
        return character.character5th.vampire5th
    else:
      return character.character5th
  elif hasattr(character, 'character20th'):
    # Access Character20th fields
    return character.character20th
  # Add other derived model checks here

  # If none of the derived models match, return the original Characterinstance
  return character