from django.contrib import admin
from .models import Invoice, InvoiceItem

class InvoiceItemInline(admin.TabularInline):
    model = InvoiceItem
    extra = 1

@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ['invoice_number', 'client_name', 'company', 'total_amount', 'status', 'due_date', 'created_at']
    list_filter = ['status', 'company', 'due_date', 'created_at']
    search_fields = ['invoice_number', 'client_name', 'client_email']
    ordering = ['-created_at']
    readonly_fields = ['invoice_number', 'subtotal', 'tax_amount', 'total_amount', 'created_at', 'updated_at']
    inlines = [InvoiceItemInline]

@admin.register(InvoiceItem)
class InvoiceItemAdmin(admin.ModelAdmin):
    list_display = ['description', 'invoice', 'quantity', 'unit_price', 'total']
    list_filter = ['invoice__company', 'created_at']
    search_fields = ['description', 'invoice__invoice_number']