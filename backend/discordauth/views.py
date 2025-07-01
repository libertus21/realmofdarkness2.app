from django.shortcuts import redirect
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from .models import User
from chronicle.models import Chronicle, Member
import requests
import hashlib
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get environment variables
DISCORD_APP_ID = os.getenv("DISCORD_APP_ID", "")
DISCORD_APP_SECRET = os.getenv("DISCORD_APP_SECRET", "")
ENV = os.getenv("ENV", "development")

# Set URLs based on environment
if ENV:
    # Development environment
    REDIRECT_URI = "http://localhost:8080/auth/login/success/"
    FINAL_REDIRECT = "http://localhost:3000/"
elif ENV == "preproduction":
    # Preproduction environment
    REDIRECT_URI = "https://dev.realmofdarkness.app/auth/login/success/"
    FINAL_REDIRECT = "https://dev.realmofdarkness.app/"
else:
    # Production environment
    REDIRECT_URI = "https://realmofdarkness.app/auth/login/success/"
    FINAL_REDIRECT = "https://realmofdarkness.app/"

# Discord OAuth URLs
LOGIN_URL = f"https://discord.com/api/oauth2/authorize?client_id={DISCORD_APP_ID}&redirect_uri={REDIRECT_URI.replace(':', '%3A').replace('/', '%2F')}&response_type=code&scope=identify%20email%20guilds&prompt=none"


class Oauth(object):
    client_id = DISCORD_APP_ID
    client_secret = DISCORD_APP_SECRET
    client_scope = "identify%20email%20guilds"
    redirect_uri = REDIRECT_URI
    login_url = LOGIN_URL
    token_url = "https://discordapp.com/api/oauth2/token"
    api_url = "https://discordapp.com/api"

    @staticmethod
    def get_access_token(code):
        payload = {
            "client_id": Oauth.client_id,
            "client_secret": Oauth.client_secret,
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": Oauth.redirect_uri,
        }
        headers = {"Content-Type": "application/x-www-form-urlencoded"}
        access_token = requests.post(Oauth.token_url, data=payload, headers=headers)
        access_token.raise_for_status()
        return access_token.json()

    @staticmethod
    def get_user(access_token):
        url = Oauth.api_url + "/users/@me"

        headers = {"authorization": f"Bearer {access_token}"}
        user = requests.get(url, headers=headers)
        return user.json()

    @staticmethod
    def get_guilds(access_token):
        url = Oauth.api_url + "/users/@me/guilds"

        headers = {"authorization": f"Bearer {access_token}"}
        guilds = requests.get(url, headers=headers)
        return guilds.json()


def login(request):
    client_state = hashlib.sha256(str(request.COOKIES).encode()).hexdigest()
    return redirect(Oauth.login_url + f"&state={client_state}")


def logout(request):
    auth_logout(request)
    return redirect(FINAL_REDIRECT)


def login_success(request):
    # Validate the state making sure it is the same as what we sent
    client_state = request.GET.get("state")
    server_state = hashlib.sha256(str(request.COOKIES).encode()).hexdigest()

    if client_state != server_state:
        # Invalid state, handle accordingly
        return redirect(FINAL_REDIRECT)

    code = request.GET.get("code", "no code found")
    access_token = Oauth.get_access_token(code)
    discord_user = Oauth.get_user(access_token["access_token"])
    guilds = Oauth.get_guilds(access_token["access_token"])

    user = authenticate(request, user_id=discord_user["id"])
    if user != None:
        # user exists, update details anyway
        user.username = discord_user["username"]
        user.discriminator = discord_user["discriminator"]
        user_id = discord_user["id"]
        avatar_id = discord_user["avatar"]
        user.avatar_url = (
            f"https://cdn.discordapp.com/avatars/{user_id}/{avatar_id}.png"
        )
        user.email = discord_user["email"]
        user.verified = discord_user["verified"]
        user.registered = True
        user.save()

    else:
        user_id = discord_user["id"]
        avatar_id = discord_user["avatar"]
        discord_user["avatarURL"] = (
            f"https://cdn.discordapp.com/avatars/{user_id}/{avatar_id}.png"
        )
        user = User.objects.create_user(discord_user, is_registered=True)

    # Sincronizar servidores del usuario
    synced_guilds = 0
    for guild in guilds:
        guild_id = int(guild["id"])
        permissions = guild["permissions"]
        name = guild["name"]
        admin = False
        
        try:
            chronicle = Chronicle.objects.get(id=guild_id)
        except Chronicle.DoesNotExist:
            # El bot no está en este servidor, continuar
            continue

        # Verificar si ya existe la relación de miembro
        if not Member.objects.filter(chronicle=chronicle, user=user).exists():
            # Determinar si el usuario es admin (bit 3 = 8)
            if permissions & (1 << 3) != 0:
                admin = True
            
            # Crear la relación de miembro
            Member.objects.create(chronicle=chronicle, user=user, admin=admin)
            synced_guilds += 1
            print(f"Usuario {user.username} sincronizado con servidor {name}")
        else:
            # Actualizar permisos de admin si es necesario
            try:
                member = Member.objects.get(chronicle=chronicle, user=user)
                if permissions & (1 << 3) != 0 and not member.admin:
                    member.admin = True
                    member.save()
                    print(f"Permisos de admin actualizados para {user.username} en {name}")
            except Member.DoesNotExist:
                pass
    
    print(f"Sincronización completada: {synced_guilds} servidores sincronizados para {user.username}")

    auth_login(request, user, backend="discordauth.backends.DiscordAuthBackend")
    # Enter redirect Page
    return redirect(FINAL_REDIRECT)
