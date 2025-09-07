from django.urls import path
from . import views

urlpatterns = [
    path('', views.AttendanceListCreateView.as_view(), name='attendance-list-create'),
    path('<uuid:pk>/', views.AttendanceDetailView.as_view(), name='attendance-detail'),
    path('stats/', views.attendance_stats, name='attendance-stats'),
    path('charts/', views.attendance_charts, name='attendance-charts'),
    path('bulk-update/', views.bulk_update_attendance, name='bulk-update-attendance'),
    path('policies/', views.AttendancePolicyListCreateView.as_view(), name='attendance-policy-list'),
    path('policies/<uuid:pk>/', views.AttendancePolicyDetailView.as_view(), name='attendance-policy-detail'),
]