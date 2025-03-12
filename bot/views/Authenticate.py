from rest_framework.exceptions import NotFound
from django.conf import settings
import logging

logger = logging.getLogger("DEBUG")


def authenticate(request):
    client_ip = request.META.get("REMOTE_ADDR")
    token = request.data.get("APIKey", None)

    # Add debug logging to see what's happening
    logger.debug(f"Bot API request from IP: {client_ip}")
    logger.debug(f"API key match: {token == settings.API_KEY}")
    logger.debug(f"Request API key: {token[:5]}...{token[-5:] if token else None}")
    logger.debug(f"Settings API key: {settings.API_KEY[:5]}...{settings.API_KEY[-5:]}")

    # For localhost bots, be more lenient with IP checks
    localhost_networks = ["127.", "::1", "localhost", "172.", "192.168."]
    is_local = (
        any(client_ip.startswith(net) for net in localhost_networks)
        if client_ip
        else False
    )

    if token != settings.API_KEY:
        logger.warning(f"Invalid API key from {client_ip}")
        raise NotFound

    # For now, only verify the API key and ignore IP restrictions
    return
