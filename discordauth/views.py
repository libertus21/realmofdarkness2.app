from django.shortcuts import render, redirect
from django.contrib.auth import (authenticate, 
    login as auth_login, logout as auth_logout)
from .models import User
import requests
from .config import settings

class Oauth(object):
    client_id = settings['id']
    client_secret = settings['secret']
    client_scope = settings['scope']
    #Discord redirect URL
    redirect_uri = settings['redirect']
    login_url = f'https://discordapp.com/api/oauth2/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code&scope={client_scope}&prompt=none'
    token_url = 'https://discordapp.com/api/oauth2/token'
    api_url = 'https://discordapp.com/api'

    @staticmethod
    def get_access_token(code):
        payload = {
            'client_id': Oauth.client_id,
            'client_secret': Oauth.client_secret,
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': Oauth.redirect_uri,
            'scope': Oauth.client_scope,
        }        
        headers = {
          'Content-Type': 'application/x-www-form-urlencoded'
        }

        access_token = requests.post(Oauth.token_url, data=payload, headers=headers)
        access_token.raise_for_status()
        return access_token.json()

    @staticmethod
    def get_user(access_token):
        url = Oauth.api_url + '/users/@me'

        headers = {
            'authorization': f'Bearer {access_token}'
        }
        user = requests.get(url, headers=headers)
        return user.json()

    @staticmethod
    def get_guilds(access_token):
        url = Oauth.api_url + '/users/@me/guilds'

        headers = {
            'authorization': f'Bearer {access_token}'
        }
        guilds = requests.get(url, headers=headers)
        return guilds.json()


def login(request):
    client_state = "14" #TODO make state a hash of client cookie
    return redirect(Oauth.login_url + f"&state={client_state}")

def logout(request):
    auth_logout(request)
    return redirect('main:index')

def login_success(request):
    #TODO validate the state making sure it is the same as what we sent
    code = request.GET.get('code', 'no code found')
    access_token = Oauth.get_access_token(code)
    discord_user = Oauth.get_user(access_token['access_token'])
    # Uncomment if you would like the guilds as well. Needs guilds scope
    #guilds = Oauth.get_guilds(access_token['access_token'])
    
    user = authenticate(request, user_id=discord_user['id'])
    if (user != None):
        # user exists, update details anyway
        user.username = discord_user['username']
        user.discriminator = discord_user['discriminator']
        user_id = discord_user["id"]
        avatar_id = discord_user["avatar"]
        user.avatar = f'https://cdn.discordapp.com/avatars/{user_id}/{avatar_id}.png'
        user.email = discord_user['email']
        user.verified = discord_user['verified']
        user.registered = True
        user.save()
        
    else:
        user_id = discord_user["id"]
        avatar_id = discord_user["avatar"]
        discord_user['avatar'] = f'https://cdn.discordapp.com/avatars/{user_id}/{avatar_id}.png'
        user = User.objects.create_user(discord_user, is_registered=True)

    auth_login(request, user, backend='discordauth.backends.DiscordAuthBackend')
    # Enter redirect Page
    return redirect(settings['final_redirect'])