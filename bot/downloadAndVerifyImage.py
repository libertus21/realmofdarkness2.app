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
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
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
            field_name="faceclaim",
            name=f"downloaded_image.{format_ext}",
            content_type=content_type,
            charset="utf-8",
            size=len(image_data),
            file=File(BytesIO(image_data)),
        )
        return image_file

    except Exception as e:
        print(f"Error downloading image: {e}")
        return None
