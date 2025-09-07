import uuid
import json
from rest_framework import serializers
from .models import (
    Region, State, Company, Branch, Department,
    CompanyDocument, BranchDocument, CustomField
)

# -----------------------------
# Region / State
# -----------------------------
class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ['id', 'name', 'code']

class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = ['id', 'name', 'code', 'region']

# -----------------------------
# Documents / Custom Fields
# -----------------------------
class CompanyDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyDocument
        fields = ['id', 'name', 'document', 'document_type', 'uploaded_at']

class BranchDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = BranchDocument
        fields = ['id', 'name', 'document', 'document_type', 'uploaded_at']

class CustomFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomField
        fields = ['id', 'field_name', 'field_type', 'field_value', 'field_options']

# -----------------------------
# Company / Branch Serializers
# -----------------------------
class CompanySerializer(serializers.ModelSerializer):
    documents = CompanyDocumentSerializer(many=True, read_only=True)
    custom_fields = serializers.SerializerMethodField()
    branch_count = serializers.SerializerMethodField()
    department_count = serializers.SerializerMethodField()

    class Meta:
        model = Company
        fields = '__all__'

    def get_custom_fields(self, obj):
        return CustomFieldSerializer(
            CustomField.objects.filter(entity_type='company', entity_id=obj.id),
            many=True
        ).data

    def get_branch_count(self, obj):
        return obj.branches.filter(is_active=True).count()

    def get_department_count(self, obj):
        return obj.departments.filter(is_active=True).count()

class BranchSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.name', read_only=True)
    documents = BranchDocumentSerializer(many=True, read_only=True)
    custom_fields = serializers.SerializerMethodField()
    department_count = serializers.SerializerMethodField()

    class Meta:
        model = Branch
        fields = '__all__'

    def get_custom_fields(self, obj):
        return CustomFieldSerializer(
            CustomField.objects.filter(entity_type='branch', entity_id=obj.id),
            many=True
        ).data

    def get_department_count(self, obj):
        return obj.departments.filter(is_active=True).count()

# -----------------------------
# Create Serializers (POST)
# -----------------------------

class CompanyCreateSerializer(serializers.ModelSerializer):
    documents = CompanyDocumentSerializer(many=True, required=False)
    custom_fields = CustomFieldSerializer(many=True, required=False)

    class Meta:
        model = Company
        fields = '__all__'

    def create(self, validated_data):
        documents_data = validated_data.pop('documents', [])
        custom_fields_data = validated_data.pop('custom_fields', [])

        # ✅ state_province will still be in validated_data here
        if not validated_data.get('username'):
            validated_data['username'] = (
                validated_data['name'].lower().replace(' ', '_')
                + '_' + str(uuid.uuid4())[:8]
            )

        # Create the company row (including state_province)
        company = Company.objects.create(**validated_data)

        # Save related documents
        for doc_data in documents_data:
            CompanyDocument.objects.create(company=company, **doc_data)

        # Save related custom fields
        for field_data in custom_fields_data:
            CustomField.objects.create(
                entity_type='company',
                entity_id=company.id,
                **field_data
            )

        return company


# class CompanyCreateSerializer(serializers.ModelSerializer):
#     documents = serializers.ListField(
#         child=serializers.FileField(), write_only=True, required=False
#     )
#     custom_fields = serializers.ListField(
#         child=serializers.DictField(), write_only=True, required=False
#     )

#     class Meta:
#         model = Company
#         fields = '__all__'

#     def create(self, validated_data):
#         documents_data = validated_data.pop('documents', [])
#         custom_fields_data = validated_data.pop('custom_fields', [])

#         if not validated_data.get('username'):
#             validated_data['username'] = validated_data['name'].lower().replace(' ', '_') + '_' + str(uuid.uuid4())[:8]

#         company = Company.objects.create(**validated_data)

#         for doc in documents_data:
#             CompanyDocument.objects.create(
#                 company=company,
#                 name=doc.name,
#                 document=doc
#             )

#         for field_data in custom_fields_data:
#             CustomField.objects.create(
#                 entity_type='company',
#                 entity_id=company.id,
#                 **field_data
#             )

#         return company

# class BranchCreateSerializer(serializers.ModelSerializer):
#     documents = serializers.ListField(
#         child=serializers.FileField(), write_only=True, required=False
#     )
#     custom_fields = serializers.ListField(
#         child=serializers.DictField(), write_only=True, required=False
#     )

#     class Meta:
#         model = Branch
#         fields = '__all__'

#     def create(self, validated_data):
#         documents_data = validated_data.pop('documents', [])
#         custom_fields_data = validated_data.pop('custom_fields', [])

#         if not validated_data.get('username'):
#             validated_data['username'] = validated_data['name'].lower().replace(' ', '_') + '_' + str(uuid.uuid4())[:8]

#         branch = Branch.objects.create(**validated_data)

#         for doc in documents_data:
#             BranchDocument.objects.create(
#                 branch=branch,
#                 name=doc.name,
#                 document=doc
#             )

#         for field_data in custom_fields_data:
#             CustomField.objects.create(
#                 entity_type='branch',
#                 entity_id=branch.id,
#                 **field_data
#             )

#         return branch


class BranchCreateSerializer(serializers.ModelSerializer):
    documents = serializers.ListField(
        child=serializers.FileField(), write_only=True, required=False
    )
    custom_fields = serializers.ListField(
        child=serializers.DictField(), write_only=True, required=False
    )

    class Meta:
        model = Branch
        fields = '__all__'

    def create(self, validated_data):
        documents_data = validated_data.pop('documents', [])
        custom_fields_data = validated_data.pop('custom_fields', [])

        # Extract state_province if it's in the payload
        state_province_id = validated_data.pop('state_province', None)

        if not validated_data.get('username'):
            validated_data['username'] = (
                validated_data['name'].lower().replace(' ', '_')
                + '_' + str(uuid.uuid4())[:8]
            )

        branch = Branch.objects.create(**validated_data)

        # Assign state_province (if provided)
        if state_province_id:
            branch.state_province_id = state_province_id
            branch.save()

        # Save branch documents
        for doc in documents_data:
            BranchDocument.objects.create(
                branch=branch,
                name=doc.name,
                document=doc
            )

        # Save custom fields
        for field_data in custom_fields_data:
            CustomField.objects.create(
                entity_type='branch',
                entity_id=branch.id,
                **field_data
            )

        return branch
