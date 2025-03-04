import json as JSON
from channels.generic.websocket import AsyncWebsocketConsumer
from .serializers import serialize_user, serialize_chronicle
from .serializers import serialize_member
from .constants import GATEWAY_OPCODE, Group
from haven.models import Character
from chronicle.models import Member
from channels.db import database_sync_to_async
import logging
from django.db.models import Q
from haven.utility import get_derived_instance, get_tracker_serializer

logger = logging.getLogger("DEBUG")
log = logging.getLogger()


class GatewayConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.characters = None
        self.chronicles = None
        self.members = None
        self.user = None
        self.subscriptions = set()
        self.sheetSubscription = None
        self.subscribed_character_ids = set()

    async def connect(self):
        """
        Handle websocket connection - accept connection and initialize data if user is authenticated
        """
        await self.accept()
        self.user = self.scope["user"]
        if not self.user.is_anonymous:
            await self.init_data()

        for subscription in self.subscriptions:
            await self.channel_layer.group_add(subscription, self.channel_name)
        await self.send(text_data=GatewayMessage().welcome())

    async def disconnect(self, close_code):
        """
        Handle websocket disconnect - cleanup subscriptions
        """
        for subscription in self.subscriptions:
            await self.channel_layer.group_discard(subscription, self.channel_name)
        self.subscriptions.clear()
        self.subscribed_character_ids.clear()
        self.sheetSubscription = None

    async def receive(self, text_data=None):
        """
        Handle messages from the websocket
        """
        gateway = await GatewayMessage().loadJson(text_data)

        if gateway.getOpcode() == GATEWAY_OPCODE.identify:
            data = {
                "characters": self.characters,
                "chronicles": self.chronicles,
                "members": self.members,
            }
            await self.send(text_data=GatewayMessage().ready(self.user, data))

        elif gateway.getOpcode() == GATEWAY_OPCODE.request:
            if gateway.getEvent() == "sheet_subscribe":
                id = gateway.getData().get("id", None)
                if id:
                    self.sheetSubscription = id
                else:
                    self.sheetSubscription = None

    async def character_update(self, event):
        """
        Handle character update events
        Check visibility permissions before sending data to client
        """
        chronicle = event["tracker"].get("chronicle", None)
        is_visible = (int(chronicle) if chronicle else 0) in self.chronicles
        if str(event["tracker"]["user"]) != str(self.user.id) and not is_visible:
            return await self.character_delete(event)

        sub = None
        if (
            self.sheetSubscription
            and self.sheetSubscription in self.subscribed_character_ids
        ):
            sub = self.sheetSubscription
        await self.send(text_data=GatewayMessage().update_character(event, sub))

    async def member_update(self, event):
        await self.send(text_data=GatewayMessage().update_member(event))

    async def user_update(self, event):
        await self.send(text_data=GatewayMessage().update_user(event))

    async def chronicle_update(self, event):
        await self.send(text_data=GatewayMessage().update_chronicle(event))

    async def character_new(self, event):
        """
        Handle new character creation events
        Add character to subscriptions if user has permission to see it
        """
        if await self.verify_new_character(event["tracker"]):
            sub = Group.character_update(event["id"])
            await self.channel_layer.group_add(sub, self.channel_name)
            self.character_subscribe(event["id"])
            await self.send(text_data=GatewayMessage().update_character(event, None))

    async def character_delete(self, event):
        """
        Handle character deletion events
        Remove character from subscriptions and notify client
        """
        id = str(event.get("id"))
        if id not in self.subscribed_character_ids:
            return
        self.subscribed_character_ids.remove(id)
        self.subscriptions.remove(Group.character_update(id))
        await self.channel_layer.group_discard(
            Group.character_update(id), self.channel_name
        )
        await self.send(text_data=GatewayMessage().delete_character(id))

    @database_sync_to_async
    def verify_new_character(self, character):
        """
        Verify if current user has permissions to see a new character
        Either owned by user or user is admin/storyteller in the chronicle
        """
        if str(self.user.id) == str(character["user"]):
            return True
        elif character.get("chronicle"):
            return Member.objects.filter(
                Q(user=self.user)
                & Q(chronicle_id=character["chronicle"])
                & (Q(admin=True) | Q(storyteller=True))
            ).exists()
        return False

    @database_sync_to_async
    def init_data(self):
        """
        Initialize character, chronicle and member data for the current user
        Uses DRF serializers to format data for the client
        """
        if self.user.is_anonymous:
            return None

        self.characters = {}
        self.chronicles = {}
        self.members = {}

        # Add user subscriptions
        self.subscriptions.add(Group.user_update(self.user.id))
        self.subscriptions.add(Group.character_new())
        self.subscriptions.add(Group.character_delete())

        # Process each chronicle the user belongs to
        chronicle_set = self.user.chronicles.all()
        for chronicle in chronicle_set:
            self.chronicles[chronicle.id] = serialize_chronicle(chronicle)
            self.subscriptions.add(Group.chronicle_update(chronicle.id))

            # Get member info for the current user in this chronicle
            try:
                member = Member.objects.get(user=self.user, chronicle=chronicle)
                is_staff = member.admin or member.storyteller
            except Member.DoesNotExist:
                is_staff = False

            # Initialize characters for this chronicle
            character_set_all = chronicle.character_set

            # Filter characters based on permissions
            if is_staff:
                character_set = character_set_all.all()
            else:
                character_set = character_set_all.filter(user=self.user)

            if not self.members.get(chronicle.id):
                self.members[chronicle.id] = {}

            # Process each character in the chronicle
            for character in character_set:
                # Get derived instance and serialize using appropriate tracker serializer
                derived_character = get_derived_instance(character)

                # Only serialize if we have a valid splat
                if derived_character.splat:
                    tracker_serializer_class = get_tracker_serializer(
                        derived_character.splat
                    )
                    if tracker_serializer_class:
                        serialized_data = tracker_serializer_class(
                            derived_character
                        ).data
                        self.characters[character.id] = serialized_data
                        self.character_subscribe(character.id)

                    # Add member information if we haven't already
                    if not self.members[chronicle.id].get(character.user_id):
                        # Make sure character has proper member association
                        repair_character(character)
                        if character.member:
                            self.members[chronicle.id][character.user_id] = (
                                serialize_member(character.member)
                            )
                            self.subscriptions.add(
                                Group.member_update(character.member.id)
                            )

        # Process characters not associated with any chronicle
        for character in Character.objects.filter(user=self.user, chronicle=None):
            # Get derived instance and serialize
            derived_character = get_derived_instance(character)

            # Debug logging
            print(
                f"Processing character: {derived_character.name}, splat: {derived_character.splat}"
            )

            if derived_character.splat:
                tracker_serializer_class = get_tracker_serializer(
                    derived_character.splat
                )

                # Debug logging for serializer selection
                print(
                    f"Found serializer for {derived_character.splat}: {tracker_serializer_class}"
                )

                if tracker_serializer_class:
                    try:
                        serialized_data = tracker_serializer_class(
                            derived_character
                        ).data
                        self.characters[character.id] = serialized_data
                        self.character_subscribe(character.id)
                    except Exception as e:
                        # Log any serialization errors
                        print(f"Error serializing {derived_character.name}: {str(e)}")

    def character_subscribe(self, id):
        """
        Add character to subscription list
        """
        self.subscribed_character_ids.add(str(id))
        self.subscriptions.add(Group.character_update(id))


class GatewayMessage:
    def __init__(self):
        self.data = {"op": None, "d": None, "t": None}

    def getOpcode(self):
        return self.data.get("op")

    def getEvent(self):
        return self.data.get("t", None)

    def getData(self):
        return self.data.get("d", None)

    async def loadJson(self, json):
        self.data = JSON.loads(json)
        return self

    def toJson(self):
        return JSON.dumps(self.data)

    def welcome(self):
        self.data["op"] = GATEWAY_OPCODE.welcome
        return self.toJson()

    def ready(self, user, data):
        if user.is_anonymous:
            self.data["op"] = GATEWAY_OPCODE.dispatch
            self.data["t"] = "READY"
            self.data["d"] = {}
            return self.toJson()

        self.data["op"] = GATEWAY_OPCODE.dispatch
        self.data["t"] = "READY"
        self.data["d"] = {
            "user": serialize_user(user),
            "members": data["members"],
            "characters": data["characters"],
            "chronicles": data["chronicles"],
        }
        return self.toJson()

    def update_character(self, event, sheet_id):
        self.data["op"] = GATEWAY_OPCODE.dispatch
        self.data["t"] = "UPDATE_CHARACTER"
        sheet = None
        if sheet_id and sheet_id == str(event["id"]) and "sheet" in event:
            tracker = event["tracker"]
            sheet = event["sheet"]
        else:
            tracker = event["tracker"]

        self.data["d"] = {"character": tracker, "id": event["id"]}
        if sheet:
            self.data["d"]["sheet"] = sheet

        return self.toJson()

    def delete_character(self, id):
        self.data["op"] = GATEWAY_OPCODE.dispatch
        self.data["t"] = "DELETE_CHARACTER"
        self.data["d"] = {"id": id}
        return self.toJson()

    def update_member(self, event):
        self.data["op"] = GATEWAY_OPCODE.dispatch
        self.data["t"] = "UPDATE_MEMBER"
        self.data["d"] = {"member": event["member"]}
        return self.toJson()

    def update_user(self, event):
        self.data["op"] = GATEWAY_OPCODE.dispatch
        self.data["t"] = "UPDATE_USER"
        self.data["d"] = {"user": event["user"]}
        return self.toJson()

    def update_chronicle(self, event):
        self.data["op"] = GATEWAY_OPCODE.dispatch
        self.data["t"] = "UPDATE_CHRONICLE"
        self.data["d"] = {"chronicle": event["chronicle"]}
        return self.toJson()


def repair_character(character):
    """
    Make sure character has a valid member if it belongs to a chronicle
    """
    if character.chronicle and not character.member:
        try:
            character.member = Member.objects.get(
                user=character.user, chronicle=character.chronicle
            )
            character.save()
        except Member.DoesNotExist:
            pass
    return character
