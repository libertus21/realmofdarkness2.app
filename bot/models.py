from django.db import models
from rod.settings import AUTH_USER_MODEL

class DiceStats20th(models.Model):
    user = models.OneToOneField(AUTH_USER_MODEL, on_delete=models.CASCADE)

    rolled = models.IntegerField(default=0)
    botched = models.IntegerField(default=0)
    failed = models.IntegerField(default=0)
    passed = models.IntegerField(default=0)

class DiceStatsV5(models.Model):
    user = models.OneToOneField(AUTH_USER_MODEL, on_delete=models.CASCADE)

    rolled = models.IntegerField(default=0)
    total_fail = models.IntegerField(default=0)
    bestial_fail = models.IntegerField(default=0)
    failed = models.IntegerField(default=0)
    passed = models.IntegerField(default=0)
    critical = models.IntegerField(default=0)
    messy_critical = models.IntegerField(default=0)
    reroll = models.IntegerField(default=0)