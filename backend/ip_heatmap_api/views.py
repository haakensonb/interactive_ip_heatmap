from rest_framework import viewsets, status
from rest_framework.response import Response
from ip_heatmap_api.models import IPAddress
from ip_heatmap_api.serializers import IPAddressSerializer
from django.contrib.gis.geos import Polygon


class IPAddressViewSet(viewsets.ViewSet):
    def list(self, request):
        top_lat = request.query_params.get('top_lat')
        top_lng = request.query_params.get('top_lng')
        bot_lat = request.query_params.get('bot_lat')
        bot_lng = request.query_params.get('bot_lng')
        # Rudimentary boundry box check.
        # TODO: Handle edge cases
        if (top_lat and top_lng and bot_lat and bot_lng):
            bbox = (top_lat, top_lng, bot_lat, bot_lng)
            geom = Polygon.from_bbox(bbox)
            queryset = IPAddress.objects.filter(position__within=geom)
            serializer = IPAddressSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
