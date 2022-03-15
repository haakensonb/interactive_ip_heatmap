from ip_heatmap_api.models import IPAddress
from rest_framework import serializers

class IPAddressSerializer(serializers.ModelSerializer):
    lat = serializers.DecimalField(max_digits=9, decimal_places=6)
    lng = serializers.DecimalField(max_digits=9, decimal_places=6)
    count = serializers.IntegerField()

    class Meta:
        model = IPAddress
        fields = ("lat", "lng", "count")