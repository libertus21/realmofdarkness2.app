from django.db import models
"""
class Nature(models.Model):
    characters = models.ManyToManyField('haven.Character')
    name = models.CharField(max_length=40)
    slug = models.SlugField(max_length=50, unique=True)
    referance = models.CharField(max_length=50, blank=True)
    description = models.TextField()

class Demeanor(models.Model):
    characters = models.ManyToManyField('haven.Character')
    name = models.CharField(max_length=40)
    slug = models.SlugField(max_length=50, unique=True)
    referance = models.CharField(max_length=50, blank=True)
    description = models.TextField()

class Background20th(models.Model):
    characters = models.ManyToManyField('haven.Character', 
        through="haven.CharBackground20th")
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=50, unique=True)
    referance = models.CharField(max_length=50, blank=True)
    description = models.TextField()

class CharBackground20th(models.Model):
    character = models.ForeignKey('haven.Character', on_delete=models.CASCADE)
    background = models.ForeignKey(Background20th, on_delete=models.CASCADE)
    level = models.IntegerField(default=1)

class Willpower20th(models.Model):
    character = models.OneToOneField('haven.Character', on_delete=models.CASCADE)
    total = models.IntegerField(default=1)
    current = models.IntegerField(default=1)

class Health20th(models.Model):
    character = models.ForeignKey('haven.Character', on_delete=models.CASCADE)
    slug = models.SlugField()
    total = models.IntegerField(default=7)
    bashing = models.IntegerField(default=0)
    lethal = models.IntegerField(default=0)
    aggravated = models.IntegerField(default=0)
"""

