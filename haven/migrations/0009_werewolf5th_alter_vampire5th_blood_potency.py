# Generated by Django 4.2 on 2023-11-14 00:23

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('haven', '0008_vampire5th_hunting_roll_vampire5th_resonance_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Werewolf5th',
            fields=[
                ('character5th_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='haven.character5th')),
                ('rage', models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(5)])),
                ('crinos', models.BooleanField(default=False)),
            ],
            bases=('haven.character5th',),
        ),
        migrations.AlterField(
            model_name='vampire5th',
            name='blood_potency',
            field=models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)]),
        ),
    ]
