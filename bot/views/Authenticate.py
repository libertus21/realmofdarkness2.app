from rest_framework.exceptions import NotFound
from django.conf import settings
import logging

logger = logging.getLogger("DEBUG")


def authenticate(request):
    client_ip = request.META.get("REMOTE_ADDR")
    token = request.data.get("APIKey", None)

    # List of allowed IPs (localhost both IPv4 and IPv6)
    allowed_ips = ["127.0.0.1", "::1"]

    if token != settings.API_KEY or client_ip not in allowed_ips:
        logger.warning(f"Unauthorized bot API access attempt from {client_ip}")
        raise NotFound
