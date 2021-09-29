from json import dumps

def serializeVampire20th(character):
    return {
        'name': character.name,
        'id': str(character.id),
        'splat': character.splat.slug,
        'user': {
            'id': str(character.player.id),
            'username': character.player.username,
            'discriminator': character.player.discriminator,
            'avatarURL': character.player.avatar_url,
            'supporter': character.player.supporter
        },
        'guild': {
            'id': str(character.chronicle.id) if character.chronicle else '',
            'name': character.chronicle.name if character.chronicle else '',
            'iconURL': character.chronicle.icon_url if character.chronicle else '',
            'displayName': character.member.display_name if character.member else ''
        },
        'colour': [
            character.discord_colour.red, 
            character.discord_colour.green, 
            character.discord_colour.blue
        ],
        'thumbnail': character.faceclaim if character.player.supporter > 0 else None,
        'exp': {'total': character.exp.total, 'current': character.exp.current},
        'history': [],
        'willpower': {
            'total': character.willpower20th.total, 
            'current': character.willpower20th.current
        },
        'health': {
            'total': character.health20th.total,
            'bashing': character.health20th.bashing,
            'lethal': character.health20th.lethal,
            'aggravated': character.health20th.aggravated
        },
        'blood': {
            'total': character.bloodpool.total, 
            'current': character.bloodpool.current
        },
        'morality': {
            'name': character.moralitylevel.morality.name, 
            'current': character.moralitylevel.level
        }
    }