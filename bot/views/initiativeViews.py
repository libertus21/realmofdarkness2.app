from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse

from .get_post import get_post
from bot.models import InitiativeTracker20th
from bot.serializers import (
    InitiativeTracker20thSerializer,
    InitiativeTracker20thDeserializer,
)
from chronicle.models import Chronicle


@csrf_exempt
def init_set(request):
    data = get_post(request)

    chronicle = Chronicle.objects.get(pk=data["chronicle_id"])
    try:
        tracker = InitiativeTracker20th.objects.get(pk=data["channel_id"])
        tracker_serializer = InitiativeTracker20thDeserializer(
            tracker, data=data, partial=True
        )
    except InitiativeTracker20th.DoesNotExist:
        tracker_serializer = InitiativeTracker20thDeserializer(data=data)

    if tracker_serializer.is_valid():
        tracker = tracker_serializer.save()
        return JsonResponse(InitiativeTracker20thSerializer(tracker).data, status=200)
    else:
        return JsonResponse(tracker_serializer.errors, status=400)


@csrf_exempt
def init_get(request):
    data = get_post(request)
    try:
        tracker = InitiativeTracker20th.objects.get(pk=data["channel_id"])
    except InitiativeTracker20th.DoesNotExist:
        return HttpResponse(status=204)

    return JsonResponse({"tracker": tracker.data})


@csrf_exempt
def init_delete(request):
    data = get_post(request)
    try:
        tracker = InitiativeTracker20th.objects.get(pk=data["channel_id"])
    except InitiativeTracker20th.DoesNotExist:
        return HttpResponse(status=204)

    tracker.delete()
    return HttpResponse()
