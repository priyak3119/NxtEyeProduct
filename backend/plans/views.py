from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny
from .models import PricingPlan
from .serializers import PricingPlanSerializer

# Admin ViewSet (CRUD)
class PricingPlanViewSet(viewsets.ModelViewSet):
    queryset = PricingPlan.objects.all()
    serializer_class = PricingPlanSerializer
    permission_classes = [AllowAny]  # Can change to IsAdminUser for admin-only

# Public List API
class PricingPlanListView(generics.ListAPIView):
    queryset = PricingPlan.objects.all()
    serializer_class = PricingPlanSerializer
    permission_classes = [AllowAny]
