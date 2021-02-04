from django.db import models
from django.contrib.gis.db import models as geomodels
from django.contrib.gis.geos import Point


class IPAddress(models.Model):
    # Short field names used in this case to reduce json size
    # until more compressed protocol is used.
    p = geomodels.PointField(default=Point(0.0, 0.0))
    c = models.IntegerField(default=0)
