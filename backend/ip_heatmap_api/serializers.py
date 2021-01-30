from ip_heatmap_api.models import IPAddress
from rest_framework import serializers


class IPAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = IPAddress
        fields = ['network', 'latitude', 'longitude']
