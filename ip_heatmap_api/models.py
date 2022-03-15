from django.db import models

class IPAddress(models.Model):
    lat = models.DecimalField(max_digits=9, decimal_places=6, default=0.0)
    lng = models.DecimalField(max_digits=9, decimal_places=6, default=0.0)
    count = models.IntegerField(default=0)

