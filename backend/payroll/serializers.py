from rest_framework import serializers
from .models import Payroll, PayrollAllowance, PayrollDeduction, PayrollPolicy

class PayrollAllowanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PayrollAllowance
        fields = '__all__'

class PayrollDeductionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PayrollDeduction
        fields = '__all__'

class PayrollPolicySerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.name', read_only=True)

    class Meta:
        model = PayrollPolicy
        fields = '__all__'

class PayrollSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.get_full_name', read_only=True)
    employee_code = serializers.CharField(source='employee.emp_code', read_only=True)
    department_name = serializers.CharField(source='employee.department.name', read_only=True)
    allowances = PayrollAllowanceSerializer(many=True, read_only=True)
    deductions = PayrollDeductionSerializer(many=True, read_only=True)
    processed_by_name = serializers.CharField(source='processed_by.get_full_name', read_only=True)

    class Meta:
        model = Payroll
        fields = '__all__'

class PayrollCreateSerializer(serializers.ModelSerializer):
    allowances = PayrollAllowanceSerializer(many=True, write_only=True, required=False)
    deductions = PayrollDeductionSerializer(many=True, write_only=True, required=False)

    class Meta:
        model = Payroll
        fields = '__all__'

    def create(self, validated_data):
        allowances_data = validated_data.pop('allowances', [])
        deductions_data = validated_data.pop('deductions', [])
        
        validated_data['processed_by'] = self.context['request'].user
        payroll = Payroll.objects.create(**validated_data)
        
        # Create allowances
        for allowance_data in allowances_data:
            PayrollAllowance.objects.create(payroll=payroll, **allowance_data)
        
        # Create deductions
        for deduction_data in deductions_data:
            PayrollDeduction.objects.create(payroll=payroll, **deduction_data)
        
        # Calculate payroll
        payroll.calculate_payroll()
        
        return payroll