# Generated by Django 3.2.8 on 2021-10-29 07:07

from django.db import migrations, models
import django.db.models.deletion
import posts.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('account', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('caption', models.CharField(blank=True, max_length=256)),
                ('image', models.ImageField(upload_to=posts.models.user_grouped_file_path)),
                ('created', models.DateTimeField(auto_now_add=True, db_index=True)),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='account.profile')),
                ('users_like', models.ManyToManyField(blank=True, related_name='images_liked', to='account.Profile')),
            ],
            options={
                'ordering': ('-created',),
            },
        ),
    ]
