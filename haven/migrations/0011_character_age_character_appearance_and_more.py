# Generated by Django 4.2 on 2023-11-24 05:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('haven', '0010_vampire5th_disciplines_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='character',
            name='age',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AddField(
            model_name='character',
            name='appearance',
            field=models.TextField(blank=True, max_length=1000),
        ),
        migrations.AddField(
            model_name='character',
            name='date_of_birth',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AddField(
            model_name='character',
            name='history',
            field=models.TextField(blank=True, max_length=6000),
        ),
        migrations.AddField(
            model_name='character',
            name='notes',
            field=models.TextField(blank=True, max_length=6000),
        ),
        migrations.AddField(
            model_name='vampire5th',
            name='apparent_age',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AddField(
            model_name='vampire5th',
            name='date_of_death',
            field=models.CharField(blank=True, max_length=20),
        ),
    ]
