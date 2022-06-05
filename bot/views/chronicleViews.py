from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from chronicle.models import Chronicle, Member, StorytellerRole
from .get_post import get_post

@csrf_exempt
def member_delete(request):
    data = get_post(request)
    guild_id = data['guild_id']
    user_id = data['user_id']

    try:
        member = Member.objects.get(chronicle=int(guild_id), user=int(user_id)).prefetch_related('character_set')
    except Member.DoesNotExist:
        return JsonResponse({'removed': False})

    member.character_set.update(chronicle=None)
    member.delete()        

    return JsonResponse({'removed': True})

@csrf_exempt
def set_tracker_channel(request):
    data = get_post(request)
    discord_guild = data['guild']
    channel_id = data['channel_id']

    try:
        guild = Chronicle.objects.get(pk=discord_guild['id'])
    except Chronicle.DoesNotExist:
        guild = Chronicle.objects.create(
            id=discord_guild['id'],
            icon_url=discord_guild['icon_url'],
            tracker_channel=channel_id
        )
        return JsonResponse({"saved": True})

    guild.icon_url = discord_guild['icon_url']
    
    if (guild.tracker_channel == channel_id):
        guild.tracker_channel = ''
        response = {"removed": True}
    else:
        guild.tracker_channel = channel_id
        response = {"saved": True}
    
    guild.save()    
    return JsonResponse(response)

@csrf_exempt
def get_tracker_channel(request):
    data = get_post(request)

    try:
        guild = Chronicle.objects.get(pk=data['guild_id'])
    except Chronicle.DoesNotExist:
        return JsonResponse({"no_guild": True})
    
    return JsonResponse({'channel_id': guild.tracker_channel})

@csrf_exempt
def set_st_role(request):
    data = get_post(request)
    discord_guild = data['guild']
    role_id = data['role_id']

    try:
        guild = Chronicle.objects.get(pk=discord_guild['id'])
    except Chronicle.DoesNotExist:
        guild = Chronicle.objects.create(
            id=discord_guild['id'],
            icon_url=discord_guild['icon_url']
        )
        StorytellerRole.objects.create(id=role_id, guild=guild)
        return JsonResponse({"saved": True})

    guild.icon_url = discord_guild['icon_url']    
    guild.save()

    role, created = StorytellerRole.objects.get_or_create(id=role_id, guild=guild)
    
    if (created):
        response = {"saved": True}
    else:
        role.delete()
        response = {"removed": True}

    return JsonResponse(response)

@csrf_exempt
def get_st_roles(request):
    data = get_post(request)

    st_roles = StorytellerRole.objects.filter(guild=int(data['guild_id']))
    role_ids = []

    for role in st_roles:
        role_ids.append(str(role.id))
    
    return JsonResponse({'roles': role_ids})

@csrf_exempt
def delete_st_role(request):
    data = get_post(request)
    discord_guild = data['guild']
    role_id = data['role_id']

    try:
        guild = Chronicle.objects.get(pk=discord_guild['id'])
    except Chronicle.DoesNotExist:
        guild = Chronicle.objects.create(
            id=discord_guild['id'],
            icon_url=discord_guild['icon_url']
        )
        return JsonResponse({"deleted": False})

    guild.icon_url = discord_guild['icon_url']    
    guild.save()

    try:
        role = StorytellerRole.objects.get(pk=role_id)
        role.delete()
        response = {'deleted': True}
    except StorytellerRole.DoesNotExist:
        response = {'deleted': False}
    
    return JsonResponse(response)