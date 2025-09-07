from django.contrib import admin
from django.utils.crypto import get_random_string
from django.contrib.auth.hashers import make_password
from .models import DemoRequest, PricingPlan, Client, ClientInvoice
from django.contrib.auth import get_user_model

User = get_user_model()

# -----------------------------
# Admin action to convert demo requests
# -----------------------------
@admin.action(description="Convert selected demo requests to clients")
def convert_to_client(modeladmin, request, queryset):
    for demo in queryset:
        if demo.status != 'converted':
            demo.status = 'converted'
            demo.save()  # triggers post_save signal if you have one

            # Create User if not exists
            if not User.objects.filter(email=demo.email).exists():
                raw_password = get_random_string(10)
                user = User.objects.create(
                    email=demo.email,
                    username=demo.email,
                    first_name=demo.first_name,
                    last_name=demo.last_name,
                    password=make_password(raw_password),
                    role='admin',  # as per your workflow
                    is_active=True,  # client can log in once plan activated
                )

                # Create Client
                Client.objects.create(
                    user=user,
                    company_name=demo.company,
                    is_active=False,  # activate after plan assignment
                )

                # Optional: send credentials via email
                print(f"[INFO] Client created: {user.email} / {raw_password}")

# -----------------------------
# Admin registrations
# -----------------------------
@admin.register(DemoRequest)
class DemoRequestAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'email', 'company', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['first_name', 'last_name', 'email', 'company']
    ordering = ['-created_at']
    actions = [convert_to_client]

# @admin.register(PricingPlan)
# class PricingPlanAdmin(admin.ModelAdmin):
#     list_display = ['name', 'price', 'interval', 'is_popular', 'is_active']
#     list_filter = ['interval', 'is_popular', 'is_active']
#     search_fields = ['name', 'description']
#     prepopulated_fields = {'slug': ('name',)}

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ['company_name', 'user', 'pricing_plan', 'is_active', 'created_at']
    list_filter = ['is_active', 'pricing_plan', 'created_at']
    search_fields = ['company_name', 'user__email']
    ordering = ['-created_at']

@admin.register(ClientInvoice)
class ClientInvoiceAdmin(admin.ModelAdmin):
    list_display = ['invoice_number', 'client', 'amount', 'status', 'due_date', 'created_at']
    list_filter = ['status', 'created_at', 'due_date']
    search_fields = ['invoice_number', 'client__company_name']
    ordering = ['-created_at']
