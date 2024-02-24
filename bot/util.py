from haven.models import Character
from bot.constants import Splats, Versions

def get_splat(splat, id=None, name=None, user_id=None):
    if id: 
        char = Character.objects.filter(pk=id)
    elif not splat: 
        char = Character.objects.filter(name__iexact=name, user=user_id)
    else: 
        char = Character.objects.filter(
            name__iexact=name, 
            user=user_id, 
            splat__slug=splat
        )

    select = ['colour', 'user', 'chronicle', 'member']
    prefetch = ['history', 'trackable']

    if splat and Versions.v20.value in splat:
        prefetch.append('health')    
    elif splat and Versions.v5.value in splat:        
        prefetch.append('damage')
    
    if (splat == Splats.vampire20th.value or splat == Splats.human20th.value or
    splat == Splats.ghoul20th.value):        
        select.append('morality')
    elif (splat == Splats.mortal5th.value or splat == Splats.vampire5th.value):
        select.append('humanity')

    char.select_related(*select)
    char.prefetch_related(*prefetch)
    
    return char[0] if char else None

from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.core.files import File
from urllib.request import urlopen
from PIL import Image
import requests

def download_and_verify_image(image_url):
    """
    Downloads an image from the URL, verifies it using Pillow, and returns it.

    Args:
        image_url: The URL of the image to download.

    Returns:
        An InMemoryUploadedFile object containing the verified image data.
        None if verification fails.
    """
    headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
    }

    try:
        response = requests.get(image_url, headers=headers)
        image_data = response.content

        # Verify using Pillow
        try:
            image = Image.open(BytesIO(image_data))
        except (IOError, OSError):
            return None  # Invalid image data

        # Optional: Further validation (e.g., content-type, dimensions)

        content_type = response.headers.get("Content-Type")
        format_ext = content_type.split("/")[-1].lower()

        image_file = InMemoryUploadedFile(
            field_name='faceclaim',
            name=f'downloaded_image.{format_ext}',
            content_type=content_type,
            charset='utf-8',
            size=len(image_data),
            file=File(BytesIO(image_data))
        )
        return image_file

    except Exception as e:
        print(f"Error downloading image: {e}")
        return None