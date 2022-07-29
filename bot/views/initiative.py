from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.db import transaction

from .get_post import get_post
from bot.models import InitiativeCharacter, InitiativeTracker20th, InitiativeCharacter
from chronicle.models import Chronicle, Member

"""
Sets the current phase of the tracker
0: roll_phase (sets all actions to false, updates round marker)
1: reveal_phase (returns roll data)
2: declare_phase (returns roll data)
3: end_phase (removed tracker data)
Receive:
{
    APIKey: APIKey,
    channelId: string,
    guildId: string,
    messageId: string,
    phase: int
}
Return
{
    status: string
}
"""
@csrf_exempt
@transaction.atomic
def set_phase(request):
    data = get_post(request)
    phase = data["phase"]
    channel_id = data["channelId"]
    chronicle_id = data["guildId"]
    message_id = data.get("messageId", "")

    try:
        chronicle = Chronicle.objects.get(pk=chronicle_id)
        chronicle.name = data["guildName"]
    except Chronicle.DoesNotExist:
        chronicle = Chronicle(id=chronicle_id, name=data["guildName"])
    
    chronicle.save()
    
    try:
        tracker = InitiativeTracker20th.objects.prefetch_related(
            "characters").select_related("chronicle").get(pk=channel_id)
        tracker.phase = phase
        tracker.message_id = message_id
    except InitiativeTracker20th.DoesNotExist:
        if (phase == InitPhase.END): return JsonResponse({"status": "OK"})
        
        tracker = InitiativeTracker20th(
            id=channel_id,
            chronicle=chronicle,
            message_id=message_id,
            phase=phase
        )    
    
    if (phase == InitPhase.NEW):
        for character in tracker.characters.all():
            character.delete()
        tracker.current_round = 1
        tracker.phase = InitPhase.ROLL
    elif (phase == InitPhase.ROLL):
        for character in tracker.characters.all():
            character.init = 0
            character.rolled = False
            character.declared = False
            character.save()
        tracker.current_round += 1
    elif (phase == InitPhase.END):
        tracker.delete()
        return JsonResponse({"status": "OK"})
    tracker.lockout = False
    tracker.save()    
    
    return JsonResponse({"status": "OK"})
    

"""
Updates roll info for a member
Receive:
{
    APIKey: APIKey,
    channelId: string,
    messageId: string,
    memberId: string,
    name: string,
    pool: int
    init: int
}
Return
{
    status: string
}
"""
@csrf_exempt
@transaction.atomic
def init_roll(request):
    data = get_post(request)
    channel_id = data["channelId"]
    message_id = data["messageId"]
    member_id = data["memberId"]
    name = data["name"]

    try:
        tracker = InitiativeTracker20th.objects.prefetch_related(
            "characters").select_related("chronicle").get(pk=channel_id)
    except InitiativeTracker20th.DoesNotExist:
        return JsonResponse({"status": "no_tracker"}, status=204)
        
    tracker.message_id = message_id
    tracker.lockout = False
    tracker.save()
    User = get_user_model()

    try:        
        user = User.objects.get(pk=member_id)
    except User.DoesNotExist:
        user = User.objects.create_user({
            "id": member_id,
            "username": data["memberUsername"],
            "discriminator": data["memberDiscriminator"]
        })
        
    user.username = data["memberUsername"]
    user.discriminator = data["memberDiscriminator"]
    user.save()
    
    try:
        member = Member.objects.get(user=member_id, chronicle=tracker.chronicle)
    except Member.DoesNotExist:
        member = Member(chronicle=tracker.chronicle, user=user, 
            display_name=data["memberUsername"])
        member.save()
    
    try:
        character = tracker.characters.get(member__user__id=member_id, name__iexact=name)
    except InitiativeCharacter.DoesNotExist:
        character = InitiativeCharacter(
            tracker=tracker,
            member=member,
            name=name
            )
            
    character.rolled = True
    character.pool = data["pool"]
    character.mod = data["mod"]
    character.init = data["init"]
    character.save()
    return JsonResponse({"Status": "OK"})


"""
declares an action for a member
Receive:
{
    channelId: interaction.channelId,
    messageId: messageId,
    memberId: interaction.user.id,
    memberUsername: character.member.user.username,
    memberDiscriminator: character.member.user.discriminator, 
    name: character.name,
    action: action
}
Return:
{
    status: string
}
"""
@csrf_exempt
@transaction.atomic
def init_declare(request):
    data = get_post(request)
    channel_id = data["channelId"]
    message_id = data["messageId"]
    member_id = data["memberId"]
    name = data["name"]
    phase = data["phase"]

    try:
        tracker = InitiativeTracker20th.objects.prefetch_related(
            "characters").select_related("chronicle").get(pk=channel_id)
    except InitiativeTracker20th.DoesNotExist:
        return JsonResponse({"status": "no_tracker"}, status=204)
        
    tracker.message_id = message_id
    if (phase != tracker.phase): tracker.phase = phase
    tracker.save()
    User = get_user_model()

    try:        
        user = User.objects.get(pk=member_id)
    except User.DoesNotExist:
        user = User.objects.create_user({
            "id": member_id,
            "username": data["memberUsername"],
            "discriminator": data["memberDiscriminator"]
        })
        
    user.username = data["memberUsername"]
    user.discriminator = data["memberDiscriminator"]
    user.save()
    
    try:
        member = Member.objects.get(user=member_id, chronicle=tracker.chronicle)
    except Member.DoesNotExist:
        member = Member(chronicle=tracker.chronicle, user=user, 
            display_name=data["memberUsername"])
        member.save()
    
    try:
        character = tracker.characters.get(member__user__id=member_id, name__iexact=name)
    except InitiativeCharacter.DoesNotExist:
        character = InitiativeCharacter(
            tracker=tracker,
            member=member,
            name=name
            )
            
    character.declared = True
    character.action = data["action"]
    character.save()
    return JsonResponse({"Status": "OK"})

"""
get a messageId
Receive:
{
    channelId: string
}
Return:
{
    status: string,    
    tracker: {
        channelId: string,
        guildId: string,
        phase: int,
        currentRound: int,
        characters: [{
            memberId: string,
            name: string,
            rolled: bool,
            pool: int,
            mod: int
            init: int,
            declared: bool,
            action: string
        }]
    }
}
"""
@csrf_exempt
def get_init_tracker(request):
    data = get_post(request)
    channel_id = int(data["channelId"])
    lockout = data["lockout"]

    try:
        tracker = InitiativeTracker20th.objects.prefetch_related(
            "characters").select_related("chronicle").get(pk=channel_id)
    except InitiativeTracker20th.DoesNotExist:
        return JsonResponse({"status": "no_tracker"})    
    
    json = serializeTracker(tracker)
    if (not tracker.lockout and lockout): 
           tracker.lockout = True
           tracker.save()

    return JsonResponse(json)
    
   

"""
Sets a new Message ID
Receive:
{
    channelId: string,
    messageId: string
}
Return:
{
    status: string
}
"""
@csrf_exempt
def init_set_message_id(request):
    data = get_post(request)
    message_id = data["messageId"]
    channel_id = data["channelId"]

    try:
        tracker = InitiativeTracker20th.objects.get(pk=channel_id)
    except InitiativeTracker20th.DoesNotExist:
        return JsonResponse({"status": "no_tracker"})    
    
    tracker.message_id = message_id
    tracker.save()
    return JsonResponse({"status": "OK"})

def serializeTracker(tracker):
    characters = []

    for character in tracker.characters.all():
        characters.append({
            "memberId": str(character.member.user.id),
            "name": character.name,
            "rolled": character.rolled,
            "pool": character.pool,
            "mod": character.mod,
            "init": character.init,
            "declared": character.declared,
            "action": character.action
        })    
    
    return {
        "Status": "OK",
        "tracker": {
            "channelId": str(tracker.id),
            "guildId": str(tracker.chronicle.id),
            "messageId": str(tracker.message_id),
            "phase": tracker.phase,
            "currentRound": tracker.current_round,
            "lockout": tracker.lockout,
            "characters": characters
        }}

class InitPhase():
    NEW = 0
    ROLL = 1
    REVEAL = 2
    DECLARE = 3
    DECLARED = 4
    END = 5