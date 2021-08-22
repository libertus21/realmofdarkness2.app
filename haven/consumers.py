import json
from channels.generic.websocket import WebsocketConsumer
from haven.models import Character, AttributeLevel, AbilityLevel, VirtueLevel,\
    Discipline20th, Discipline20thLevel, Background20th, CharBackground20th

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
                attr = AttributeLevel.objects.get(
                    character=char_pk, attribute__slug=value["slug"])
                if not attr: return
                attr.level = value["level"]
                attr.save()
            if (key == "abilityLevel"):
                abil = AbilityLevel.objects.get(
                    character=char_pk, ability__slug=value["slug"])
                if not abil: return
                abil.level = value["level"]
                abil.save()
            if (key == "virtueLevel"):
                virtue = VirtueLevel.objects.get(
                    character=char_pk, virtue__slug=value["slug"])
                if not virtue: return
                virtue.level = value["level"]
                virtue.save()
            if (key == "disciplines_v20"):
                disc_level = Discipline20thLevel.objects.filter(
                    character=char_pk, 
                    discipline__slug=value["slug"]
                )
                if (value.get("wasRemoved", False) and disc_level):
                    disc_level.delete()
                    break
                elif (disc_level):
                    disc_level[0].level = value["level"]
                    disc_level[0].save()
                else:
                    char = Character.objects.get(pk=char_pk)
                    disc = Discipline20th.objects.get(slug=value["slug"])
                    disc.characters.add(char)
                    disc_level = Discipline20thLevel.objects.get(
                    character=char_pk, 
                    discipline__slug=value["slug"])
                    disc_level.level = value["level"]
                    disc_level.save()
            if (key == "backgrounds_v20"):
                print("entered")
                bg_level = CharBackground20th.objects.filter(
                    character=char_pk, 
                    background__slug=value["slug"]
                )
                if (value.get("wasRemoved", False) and bg_level):
                    bg_level.delete()
                    print("removed")
                    break
                elif (bg_level):
                    bg_level[0].level = value["level"]
                    bg_level[0].save()
                    print("bg_level")
                else:
                    char = Character.objects.get(pk=char_pk)
                    bg = Background20th.objects.get(slug=value["slug"])
                    bg.characters.add(char)
                    bg_level = CharBackground20th.objects.get(
                    character=char_pk, 
                    background__slug=value["slug"])
                    bg_level.level = value["level"]
                    bg_level.save()
                    print("saved")               


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

def prepare_backgrounds():
    bg_set = Background20th.objects.all()
    bgs = {}

    for bg in bg_set:
        bgs[bg.slug] = {
            "name": bg.name,
            "slug": bg.slug,
            "refernace": bg.referance,
            "description": bg.description
        }
    return bgs

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

    ##################### Backgrounds ######################

    bgs = CharBackground20th.objects.filter(
            character=character
        ).select_related("background")

    backgrounds_v20 = {}

    for bg_level in bgs:
        bg = bg_level.background
        backgrounds_v20[bg.slug] = {"slug": bg.slug,
            "level": bg_level.level}
    
    ##################### Vampire ######################
    char = {
        "pk": str(character.id),
        "name": character.name,
        "attributes": attributes,
        "abilities": abilities,
        "backgroundOptions": prepare_backgrounds(),
        "backgrounds_v20": backgrounds_v20,
    }
    
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

        disciplines = Discipline20thLevel.objects.filter(
            character=character
        ).select_related("discipline")

        disciplines_v20 = {}

        for discipline_level in disciplines:
            discipline = discipline_level.discipline

            disciplines_v20[discipline.slug] = {"slug": discipline.slug,
                "level": discipline_level.level}
    
        char["virtues"] = virtues            
        char["disciplineOptions"] = prepare_disciplines()
        char["disciplines_v20"] = disciplines_v20

    return char