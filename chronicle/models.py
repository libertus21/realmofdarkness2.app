from django.db import models
from rod.settings import AUTH_USER_MODEL

"""
A Chronicle is a game played usually on a Discord Guild. A chronicle can
only be linked to a single Discord Guild and a Discord Guild can only 
a single Chronicle. This is due to the complexeties of dealing with 
characters on a discord server from multiple chronicles.
"""
class Chronicle(models.Model):
    # Need to create own snowflake generator
    id = models.BigIntegerField(primary_key=True) # Snowflake
    name = models.CharField(max_length=200)
    is_guild = models.BooleanField(default=True)
    members = models.ManyToManyField(AUTH_USER_MODEL, through='Member',
        related_name='chronicles')
    storytellers = models.ManyToManyField(AUTH_USER_MODEL, 
        related_name='storytellers_chronicles')
    icon_url = models.URLField(blank=True)
    tracker_channel = models.CharField(max_length=20, blank=True)
    last_updated = models.DateField(auto_now=True)

    def __str__(self):
        return f'{self.name}'

"""
The role used by the bot to note which roles are Storyteller roles.
We link to a Chronicle in case we ever want to allow multiple chronicles
in the same Guild.

Primary Key is a Discord Role Snowflake
"""
class StorytellerRole(models.Model):
    id = models.BigIntegerField(primary_key=True)
    guild = models.ForeignKey(Chronicle, on_delete=models.CASCADE)

"""
This is not a Guild Member but rather a member of a Chronicle.
We do not keep track of Guild members who do not use the bot
"""
class Member(models.Model):
    chronicle = models.ForeignKey(Chronicle, on_delete=models.CASCADE)
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    display_name = models.CharField(max_length=100)
    last_updated = models.DateField(auto_now=True)

    class Meta:
        unique_together = ('chronicle', 'user')