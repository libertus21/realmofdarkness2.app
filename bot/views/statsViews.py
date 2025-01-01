from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from datetime import date, timedelta
from django.db.models import Count
from django.utils import timezone

from .get_post import get_post
from haven.models import Character
from bot.models import CommandStat, Bot
from bot.serializers import CommandStatSerializer, CommandStatDeserializer

User = get_user_model()


@csrf_exempt
def get_stats(request):
    get_post(request)
    users = User.objects.all()

    # User Stats
    timestamp_30days = date.today() - timedelta(days=30)
    timestamp_14days = date.today() - timedelta(days=14)
    users_30days = users.filter(last_active__gt=timestamp_30days)
    users_14days = users_30days.filter(last_active__gt=timestamp_14days)

    user_stats = {
        "total": str(users.count()),
        "30days": str(users_30days.count()),
        "14days": str(users_14days.count()),
    }

    command_stats = (
        CommandStat.objects.filter(last_used__gt=timestamp_30days)
        .values("command", "bot__username")
        .order_by()
        .annotate(count=Count("command"))
        .order_by("-count")
    )

    total = (
        CommandStat.objects.filter(last_used__gt=timestamp_30days)
        .values("bot__username", "user")
        .distinct()
    )

    totals = {}

    for stat in total:
        if totals.get(stat["bot__username"], None):
            totals[stat["bot__username"]]["count"] += 1
        else:
            totals[stat["bot__username"]] = {
                "bot__username": stat["bot__username"],
                "command": "Total Users",
                "count": 1,
            }

    stats = []

    for stat in totals.values():
        stats.append(stat)

    for stat in command_stats:
        stats.append(stat)

    # Character Stats
    characters = (
        Character.objects.filter(last_updated__gt=timestamp_30days, splat__isnull=False)
        .values("splat__name", "splat__version", "splat__slug")
        .annotate(count=Count("splat__slug"))
        .order_by("-count")
    )

    char_stats = []
    for char in characters:
        char_stats.append(
            {
                "count": char["count"],
                "splat": char["splat__name"] + " " + char["splat__version"],
            }
        )
    sheets = (
        Character.objects.filter(last_updated__gt=timestamp_30days, is_sheet=True)
        .values("splat_new")
        .annotate(count=Count("splat_new"))
        .order_by("-count")
    )

    for sheet in sheets:
        char_stats.append(
            {"count": sheet["count"], "splat": sheet["splat_new"] + " (sheet)"}
        )

    new_characters = (
        Character.objects.filter(
            last_updated__gt=timestamp_30days, splat_new__isnull=False, is_sheet=False
        )
        .values("splat_new")
        .annotate(count=Count("splat_new"))
        .order_by("-count")
    )

    for char in new_characters:
        char_stats.append({"count": char["count"], "splat": char["splat_new"]})

    # Sort char_stats by count in descending order
    char_stats = sorted(char_stats, key=lambda x: x["count"], reverse=True)

    return JsonResponse(
        {"users": user_stats, "characters": char_stats, "command_stats": list(stats)}
    )


@csrf_exempt
def command_used(request):
    data = get_post(request)
    user_id = data["user_id"]
    command = data["command"]
    bot_id = data["bot_id"]

    user = User.objects.get(pk=user_id)
    bot = Bot.objects.get(pk=bot_id)

    try:
        stat = CommandStat.objects.get(user=user, command=command, bot=bot)
        stat_serializer = CommandStatDeserializer(
            stat, data={"used": stat.used + 1}, partial=True
        )
    except CommandStat.DoesNotExist:
        stat_serializer = CommandStatDeserializer(
            data={"user": user.id, "command": command, "bot": bot.id}
        )

    if stat_serializer.is_valid():
        stat = stat_serializer.save()
        user.last_active = timezone.now()
        user.save()
        return JsonResponse(CommandStatSerializer(stat).data, status=200)
    else:
        return JsonResponse(stat_serializer.errors, status=400)
