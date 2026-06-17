from django.urls import path, include
from rest_framework.routers import DefaultRouter
from academics.views import GradingScaleViewSet, AttendanceRuleViewSet

router = DefaultRouter()
router.register(r'grading-scales', GradingScaleViewSet, basename='grading-scale')
router.register(r'attendance-rules', AttendanceRuleViewSet, basename='attendance-rule')

urlpatterns = [
    path('', include(router.urls)),
]
