from django.urls import path
from . import views

urlpatterns = [
    path('', views.InvoiceListCreateView.as_view(), name='invoice-list-create'),
    path('<uuid:pk>/', views.InvoiceDetailView.as_view(), name='invoice-detail'),
    path('stats/', views.invoice_stats, name='invoice-stats'),
    path('generate/', views.generate_invoice, name='generate-invoice'),
]