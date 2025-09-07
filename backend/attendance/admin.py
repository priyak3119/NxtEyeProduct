from django.contrib import admin
from .models import Attendance, AttendancePolicy

@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ['employee', 'date', 'check_in', 'check_out', 'status', 'working_hours', 'overtime_hours']
    list_filter = ['status', 'date', 'employee__company', 'employee__branch', 'employee__department']
    search_fields = ['employee__first_name', 'employee__last_name', 'employee__emp_code']
    ordering = ['-date', '-created_at']
    readonly_fields = ['working_hours', 'overtime_hours', 'created_at', 'updated_at']

@admin.register(AttendancePolicy)
class AttendancePolicyAdmin(admin.ModelAdmin):
    list_display = ['name', 'company', 'standard_hours', 'late_threshold', 'overtime_rate', 'is_active']
    list_filter = ['company', 'is_active']
    search_fields = ['name']