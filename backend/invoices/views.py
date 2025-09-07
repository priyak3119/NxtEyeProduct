from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django.db.models import Sum, Count, Q
from django.utils import timezone
from datetime import timedelta
from .models import Invoice, InvoiceItem
from .serializers import InvoiceSerializer, InvoiceCreateSerializer

class InvoiceListCreateView(generics.ListCreateAPIView):
    queryset = Invoice.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'company', 'due_date']
    search_fields = ['invoice_number', 'client_name', 'client_email']
    ordering_fields = ['created_at', 'due_date', 'total_amount']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return InvoiceCreateSerializer
        return InvoiceSerializer

class InvoiceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = [permissions.IsAuthenticated]

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def invoice_stats(request):
    """Get invoice statistics"""
    total_invoices = Invoice.objects.count()
    pending_invoices = Invoice.objects.filter(status='pending').count()
    paid_invoices = Invoice.objects.filter(status='paid').count()
    overdue_invoices = Invoice.objects.filter(status='overdue').count()
    
    # Revenue calculations
    total_revenue = Invoice.objects.filter(status='paid').aggregate(
        total=Sum('total_amount')
    )['total'] or 0
    
    pending_amount = Invoice.objects.filter(status='pending').aggregate(
        total=Sum('total_amount')
    )['total'] or 0
    
    # Monthly revenue for last 6 months
    today = timezone.now().date()
    monthly_revenue = []
    for i in range(6):
        month_start = today.replace(day=1) - timedelta(days=30*i)
        month_end = (month_start.replace(day=28) + timedelta(days=4)).replace(day=1) - timedelta(days=1)
        
        month_revenue = Invoice.objects.filter(
            status='paid',
            paid_at__date__range=[month_start, month_end]
        ).aggregate(total=Sum('total_amount'))['total'] or 0
        
        monthly_revenue.append({
            'month': month_start.strftime('%B %Y'),
            'revenue': float(month_revenue)
        })
    
    return Response({
        'total_invoices': total_invoices,
        'pending_invoices': pending_invoices,
        'paid_invoices': paid_invoices,
        'overdue_invoices': overdue_invoices,
        'total_revenue': float(total_revenue),
        'pending_amount': float(pending_amount),
        'monthly_revenue': list(reversed(monthly_revenue))
    })

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def generate_invoice(request):
    """Generate invoice from template or data"""
    # Implementation for invoice generation
    return Response({'message': 'Invoice generation feature to be implemented'})