from django.urls import path, include
from rest_framework.routers import DefaultRouter
from tenants.views import TenantGatewayViewSet

router = DefaultRouter()
router.register(r'gateway', TenantGatewayViewSet, basename='tenant-gateway')

urlpatterns = [
    path('', include(router.urls)),
]
