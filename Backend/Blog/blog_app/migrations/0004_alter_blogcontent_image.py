# Generated by Django 4.2.6 on 2023-10-13 07:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog_app', '0003_alter_blogcontent_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogcontent',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
    ]