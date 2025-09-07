from rest_framework import serializers
from .models import Permission, Role, RolePermission, UserRoleAssignment

class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = '__all__'

class RolePermissionSerializer(serializers.ModelSerializer):
    permission_name = serializers.CharField(source='permission.name', read_only=True)
    permission_module = serializers.CharField(source='permission.module', read_only=True)
    permission_action = serializers.CharField(source='permission.action', read_only=True)

    class Meta:
        model = RolePermission
        fields = ['id', 'permission', 'permission_name', 'permission_module', 'permission_action', 'is_enabled']

class RoleSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.name', read_only=True)
    branch_name = serializers.CharField(source='branch.name', read_only=True)
    created_by_name = serializers.CharField(source='created_by.get_full_name', read_only=True)
    role_permissions = RolePermissionSerializer(source='rolepermission_set', many=True, read_only=True)
    permission_count = serializers.SerializerMethodField()

    class Meta:
        model = Role
        fields = '__all__'

    def get_permission_count(self, obj):
        return obj.rolepermission_set.filter(is_enabled=True).count()

class RoleCreateSerializer(serializers.ModelSerializer):
    permissions = serializers.ListField(
        child=serializers.DictField(), 
        write_only=True, 
        required=False
    )

    class Meta:
        model = Role
        fields = '__all__'

    def create(self, validated_data):
        permissions_data = validated_data.pop('permissions', [])
        validated_data['created_by'] = self.context['request'].user
        role = Role.objects.create(**validated_data)
        
        # Create role permissions
        for perm_data in permissions_data:
            try:
                permission = Permission.objects.get(id=perm_data['permission_id'])
                RolePermission.objects.create(
                    role=role,
                    permission=permission,
                    is_enabled=perm_data.get('is_enabled', True)
                )
            except Permission.DoesNotExist:
                continue
        
        return role

class UserRoleAssignmentSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    role_name = serializers.CharField(source='role.name', read_only=True)
    assigned_by_name = serializers.CharField(source='assigned_by.get_full_name', read_only=True)

    class Meta:
        model = UserRoleAssignment
        fields = '__all__'

    def create(self, validated_data):
        validated_data['assigned_by'] = self.context['request'].user
        return super().create(validated_data)