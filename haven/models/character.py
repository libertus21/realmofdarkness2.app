from django.db import models
from django.db.models import Q
from rod.settings import AUTH_USER_MODEL
from . import Splat, Virtue

class Attribute(models.Model):
    splat = models.ForeignKey("haven.Splat", on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=50, unique=True)  
    category = models.SlugField(max_length=50)
    referance = models.CharField(max_length=50, blank=True)
    description = models.TextField()

class Ability(models.Model):
    splat = models.ForeignKey("haven.Splat", on_delete=models.CASCADE)
    slug = models.SlugField(max_length=50, unique=True) 
    name = models.CharField(max_length=50)
    category = models.SlugField(max_length=50)
    referance = models.CharField(max_length=50, blank=True)
    description = models.TextField()

class AttributeLevel(models.Model):
    character = models.ForeignKey('haven.Character', on_delete=models.CASCADE)
    attribute = models.ForeignKey(Attribute, on_delete=models.CASCADE)
    level = models.IntegerField(default=1)

class AbilityLevel(models.Model):
    character = models.ForeignKey('haven.Character', on_delete=models.CASCADE)
    ability = models.ForeignKey(Ability, on_delete=models.CASCADE)
    level = models.IntegerField(default=0)

class CharacterManager(models.Manager):
    def create_character(self, splatSlug):
        try:
            splat = Splat.objects.get(slug=splatSlug)
        except Splat.DoesNotExist:
            # Someone is doing something they shouldn't be
            return

        char = self.create(splat=splat)
        char.save()

        # Now to assaign all the Default Foreign Keys
        attributes = Attribute.objects.filter(splat=splat)
        char.attributes.add(*attributes)

        abilities = Ability.objects.filter(splat=splat)
        char.abilities.add(*abilities)

        if (splatSlug == 'vampire20th'):
            self.create_vampire20th(char)

        print(char)
        return char
    
    def create_vampire20th(self, char):
        virtues = Virtue.objects.filter(Q(slug="conscience") | 
            Q(slug="selfControl") | Q(slug="courage"))
        
        char.virtue_set.add(*virtues)

class Character(models.Model):
    name = models.CharField(max_length=30, blank=True)
    # Bring back when auth is set up
    #player = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    #discord_chronicle = models.ForeignKey('chronicle', 
    #    on_delete=models.SET_NULL, null=True, blank=True)
    
    date_created = models.DateField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    faceclaim = models.URLField(blank=True, null=True)

    splat = models.ForeignKey(Splat, on_delete=models.CASCADE)

    attributes = models.ManyToManyField(Attribute, through=AttributeLevel)
    abilities = models.ManyToManyField(Ability, through=AbilityLevel)

    objects = CharacterManager()

    # EXP
    # Backgrounds
    # Merits
    # Flaws