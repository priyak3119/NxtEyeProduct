from django.db import models
from django_countries.fields import CountryField
import uuid

class Region(models.Model):
    id = models.BigAutoField(primary_key=True)
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    country = CountryField(blank=True, null=True)  
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10, unique=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'regions'

    def __str__(self):
        return f"{self.name} ({self.country})"

    
class State(models.Model):
    id = models.BigAutoField(primary_key=True)
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    region = models.ForeignKey(Region, on_delete=models.CASCADE, related_name="states")
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10)

    class Meta:
        db_table = 'states'
        unique_together = ['region', 'code']

    def __str__(self):
        return f"{self.name} ({self.region.name})"

    

class Company(models.Model):
    id = models.BigAutoField(primary_key=True)
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    country = CountryField(blank_label='(select country)', null=True, blank=True)
    state_province = models.CharField(max_length=20, blank=True, null=True)
    reg_number = models.CharField(max_length=50, unique=True)
    contact_person = models.CharField(max_length=100)
    mobile = models.CharField(max_length=15)
    email = models.EmailField()
    username = models.CharField(max_length=50, unique=True)
    address = models.TextField(blank=True)
    city = models.CharField(max_length=100, blank=True)
    street = models.CharField(max_length=200, blank=True)
    po_box = models.CharField(max_length=20, blank=True)
    website = models.URLField(blank=True)
    phone = models.CharField(max_length=15, blank=True)
    logo = models.ImageField(upload_to='company_logos/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'companies'
        verbose_name_plural = 'Companies'

    def __str__(self):
        return self.name

class Branch(models.Model):
    id = models.BigAutoField(primary_key=True)
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='branches')
    name = models.CharField(max_length=200)
    region = models.ForeignKey(Region, on_delete=models.SET_NULL, null=True, related_name="branches")
    # region = models.CharField(max_length=100)
    state_province = models.CharField(max_length=20, blank=True, null=True)
    reg_number = models.CharField(max_length=50)
    contact_person = models.CharField(max_length=100)
    mobile = models.CharField(max_length=15)
    email = models.EmailField()
    username = models.CharField(max_length=50, unique=True)
    address = models.TextField(blank=True)
    city = models.CharField(max_length=100, blank=True)
    street = models.CharField(max_length=200, blank=True)
    po_box = models.CharField(max_length=20, blank=True)
    website = models.URLField(blank=True)
    phone = models.CharField(max_length=15, blank=True)
    manager = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'branches'

    def __str__(self):
        return f"{self.name} - {self.company.name}"

class Department(models.Model):
    id = models.BigAutoField(primary_key=True)
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='departments')
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name='departments')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    head_of_department = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'departments'
        unique_together = ['company', 'branch', 'name']

    def __str__(self):
        return f"{self.name} - {self.branch.name}"

class CompanyDocument(models.Model):
    id = models.BigAutoField(primary_key=True)
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='documents')
    name = models.CharField(max_length=200)
    document = models.FileField(upload_to='company_documents/')
    document_type = models.CharField(max_length=50, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'company_documents'

    def __str__(self):
        return f"{self.name} - {self.company.name}"

class BranchDocument(models.Model):
    id = models.BigAutoField(primary_key=True)
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name='documents')
    name = models.CharField(max_length=200)
    document = models.FileField(upload_to='branch_documents/')
    document_type = models.CharField(max_length=50, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'branch_documents'

    def __str__(self):
        return f"{self.name} - {self.branch.name}"

class CustomField(models.Model):
    FIELD_TYPES = [
        ('text', 'Text'),
        ('number', 'Number'),
        ('date', 'Date'),
        ('select', 'Select'),
        ('textarea', 'Textarea'),
    ]
    
    ENTITY_TYPES = [
        ('company', 'Company'),
        ('branch', 'Branch'),
        ('department', 'Department'),
    ]
    id = models.BigAutoField(primary_key=True)
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    entity_type = models.CharField(max_length=20, choices=ENTITY_TYPES)
    entity_id = models.BigIntegerField()
    # entity_id = models.UUIDField()
    field_name = models.CharField(max_length=100)
    field_type = models.CharField(max_length=20, choices=FIELD_TYPES)
    field_value = models.TextField(blank=True)
    field_options = models.JSONField(blank=True, null=True)  # For select type fields
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'custom_fields'
        unique_together = ['entity_type', 'entity_id', 'field_name']

    def __str__(self):
        return f"{self.field_name} - {self.entity_type}"