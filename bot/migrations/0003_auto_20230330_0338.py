# Generated by Django 3.2.5 on 2023-03-30 03:38

from django.db import migrations, models

def removeInits(apps, scheme_editor):
    model = apps.get_model('bot', 'InitiativeTracker20th')
    model.objects.all().delete()

class Migration(migrations.Migration):

    dependencies = [
        ('bot', '0002_initiativecharacter_initiativetracker20th'),
    ]

    operations = [
        migrations.RunPython(removeInits),
        migrations.CreateModel(
            name='Bot',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=200)),
                ('discriminator', models.CharField(max_length=5)),
                ('avatar_url', models.URLField(blank=True)),
                ('shard_count', models.IntegerField(default=0)),
            ],
        ),
        migrations.RemoveField(
            model_name='initiativetracker20th',
            name='current_round',
        ),
        migrations.RemoveField(
            model_name='initiativetracker20th',
            name='lockout',
        ),
        migrations.RemoveField(
            model_name='initiativetracker20th',
            name='message_id',
        ),
        migrations.RemoveField(
            model_name='initiativetracker20th',
            name='phase',
        ),
        migrations.AddField(
            model_name='initiativetracker20th',
            name='data',
            field=models.JSONField(default=0),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='InitiativeCharacter',
        ),
    ]
