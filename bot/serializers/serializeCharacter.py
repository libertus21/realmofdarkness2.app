def serializeCharacter(character):
    exp = character.trackable.get(slug='exp')

    return {
        'name': character.name,
        'id': str(character.id),
        'splat': character.splat.slug,
        'user': {
            'id': str(character.user.id),
            'username': character.user.username,
            'discriminator': character.user.discriminator,
            'avatarURL': character.user.avatar_url,
            'supporter': character.user.supporter
        },
        'guild': {
            'id': str(character.chronicle.id) if character.chronicle else '',
            'name': character.chronicle.name if character.chronicle else '',
            'iconURL': character.chronicle.icon_url if character.chronicle else '',
            'displayName': character.member.display_name if character.member else ''
        },
        'colour': [
            character.colour.red, 
            character.colour.green, 
            character.colour.blue
        ],
        'thumbnail': character.faceclaim if character.user.supporter >= 0 else None,
        'exp': {'total': exp.total, 'current': exp.current},
        'history': serializeHistory(character),
    }

def serialize20th(character):
    s = serializeCharacter(character)
    willpower = character.trackable.get(slug='willpower')
    health = character.health.get(slug='health')    

    s['willpower'] = {
        'total': willpower.total, 
        'current': willpower.current
    }
    s['health'] = { 
        'total': health.total,
        'bashing': health.bashing,
        'lethal': health.lethal,
        'aggravated': health.aggravated
    }

    return s

def serialize5th(character):
    s = serializeCharacter(character)
    willpower = character.damage.get(slug='willpower')
    health = character.damage.get(slug='health')    

    s['willpower'] = {
        'total': willpower.total, 
        'superficial': willpower.superficial,
        'aggravated': willpower.aggravated
    }
    s['health'] = {
        'total': health.total, 
        'superficial': health.superficial,
        'aggravated': health.aggravated
    }

    return s

from haven.models import History

def serializeHistory(character):
    history_list = []

    history_qs = History.objects.filter(character=character).order_by('-date')

    for history in history_qs:
        history_list.append({
            'id': history.pk,
            'mode': history.mode,
            'args': history.args,
            'notes': history.notes,
            'date': history.date.strftime('%d/%m/%Y')
        })
    
    return history_list
