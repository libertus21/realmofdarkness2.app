from rest_framework.exceptions import NotFound
from django.conf import settings
import logging
import os
from dotenv import load_dotenv
from pathlib import Path

logger = logging.getLogger("DEBUG")


def authenticate(request):
    # Load API key directly from .env file
    base_dir = Path(__file__).resolve().parent.parent.parent
    env_path = base_dir / ".env"
    load_dotenv(env_path)

    # Get the API key directly from environment
    env_api_key = os.getenv("API_KEY")

    client_ip = request.META.get("REMOTE_ADDR")
    token = request.data.get("APIKey", None)

    # Debug info
    logger.debug(f"Bot API request from IP: {client_ip}")
    logger.debug(
        f"Env API key: {env_api_key[:5]}...{env_api_key[-5:] if env_api_key else None}"
    )
    logger.debug(
        f"Settings API key: {settings.API_KEY[:5]}...{settings.API_KEY[-5:] if hasattr(settings, 'API_KEY') else None}"
    )
    logger.debug(f"Request token: {token[:5]}...{token[-5:] if token else None}")
    logger.debug(f"Direct env match: {token == env_api_key}")
    logger.debug(
        f"Settings match: {token == settings.API_KEY if hasattr(settings, 'API_KEY') else 'No settings.API_KEY'}"
    )

    # Try to write to a file that will definitely exist
    with open("/tmp/api_key_debug.txt", "w") as f:
        f.write(f"ENV: '{env_api_key}'\n")
        f.write(f"TOKEN: '{token}'\n")
        f.write(f"SETTINGS: '{settings.API_KEY}'\n")
        f.write(f"MATCH ENV: {token == env_api_key}\n")
        f.write(f"MATCH SETTINGS: {token == settings.API_KEY}\n")

    # Compare with direct env value
    if token != env_api_key:
        logger.warning(
            f"Invalid API key from {client_ip} - comparing with direct env value"
        )
        # TEMPORARY: Print details to server logs
        print(f"API KEY MISMATCH: '{token}' vs ENV '{env_api_key}'", flush=True)
        raise NotFound

    return
