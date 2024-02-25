from django.core.management.base import BaseCommand
from haven.models import Vampire5th

class Command(BaseCommand):
    help = "Edits the disciplines JSONField in Vampire5th models."

    def handle(self, *args, **options):
        for vampire in Vampire5th.objects.all():
            updated_disciplines = {}
            for discipline, data in vampire.disciplines.items():
                self.stdout.write(f"{discipline} - {data.powers}")

            self.stdout.write(f"Updated disciplines for {vampire.name}")

