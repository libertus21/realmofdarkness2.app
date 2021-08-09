from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator 

class Vampire20th(models.Model):
    ########################### General Info ###############################

    concept = models.CharField(max_length=40, blank=True)
    clan = models.ForeignKey('Clan20th', on_delete=models.SET_NULL, null=True)
    generation = models.ForeignKey('Generation20th', on_delete=models.SET_NULL,
        null=True)
    sire = models.CharField(max_length=30, blank=True)

    # Humanity/Path
    # Blood Pool

    # Weakness
    # Virtues
    # Disciplines

class Clan20th(models.Model):
    pass

class Generation20th(models.Model):
    pass

class Discipline20th(models.Model):
    pass

class DisciplinePowers20th(models.Model):
    discipline = models.ForeignKey(Discipline20th, on_delete=models.CASCADE)

class CharDiscipline20th(models.Model):
    vamp = models.ForeignKey(Vampire20th, on_delete=models.CASCADE)
    discipline = models.ForeignKey(Discipline20th, on_delete=models.CASCADE)
    dots = models.IntegerField(default=1)
    powers = models.ManyToManyField(DisciplinePowers20th)