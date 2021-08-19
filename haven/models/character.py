from django.db import models
from rod.settings import AUTH_USER_MODEL

class Character(models.Model):
    name = models.CharField(max_length=30)
    # Bring back when auth is set up
    #player = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    discord_chronicle = models.ForeignKey('chronicle', 
        on_delete=models.SET_NULL, null=True, blank=True)
    
    date_created = models.DateField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    faceclaim = models.URLField(black=True, null=True)

    # needs to be forignKey field
    #splat = models.IntegerField()

    attributes = models.ManyToManyField('Attribute', through='AttributeLevel')
    skills = models.ManyToManyField('Ability', through='AbilityLevel')

    # EXP
    # Backgrounds
    # Merits
    # Flaws

class AttributeLevel(models.Model):
    character = models.ForeignKey(Character, on_delete=models.CASCADE)
    attribute = models.ForeignKey(Attribute, on_delete=models.CASCADE)
    level = models.IntegerField(default=1)

class AbilityLevel(models.Model):
    character = models.ForeignKey(Character, on_delete=models.CASCADE)
    ability = models.ForeignKey(Ability, on_delete=models.CASCADE)
    level = models.IntegerField(default=0)

class Attribute(models.Model):
    name = models.CharField(max_length=50)
    game = models.CharField(max_length=50)
    category = models.CharField(max_length=50)
    description = models.TextField()

class Ability(models.Model):
    name = models.CharField(max_length=50)
    game = models.CharField(max_length=50)
    category = models.CharField(max_length=50)
    description = models.TextField()