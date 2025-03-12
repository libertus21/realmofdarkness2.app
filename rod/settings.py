"""
Django settings for rod project.

Generated by 'django-admin startproject' using Django 3.2.5.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from pathlib import Path
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("SECRET_KEY", "django-insecure-dev-key")
API_KEY = os.getenv("API_KEY", "dev-api-key")
PATREON_WEBHOOK_SECRET = os.getenv("PATREON_WEBHOOK_SECRET", "")

# Discord constants
DISCORD_BOT_TOKEN = os.getenv("DISCORD_BOT_TOKEN", "")
DISCORD_DEBUG_CHANNEL = os.getenv("DISCORD_DEBUG_CHANNEL", "")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv("DEBUG", "True") == "True"

# Conditional settings based on DEBUG
if DEBUG:
    # Development environment
    ALLOWED_HOSTS = ["localhost", "127.0.0.1"]
    SECURE_SSL_REDIRECT = False
    CSRF_COOKIE_SECURE = False
    SESSION_COOKIE_SECURE = False
    CSRF_TRUSTED_ORIGINS = ["http://localhost:3000", "http://127.0.0.1:3000"]
else:
    # Production environment
    ALLOWED_HOSTS = [
        "realmofdarkness.app",
        "www.realmofdarkness.app",
        ".localhost",
        "127.0.0.1",
        "[::1]",
    ]
    SECURE_SSL_REDIRECT = True
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True


# Application definition

# Common apps for both development and production
COMMON_APPS = [
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "discordauth.apps.DiscordauthConfig",
    "main.apps.MainConfig",
    "haven.apps.HavenConfig",
    "chronicle.apps.ChronicleConfig",
    "bot.apps.BotConfig",
    "api.apps.ApiConfig",
    "patreon.apps.PatreonConfig",
    "channels",
    "rest_framework",
]

if DEBUG:
    # Development mode apps
    INSTALLED_APPS = ["daphne"] + COMMON_APPS
else:
    # Production mode apps
    INSTALLED_APPS = COMMON_APPS

MIDDLEWARE = [
    "rod.securityMiddleware.CustomSecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "rod.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "frontend/build/"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "rod.wsgi.application"
# Channels
ASGI_APPLICATION = "rod.asgi.application"

# Get Redis configuration
REDIS_DB_INDEX = os.getenv("REDIS_DB_INDEX", "0")

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [f"redis://127.0.0.1:6379/{REDIS_DB_INDEX}"],
        },
    },
}

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.redis.RedisCache",
        "LOCATION": f"redis://127.0.0.1:6379/{REDIS_DB_INDEX}",
    }
}


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DB_ENGINE = os.getenv("DB_ENGINE", "sqlite3")
DB_NAME = os.getenv("DB_NAME", "db.sqlite3")

if DB_ENGINE == "sqlite3":
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / DB_NAME,
        }
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.mysql",
            "NAME": os.getenv("DB_NAME", "realm_of_darkness"),
            "USER": os.getenv("DB_USER", ""),
            "PASSWORD": os.getenv("DB_PASSWORD", ""),
            "HOST": os.getenv("DB_HOST", "localhost"),
            "PORT": os.getenv("DB_PORT", ""),
            "OPTIONS": {"sql_mode": "traditional", "charset": "utf8mb4"},
            "CONN_MAX_AGE": 29,
        }
    }

    # Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",
        # Other authentication classes...
    ],
    "DEFAULT_THROTTLE_RATES": {
        "anon": "10/day",  # Anonymous users - restricted
        "standard_user": "300/day",  # Regular authenticated users
        "supporter_user": "600/day",  # Supporters (tier 1-2)
        "premium_user": "1200/day",  # Premium supporters (tier 3+)
    },
}


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Custom Auth Backend
# https://docs.djangoproject.com/en/3.0/topics/auth/customizing/#specifying-authentication-backends

AUTHENTICATION_BACKENDS = ["discordauth.backends.DiscordAuthBackend"]

# Custom User Model
# https://docs.djangoproject.com/en/2.2/topics/auth/customizing/#extending-the-existing-user-model

AUTH_USER_MODEL = "discordauth.User"

# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = "/static/"

STATICFILES_DIRS = [
    BASE_DIR / "frontend/build/static/",
]

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Logging configuration based on environment
if not DEBUG:
    # Production logging settings
    LOGGING = {
        "version": 1,
        "disable_existing_loggers": False,
        "handlers": {
            "root": {
                "class": "logging.FileHandler",
                "filename": BASE_DIR / "root.log",
            },
            "django": {
                "class": "logging.FileHandler",
                "filename": BASE_DIR / "django.log",
            },
            "debug": {
                "class": "logging.FileHandler",
                "filename": BASE_DIR / "debug.log",
            },
            "console": {"class": "logging.StreamHandler"},
        },
        "root": {
            "handlers": ["root"],
            "level": "WARNING",
        },
        "loggers": {
            "": {  # empty name for root logger
                "handlers": ["root"],
                "level": "WARNING",
                "propagate": True,
            },
            "django.server": {  # Exclude django.server logger
                "handlers": [],
                "propagate": False,
            },
            "django": {
                "handlers": ["django"],
                "level": "WARNING",
                "propagate": False,
            },
            "django.security.DisallowedHost": {
                "handlers": [],
                "propagate": False,
            },
            "DEBUG": {
                "handlers": ["debug"],
                "level": "DEBUG",
                "propagate": False,
            },
        },
    }
