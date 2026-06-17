from rest_framework import serializers
from .models import SchoolTenant

class PublicTenantSerializer(serializers.ModelSerializer):
    """
    Used by the gateway to fetch branding and features before login.
    """
    class Meta:
        model = SchoolTenant
        fields = [
            'name', 'logo_url', 'primary_color', 'secondary_color', 
            'ui_config', 'enable_finance', 'enable_hostel', 
            'enable_transport', 'enable_library', 'enable_hr', 'enable_events'
        ]

class AdminTenantSerializer(serializers.ModelSerializer):
    """
    Used by SaaS Super-Admins to manage subscriptions and flags.
    """
    class Meta:
        model = SchoolTenant
        fields = '__all__'
