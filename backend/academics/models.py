from django.db import models

class AcademicYear(models.Model):
    name = models.CharField(max_length=20, unique=True)
    start_date = models.DateField()
    end_date = models.DateField()
    current = models.BooleanField(default=False)

class Term(models.Model):
    name = models.CharField(max_length=50)
    start_date = models.DateField()
    end_date = models.DateField()
    academic_year = models.ForeignKey(AcademicYear, on_delete=models.CASCADE, related_name='terms')

class Subject(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20, unique=True)
    description = models.TextField(blank=True, null=True)

class ClassRoom(models.Model):
    name = models.CharField(max_length=50)
    grade_level = models.CharField(max_length=10)
    section = models.CharField(max_length=10, blank=True, null=True)
    academic_year = models.ForeignKey(AcademicYear, on_delete=models.CASCADE, related_name='classes')

    class Meta:
        unique_together = ('name', 'academic_year')

# --- CONFIGURATION MODELS ---

class GradingScale(models.Model):
    """
    Allows schools to define custom grading logic.
    e.g., 'A-Level' -> A*(90-100), A(80-89), B(70-79)
    e.g., 'GPA' -> 4.0(95-100), 3.5(90-94)
    """
    name = models.CharField(max_length=100) # e.g., "Standard Percentage", "IGCSE Grades"
    is_default = models.BooleanField(default=False)
    
    # JSON array defining the bands. 
    # Example: [{"grade": "A", "min_score": 80, "max_score": 100, "gpa": 4.0}, ...]
    rules = models.JSONField(default=list)

class AttendanceRule(models.Model):
    """
    Configures how attendance works for the school.
    """
    track_by = models.CharField(
        max_length=20,
        choices=[('DAILY', 'Daily (Once per day)'), ('SUBJECT', 'Per Subject/Period')],
        default='DAILY'
    )
    minimum_attendance_percentage = models.FloatField(default=75.0)
    late_grace_period_minutes = models.IntegerField(default=15)
