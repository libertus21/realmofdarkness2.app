from django.db import models
from haven.models import Character5th

class Clan(models.IntegerChoices):
  CUSTOM = 1, 'Custom'
  BANU_HAQIM = 2, 'Banu Haqim'
  BRUJAH = 3, 'Brujah'
  GANGREL = 4, 'Gangrel'
  HECATA = 5, 'Hecata'
  LASOMBRA = 6, 'Lasombra'
  MALKAVIAN = 7, 'Malkavian'
  MINISTRY = 8, 'Ministry'
  NOSFERATU = 9, 'Nosferatu'
  RAVNOS = 10, 'Ravnos'
  SALUBRI = 11, 'Salubri'
  TOREADOR = 12, 'Toreador'
  TREMERE = 13, 'Tremere'
  TZIMISCE = 14, 'Tzimisce'
  VENTRUE = 15, 'Ventrue'

class PredatorType(models.IntegerChoices):
  CUSTOM = 1, 'Custom'
  ALLEYCAT = 2, 'Alleycat'
  BLOOD_LEECH = 3, 'Blood Leech'
  CLEAVER = 4, 'Cleaver'
  CONSENSUALIST = 5, 'Consensualist'
  FARMER = 6, 'Farmer'
  OSIRIS = 7, 'Osiris'
  SANDMAN = 8, 'Sandman'
  SCENE_QUEEN = 9, 'Scene Queen'
  SIREN = 10, 'Siren'
  EXTORTIONIST = 11, 'Extortionist'
  GRAVEROBBER = 12, 'Graverobber'
  ROADSIDE_KILLER = 13, 'Roadside Killer'
  GRIM_REAPER = 14, 'Grim Reaper'
  MONTERO = 15, 'Montero'
  PURSUER = 16, 'Pursuer'
  TRAPDOOR = 17, 'Trapdoor'


class Vampire5th(Character5th):
  # Core
  clan = models.IntegerField(choices=Clan.choices, null=True)
  sire = models.CharField(max_length=50, blank=True)
  generation = models.IntegerField(null=True)
  predator_type = models.IntegerField()

  # Humanity
  humanity = models.IntegerField(default=7)
  stains = models.IntegerField(default=0)

  hunger = models.IntegerField(default=1)
  blood_potency = models.IntegerField(default=1)


class CustomClan(models.Model):
  vampire = models.OneToOneField(Vampire5th, on_delete=models.CASCADE)
  name = models.CharField(max_length=50)
  description = models.TextField(blank=True)

class CustomPredatorType(models.Model):
  vampire = models.OneToOneField(Vampire5th, on_delete=models.CASCADE)
  name = models.CharField(max_length=50)
  description = models.TextField(blank=True)