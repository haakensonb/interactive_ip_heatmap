from rest_framework import viewsets, status
from rest_framework.response import Response
from ip_heatmap_api.models import IPAddress
from ip_heatmap_api.serializers import IPAddressSerializer


class IPAddressViewSet(viewsets.ViewSet):
    def list(self, request):
        xmin = request.query_params.get('xmin')
        ymin = request.query_params.get('ymin')
        xmax = request.query_params.get('xmax')
        ymax = request.query_params.get('ymax')
        # Rudimentary boundry box check.
        # TODO: Handle edge cases
        if (xmin and ymin and xmax and ymax):
            queryset = IPAddress.objects.filter(latitude__gte=xmin).filter(
                latitude__lte=xmax).filter(longitude__gte=ymin).filter(longitude__lte=ymax)
            serializer = IPAddressSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
