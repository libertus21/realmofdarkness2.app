from .serializeSplat import (serializeVampire20th, serializeChangeling20th, 
    serializeDemon20th, serializeGhoul20th, serializeHuman20th, 
    serializeMage20th, serializeMortal5th, serializeVampire5th, 
    serializeWerewolf20th, serializeWraith20th, serializeHunter5th)
from bot.constants import Splats

serializers = {
    Splats.changeling20th.value: serializeChangeling20th,
    Splats.demonTF.value: serializeDemon20th,
    Splats.mage20th.value: serializeMage20th,
    Splats.wraith20th.value: serializeWraith20th,
    Splats.werewolf20th.value: serializeWerewolf20th,
    Splats.vampire20th.value: serializeVampire20th,
    Splats.ghoul20th.value: serializeGhoul20th,
    Splats.human20th.value: serializeHuman20th,
    Splats.vampire5th.value: serializeVampire5th,
    Splats.mortal5th.value: serializeMortal5th,
    Splats.hunter5th.value: serializeHunter5th,
}

def serialize(splat, character):
        return serializers[splat](character)