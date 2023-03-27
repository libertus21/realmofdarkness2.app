from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse

from .get_post import get_post
from bot.models import InitiativeTracker20th
from chronicle.models import Chronicle, Member

@csrf_exempt
def init_set(request):
  data = get_post(request)

  chronicle = Chronicle.objects.get(pk=data['chronicle_id'])
  try:
    tracker = InitiativeTracker20th.objects.get(pk=data['channel_id'])
    tracker.data = data['tracker']
  except InitiativeTracker20th.DoesNotExist:
    tracker = InitiativeTracker20th(
      id=data['channel_id'],
      chronicle=chronicle,
      data=data['tracker']
    )
  
  tracker.save()
  print(tracker)
  return HttpResponse()

@csrf_exempt
def init_get(request):
  data = get_post(request)
  try:
    tracker = InitiativeTracker20th.objects.get(pk=data['channel_id'])
  except InitiativeTracker20th.DoesNotExist:
    return HttpResponse(status=204)
  
  return JsonResponse({'tracker': tracker.data}) 

@csrf_exempt
def init_delete(request):
  data = get_post(request)
  try:
    tracker = InitiativeTracker20th.objects.get(pk=data['channel_id'])
  except InitiativeTracker20th.DoesNotExist:
    return HttpResponse(status=204)
  
  tracker.delete()
  return HttpResponse() 