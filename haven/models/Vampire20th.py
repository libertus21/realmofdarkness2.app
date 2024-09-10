from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from .Character5th import Character5th


class Vampire20th(Character5th):
    # Core
    clan = models.CharField(blank=True, max_length=50)
    clan_description = models.CharField(blank=True, max_length=2000)
    sire = models.CharField(max_length=50, blank=True)

    # Morality
    morality = models.CharField(default="Humanity", max_length=100)
    morality_description = models.CharField(blank=True, max_length=1000)

    # Humanity
    humanity = models.IntegerField(
        default=7, validators=[MinValueValidator(0), MaxValueValidator(10)]
    )
    blood_total = models.IntegerField(
        default=10, validators=[MinValueValidator(0), MaxValueValidator(10)]
    )
    blood_current = models.IntegerField(
        default=1, validators=[MinValueValidator(0), MaxValueValidator(100)]
    )

    # Profile
    date_of_death = models.CharField(blank=True, max_length=20)
    apparent_age = models.CharField(blank=True, max_length=20)
