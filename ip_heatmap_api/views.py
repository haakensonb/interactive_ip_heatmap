from django.views.decorators.cache import never_cache
from django.views.generic import TemplateView
from rest_framework import viewsets, status
from rest_framework.response import Response
from ip_heatmap_api.models import IPAddress
from ip_heatmap_api.serializers import IPAddressSerializer


class IPAddressViewSet(viewsets.ViewSet):
    def list(self, request):
        top_lat = request.query_params.get('top_lat')
        top_lng = request.query_params.get('top_lng')
        bot_lat = request.query_params.get('bot_lat')
        bot_lng = request.query_params.get('bot_lng')
        if (top_lat and top_lng and bot_lat and bot_lng):
            queryset = IPAddress.objects.filter(lat__lte=top_lat, lat__gte=bot_lat).filter(lng__lte=top_lng, lng__gte=bot_lng)
            serializer = IPAddressSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


# Serve single page application
index = never_cache(TemplateView.as_view(template_name='index.html'))
