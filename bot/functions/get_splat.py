from haven.models import Character
from haven.utility import get_derived_instance
from constants import Splats, Versions


def get_splat(splat, id=None, name=None, user_id=None):
    if id:
        char = Character.objects.filter(pk=id)
    else:
        char = Character.objects.filter(name__iexact=name, user=user_id)

    select = ["user", "chronicle", "member", "character5th__vampire5th"]
    prefetch = ["trackable"]

    if splat and Versions.v20 in splat:
        prefetch.append("health")
    elif splat and Versions.v5 in splat:
        prefetch.append("damage")

    if (
        splat == Splats.vampire20th
        or splat == Splats.human20th
        or splat == Splats.ghoul20th
    ):
        select.append("morality")
    elif splat == Splats.mortal5th or splat == Splats.vampire5th:
        select.append("humanity")

    char.select_related(*select)
    char.prefetch_related(*prefetch)

    return get_derived_instance(char[0]) if char else None
