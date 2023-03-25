from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from bot.models import Bot

from .get_post import get_post

@csrf_exempt
def update_bot(request):
  data = get_post(request)
  bot_data = data['bot']
  try:
    bot = Bot.objects.get(pk=bot_data['id'])
    bot.username = bot_data['username']
    bot.discriminator=bot_data['discriminator']
    bot.shard_count=bot_data['shard_count']
  except Bot.DoesNotExist:
    bot = Bot(
      id=bot_data['id'],
      username=bot_data['username'],
      discriminator=bot_data['discriminator'],
      shard_count=bot_data['shard_count']
    )
  bot.save()
  
  return HttpResponse()