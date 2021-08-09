from django import forms

class Vampire20thSheet(forms.Form):

    ############################## Core Info #################################
    name = forms.CharField(max_length=40)
    chronicle = forms.CharField(max_length=60)
    nature = forms.CharField(max_length=40)
    demeanor = forms.CharField(max_length=40)
    concept = forms.CharField(max_length=40)
    clan = forms.CharField(max_length=40)
    generation = forms.CharField(max_length=20)

    ############################ Attributes ##################################

    # Physical
    strength = forms.IntegerField(min_value=0, max_value=5)
    dexterity = forms.IntegerField(min_value=0, max_value=5)
    stamina = forms.IntegerField(min_value=0, max_value=5)

    # Social
    charisma = forms.IntegerField(min_value=0, max_value=5)
    manipulation = forms.IntegerField(min_value=0, max_value=5)
    appearance = forms.IntegerField(min_value=0, max_value=5)

    # Mental
    perception = forms.IntegerField(min_value=0, max_value=5)
    intelligence = forms.IntegerField(min_value=0, max_value=5)
    wits = forms.IntegerField(min_value=0, max_value=5)

    ############################ Abilities ##################################

    # Talents
    alertness = forms.IntegerField(min_value=0, max_value=5)
    athletics = forms.IntegerField(min_value=0, max_value=5)
    awareness = forms.IntegerField(min_value=0, max_value=5)
    brawl = forms.IntegerField(min_value=0, max_value=5)
    empathy = forms.IntegerField(min_value=0, max_value=5)
    expression = forms.IntegerField(min_value=0, max_value=5)
    intimidation = forms.IntegerField(min_value=0, max_value=5)
    leadership = forms.IntegerField(min_value=0, max_value=5)
    streetwise = forms.IntegerField(min_value=0, max_value=5)
    subterfuge = forms.IntegerField(min_value=0, max_value=5)

    # Skills
    animal_ken = forms.IntegerField(min_value=0, max_value=5)
    crafts = forms.IntegerField(min_value=0, max_value=5)
    drive = forms.IntegerField(min_value=0, max_value=5)
    etiquette = forms.IntegerField(min_value=0, max_value=5)
    firearms = forms.IntegerField(min_value=0, max_value=5)
    larceny = forms.IntegerField(min_value=0, max_value=5)
    melee = forms.IntegerField(min_value=0, max_value=5)
    performance = forms.IntegerField(min_value=0, max_value=5)
    stealth = forms.IntegerField(min_value=0, max_value=5)
    survival = forms.IntegerField(min_value=0, max_value=5)

    # Knowledges
    academics = forms.IntegerField(min_value=0, max_value=5)
    computer = forms.IntegerField(min_value=0, max_value=5)
    finance = forms.IntegerField(min_value=0, max_value=5)
    investigation = forms.IntegerField(min_value=0, max_value=5)
    law = forms.IntegerField(min_value=0, max_value=5)
    medicine = forms.IntegerField(min_value=0, max_value=5)
    occult = forms.IntegerField(min_value=0, max_value=5)
    politics = forms.IntegerField(min_value=0, max_value=5)
    science = forms.IntegerField(min_value=0, max_value=5)
    technology = forms.IntegerField(min_value=0, max_value=5)

    ############################ Virtues ##################################
    
    conscience = forms.IntegerField(min_value=0, max_value=5)
    self_control = forms.IntegerField(min_value=0, max_value=5)
    courage = forms.IntegerField(min_value=0, max_value=5)

    ############################ Dynamic ##################################

    # Specs
    # Disciplines
    # Backgrounds
    # Merits & Flaws


    ############################ Implied ##################################

    # Weakness
    # blood per turn
    # Bearing
    # Virtues