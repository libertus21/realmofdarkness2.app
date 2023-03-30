from chronicle.models import Chronicle

def update_or_create_guild(guild_data):
  if not guild_data:
    return None
  
  try:
    guild = Chronicle.objects.get(pk=guild_data['id'])
    guild.name = guild_data['name']
    guild.icon_url = guild_data['iconURL']
    guild.save()
  except Chronicle.DoesNotExist:
    guild = Chronicle.objects.create(
      id=guild_data['id'],
      name=guild_data['name'],
      icon_url=guild_data['iconURL']
    )

  return guild