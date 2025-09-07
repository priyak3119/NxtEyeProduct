from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import (
    DemoRequestViewSet,
    PricingPlanViewSet,
    ClientViewSet,
    ClientInvoiceViewSet,
    dashboard_stats,
    submit_demo_request,
    super_admin_login,
    dashboard_stats
)

router = DefaultRouter()
router.register(r'demo-requests', DemoRequestViewSet, basename='demo-request')
router.register(r'clients', ClientViewSet, basename='client')
router.register(r'invoices', ClientInvoiceViewSet, basename='client-invoice')
router.register(r'pricing-plans', PricingPlanViewSet, basename='pricing-plan')


urlpatterns = [
    # Public demo submission
    path('demo-requests/submit/', submit_demo_request, name='submit-demo-request'),

    # Superadmin endpoints
    path('', include(router.urls)),
    path('dashboard-stats/', dashboard_stats, name='dashboard-stats'),
    path('login/', super_admin_login, name='super_admin_login'),
    # path('super_admin_login/', super_admin_login),  
    path('dashboard-stats/', dashboard_stats, name='dashboard-stats'),
    
    path('super-admin/login/', super_admin_login, name='super-admin-login'),
    path('demo-request/', submit_demo_request, name='submit-demo-request'),
    path('dashboard-stats/', dashboard_stats, name='dashboard-stats'),
    path('', include(router.urls)),
]





