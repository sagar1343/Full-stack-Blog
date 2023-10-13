from rest_framework import serializers
from .models import BlogContent


class BlogContentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = BlogContent
        fields = ['id', 'url', 'title', 'author_name', 'blog_content', 'blog_description', 'image', 'date', 'tag']
