from django.db import models
from rod.settings import AUTH_USER_MODEL

class Character(models.Model):
    name = models.CharField(max_length=30)
    player = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    discord_chronicle = models.ForeignKey('chronicle', 
        on_delete=models.SET_NULL, null=True, blank=True)
    splat = models.IntegerField()
    date_created = models.DateField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    faceclaim = models.URLField(black=True, null=True)

    attributes = models.ManyToManyField('Stat', through='Attribute')
    skills = models.ManyToManyField('Stat', through='Skill')

    # EXP
    # Backgrounds
    # Merits
    # Flaws

class Stat(models.Model):
    name = models.CharField(max_length=50)
    game = models.CharField(max_length=50)
    description = models.TextField(blank=True)

class Attribute(models.Model):
    character = models.ForeignKey(Character, on_delete=models.CASCADE)
    stat = models.ForeignKey(Stat, on_delete=models.CASCADE)
    dots = models.IntegerField(default=1)

class Skill(models.Model):
    character = models.ForeignKey(Character, on_delete=models.CASCADE)
    stat = models.ForeignKey(Stat, on_delete=models.CASCADE)
    dots = models.IntegerField(default=0)