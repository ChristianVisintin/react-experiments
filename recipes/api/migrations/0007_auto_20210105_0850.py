# Generated by Django 3.1.5 on 2021-01-05 08:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20210104_1939'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipeimage',
            name='image',
            field=models.ImageField(upload_to='data/images/recipes'),
        ),
        migrations.AlterField(
            model_name='recipeingredient',
            name='measure',
            field=models.CharField(blank=True, max_length=32, null=True),
        ),
        migrations.AlterField(
            model_name='recipeingredient',
            name='quantity',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='tweet',
            name='avatar',
            field=models.ImageField(upload_to='data/images/cache'),
        ),
    ]
