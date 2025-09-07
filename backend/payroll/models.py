from django.db import models
from django.contrib.auth import get_user_model
import uuid

User = get_user_model()

class PayrollPolicy(models.Model):
    id = models.BigAutoField(primary_key=True)
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company = models.ForeignKey('companies.Company', on_delete=models.CASCADE, related_name='payroll_policies')
    name = models.CharField(max_length=100)
    basic_salary_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=100)
    overtime_rate = models.DecimalField(max_digits=5, decimal_places=2, default=1.5)
    tax_rate = models.DecimalField(max_digits=5, decimal_places=2, default=10)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'payroll_policies'

    def __str__(self):
        return f"{self.name} - {self.company.name}"

class Payroll(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('processed', 'Processed'),
        ('paid', 'Paid'),
        ('cancelled', 'Cancelled'),
    ]
    id = models.BigAutoField(primary_key=True)
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    employee = models.ForeignKey('employees.Employee', on_delete=models.CASCADE, related_name='payrolls')
    month = models.CharField(max_length=20)
    year = models.IntegerField()
    basic_salary = models.DecimalField(max_digits=12, decimal_places=2)
    overtime_hours = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    overtime_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    gross_salary = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total_deductions = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    net_salary = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    processed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    processed_at = models.DateTimeField(null=True, blank=True)
    paid_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'payrolls'
        unique_together = ['employee', 'month', 'year']
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.employee.first_name} {self.employee.last_name} - {self.month} {self.year}"

    def calculate_payroll(self):
        """Calculate payroll amounts"""
        # Calculate overtime
        if self.overtime_hours > 0:
            hourly_rate = self.basic_salary / 160  # Assuming 160 hours per month
            self.overtime_amount = self.overtime_hours * hourly_rate * 1.5
        
        # Calculate gross salary
        self.gross_salary = self.basic_salary + self.overtime_amount
        
        # Calculate allowances
        allowances_total = self.allowances.aggregate(
            total=models.Sum('amount')
        )['total'] or 0
        
        # Calculate deductions
        deductions_total = self.deductions.aggregate(
            total=models.Sum('amount')
        )['total'] or 0
        
        self.total_deductions = deductions_total
        
        # Calculate net salary
        self.net_salary = self.gross_salary + allowances_total - self.total_deductions
        
        self.save()

class PayrollAllowance(models.Model):
    ALLOWANCE_TYPES = [
        ('transport', 'Transport Allowance'),
        ('medical', 'Medical Allowance'),
        ('food', 'Food Allowance'),
        ('housing', 'Housing Allowance'),
        ('bonus', 'Bonus'),
        ('other', 'Other'),
    ]
    id = models.BigAutoField(primary_key=True)
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    payroll = models.ForeignKey(Payroll, on_delete=models.CASCADE, related_name='allowances')
    allowance_type = models.CharField(max_length=20, choices=ALLOWANCE_TYPES)
    name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    is_taxable = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'payroll_allowances'

    def __str__(self):
        return f"{self.name} - {self.payroll.employee.first_name}"

class PayrollDeduction(models.Model):
    DEDUCTION_TYPES = [
        ('tax', 'Income Tax'),
        ('insurance', 'Insurance'),
        ('provident_fund', 'Provident Fund'),
        ('loan', 'Loan Deduction'),
        ('advance', 'Advance Deduction'),
        ('other', 'Other'),
    ]
    id = models.BigAutoField(primary_key=True)
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    payroll = models.ForeignKey(Payroll, on_delete=models.CASCADE, related_name='deductions')
    deduction_type = models.CharField(max_length=20, choices=DEDUCTION_TYPES)
    name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'payroll_deductions'

    def __str__(self):
        return f"{self.name} - {self.payroll.employee.first_name}"