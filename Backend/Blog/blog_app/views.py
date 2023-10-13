from django.shortcuts import render
from .models import BlogContent
from rest_framework import viewsets
from .serializers import BlogContentSerializer
# Create your views here.


class BlogContentViews(viewsets.ModelViewSet):
    queryset = BlogContent.objects.all()
    serializer_class = BlogContentSerializer
