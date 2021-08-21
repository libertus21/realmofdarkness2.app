from django.db import models

class Game(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)


class Splat(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=50, unique=True)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    description = models.TextField(blank=True)