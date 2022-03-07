from ip_heatmap_api.models import IPAddress
# from django.contrib.gis.geos import Point
from rest_framework import serializers


# class CustomPointField(serializers.Field):
#     def to_representation(self, value):
#         return {'lat': value.x, 'lng': value.y}

#     def to_interal_value(self, data):
#         return Point(data.lat, data.lng)


# class IPAddressSerializer(serializers.ModelSerializer):
#     # Short field names used in this case to reduce json size
#     # until more compressed protocol is used.
#     p = CustomPointField()
#     c = serializers.IntegerField()

#     class Meta:
#         model = IPAddress
#         fields = ("p", "c")

class IPAddressSerializer(serializers.ModelSerializer):
    lat = serializers.DecimalField(max_digits=9, decimal_places=6)
    lng = serializers.DecimalField(max_digits=9, decimal_places=6)
    count = serializers.IntegerField()

    class Meta:
        model = IPAddress
        fields = ("lat", "lng", "count")