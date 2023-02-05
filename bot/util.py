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

def get_name_list(id, guild_id):
    if (guild_id): chars = Character.objects.filter(user=id, chronicle=guild_id)
    else: chars = Character.objects.filter(user=id)
    
    chars.select_related('splat', 'chronicle')

    name_list = []

    for char in chars:
        name_list.append({
            'id': str(char.id),
            'name': char.name,
            'splat': char.splat.slug,
            'guildName': char.chronicle.name if char.chronicle else 'None'
        })
    
    return name_list