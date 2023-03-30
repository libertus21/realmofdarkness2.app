from chronicle.models import Member

def update_or_create_member(guild, user, member_data):
  if not guild or user or member_data:
    return None
  
  if member_data['displayName']:
    nickname = member_data['displayName']
  else:
    nickname = member_data['userName']
  
  try:
    member = Member.objects.get(chronicle=guild, user=user)
    member.nickname = nickname
    member.save()
  except Member.DoesNotExist:
    member = Member.objects.create(
      chronicle=guild,
      user=user,
      nickname=nickname
    )