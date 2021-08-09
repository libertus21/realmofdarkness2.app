from django.db import models

class Version20(models.Model):
    character = models.OneToOneField('Character', on_delete=models.CASCADE)
    
    nature = models.ForeignKey('Nature', on_delete=models.SET_NULL, null=True)
    demeanor = models.ForeignKey('Demeanor', on_delete=models.SET_NULL, 
        null=True)

    willpower = models.OneToOneField('Willpower20th', on_delete=models.CASCADE)
    backgrounds = models.ManyToManyField('Backgrounds20th', 
        through='CharBackgrounds20th')
    health = models.OneToOneField('Health20th', on_delete=models.CASCADE)

class Nature(models.Model):
    name = models.CharField(max_length=40)
    description = models.TextField()

class Demeanor(models.Model):
    name = models.CharField(max_length=40)
    description = models.TextField()

class Willpower20th(models.Model):
    total = models.IntegerField(default=1)
    pool = models.IntegerField(default=1)

class Background20th(models.Model):
    name = models.CharField(max_length=40)
    description = models.TextField()

class CharBackground20th(models.Model):
    version20 = models.ForeignKey(Version20, on_delete=models.CASCADE)
    background = models.ForeignKey(Background20th, on_delete=models.CASCADE)
    dots = models.IntegerField(default=1)

class Health20th(models.Model):
    bashing = models.IntegerField(default=0)
    lethal = models.IntegerField(default=0)
    aggravated = models.IntegerField(default=0)