import json
from channels.generic.websocket import WebsocketConsumer
from haven.models import Character, AttributeLevel, AbilityLevel, VirtueLevel,\
    Discipline20th

class CharacterConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        print(f"Connection disconnected: {close_code}")

    def receive(self, text_data):
        print(text_data)
        try:
            js = json.loads(text_data)
        except json.JSONDecodeError:
            #someone is doing something they shouldent
            print("Error Log: Not Json")
            return

        self.handle_request(js)        
        
    def handle_request(self, request):
        if (request['request'] == "loadCharacter"):
            self.send(text_data=load_character(int(request['pk'])))
        elif (request['request'] == "updateCharacter"):
            self.handle_update(request["update"], int(request["pk"]))

    def handle_update(self, update, char_pk):
        for key, value in update.items():
            if (key == "attributeLevel"):
                attr = AttributeLevel.objects.filter(
                    character=char_pk, attribute__slug=value["slug"])
                if not attr: return
                attr = attr[0]
                attr.level = value["level"]
                attr.save()
            if (key == "abilityLevel"):
                abil = AbilityLevel.objects.filter(
                    character=char_pk, ability__slug=value["slug"])
                if not abil: return
                abil = abil[0]
                abil.level = value["level"]
                abil.save()
            if (key == "virtueLevel"):
                virtue = VirtueLevel.objects.filter(
                    character=char_pk, virtue__slug=value["slug"])
                if not virtue: return
                virtue = virtue[0]
                virtue.level = value["level"]
                virtue.save()             

def load_character(character_pk):
    response = {
        "request": "loadCharacter",
        "character": prepare_character(character_pk),
    }

    return json.dumps(response)

def prepare_disciplines():
    disc_set = Discipline20th.objects.all()
    disciplines = {}

    for disc in disc_set:
        disciplines[disc.slug] = {
            "name": disc.name,
            "slug": disc.slug,
            "refernace": disc.referance,
            "description": disc.description
        }
    return disciplines

def prepare_character(character_pk):
    try:
        character = Character.objects.get(pk=character_pk)
    except Character.DoesNotExist:
        print("Someone is doing something wrong")
        return    

    ##################### Attributes ######################
    attributes_set = AttributeLevel.objects.filter(
        character=character).select_related('attribute')
    attributes = {}

    for attribute_level in attributes_set:
        attribute = attribute_level.attribute

        if not attributes.get(attribute.category, 0):
            attributes[attribute.category] = {}
        
        attributes[attribute.category][attribute.slug] = {
            "name": attribute.name,
            "slug": attribute.slug,
            "description": attribute.description,
            "level": attribute_level.level
        }

    ##################### Abilities ######################
    abilities_set = AbilityLevel.objects.filter(
        character=character).select_related('ability')
    abilities = {}

    for ability_level in abilities_set:
        ability = ability_level.ability

        if not abilities.get(ability.category, 0):
            abilities[ability.category] = {}
        
        abilities[ability.category][ability.slug] = {
            "name": ability.name,
            "slug": ability.slug,
            "description": ability.description,
            "level": ability_level.level
        }
    
    ##################### Vampire ######################
    if (character.splat.slug == 'vampire20th'):        
        virtues_set = VirtueLevel.objects.filter(
            character=character).select_related('virtue')
        virtues = {}

        for virtue_level in virtues_set:
            virtue = virtue_level.virtue

            virtues[virtue.slug] = {
                "name": virtue.name,
                "slug": virtue.slug,
                "description": virtue.description,
                "level": virtue_level.level
            }
    
        char = {
            "pk": str(character.id),
            "name": character.name,
            "attributes": attributes,
            "abilities": abilities,
            "virtues": virtues,            
            "disciplineOptions": prepare_disciplines(),
        }

    else:
        char = {
            "pk": str(character.id),
            "name": character.name,
            "attributes": attributes,
            "abilities": abilities,
        }

    return char