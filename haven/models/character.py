from django.db import models
from django.db.models import Q
from rod.settings import AUTH_USER_MODEL
from . import Splat, Virtue, Willpower20th, Health20th, BloodPool, Morality
from . import MoralityLevel

class Colour(models.Model):
    character = models.OneToOneField("Character", on_delete=models.CASCADE, 
        related_name='discord_colour')
    red = models.IntegerField(default=0)
    green = models.IntegerField(default=0)
    blue = models.IntegerField(default=0)

class Exp(models.Model):
    character = models.OneToOneField("Character", on_delete=models.CASCADE)
    total = models.IntegerField(default=0)
    current = models.IntegerField(default=0)

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

class History(models.Model):
    character = models.ForeignKey('haven.Character', on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    args = models.CharField(max_length=200, blank=True)
    notes = models.CharField(max_length=300, blank=True)
    mode = models.CharField(max_length=50, blank=True)

class CharacterManager(models.Manager):
    def create_character(self, splatSlug, user):
        try:
            splat = Splat.objects.get(slug=splatSlug)
        except Splat.DoesNotExist:
            # Someone is doing something they shouldn't be
            return

        char = self.create(player=user, splat=splat)
        char.save()

        colour = Colour(character=char).save()
        exp = Exp(character=char).save()

        # Now to assaign all the Default Foreign Keys
        #attributes = Attribute.objects.filter(splat=splat)
        #char.attributes.add(*attributes)

        #abilities = Ability.objects.filter(splat=splat)
        #char.abilities.add(*abilities)

        if "20th" in splatSlug:
            self.create_20th(char)

        if (splatSlug == 'vampire20th'):
            self.create_vampire20th(char)

        return char

    def create_20th(self, char):
        willpower = Willpower20th(character=char).save()
        health = Health20th(character=char).save()
        
    
    def create_vampire20th(self, char):
        blood = BloodPool(character=char).save()
       
        humanity = Morality.objects.get(slug='humanity')
        morality_level = MoralityLevel(character=char, morality=humanity).save()

        #virtues = Virtue.objects.filter(Q(slug="conscience") | 
        #    Q(slug="selfControl") | Q(slug="courage"))        
        #char.virtue_set.add(*virtues)



class Character(models.Model):
    name = models.CharField(max_length=50, blank=True)
    player = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    chronicle = models.ForeignKey('chronicle.Chronicle', 
        on_delete=models.SET_NULL, null=True)
    member = models.ForeignKey('chronicle.Member', on_delete=models.SET_NULL,
        null=True)
    
    date_created = models.DateField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    faceclaim = models.URLField(blank=True)
    
    splat = models.ForeignKey(Splat, on_delete=models.CASCADE)

    attributes = models.ManyToManyField(Attribute, through=AttributeLevel)
    abilities = models.ManyToManyField(Ability, through=AbilityLevel)

    objects = CharacterManager()
    
    class Meta:
        unique_together = ('name', 'player')