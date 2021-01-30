from django.db import models

# Create your models here.
class IPAddress(models.Model):
    network = models.CharField(max_length=60)
    # Should this use Django GIS PointField instead?
    latitude = models.FloatField()
    longitude = models.FloatField()