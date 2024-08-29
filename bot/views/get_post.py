from django.http import Http404
from json import loads
from django.conf import settings


def get_post(request):
    if request.method != "POST":
        raise Http404
    post = loads(request.body)

    if not post or post.get("APIKey", None) != settings.API_KEY:
        raise Http404

    return post
