from ip_heatmap_api.models import IPAddress
from rest_framework import serializers


class IPAddressSerializer(serializers.ModelSerializer):
    lat = serializers.FloatField(source="latitude")
    lng = serializers.FloatField(source="longitude")

    class Meta:
        model = IPAddress
        # fields = ['network', 'latitude', 'longitude']
        fields = ['lat', 'lng']
