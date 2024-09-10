from django.db import models
from .character import Character


class Character20th(Character):

    # Willpower
    willpower_current = models.IntegerField(default=0)
    willpower_total = models.IntegerField(default=2)

    # Health
    health_bashing = models.IntegerField(default=0)
    health_lethal = models.IntegerField(default=0)
    health_aggravated = models.IntegerField(default=0)
    health_total = models.IntegerField(default=4)

    ################################# Attributes ###############################
    # Physical
    strength = models.IntegerField(default=1)
    dexterity = models.IntegerField(default=1)
    stamina = models.IntegerField(default=1)
    # Social
    charisma = models.IntegerField(default=1)
    manipulation = models.IntegerField(default=1)
    appearance = models.IntegerField(default=1)
    # Mental
    perception = models.IntegerField(default=1)
    intelligence = models.IntegerField(default=1)
    wits = models.IntegerField(default=1)

    ################################### Skills #################################
    # Talents
    alertness = models.IntegerField(default=0)
    athletics = models.IntegerField(default=0)
    awareness = models.IntegerField(default=0)
    brawl = models.IntegerField(default=0)
    empathy = models.IntegerField(default=0)
    expression = models.IntegerField(default=0)
    intimidation = models.IntegerField(default=0)
    leadership = models.IntegerField(default=0)
    streetwise = models.IntegerField(default=0)
    subterfuge = models.IntegerField(default=0)

    # Skills
    animal_ken = models.IntegerField(default=0)
    crafts = models.IntegerField(default=0)
    drive = models.IntegerField(default=0)
    etiquette = models.IntegerField(default=0)
    firearms = models.IntegerField(default=0)
    larceny = models.IntegerField(default=0)
    melee = models.IntegerField(default=0)
    performance = models.IntegerField(default=0)
    stealth = models.IntegerField(default=0)
    survival = models.IntegerField(default=0)

    # Knowledges
    academics = models.IntegerField(default=0)
    computer = models.IntegerField(default=0)
    finance = models.IntegerField(default=0)
    investigation = models.IntegerField(default=0)
    law = models.IntegerField(default=0)
    medicine = models.IntegerField(default=0)
    occult = models.IntegerField(default=0)
    politics = models.IntegerField(default=0)
    science = models.IntegerField(default=0)
    technology = models.IntegerField(default=0)

    ################################# Specialties ##############################
    # Physical
    strength_spec = models.JSONField(null=True)
    dexterity_spec = models.JSONField(null=True)
    stamina_spec = models.JSONField(null=True)

    # Social
    charisma_spec = models.JSONField(null=True)
    manipulation_spec = models.JSONField(null=True)
    appearance_spec = models.JSONField(null=True)

    # Mental
    perception_spec = models.JSONField(null=True)
    intelligence_spec = models.JSONField(null=True)
    wits_spec = models.JSONField(null=True)

    # Talents
    alertness_spec = models.JSONField(null=True)
    athletics_spec = models.JSONField(null=True)
    awareness_spec = models.JSONField(null=True)
    brawl_spec = models.JSONField(null=True)
    empathy_spec = models.JSONField(null=True)
    expression_spec = models.JSONField(null=True)
    intimidation_spec = models.JSONField(null=True)
    leadership_spec = models.JSONField(null=True)
    streetwise_spec = models.JSONField(null=True)
    subterfuge_spec = models.JSONField(null=True)

    # Skills
    animal_ken_spec = models.JSONField(null=True)
    crafts_spec = models.JSONField(null=True)
    drive_spec = models.JSONField(null=True)
    etiquette_spec = models.JSONField(null=True)
    firearms_spec = models.JSONField(null=True)
    larceny_spec = models.JSONField(null=True)
    melee_spec = models.JSONField(null=True)
    performance_spec = models.JSONField(null=True)
    stealth_spec = models.JSONField(null=True)
    survival_spec = models.JSONField(null=True)

    # Knowledges
    academics_spec = models.JSONField(null=True)
    computer_spec = models.JSONField(null=True)
    finance_spec = models.JSONField(null=True)
    investigation_spec = models.JSONField(null=True)
    law_spec = models.JSONField(null=True)
    medicine_spec = models.JSONField(null=True)
    occult_spec = models.JSONField(null=True)
    politics_spec = models.JSONField(null=True)
    science_spec = models.JSONField(null=True)
    technology_spec = models.JSONField(null=True)
