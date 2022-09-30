from django.db import models
from django.template.defaultfilters import slugify
from django.contrib.auth.models import User
from django.urls import reverse

class Counter(models.Model):
    code = models.CharField(max_length=255)
    index = models.IntegerField(default=0)
    count = models.IntegerField(default=0)
   