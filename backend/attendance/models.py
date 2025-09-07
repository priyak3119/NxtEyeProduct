from django.db import models
from django.contrib.auth import get_user_model
import uuid

User = get_user_model()

class Attendance(models.Model):
    STATUS_CHOICES = [
        ('present', 'Present'),
        ('absent', 'Absent'),
        ('late', 'Late'),
        ('half_day', 'Half Day'),
    ]
    
    id = models.BigAutoField(primary_key=True)
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    employee = models.ForeignKey('employees.Employee', on_delete=models.CASCADE, related_name='attendance_records')
    date = models.DateField()
    check_in = models.TimeField(null=True, blank=True)
    check_out = models.TimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='present')
    working_hours = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    overtime_hours = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    break_hours = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    notes = models.TextField(blank=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'attendance'
        unique_together = ['employee', 'date']
        ordering = ['-date', '-created_at']

    def __str__(self):
        return f"{self.employee.first_name} {self.employee.last_name} - {self.date} ({self.status})"

    def calculate_working_hours(self):
        """Calculate working hours based on check-in and check-out times"""
        if self.check_in and self.check_out:
            from datetime import datetime, timedelta
            check_in_dt = datetime.combine(self.date, self.check_in)
            check_out_dt = datetime.combine(self.date, self.check_out)
            
            # Handle overnight shifts
            if check_out_dt < check_in_dt:
                check_out_dt += timedelta(days=1)
            
            total_time = check_out_dt - check_in_dt
            total_hours = total_time.total_seconds() / 3600
            
            # Subtract break hours
            working_hours = total_hours - float(self.break_hours)
            self.working_hours = max(0, working_hours)
            
            # Calculate overtime (assuming 8 hours is standard)
            if working_hours > 8:
                self.overtime_hours = working_hours - 8
            else:
                self.overtime_hours = 0
            
            self.save()

class AttendancePolicy(models.Model):
    id = models.BigAutoField(primary_key=True)
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company = models.ForeignKey('companies.Company', on_delete=models.CASCADE, related_name='attendance_policies')
    name = models.CharField(max_length=100)
    standard_hours = models.DecimalField(max_digits=5, decimal_places=2, default=8)
    late_threshold = models.IntegerField(default=15)  # minutes
    half_day_threshold = models.DecimalField(max_digits=5, decimal_places=2, default=4)  # hours
    overtime_rate = models.DecimalField(max_digits=5, decimal_places=2, default=1.5)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'attendance_policies'

    def __str__(self):
        return f"{self.name} - {self.company.name}"