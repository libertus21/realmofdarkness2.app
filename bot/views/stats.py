from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from datetime import date, timedelta
from django.db.models import Count, Sum

from .get_post import get_post
from haven.models import Character, Splat
from bot.models import DiceStats20th, DiceStatsV5

@csrf_exempt
def get_stats(request):
    data = get_post(request)
    User = get_user_model()
    users = User.objects.all()

    # User Stats
    timestamp_30days = date.today() - timedelta(days=30)
    timestamp_14days = date.today() - timedelta(days=14)    
    users_30days = users.exclude(last_saved__gt=timestamp_30days)
    users_14days = users_30days.exclude(last_saved__gt=timestamp_14days)

    user_stats = {
        'total': str(users.count()),
        '30days': str(users_30days.count()),
        '14days': str(users_14days.count())
    }

    # Character Stats
    splats = Splat.objects.annotate(characters=Count('character')).order_by('-characters')
    character_stats = {}
    for splat in splats:
        character_stats[splat.slug] = {
            "count": str(splat.characters),
            "name": splat.name,
            "version": splat.version
        }
    
    # Dice Stats
    dice_v5 = DiceStatsV5.objects.aggregate(
        total=Sum('rolled'), 
        total_fail=Sum('total_fail'),
        bestial_fail=Sum('bestial_fail'),
        failed=Sum('failed'),
        passed=Sum('passed'),
        critical=Sum('critical'),
        messy_critical=Sum('messy_critical'),
        reroll=Sum('reroll'))

    dice_20th = DiceStats20th.objects.aggregate(
        total=Sum('rolled'), 
        botched=Sum('botched'),
        failed=Sum('failed'),
        passed=Sum('passed'))

    return JsonResponse({
        "users": user_stats, 
        'characters': character_stats,
        'dice_v5': dice_v5,
        'dice_20th': dice_20th
    })