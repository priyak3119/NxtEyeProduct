from rest_framework import serializers
from .models import DemoRequest, PricingPlan, Client, ClientInvoice
from accounts.serializers import UserSerializer

class DemoRequestSerializer(serializers.ModelSerializer):
    processed_by_name = serializers.CharField(source='processed_by.get_full_name', read_only=True)
    class Meta:
        model = DemoRequest
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']

class PricingPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = PricingPlan
        fields = ['id', 'name', 'slug', 'description', 'price', 'interval', 'popular', 'features']
        read_only_fields = ['id', 'created_at', 'updated_at']


class ClientSerializer(serializers.ModelSerializer):
    user_details = UserSerializer(source='user', read_only=True)
    pricing_plan_details = PricingPlanSerializer(source='pricing_plan', read_only=True)
    class Meta:
        model = Client
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']

class ClientInvoiceSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(source='client.company_name', read_only=True)
    pricing_plan_name = serializers.CharField(source='pricing_plan.name', read_only=True)
    class Meta:
        model = ClientInvoice
        fields = '__all__'
        read_only_fields = ['id', 'invoice_number', 'created_at', 'updated_at']
