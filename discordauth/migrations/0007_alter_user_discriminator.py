# Generated by Django 4.2 on 2023-05-04 02:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('discordauth', '0006_user_last_active'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='discriminator',
            field=models.CharField(max_length=50),
        ),
    ]
