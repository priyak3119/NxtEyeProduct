from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django.db.models import Sum, Count, Avg
from django.utils import timezone
from .models import Payroll, PayrollAllowance, PayrollDeduction, PayrollPolicy
from .serializers import (
    PayrollSerializer, 
    PayrollCreateSerializer,
    PayrollPolicySerializer,
    PayrollAllowanceSerializer,
    PayrollDeductionSerializer
)

class PayrollListCreateView(generics.ListCreateAPIView):
    queryset = Payroll.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['employee', 'month', 'year', 'status', 'employee__company', 'employee__branch']
    search_fields = ['employee__first_name', 'employee__last_name', 'employee__emp_code']
    ordering_fields = ['created_at', 'month', 'year', 'net_salary']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return PayrollCreateSerializer
        return PayrollSerializer

class PayrollDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Payroll.objects.all()
    serializer_class = PayrollSerializer
    permission_classes = [permissions.IsAuthenticated]

class PayrollPolicyListCreateView(generics.ListCreateAPIView):
    queryset = PayrollPolicy.objects.all()
    serializer_class = PayrollPolicySerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['company', 'is_active']

class PayrollPolicyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PayrollPolicy.objects.all()
    serializer_class = PayrollPolicySerializer
    permission_classes = [permissions.IsAuthenticated]

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def payroll_stats(request):
    """Get payroll statistics"""
    total_payrolls = Payroll.objects.count()
    processed_payrolls = Payroll.objects.filter(status='processed').count()
    paid_payrolls = Payroll.objects.filter(status='paid').count()
    
    # Total payroll amount
    total_amount = Payroll.objects.filter(status='paid').aggregate(
        total=Sum('net_salary')
    )['total'] or 0
    
    # Average salary
    avg_salary = Payroll.objects.filter(status='paid').aggregate(
        avg=Avg('net_salary')
    )['avg'] or 0
    
    # Monthly payroll for last 6 months
    from datetime import datetime, timedelta
    today = timezone.now().date()
    monthly_payroll = []
    
    for i in range(6):
        month_date = today.replace(day=1) - timedelta(days=30*i)
        month_name = month_date.strftime('%B')
        year = month_date.year
        
        month_total = Payroll.objects.filter(
            month=month_name,
            year=year,
            status='paid'
        ).aggregate(total=Sum('net_salary'))['total'] or 0
        
        monthly_payroll.append({
            'month': f"{month_name} {year}",
            'amount': float(month_total)
        })
    
    # Department wise payroll
    dept_payroll = Payroll.objects.filter(status='paid').values(
        'employee__department__name'
    ).annotate(
        total_amount=Sum('net_salary'),
        employee_count=Count('employee', distinct=True)
    ).order_by('-total_amount')
    
    return Response({
        'total_payrolls': total_payrolls,
        'processed_payrolls': processed_payrolls,
        'paid_payrolls': paid_payrolls,
        'total_amount': float(total_amount),
        'average_salary': float(avg_salary),
        'monthly_payroll': list(reversed(monthly_payroll)),
        'department_wise_payroll': list(dept_payroll)
    })

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def process_payroll(request):
    """Process payroll for multiple employees"""
    employee_ids = request.data.get('employee_ids', [])
    month = request.data.get('month')
    year = request.data.get('year')
    
    if not employee_ids or not month or not year:
        return Response(
            {'error': 'employee_ids, month, and year are required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    processed_count = 0
    errors = []
    
    for employee_id in employee_ids:
        try:
            from employees.models import Employee
            employee = Employee.objects.get(id=employee_id)
            
            # Check if payroll already exists
            payroll, created = Payroll.objects.get_or_create(
                employee=employee,
                month=month,
                year=year,
                defaults={
                    'basic_salary': employee.salary,
                    'status': 'processed',
                    'processed_by': request.user,
                    'processed_at': timezone.now()
                }
            )
            
            if created:
                payroll.calculate_payroll()
                processed_count += 1
            
        except Employee.DoesNotExist:
            errors.append(f"Employee {employee_id} not found")
        except Exception as e:
            errors.append(f"Error processing employee {employee_id}: {str(e)}")
    
    return Response({
        'message': f'{processed_count} payrolls processed successfully',
        'processed_count': processed_count,
        'errors': errors
    })

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def mark_payroll_paid(request, pk):
    """Mark payroll as paid"""
    try:
        payroll = Payroll.objects.get(id=pk)
        payroll.status = 'paid'
        payroll.paid_at = timezone.now()
        payroll.save()
        
        return Response({'message': 'Payroll marked as paid'})
    except Payroll.DoesNotExist:
        return Response({'error': 'Payroll not found'}, status=status.HTTP_404_NOT_FOUND)