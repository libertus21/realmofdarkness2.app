from haven.models import Character
from bot.constants import Splats, Versions

def get_splat(splat, id=None, name=None, user_id=None):
    if id: 
        char = Character.objects.filter(pk=id)
    elif not splat: 
        char = Character.objects.filter(name__iexact=name, user=user_id)
    else: 
        char = Character.objects.filter(
            name__iexact=name, 
            user=user_id, 
            splat__slug=splat
        )

    select = ['colour', 'user', 'chronicle', 'member']
    prefetch = ['history', 'trackable']

    if splat and Versions.v20.value in splat:
        prefetch.append('health')    
    elif splat and Versions.v5.value in splat:        
        prefetch.append('damage')
    
    if (splat == Splats.vampire20th.value or splat == Splats.human20th.value or
    splat == Splats.ghoul20th.value):        
        select.append('morality')
    elif (splat == Splats.mortal5th.value or splat == Splats.vampire5th.value):
        select.append('humanity')

    char.select_related(*select)
    char.prefetch_related(*prefetch)
    
    return char[0] if char else None