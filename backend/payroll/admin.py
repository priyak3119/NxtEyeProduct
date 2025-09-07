from django.contrib import admin
from .models import Payroll, PayrollAllowance, PayrollDeduction, PayrollPolicy

class PayrollAllowanceInline(admin.TabularInline):
    model = PayrollAllowance
    extra = 1

class PayrollDeductionInline(admin.TabularInline):
    model = PayrollDeduction
    extra = 1

@admin.register(Payroll)
class PayrollAdmin(admin.ModelAdmin):
    list_display = ['employee', 'month', 'year', 'basic_salary', 'net_salary', 'status', 'created_at']
    list_filter = ['status', 'month', 'year', 'employee__company', 'employee__department']
    search_fields = ['employee__first_name', 'employee__last_name', 'employee__emp_code']
    ordering = ['-created_at']
    readonly_fields = ['gross_salary', 'total_deductions', 'net_salary', 'created_at', 'updated_at']
    inlines = [PayrollAllowanceInline, PayrollDeductionInline]

@admin.register(PayrollPolicy)
class PayrollPolicyAdmin(admin.ModelAdmin):
    list_display = ['name', 'company', 'overtime_rate', 'tax_rate', 'is_active']
    list_filter = ['company', 'is_active']
    search_fields = ['name']

@admin.register(PayrollAllowance)
class PayrollAllowanceAdmin(admin.ModelAdmin):
    list_display = ['name', 'payroll', 'allowance_type', 'amount', 'is_taxable']
    list_filter = ['allowance_type', 'is_taxable']
    search_fields = ['name', 'payroll__employee__first_name']

@admin.register(PayrollDeduction)
class PayrollDeductionAdmin(admin.ModelAdmin):
    list_display = ['name', 'payroll', 'deduction_type', 'amount']
    list_filter = ['deduction_type']
    search_fields = ['name', 'payroll__employee__first_name']