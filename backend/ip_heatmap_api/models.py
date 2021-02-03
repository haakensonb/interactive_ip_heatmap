from django.db import models
from django.contrib.gis.db import models as geomodels
from django.contrib.gis.geos import Point


class IPAddress(models.Model):
    position = geomodels.PointField(default=Point(0.0, 0.0))
