from haven.models import Character
from haven.utility import get_derived_instance


def get_splat(splat, id=None, name=None, user_id=None):
    if id:
        char = Character.objects.filter(pk=id)
    else:
        char = Character.objects.filter(name__iexact=name, user=user_id)

    return get_derived_instance(char[0]) if char else None
