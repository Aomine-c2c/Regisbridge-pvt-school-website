from django.db import models
from django.conf import settings

class Notification(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=200)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Generic link for loose coupling (can point to an invoice ID, grade ID, etc. without strict foreign keys)
    action_url = models.CharField(max_length=255, blank=True, null=True)
    
    def __str__(self):
        return f"{self.title} - {self.user.username}"

class Announcement(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    target_roles = models.JSONField(default=list) # e.g. ["STUDENT", "PARENT"]
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.title
