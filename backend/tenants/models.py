from django.db import models
from django_tenants.models import TenantMixin, DomainMixin

class SchoolTenant(TenantMixin):
    # Core
    name = models.CharField(max_length=100)
    created_on = models.DateField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    
    # 1. Branding & Theme
    logo_url = models.URLField(blank=True, null=True)
    primary_color = models.CharField(max_length=7, default="#0f172a") # Default Navy
    secondary_color = models.CharField(max_length=7, default="#3b82f6") # Default Blue
    ui_config = models.JSONField(default=dict, blank=True) # Allows arbitrary UI overrides
    
    # 2. Module Feature Flags (Dictates what this tenant has access to)
    enable_finance = models.BooleanField(default=True)
    enable_hostel = models.BooleanField(default=False)
    enable_transport = models.BooleanField(default=False)
    enable_library = models.BooleanField(default=False)
    enable_hr = models.BooleanField(default=True)
    enable_events = models.BooleanField(default=True)
    
    # SaaS Subscription
    subscription_plan = models.CharField(
        max_length=50, 
        choices=[('FREE', 'Free'), ('PRO', 'Pro'), ('ENTERPRISE', 'Enterprise')],
        default='FREE'
    )

    # default true, schema will be automatically created and synced when it is saved
    auto_create_schema = True

class Domain(DomainMixin):
    pass
