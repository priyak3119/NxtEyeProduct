from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
import uuid
from django.utils import timezone

from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, username, first_name, last_name, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, first_name=first_name, last_name=last_name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, first_name, last_name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        # Automatically set role as super_admin
        extra_fields.setdefault('role', 'super_admin')

        if extra_fields.get('role') != 'super_admin':
            raise ValueError('Superuser must have role=super_admin.')

        return self.create_user(email, username, first_name, last_name, password, **extra_fields)


class User(AbstractUser):
    ROLE_CHOICES = [
        ('super_admin', 'Super Admin'),
        ('admin', 'Admin'),
        ('user', 'User'),
        ('employee', 'Employee'),
    ]
    
    id = models.BigAutoField(primary_key=True)
    email = models.EmailField(unique=True, max_length=191)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30) 
    mobile = models.CharField(max_length=15, blank=True, null=True)
    profile_image = models.ImageField(upload_to='profiles/', blank=True, null=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
    is_active = models.BooleanField(default=True)
    company = models.ForeignKey('companies.Company', on_delete=models.SET_NULL, null=True, blank=True)
    branch = models.ForeignKey('companies.Branch', on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()  # <--- attach the custom manager

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    class Meta:
        db_table = 'users'

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"


# class User(AbstractUser):
#     ROLE_CHOICES = [
#         ('super_admin', 'Super Admin'),
#         ('admin', 'Admin'),
#         ('user', 'User'),
#         ('employee', 'Employee'),
#     ]
#     id = models.BigAutoField(primary_key=True)
#     # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     email = models.EmailField(unique=True, max_length=191)  # safe for MySQL utf8mb4
#     first_name = models.CharField(max_length=30)
#     last_name = models.CharField(max_length=30) 
#     mobile = models.CharField(max_length=15, blank=True, null=True)
#     profile_image = models.ImageField(upload_to='profiles/', blank=True, null=True)
#     role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
#     is_active = models.BooleanField(default=True)
#     company = models.ForeignKey('companies.Company', on_delete=models.SET_NULL, null=True, blank=True)
#     branch = models.ForeignKey('companies.Branch', on_delete=models.SET_NULL, null=True, blank=True)
#     created_at = models.DateTimeField(default=timezone.now, editable=False)
#     updated_at = models.DateTimeField(auto_now=True)

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

#     class Meta:
#         db_table = 'users'

#     def __str__(self):
#         return f"{self.first_name} {self.last_name} ({self.email})"


class UserRole(models.Model):
    id = models.BigAutoField(primary_key=True)
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_roles')
    role = models.ForeignKey('roles.Role', on_delete=models.CASCADE)
    assigned_at = models.DateTimeField(default=timezone.now, editable=False)
    assigned_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='assigned_roles')
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'user_roles'
        unique_together = ['user', 'role']

    def __str__(self):
        return f"{self.user.email} - {self.role.name}"
