from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from django.http import JsonResponse, HttpResponse
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.core.cache import cache
import hashlib

from .get_post import get_post
from chronicle.models import Member, Chronicle
from chronicle.serializers import MemberDeserializer
from gateway.serializers import serialize_member, serialize_user
from gateway.constants import Group
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from typing import List, Dict
from discordauth.models import User as CustomUser

User: type[CustomUser] = get_user_model()
channel_layer = get_channel_layer()


@csrf_exempt
def get_supporter_level(request):
    data = get_post(request)
    user_id = data["user_id"]
    user = None

    try:
        user = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        return HttpResponse(status=204)

    return JsonResponse({"level": user.supporter})


@csrf_exempt
def set_supporter_level(request):
    data = get_post(request)
    user_data = data["user"]
    level = data["level"]

    try:
        user = User.objects.get(pk=user_data["id"])
        if user.supporter == 0 and level == 0:
            return HttpResponse(status=204)
    except User.DoesNotExist:
        if level == 0:
            return HttpResponse(status=204)
        user = User.objects.create_user(user_data)

    user.supporter = level
    user.save()
    return HttpResponse()


@csrf_exempt
def update_user(request):
    data = get_post(request)
    user_data = data["user"]
    update_hash = hashlib.md5(str(data).encode("utf-8")).hexdigest()
    cache_key = f"user_update_{update_hash}"

    # This is to stop race conditions on the update
    if not cache.add(cache_key, True, 3):
        # Cache key already exists, update has already been processed, skip processing
        return HttpResponse(status=204)

    try:
        user = User.objects.get(pk=user_data["id"])
        user.username = user_data["username"]
        user.discriminator = user_data["discriminator"]
        user.avatar_url = user_data["avatar_url"]
        user.save()
    except User.DoesNotExist:
        if not user_data["create"]:
            return HttpResponse(status=204)
        user = User.objects.create_user(user_data)

    if not user_data["member"]:
        async_to_sync(channel_layer.group_send)(
            Group.user_update(user.id),
            {
                "type": "user.update",
                "user": serialize_user(user),
            },
        )
        return HttpResponse()

    member_data = user_data["member"]
    guild = Chronicle.objects.get(pk=member_data["guild_id"])

    try:
        member = Member.objects.get(chronicle=guild, user=user)
        member_serializer = MemberDeserializer(member, data=member_data, partial=True)
    except Member.DoesNotExist:
        # Add the required fields to the data for new member creation
        member_data_complete = member_data.copy()
        member_data_complete["chronicle"] = member_data[
            "guild_id"
        ]  # Set chronicle to guild_id
        member_data_complete["user"] = user.id  # Set user to the user ID

        member_serializer = MemberDeserializer(data=member_data_complete)

    if member_serializer.is_valid():
        member = member_serializer.save()
        async_to_sync(channel_layer.group_send)(
            Group.member_update(member.id),
            {
                "type": "member.update",
                "member": serialize_member(member),
            },
        )
        return HttpResponse()
    else:
        return JsonResponse(member_serializer.errors, status=400)


@csrf_exempt
def get_admins_storytellers(request):
    data = get_post(request)
    guild_id = data["guild_id"]

    storytellers = Member.objects.filter(chronicle=guild_id, storyteller=True)
    admins = Member.objects.filter(chronicle=guild_id, admin=True)

    storyteller_ids = [str(st.user.id) for st in storytellers]
    admin_ids = [str(a.user.id) for a in admins]

    members = storyteller_ids + list(set(admin_ids) - set(storyteller_ids))

    return JsonResponse(
        {
            "admin_ids": admin_ids,
            "storyteller_ids": storyteller_ids,
            "members": members,
        }
    )


class GetAllSupportersView(APIView):
    """
    API endpoint to get all supporter users and their levels.
    """

    permission_classes = [AllowAny]

    def post(self, request) -> Response:
        supporters = User.objects.filter(supporter__gt=0)
        data: List[Dict[str, int | str]] = [
            {"user_id": str(user.id), "level": user.supporter} for user in supporters
        ]
        return Response(data)
