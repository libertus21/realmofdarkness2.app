from django.db import models
from rod.settings import AUTH_USER_MODEL

class Chronicle(models.Model):
    id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=200)
    is_guild = models.BooleanField(default=True)
    members = models.ManyToManyField(AUTH_USER_MODEL, through='Member',
        related_name='chronicles')
    storytellers = models.ManyToManyField(AUTH_USER_MODEL, 
        related_name='storytellers_chronicles')
    owner = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE,
        related_name='owned', null=True)
    guild_member_count = models.IntegerField(default=0)
    icon_url = models.URLField(blank=True)

class Member(models.Model):
    chronicle = models.ForeignKey(Chronicle, on_delete=models.CASCADE)
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    display_name = models.CharField(max_length=100)

    class Meta:
        unique_together = ('chronicle', 'user')