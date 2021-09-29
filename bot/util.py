from haven.models import Character

def get_splat(splat, id=None, name=None, user_id=None):
    if id: char = Character.objects.filter(pk=id)
    elif not splat: char = Character.objects.filter(
        name=name, player=user_id)
    else: char = Character.objects.filter(
        name=name, player=user_id, splat__slug=splat)

    char.select_related(
            'discord_colour', 'exp', 'history_set', 
            'player', 'chronicle', 'member'
        )
    
    if splat == 'vampire20th':        
        char.select_related(
            'willpower20th', 'health20th', 'bloodpool', 'moralitylevel'
        )
    
    return char[0] if char else None

def get_name_list(id, guild_id):
    if (guild_id): chars = Character.objects.filter(player=id, chronicle=guild_id)
    else: chars = Character.objects.filter(player=id)
    
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