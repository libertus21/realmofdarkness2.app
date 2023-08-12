def serializeCharacter(character):
  exp = character.trackable.get(slug='exp')

  return {
    'name': character.name,
    'id': str(character.id),
    'splat': character.splat.slug,
    'user': str(character.user.id),
    'guild': str(character.chronicle.id) if character.chronicle else None,
    'theme': character.theme,
    'thumbnail': character.faceclaim if character.user.supporter >= 0 else None,
    'exp': {'total': exp.total, 'current': exp.current},
    #'history': serializeHistory(character),
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
