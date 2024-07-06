from .serializeSplat import (
    serializeVampire20th,
    serializeChangeling20th,
    serializeDemon20th,
    serializeGhoul20th,
    serializeHuman20th,
    serializeMage20th,
    serializeMortal5th,
    serializeVampire5th,
    serializeWerewolf20th,
    serializeWraith20th,
    serializeHunter5th,
)
from constants import Splats

serializers = {
    Splats.changeling20th.slug: serializeChangeling20th,
    Splats.demonTF.slug: serializeDemon20th,
    Splats.mage20th.slug: serializeMage20th,
    Splats.wraith20th.slug: serializeWraith20th,
    Splats.werewolf20th.slug: serializeWerewolf20th,
    Splats.vampire20th.slug: serializeVampire20th,
    Splats.ghoul20th.slug: serializeGhoul20th,
    Splats.human20th.slug: serializeHuman20th,
    Splats.vampire5th.slug: serializeVampire5th,
    Splats.mortal5th.slug: serializeMortal5th,
    Splats.hunter5th.slug: serializeHunter5th,
}


def serialize(splat, character):
    return serializers[splat](character)
