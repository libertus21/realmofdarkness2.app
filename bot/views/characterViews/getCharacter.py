from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

from bot.serializers import serialize
from bot.functions import get_splat
from haven.models import Character
from haven.utility import get_serializer, get_derived_instance
from ..Authenticate import authenticate


class GetCharacter(APIView):
    @csrf_exempt
    def post(self, request):
        authenticate(request)
        name = request.data.get("name", None)
        user_id = request.data.get("user_id", None)
        splat = request.data.get("splat_slug", None)
        pk = request.data.get("pk", None)

        character = get_splat(splat, name=name, user_id=user_id, id=pk)

        if not character:
            return HttpResponse(status=204)

        if character.splat_new:
            Serializer = get_serializer(character.splat_new)
            return Response(data={"character": Serializer(character).data})

        json = serialize(character.splat.slug, character)
        return Response(data={"character": json})


class GetCharacterDefault(APIView):
    @csrf_exempt
    def post(self, request):
        authenticate(request)

        name = request.data.get("name", None)
        user = request.data.get("user", None)
        chronicle = request.data.get("chronicle", None)
        characters = None
        select = ["character5th__vampire5th"]

        if not user:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if name:
            characters = Character.objects.select_related(*select).filter(
                user=user, name=name
            )
        else:
            characters = Character.objects.select_related(*select).filter(
                user=user, chronicle=chronicle
            )

        if not characters.exists():
            return Response(status=status.HTTP_404_NOT_FOUND)
        elif characters.count() > 1:
            return Response(status=status.HTTP_300_MULTIPLE_CHOICES)

        character = get_derived_instance(characters[0])
        Serializer = get_serializer(character.splat_new)

        if character.splat:
            json = serialize(character.splat.slug, character)
            return Response(data=json)
        else:
            return Response(data=Serializer(character).data)
