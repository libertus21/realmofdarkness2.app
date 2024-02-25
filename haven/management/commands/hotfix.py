from django.core.management.base import BaseCommand
from haven.models import Vampire5th

class Command(BaseCommand):
    help = "Edits the disciplines JSONField in Vampire5th models."

    def handle(self, *args, **options):
        for vampire in Vampire5th.objects.all():
            updated_disciplines = {}
            for discipline, data in vampire.disciplines.items():
                updated_disciplines[discipline] = data
                updated_disciplines[discipline]['powers'] = {'1': None, '2': None, '3': None, '4': None, '5': None}
            vampire.disciplines = updated_disciplines
            vampire.save()
            self.stdout.write(f"Updated disciplines for {vampire.name}")

