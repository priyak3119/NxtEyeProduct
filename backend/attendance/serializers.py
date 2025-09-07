from rest_framework import serializers
from .models import Attendance, AttendancePolicy

class AttendanceSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.full_name', read_only=True)
    employee_code = serializers.CharField(source='employee.emp_code', read_only=True)
    department_name = serializers.CharField(source='employee.department.name', read_only=True)
    branch_name = serializers.CharField(source='employee.branch.name', read_only=True)

    class Meta:
        model = Attendance
        fields = '__all__'

    def create(self, validated_data):
        validated_data['created_by'] = self.context['request'].user
        attendance = super().create(validated_data)
        attendance.calculate_working_hours()
        return attendance

    def update(self, instance, validated_data):
        attendance = super().update(instance, validated_data)
        attendance.calculate_working_hours()
        return attendance

class AttendancePolicySerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.name', read_only=True)

    class Meta:
        model = AttendancePolicy
        fields = '__all__'

class AttendanceStatsSerializer(serializers.Serializer):
    total_employees = serializers.IntegerField()
    present_today = serializers.IntegerField()
    absent_today = serializers.IntegerField()
    late_today = serializers.IntegerField()
    half_day_today = serializers.IntegerField()
    monthly_attendance = serializers.ListField()
    department_wise_attendance = serializers.ListField()
    attendance_trends = serializers.ListField()

class BulkAttendanceUpdateSerializer(serializers.Serializer):
    attendance_records = serializers.ListField(
        child=serializers.DictField()
    )

    def validate_attendance_records(self, value):
        for record in value:
            if 'employee_id' not in record or 'date' not in record or 'status' not in record:
                raise serializers.ValidationError("Each record must have employee_id, date, and status")
        return value