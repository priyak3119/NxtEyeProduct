from django.contrib import admin
from django import forms
from .models import PricingPlan

class PricingPlanForm(forms.ModelForm):
    # Override the features field to be a simple CharField in admin
    features = forms.CharField(
        widget=forms.Textarea,
        required=False,
        help_text="Enter features separated by commas. Example: Feature 1, Feature 2, Feature 3"
    )

    class Meta:
        model = PricingPlan
        fields = '__all__'

    def clean_features(self):
        features_str = self.cleaned_data.get('features', '')
        if not features_str:
            return []
        return [f.strip() for f in features_str.split(',')]

@admin.register(PricingPlan)
class PricingPlanAdmin(admin.ModelAdmin):
    form = PricingPlanForm
    list_display = ['name', 'price', 'interval', 'popular', 'get_features', 'created_at']

    def get_features(self, obj):
        return ", ".join(obj.features)
    get_features.short_description = "Features"
