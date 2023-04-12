
def serialize_member(member):
    return {
        'chronicle': member.chronicle_id,
        'user': member.user_id,
        'admin': member.admin,
        'storyteller': member.storyteller,
        'nickname': member.nickname if member.nickname else member.user.username,
        'avatar_url': member.avatar_url,
        'date_created': member.created_at.timestamp(),
        'last_updated': member.last_updated.timestamp()
    }