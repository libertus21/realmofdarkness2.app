# Generated by Django 3.2.5 on 2022-10-13 03:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('discordauth', '0003_auto_20221013_0340'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='_last_saved',
            new_name='last_saved',
        ),
    ]
