from django.core.management.base import BaseCommand
from haven.models import Vampire5th, Character


class Command(BaseCommand):
    help = "Verify Vampire5th data"

    def handle(self, *args, **kwargs):
        # Verify Vampire5th entries with is_sheet=True
        vampire_sheets = Vampire5th.objects.filter(is_sheet=True)
        vampire_sheets_count = vampire_sheets.count()
        self.stdout.write(
            f"Vampire5th entries with is_sheet=True: {vampire_sheets_count}"
        )

        # Verify Character entries with splat_new='vampire5th'
        vampire_characters = Character.objects.filter(splat_new="vampire5th")
        vampire_characters_count = vampire_characters.count()
        self.stdout.write(
            f'Character entries with splat_new="vampire5th": {vampire_characters_count}'
        )

        # Cross-check if all Vampire5th entries with is_sheet have splat_new='vampire5th'
        vampire_sheets_with_splat = Vampire5th.objects.filter(
            is_sheet=True, splat_new="vampire5th"
        ).count()
        self.stdout.write(
            f'Vampire5th entries with is_sheet=True and splat_new="vampire5th": {vampire_sheets_with_splat}'
        )

        # Find incorrect entries
        incorrect_splat_entries = Vampire5th.objects.filter(is_sheet=True).exclude(
            splat_new="vampire5th"
        )
        incorrect_count = incorrect_splat_entries.count()
        self.stdout.write(f"Incorrect Vampire5th entries: {incorrect_count}")

        """
        if incorrect_count > 0:
            incorrect_splat_entries.update(splat_new="vampire5th")
            self.stdout.write(
                f'Updated {incorrect_count} entries to splat_new="vampire5th"'
            )
        """
