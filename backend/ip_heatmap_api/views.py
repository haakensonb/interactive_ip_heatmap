from rest_framework import viewsets
from rest_framework.response import Response
from ip_heatmap_api.models import IPAddress
from ip_heatmap_api.serializers import IPAddressSerializer


class IPAddressViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = IPAddress.objects.all().first()
        serializer = IPAddressSerializer(queryset)
        return Response(serializer.data)
