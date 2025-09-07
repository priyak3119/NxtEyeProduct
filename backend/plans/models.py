from django.db import models

class PricingPlan(models.Model):
    PLAN_INTERVALS = [
        ('monthly', 'Monthly'),
        ('yearly', 'Yearly'),
    ]

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    interval = models.CharField(max_length=10, choices=PLAN_INTERVALS)
    description = models.TextField()
    popular = models.BooleanField(default=False)
    features = models.JSONField(default=list)  # List of features
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
