from django.db import models
from django.db.models import Q
from json import dumps
from rod.settings import AUTH_USER_MODEL
from . import Splat, Health20th, Morality, MoralityInfo, Damage5th, Humanity
from chronicle.models import Member, Chronicle
from bot.constants import Splats, Versions

"""
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

class Exp(models.Model):
    character = models.OneToOneField("Character", on_delete=models.CASCADE)
    total = models.IntegerField(default=0)
    current = models.IntegerField(default=0)
"""

class Colour(models.Model):
    character = models.OneToOneField("haven.Character", on_delete=models.CASCADE)
    red = models.IntegerField(default=0)
    green = models.IntegerField(default=0)
    blue = models.IntegerField(default=0)

class History(models.Model):
    character = models.ForeignKey('haven.Character', on_delete=models.CASCADE,
        related_name='history')
    date = models.DateField(auto_now_add=True)
    args = models.CharField(max_length=400, blank=True)
    notes = models.CharField(max_length=300, blank=True)
    mode = models.CharField(max_length=50, blank=True)

class Trackable(models.Model):
    character = models.ForeignKey('haven.Character', on_delete=models.CASCADE,
        related_name='trackable')
    slug = models.SlugField()
    total = models.IntegerField(null=True)
    current = models.IntegerField(default=1)
    
    class Meta:
        unique_together = ('character', 'slug')
        indexes = [models.Index(fields=['character', 'slug'])]

class CharacterManager(models.Manager):
    def create_partial_character(self, splatSlug, user, json, guild_info):
        splat = Splat.objects.get(slug=splatSlug)
        guild = None
        
        if (guild_info['id']):
            guild, created = Chronicle.objects.update_or_create(
                id=guild_info['id'],
                name=guild_info['name'],
                icon_url=guild_info['iconURL']
            )

            # if this is a guild then the user is a Member
            member, created = Member.objects.update_or_create(
                chronicle=guild, 
                user=user, 
                display_name=guild_info['displayName']
            )
        
        char = self.create(
            user=user,
            chronicle=guild,
            member=member,
            splat=splat,
            name=json['name'],
            faceclaim=json.get('thumbnail', '')
        )

        historyList = []
        for history in json['history']:
            if (history.get('id', None)):
                continue
            historyList.append(History(
                character=char,
                args=dumps(history.get('args', '')),
                notes=history.get('notes', ''),
                mode=history['mode']
            ))
        History.objects.bulk_create(historyList)

        Colour.objects.create(
            character=char, 
            red=json['colour'][0],
            green=json['colour'][1],
            blue=json['colour'][2]
        )
        Trackable.objects.create(character=char, slug="exp",
            total=json['exp']['total'], current=json['exp']['current'])

        if Versions.v20.value == json['version']:
            Trackable.objects.create(
                character=char, 
                slug="willpower",
                total=json['willpower']['total'], 
                current=json['willpower']['current']
            )
            Health20th.objects.create(
                character=char, 
                slug="health",
                total=json['health']['total'],
                bashing=json['health']['bashing'],
                lethal=json['health']['lethal'],
                aggravated=json['health']['aggravated']
            )
        elif Versions.v5.value == json['version']:
            Damage5th.objects.create(
                character=char, 
                slug='willpower',
                total=json['willpower']['total'],
                superficial=json['willpower']['superficial'],
                aggravated=json['willpower']['aggravated'],
            )
            Damage5th.objects.create(
                character=char, 
                slug='health',
                total=json['health']['total'],
                superficial=json['health']['superficial'],
                aggravated=json['health']['aggravated'],
            )

        if (splatSlug == Splats.vampire20th.value):
            Trackable.objects.create(
                character=char, 
                slug="blood",
                total=json['blood']['total'], 
                current=json['blood']['current']
            )       
            morality = MoralityInfo.objects.get(slug=json['morality']['name'])
            Morality.objects.create(
                character=char, 
                morality_info=morality,
                current=json['morality']['current']
            )

        elif (splatSlug == Splats.human20th.value or splatSlug == Splats.ghoul20th.value):
            Trackable.objects.create(
                character=char, 
                slug="blood",
                current=json['blood'],
            )       
            humanity = MoralityInfo.objects.get(slug='humanity')
            Morality.objects.create(
                character=char, 
                morality_info=humanity,
                current=json['morality'],
            )
            if (splatSlug == Splats.ghoul20th.value):
                Trackable.objects.create(
                    character=char, 
                    slug="vitae",
                    current=json['vitae'],
                )
        
        elif (splatSlug == Splats.changeling20th.value):
            Trackable.objects.create(
                character=char, 
                slug="glamour",
                total=json['glamour']['total'],
                current=json['glamour']['current']
            )
            Trackable.objects.create(
                character=char, 
                slug="banality",
                total=json['banality']['total'],
                current=json['banality']['current'],
            )
            Trackable.objects.create(
                character=char, 
                slug="nightmare",
                current=json['nightmare'],
            )
            Trackable.objects.create(
                character=char, 
                slug="imbalance",
                current=json['imbalance'],
            )
            Health20th.objects.create(
                character=char, 
                slug="chimerical",                
                total=json['chimerical']['total'],
                bashing=json['chimerical']['bashing'],
                lethal=json['chimerical']['lethal'],
                aggravated=json['chimerical']['aggravated']
            )

        elif (splatSlug == Splats.werewolf20th.value):
            Trackable.objects.create(
                character=char, 
                slug="rage",
                total=json['rage']['total'],
                current=json['rage']['current'],
            )
            Trackable.objects.create(
                character=char, 
                slug="gnosis",
                total=json['gnosis']['total'],
                current=json['gnosis']['current'],
            )

        elif (splatSlug == Splats.mage20th.value):
            Trackable.objects.create(
                character=char, 
                slug="arete",
                current=json['arete'],
            )
            Trackable.objects.create(
                character=char, 
                slug="quint_paradox",
                total=json['quint_paradox']['total'],
                current=json['quint_paradox']['current'],
            )
        
        elif (splatSlug == Splats.wraith20th.value):
            Trackable.objects.create(
                character=char, 
                slug="corpus",
                total=json['corpus']['total'],
                current=json['corpus']['current'],
            )
            Trackable.objects.create(
                character=char, 
                slug="pathos",                
                current=json['pathos'],
            )

        elif (splatSlug == Splats.demonTF.value):
            Trackable.objects.create(
                character=char, 
                slug="faith",
                total=json['faith']['total'],
                current=json['faith']['current'],
            )
            Trackable.objects.create(
                character=char, 
                slug="torment",
                total=json['torment']['total'],
                current=json['torment']['current'],
            )

        elif (splatSlug == Splats.vampire5th.value or splatSlug == Splats.mortal5th.value):
            Humanity.objects.create(
                character=char,
                current=json['humanity']['total'],
                stains=json['humanity']['stains']
            )
            if (splatSlug == Splats.vampire5th.value):
                Trackable.objects.create(
                    character=char, 
                    slug="hunger",
                    current=json['hunger'],
                )

        

        return char

    def create_full_character(self, splatSlug, user):
        try:
            splat = Splat.objects.get(slug=splatSlug)
        except Splat.DoesNotExist:
            # Someone is doing something they shouldn't
            return

        char = self.create(user=user, splat=splat)

        colour = Colour.objects.create(character=char)
        exp = Trackable.objects.create(character=char)

        # Now to assaign all the Default Foreign Keys
        #attributes = Attribute.objects.filter(splat=splat)
        #char.attributes.add(*attributes)

        #abilities = Ability.objects.filter(splat=splat)
        #char.abilities.add(*abilities)

        if Versions.v20.value in splatSlug:
            pass

        if (splatSlug == Splats.vampire20th.value):
            pass
            #virtues = Virtue.objects.filter(Q(slug="conscience") | 
            #    Q(slug="selfControl") | Q(slug="courage"))        
            #char.virtue_set.add(*virtues)

class Character(models.Model):
    name = models.CharField(max_length=50, blank=True)
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    chronicle = models.ForeignKey('chronicle.Chronicle', 
        on_delete=models.SET_NULL, null=True)
    member = models.ForeignKey('chronicle.Member', on_delete=models.SET_NULL,
        null=True)
    
    partial = models.BooleanField(default=True)
    date_created = models.DateField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    faceclaim = models.URLField(blank=True)
    
    splat = models.ForeignKey(Splat, on_delete=models.CASCADE)

    #attributes = models.ManyToManyField(Attribute, through=AttributeLevel)
    #abilities = models.ManyToManyField(Ability, through=AbilityLevel)

    objects = CharacterManager()
    
    class Meta:
        unique_together = ('name', 'user')
        indexes = [models.Index(fields=['name', 'user'])]