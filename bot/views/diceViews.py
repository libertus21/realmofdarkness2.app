from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from bot.constants import Versions
from bot.models import DiceStats20th, DiceStatsV5
from .get_post import get_post

@csrf_exempt
def update_dice_stats(request):
    data = get_post(request)
    d_user = data['user']
    version = data['version']
    reroll = data['reroll']
    result = data['result']
    User = get_user_model()

    try:
        user = User.objects.get(pk=d_user['id'])
        user.username = d_user['username']
        user.discriminator = d_user['discriminator']
        user.avatar_url = d_user['avatarURL']
        user.save()
    except User.DoesNotExist:
        user = User.objects.create_user(d_user)
    
    if version == Versions.v5.value:
        Stats = DiceStatsV5
        
    elif version == Versions.v20.value:
        Stats = DiceStats20th

    stats, created = Stats.objects.get_or_create(user=user)
    stats.rolled += 1
    setattr(stats, result, (getattr(stats, result) + 1))
    if reroll: stats.reroll += 1
    stats.save()

    return JsonResponse({"updated": True})