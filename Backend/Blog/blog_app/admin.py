from django.contrib import admin
from .models import BlogContent
# Register your models here.


class BlogAdmin(admin.ModelAdmin):
    list_display = ['title', 'author_name', 'date']
admin.site.register(BlogContent,BlogAdmin)
