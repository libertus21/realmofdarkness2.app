from haven.models import Vampire5th, Werewolf5th, Character, Vampire20th
from haven.serializers import (
    Vampire5thDeserializer,
    Werewolf5thDeserializer,
    Vampire5thSerializer,
    Werewolf5thSerializer,
    V5TrackerSerializer,
    W5TrackerSerializer,
    Vampire20thSerializer,
    Vampire20thDeserializer,
    V20TrackerSerializer,
)


def get_derived_instance(character):
    """
    Returns the derived instance of a character based on its type.

    Args:
        character: The character instance to get the derived instance for.

    Returns:
        The derived instance of the character. If none of the derived models match,
        the original character instance is returned.

    """
    if hasattr(character, "character5th"):
        if hasattr(character.character5th, "vampire5th"):
            return character.character5th.vampire5th
        elif hasattr(character.character5th, "werewolf5th"):
            return character.character5th.werewolf5th
        else:
            return character.character5th
    elif hasattr(character, "character20th"):
        if hasattr(character.character20th, "vampire20th"):
            return character.character20th.vampire20th
        return character.character20th
    # Add other derived model checks here

    # If none of the derived models match, return the original Character instance
    return character


def get_character_model(splat):
    """
    Returns the character class based on the given splat.

    Args:
        splat (str): The splat of the character.

    Returns:
        class: The character class corresponding to the given splat.

    """
    # Check the splat and return the corresponding character class
    if splat == "vampire5th":
        return Vampire5th
    elif splat == "werewolf5th":
        return Werewolf5th
    elif splat == "vampire20th":
        return Vampire20th
    else:
        return Character


def get_deserializer(splat):
    """
    Returns the character deserializer based on the given splat.

    Args:
        splat (str): The splat of the character.

    Returns:
        class: The character deserializer corresponding to the given splat.

    """
    # Check the splat and return the corresponding character deserializer
    if splat == "vampire5th":
        return Vampire5thDeserializer
    elif splat == "werewolf5th":
        return Werewolf5thDeserializer
    elif splat == "vampire20th":
        return Vampire20thDeserializer
    else:
        return None


def get_serializer(splat):
    """
    Returns the character serializer based on the given splat.

    Args:
        splat (str): The splat of the character.

    Returns:
        class: The character serializer corresponding to the given splat.

    """
    # Check the splat and return the corresponding character serializer
    if splat == "vampire5th":
        return Vampire5thSerializer
    elif splat == "werewolf5th":
        return Werewolf5thSerializer
    elif splat == "vampire20th":
        return Vampire20thSerializer
    else:
        return None


def get_tracker_serializer(splat):
    """
    Returns the tracker serializer based on the given splat.

    Args:
        splat (str): The splat of the character.

    Returns:
        class: The tracker serializer corresponding to the given splat.

    """
    # Check the splat and return the corresponding tracker serializer
    if splat == "vampire5th":
        return V5TrackerSerializer
    elif splat == "werewolf5th":
        return W5TrackerSerializer
    elif splat == "vampire20th":
        return V20TrackerSerializer
    else:
        return None
