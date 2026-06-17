from django.db import models
from django.conf import settings
from academics.models import Subject

class TeacherProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='teacher_profile')
    employee_id = models.CharField(max_length=50, unique=True)
    specialization = models.CharField(max_length=100, blank=True)
    qualification = models.CharField(max_length=100, blank=True)
    
    # Loose coupling: Many-to-Many with academics.Subject
    subjects_taught = models.ManyToManyField(Subject, blank=True, related_name='teachers')

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} ({self.employee_id})"
