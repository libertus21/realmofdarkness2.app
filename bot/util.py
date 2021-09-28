from haven.models import Character

def get_splat(splat, id=None, name=None, user_id=None):
    if id: char = Character.objects.filter(pk=id)
    else: char = Character.objects.filter(
        name=name, player=user_id, splat__slug=splat)
    
    if splat == 'vampire20th':        
        char.select_related(
            'discord_colour', 'exp', 'history_set', 'willpower20th', 'health20th',
            'bloodpool', 'moralitylevel', 'player', 'chronicle', 'member'
        )
    
    return char[0] if char else None