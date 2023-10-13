from django.db import models


# Create your models here.
class BlogContent(models.Model):
    title = models.CharField(max_length=200)
    author_name = models.CharField(max_length=200)
    image = models.ImageField(upload_to="images/", null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    blog_description = models.TextField()
    blog_content = models.TextField()
    tag = models.CharField(max_length=100)

    def __str__(self):
        return self.title
