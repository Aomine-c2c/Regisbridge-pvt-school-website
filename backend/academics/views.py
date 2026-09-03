from rest_framework import viewsets
from .models import GradingScale, AttendanceRule, AcademicYear, Term, Subject, ClassRoom
from .serializers import (
    GradingScaleSerializer,
    AttendanceRuleSerializer,
    AcademicYearSerializer,
    TermSerializer,
    SubjectSerializer,
    ClassRoomSerializer
)

class GradingScaleViewSet(viewsets.ModelViewSet):
    queryset = GradingScale.objects.all()
    serializer_class = GradingScaleSerializer

class AttendanceRuleViewSet(viewsets.ModelViewSet):
    queryset = AttendanceRule.objects.all()
    serializer_class = AttendanceRuleSerializer

class AcademicYearViewSet(viewsets.ModelViewSet):
    queryset = AcademicYear.objects.all()
    serializer_class = AcademicYearSerializer

class TermViewSet(viewsets.ModelViewSet):
    queryset = Term.objects.all()
    serializer_class = TermSerializer

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class ClassRoomViewSet(viewsets.ModelViewSet):
    queryset = ClassRoom.objects.all()
    serializer_class = ClassRoomSerializer
