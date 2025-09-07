from django.db import models

class Employee(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    company = models.ForeignKey('companies.Company', on_delete=models.SET_NULL, null=True, blank=True)
    branch = models.ForeignKey('companies.Branch', on_delete=models.SET_NULL, null=True, blank=True)
    department = models.ForeignKey('companies.Department', on_delete=models.SET_NULL, null=True, blank=True)
    # Add other fields as needed

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
from django.db import models

# class Employee(models.Model):
#     first_name = models.CharField(max_length=100)
#     last_name = models.CharField(max_length=100)
#     branch = models.ForeignKey('companies.Branch', on_delete=models.SET_NULL, null=True, blank=True)
#     department = models.ForeignKey('companies.Department', on_delete=models.SET_NULL, null=True, blank=True)
#     # Add other fields as needed

#     def __str__(self):
#         return f"{self.first_name} {self.last_name}"