from django.urls import path
from . import views

urlpatterns = [
    path('', views.PayrollListCreateView.as_view(), name='payroll-list-create'),
    path('<uuid:pk>/', views.PayrollDetailView.as_view(), name='payroll-detail'),
    path('stats/', views.payroll_stats, name='payroll-stats'),
    path('process/', views.process_payroll, name='process-payroll'),
    path('<uuid:pk>/mark-paid/', views.mark_payroll_paid, name='mark-payroll-paid'),
    path('policies/', views.PayrollPolicyListCreateView.as_view(), name='payroll-policy-list'),
    path('policies/<uuid:pk>/', views.PayrollPolicyDetailView.as_view(), name='payroll-policy-detail'),
]