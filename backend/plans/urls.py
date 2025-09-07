from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PricingPlanViewSet, PricingPlanListView

router = DefaultRouter()
router.register(r'pricing-plans', PricingPlanViewSet, basename='pricing-plan')

urlpatterns = [
    path("", include(router.urls)),  # 👈 remove the "api/"
    path("pricing-plans-list/", PricingPlanListView.as_view(), name="pricing-plans-list"),
]
