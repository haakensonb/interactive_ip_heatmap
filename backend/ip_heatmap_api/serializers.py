from ip_heatmap_api.models import IPAddress
from django.contrib.gis.geos import Point
from rest_framework import serializers


class CustomPointField(serializers.Field):
    def to_representation(self, value):
        return {'lat': value.x, 'lng': value.y}

    def to_interal_value(self, data):
        return Point(data.lat, data.lng)


class IPAddressSerializer(serializers.ModelSerializer):
    position = CustomPointField()

    class Meta:
        model = IPAddress
        fields = ("position",)
