from django.db import models
from rod.settings import AUTH_USER_MODEL
from chronicle.models import Member, Chronicle

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

class InitiativeTracker20th(models.Model):
    id = models.BigIntegerField(primary_key=True) # Discord ChannelId
    chronicle = models.ForeignKey(Chronicle, on_delete=models.CASCADE)
    message_id = models.BigIntegerField(unique=True) # Discord MessageId
    phase = models.IntegerField(default=0)
    current_round = models.IntegerField(default=0)
    lockout = models.BooleanField(default=False)
    last_updated = models.DateField(auto_now=True)
    
class InitiativeCharacter(models.Model):
    tracker = models.ForeignKey(InitiativeTracker20th, on_delete=models.CASCADE, 
        related_name="characters")
    member = models.ForeignKey(Member, on_delete=models.CASCADE)

    name = models.CharField(max_length=50)
    rolled = models.BooleanField(default=False)
    pool = models.IntegerField(default=0)
    mod = models.IntegerField(default=0)
    init = models.IntegerField(default=0)
    declared = models.BooleanField(default=False)
    action = models.CharField(max_length=100, blank=True)

    class Meta:
        unique_together = ('tracker', 'member', 'name')

    def __str__(self):
        return f'{self.name} <{self.member}>'