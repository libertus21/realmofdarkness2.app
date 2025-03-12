from django.http import HttpResponsePermanentRedirect
from django.middleware.security import SecurityMiddleware


class CustomSecurityMiddleware(SecurityMiddleware):
    def process_request(self, request):
        # Get the client IP
        client_ip = request.META.get("REMOTE_ADDR")

        # Skip SSL redirect for localhost connections
        if client_ip in ["127.0.0.1", "::1", "localhost"]:
            return None

        # For all other connections, use the standard SecurityMiddleware
        return super().process_request(request)
