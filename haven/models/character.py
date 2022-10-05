from django.db import models
from django.db.models import Q
from json import dumps
from rod.settings import AUTH_USER_MODEL
from . import Splat, Health20th, Morality, MoralityInfo, Damage5th, Humanity, Hunter5th
from chronicle.models import Member, Chronicle
from bot.constants import Splats, Versions

class History(models.Model):
    character = models.ForeignKey('haven.Character', on_delete=models.CASCADE,
        related_name='history')
    date = models.DateTimeField(auto_now_add=True)
    args = models.CharField(max_length=250, blank=True)
    notes = models.CharField(max_length=150, blank=True)
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
        member = None

        if (guild_info['id']):
            try:
                guild = Chronicle.objects.get(pk=guild_info['id'])
                guild.name = guild_info['name']
                guild.icon_url = guild_info['iconURL']
                guild.save()
            except Chronicle.DoesNotExist:
                guild = Chronicle.objects.create(
                    id=guild_info['id'],
                    name=guild_info['name'],
                    icon_url=guild_info['iconURL']
                )

            # if this is a guild then the user is a Member
            try:
                member = Member.objects.get(chronicle=guild, user=user)
                member.display_name = guild_info['displayName']
                member.save()
            except Member.DoesNotExist:
                member = Member.objects.create(
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
            faceclaim=json.get('thumbnail', ''),
            theme=json['theme']
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
        elif (splatSlug == Splats.hunter5th.value):
            Trackable.objects.create(
                character=char,
                slug="desperation",
                current=json['desperation'],
            )
            Trackable.objects.create(
                character=char,
                slug="danger",
                current=json['danger'],
            )
            Hunter5th.objects.create(character=char, despair=json['despair'])            

        return char

class Character(models.Model):
    name = models.CharField(max_length=50, blank=True)
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    chronicle = models.ForeignKey('chronicle.Chronicle', 
        on_delete=models.SET_NULL, null=True)
    member = models.ForeignKey('chronicle.Member', on_delete=models.SET_NULL,
        null=True)
    
    partial = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    faceclaim = models.URLField(blank=True)
    theme = models.CharField(default='#000000', max_length=10)
    
    splat = models.ForeignKey(Splat, on_delete=models.CASCADE)

    objects = CharacterManager()
    
    class Meta:
        unique_together = ('name', 'user')
        indexes = [models.Index(fields=['name', 'user'])]