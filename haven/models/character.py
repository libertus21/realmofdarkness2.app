from django.db import models
from rod.settings import AUTH_USER_MODEL
from . import Splat, Health20th, Morality, MoralityInfo, Damage5th, Humanity, Hunter5th
from constants import Splats


class Trackable(models.Model):
    character = models.ForeignKey(
        "haven.Character", on_delete=models.CASCADE, related_name="trackable"
    )
    slug = models.SlugField()
    total = models.IntegerField(null=True)
    current = models.IntegerField(default=1)

    class Meta:
        unique_together = ("character", "slug")
        indexes = [models.Index(fields=["character", "slug"])]


class CharacterManager(models.Manager):
    def create_partial_character(self, user=None, guild=None, member=None, data=None):
        splat = Splat.objects.get(slug=data["splatSlug"])

        char = self.create(
            user=user,
            chronicle=guild,
            member=member,
            splat=splat,
            name=data["name"],
            theme=data["theme"],
        )

        if data["splatSlug"] == Splats.hunter5th.slug:
            create_5th_partials(char, data)
            create_hunter5th_partial(char, data)
        elif data["splatSlug"] == Splats.mortal5th.slug:
            create_5th_partials(char, data)
            create_mortal5th_partial(char, data)

        elif data["splatSlug"] == Splats.human20th.slug:
            create_20th_partials(char, data)
            create_human20th_partial(char, data)
        elif data["splatSlug"] == Splats.ghoul20th.slug:
            create_20th_partials(char, data)
            create_ghoul20th_partial(char, data)
        elif data["splatSlug"] == Splats.changeling20th.slug:
            create_20th_partials(char, data)
            create_changeling20th_partial(char, data)
        elif data["splatSlug"] == Splats.werewolf20th.slug:
            create_20th_partials(char, data)
            create_werewolf20th_partial(char, data)
        elif data["splatSlug"] == Splats.mage20th.slug:
            create_20th_partials(char, data)
            create_mage20th_partial(char, data)
        elif data["splatSlug"] == Splats.wraith20th.slug:
            create_20th_partials(char, data)
            create_wraith20th_partial(char, data)
        elif data["splatSlug"] == Splats.demonTF.slug:
            create_20th_partials(char, data)
            create_demonDT_partial(char, data)

        Trackable.objects.create(
            character=char,
            slug="exp",
            total=data["exp"]["total"],
            current=data["exp"]["current"],
        )
        return char


class SheetStatus(models.IntegerChoices):
    DRAFT = 1, "Draft"
    REVIEW = 2, "Review"
    ACTIVE = 3, "Active"
    DEAD = 4, "Dead"
    ARCHIVE = 5, "Archive"


class Character(models.Model):
    name = models.CharField(max_length=50, blank=True)
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    chronicle = models.ForeignKey(
        "chronicle.Chronicle", on_delete=models.SET_NULL, null=True
    )
    member = models.ForeignKey("chronicle.Member", on_delete=models.SET_NULL, null=True)

    is_sheet = models.BooleanField(default=False)
    status = models.IntegerField(choices=SheetStatus.choices, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    avatar = models.ImageField(upload_to="char_avatars/", blank=True)
    theme = models.CharField(default="#000000", max_length=10)

    # Experiance
    exp_current = models.IntegerField(default=0)
    exp_total = models.IntegerField(default=0)
    exp_spends = models.JSONField(default=list)

    # Profile
    date_of_birth = models.CharField(blank=True, max_length=20)
    age = models.CharField(blank=True, max_length=20)
    history = models.TextField(blank=True, max_length=6000)
    appearance = models.TextField(blank=True, max_length=1000)

    notes = models.TextField(blank=True, max_length=6000)
    notes2 = models.TextField(blank=True, max_length=6000)

    # Splat is a remenant of old system once all are converted splat should be replaced with splat_new
    splat = models.ForeignKey(Splat, on_delete=models.CASCADE, null=True)
    splat_new = models.CharField(max_length=50, blank=True, null=True)

    # Story Teller Lock will stop the player from making non-tracker edits to their sheet.
    st_lock = models.BooleanField(default=False)

    objects = CharacterManager()

    class Meta:
        unique_together = ("name", "user")
        indexes = [models.Index(fields=["name", "user"])]


########################## Create Version Specific Partials ###################
def create_5th_partials(char, data):
    Damage5th.objects.create(
        character=char,
        slug="willpower",
        total=data["willpower"]["total"],
        superficial=data["willpower"]["superficial"],
        aggravated=data["willpower"]["aggravated"],
    )
    Damage5th.objects.create(
        character=char,
        slug="health",
        total=data["health"]["total"],
        superficial=data["health"]["superficial"],
        aggravated=data["health"]["aggravated"],
    )


def create_20th_partials(char, data):
    Trackable.objects.create(
        character=char,
        slug="willpower",
        total=data["willpower"]["total"],
        current=data["willpower"]["current"],
    )
    Health20th.objects.create(
        character=char,
        slug="health",
        total=data["health"]["total"],
        bashing=data["health"]["bashing"],
        lethal=data["health"]["lethal"],
        aggravated=data["health"]["aggravated"],
    )


######################## Create 5th edition partials ##########################
def create_hunter5th_partial(char, data):
    Trackable.objects.create(
        character=char,
        slug="desperation",
        current=data["desperation"],
    )
    Trackable.objects.create(
        character=char,
        slug="danger",
        current=data["danger"],
    )
    Hunter5th.objects.create(character=char, despair=data["despair"])


def create_mortal5th_partial(char, data):
    Humanity.objects.create(
        character=char, current=data["humanity"], stains=data["stains"]
    )


########################## Create 20th edition paritals #######################
def create_human20th_partial(char, data):
    Trackable.objects.create(
        character=char,
        slug="blood",
        current=data["blood"],
    )
    humanity = MoralityInfo.objects.get(slug="humanity")
    Morality.objects.create(
        character=char,
        morality_info=humanity,
        current=data["morality"],
    )


def create_ghoul20th_partial(char, data):
    Trackable.objects.create(
        character=char,
        slug="blood",
        current=data["blood"],
    )
    humanity = MoralityInfo.objects.get(slug="humanity")
    Morality.objects.create(
        character=char,
        morality_info=humanity,
        current=data["morality"],
    )
    Trackable.objects.create(
        character=char,
        slug="vitae",
        current=data["vitae"],
    )


def create_werewolf20th_partial(char, data):
    Trackable.objects.create(
        character=char,
        slug="rage",
        total=data["rage"]["total"],
        current=data["rage"]["current"],
    )
    Trackable.objects.create(
        character=char,
        slug="gnosis",
        total=data["gnosis"]["total"],
        current=data["gnosis"]["current"],
    )


def create_changeling20th_partial(char, data):
    Trackable.objects.create(
        character=char,
        slug="glamour",
        total=data["glamour"]["total"],
        current=data["glamour"]["current"],
    )
    Trackable.objects.create(
        character=char,
        slug="banality",
        total=data["banality"]["total"],
        current=data["banality"]["current"],
    )
    Trackable.objects.create(
        character=char,
        slug="nightmare",
        current=data["nightmare"],
    )
    Trackable.objects.create(
        character=char,
        slug="imbalance",
        current=data["imbalance"],
    )
    Health20th.objects.create(
        character=char,
        slug="chimerical",
        total=data["chimerical"]["total"],
        bashing=data["chimerical"]["bashing"],
        lethal=data["chimerical"]["lethal"],
        aggravated=data["chimerical"]["aggravated"],
    )


def create_mage20th_partial(char, data):
    Trackable.objects.create(
        character=char,
        slug="arete",
        current=data["arete"],
    )
    Trackable.objects.create(
        character=char,
        slug="quint_paradox",
        total=data["quintessence"],
        current=data["paradox"],
    )


def create_wraith20th_partial(char, data):
    Trackable.objects.create(
        character=char,
        slug="corpus",
        total=data["corpus"]["total"],
        current=data["corpus"]["current"],
    )
    Trackable.objects.create(
        character=char,
        slug="pathos",
        current=data["pathos"],
    )


def create_demonDT_partial(char, data):
    Trackable.objects.create(
        character=char,
        slug="faith",
        total=data["faith"]["total"],
        current=data["faith"]["current"],
    )
    Trackable.objects.create(
        character=char,
        slug="torment",
        total=data["torment"]["total"],
        current=data["torment"]["current"],
    )
