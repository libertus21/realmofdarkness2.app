from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from .Character5th import Character5th

class Werewolf5th(Character5th):
  rage = models.IntegerField(
    default=1, validators=[MinValueValidator(0), MaxValueValidator(5)])
  crinos = models.BooleanField(default=False)