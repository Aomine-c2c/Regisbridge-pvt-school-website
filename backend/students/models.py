from django.db import models
from django.conf import settings
from academics.models import ClassRoom

class StudentProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='student_profile')
    admission_number = models.CharField(max_length=50, unique=True)
    enrollment_date = models.DateField(auto_now_add=True)
    
    # Generic reference for loose coupling (instead of strict FK if needed, but since academics is core, FK is fine)
    current_class = models.ForeignKey(ClassRoom, on_delete=models.SET_NULL, null=True, blank=True)
    
    parent_name = models.CharField(max_length=100, blank=True)
    parent_email = models.EmailField(blank=True)
    parent_phone = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} ({self.admission_number})"
