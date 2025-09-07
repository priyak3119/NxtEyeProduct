"""
URL configuration for business_management project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/companies/', include('companies.urls')),
    # path('api/branches/', include('branches.urls')),
    # path('api/departments/', include('departments.urls')),
    
    path('api/employees/', include('employees.urls')),
    path('api/attendance/', include('attendance.urls')),
    path('api/invoices/', include('invoices.urls')),
    path('api/roles/', include('roles.urls')),
    path('api/notifications/', include('notifications.urls')),
    path('api/super-admin/', include('superadmin.urls')),
    # path('api/', include('demorequest.urls')),
    path('api/plans/', include('plans.urls')), 
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)