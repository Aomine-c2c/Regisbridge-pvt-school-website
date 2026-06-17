from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import SchoolTenant
from .serializers import PublicTenantSerializer

class TenantGatewayViewSet(viewsets.ViewSet):
    """
    Public gateway endpoint to fetch school settings based on domain or slug.
    No authentication required.
    """
    @action(detail=False, methods=['get'])
    def resolve(self, request):
        # The frontend sends ?domain=school1.yoursaas.com or ?slug=school1
        domain = request.query_params.get('domain')
        if not domain:
            return Response({"error": "Domain parameter is required"}, status=400)
            
        try:
            # Domain model lookup would typically happen here via django-tenants
            # Simplifying for example:
            tenant = SchoolTenant.objects.get(domains__domain=domain)
            serializer = PublicTenantSerializer(tenant)
            return Response(serializer.data)
        except SchoolTenant.DoesNotExist:
            return Response({"error": "School not found"}, status=404)
