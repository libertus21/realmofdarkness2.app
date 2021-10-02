from django.db import models
"""
class Clan20th(models.Model):
    pass

class Generation20th(models.Model):
    pass

class Discipline20thLevel(models.Model):
    character = models.ForeignKey('haven.Character', on_delete=models.CASCADE)
    discipline = models.ForeignKey('haven.Discipline20th', on_delete=models.CASCADE)
    level = models.IntegerField(default=1)

class Discipline20th(models.Model):
    characters = models.ManyToManyField('haven.Character', 
        through=Discipline20thLevel)
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=50, unique=True)
    referance = models.CharField(max_length=50, blank=True)
    description = models.TextField()

class DisciplinePowers20th(models.Model):
    discipline = models.ForeignKey(Discipline20th, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=50, unique=True)
    referance = models.CharField(max_length=50, blank=True)
    description = models.TextField()
    system = models.TextField()

class Path20th(models.Model):
    discipline = models.ForeignKey(Discipline20th, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=50, unique=True)
    referance = models.CharField(max_length=50, blank=True)
    description = models.TextField()

class PathPowers20th(models.Model):
    discipline = models.ForeignKey(Discipline20th, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=50, unique=True)
    referance = models.CharField(max_length=50, blank=True)
    description = models.TextField()
    system = models.TextField()

class Rituals20th(models.Model):
    discipline = models.ForeignKey(Discipline20th, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=50, unique=True)
    referance = models.CharField(max_length=50, blank=True)
    description = models.TextField()

class VirtueLevel(models.Model):
    character = models.ForeignKey('haven.Character', on_delete=models.CASCADE)
    virtue = models.ForeignKey('haven.Virtue', on_delete=models.CASCADE)
    level = models.IntegerField(default=1)

class Virtue(models.Model):
    characters = models.ManyToManyField('haven.Character', through=VirtueLevel)
    slug = models.SlugField(max_length=50, unique=True) 
    name = models.CharField(max_length=50)
    referance = models.CharField(max_length=50, blank=True)
    description = models.TextField()

class BloodPool(models.Model):
    character = models.OneToOneField('haven.Character', on_delete=models.CASCADE)
    total = models.IntegerField(default=10)
    current = models.IntegerField(default=10)

class VitaePool(models.Model):
    character = models.OneToOneField('haven.Character', on_delete=models.CASCADE)
    total = models.IntegerField(default=5)
    current = models.IntegerField(default=1)
"""
class Morality(models.Model):
    character = models.OneToOneField('haven.Character', on_delete=models.CASCADE)
    morality = models.ForeignKey('MoralityInfo', on_delete=models.CASCADE)
    current = models.IntegerField(default=7)

class MoralityInfo(models.Model):
    slug = models.SlugField(max_length=50, unique=True) 
    name = models.CharField(max_length=50, unique=True)
    conviction = models.BooleanField(default=False)
    instinct = models.BooleanField(default=False)
    referance = models.CharField(max_length=50, blank=True)
