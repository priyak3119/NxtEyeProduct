from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django.db.models import Count, Q, Avg
from django.utils import timezone
from datetime import datetime, timedelta
from .models import Attendance, AttendancePolicy
from .serializers import (
    AttendanceSerializer, 
    AttendancePolicySerializer,
    BulkAttendanceUpdateSerializer
)

class AttendanceListCreateView(generics.ListCreateAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['employee', 'date', 'status', 'employee__company', 'employee__branch', 'employee__department']
    search_fields = ['employee__first_name', 'employee__last_name', 'employee__emp_code']
    ordering_fields = ['date', 'created_at']
    ordering = ['-date']

class AttendanceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = [permissions.IsAuthenticated]

class AttendancePolicyListCreateView(generics.ListCreateAPIView):
    queryset = AttendancePolicy.objects.all()
    serializer_class = AttendancePolicySerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['company', 'is_active']

class AttendancePolicyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = AttendancePolicy.objects.all()
    serializer_class = AttendancePolicySerializer
    permission_classes = [permissions.IsAuthenticated]

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def attendance_stats(request):
    """Get attendance statistics"""
    today = timezone.now().date()
    
    # Today's stats
    today_attendance = Attendance.objects.filter(date=today)
    present_today = today_attendance.filter(status='present').count()
    absent_today = today_attendance.filter(status='absent').count()
    late_today = today_attendance.filter(status='late').count()
    half_day_today = today_attendance.filter(status='half_day').count()
    
    # Total employees
    from employees.models import Employee
    total_employees = Employee.objects.filter(is_active=True).count()
    
    # Monthly attendance for last 6 months
    monthly_data = []
    for i in range(6):
        month_start = today.replace(day=1) - timedelta(days=30*i)
        month_end = (month_start.replace(day=28) + timedelta(days=4)).replace(day=1) - timedelta(days=1)
        
        month_attendance = Attendance.objects.filter(
            date__range=[month_start, month_end]
        ).aggregate(
            present=Count('id', filter=Q(status='present')),
            absent=Count('id', filter=Q(status='absent')),
            late=Count('id', filter=Q(status='late'))
        )
        
        monthly_data.append({
            'month': month_start.strftime('%B %Y'),
            'present': month_attendance['present'],
            'absent': month_attendance['absent'],
            'late': month_attendance['late']
        })
    
    # Department wise attendance
    dept_attendance = Attendance.objects.filter(
        date=today
    ).values(
        'employee__department__name'
    ).annotate(
        present=Count('id', filter=Q(status='present')),
        absent=Count('id', filter=Q(status='absent')),
        total=Count('id')
    )
    
    return Response({
        'total_employees': total_employees,
        'present_today': present_today,
        'absent_today': absent_today,
        'late_today': late_today,
        'half_day_today': half_day_today,
        'monthly_attendance': list(reversed(monthly_data)),
        'department_wise_attendance': list(dept_attendance),
        'attendance_percentage': round((present_today / total_employees * 100) if total_employees > 0 else 0, 2)
    })

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def attendance_charts(request):
    """Get attendance data for charts"""
    company_id = request.GET.get('company')
    branch_id = request.GET.get('branch')
    date_from = request.GET.get('date_from')
    date_to = request.GET.get('date_to')
    
    # Base queryset
    queryset = Attendance.objects.all()
    
    # Apply filters
    if company_id:
        queryset = queryset.filter(employee__company_id=company_id)
    if branch_id:
        queryset = queryset.filter(employee__branch_id=branch_id)
    if date_from:
        queryset = queryset.filter(date__gte=date_from)
    if date_to:
        queryset = queryset.filter(date__lte=date_to)
    
    # Status distribution
    status_data = queryset.values('status').annotate(count=Count('id'))
    
    # Daily attendance for last 30 days
    today = timezone.now().date()
    daily_data = []
    for i in range(30):
        date = today - timedelta(days=i)
        day_attendance = queryset.filter(date=date).aggregate(
            present=Count('id', filter=Q(status='present')),
            absent=Count('id', filter=Q(status='absent')),
            late=Count('id', filter=Q(status='late'))
        )
        daily_data.append({
            'date': date.strftime('%Y-%m-%d'),
            'present': day_attendance['present'],
            'absent': day_attendance['absent'],
            'late': day_attendance['late']
        })
    
    return Response({
        'status_distribution': list(status_data),
        'daily_attendance': list(reversed(daily_data))
    })

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def bulk_update_attendance(request):
    """Bulk update attendance records"""
    serializer = BulkAttendanceUpdateSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    
    attendance_records = serializer.validated_data['attendance_records']
    updated_count = 0
    
    for record_data in attendance_records:
        try:
            attendance, created = Attendance.objects.update_or_create(
                employee_id=record_data['employee_id'],
                date=record_data['date'],
                defaults={
                    'status': record_data['status'],
                    'check_in': record_data.get('check_in'),
                    'check_out': record_data.get('check_out'),
                    'notes': record_data.get('notes', ''),
                    'created_by': request.user
                }
            )
            if attendance.check_in and attendance.check_out:
                attendance.calculate_working_hours()
            updated_count += 1
        except Exception as e:
            continue
    
    return Response({
        'message': f'{updated_count} attendance records updated successfully',
        'updated_count': updated_count
    })