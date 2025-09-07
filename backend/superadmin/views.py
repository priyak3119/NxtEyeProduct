from rest_framework import viewsets, status, permissions
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.db import models
from .models import DemoRequest, PricingPlan, Client, ClientInvoice
from .serializers import DemoRequestSerializer, PricingPlanSerializer, ClientSerializer, ClientInvoiceSerializer
from accounts.serializers import UserLoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .permissions import IsSuperAdmin

User = get_user_model()

# ------------------------------
# Public Endpoints
# ------------------------------

@api_view(['POST'])
@permission_classes([AllowAny])
def super_admin_login(request):
    serializer = UserLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']

    if user.role != 'super_admin':
        return Response({'error': 'Super admin access required'}, status=status.HTTP_403_FORBIDDEN)

    refresh = RefreshToken.for_user(user)

    user_data = {
        'id': user.id,
        'email': user.email,
        'role': user.role,
        'name': user.get_full_name(),
        'roles': [{"name": "super_admin"}]
    }
    return Response({
        'user': user_data,
        'tokens': {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
    })

@api_view(['POST'])
@permission_classes([AllowAny])
def submit_demo_request(request):
    serializer = DemoRequestSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ------------------------------
# Super Admin ViewSets
# ------------------------------

class DemoRequestViewSet(viewsets.ModelViewSet):
    queryset = DemoRequest.objects.all()
    serializer_class = DemoRequestSerializer
    permission_classes = [IsSuperAdmin]

    @action(detail=True, methods=["post"])
    def convert_to_client(self, request, pk=None):
        demo_request = self.get_object()

        # Create User
        user = User.objects.create_user(
            username=demo_request.email,
            email=demo_request.email,
            first_name=demo_request.first_name,
            last_name=demo_request.last_name,
            password=User.objects.make_random_password(),
        )

        # Create Client
        client = Client.objects.create(
            user=user,
            company_name=demo_request.company,
            is_active=True,
        )

        # Update demo request
        demo_request.status = "converted"
        demo_request.processed_by = request.user
        demo_request.save()

        return Response({"message": "Demo request converted to client."})


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsSuperAdmin]


class ClientInvoiceViewSet(viewsets.ModelViewSet):
    queryset = ClientInvoice.objects.all()
    serializer_class = ClientInvoiceSerializer
    permission_classes = [IsSuperAdmin]


class PricingPlanViewSet(viewsets.ModelViewSet):
    queryset = PricingPlan.objects.all()
    serializer_class = PricingPlanSerializer
    permission_classes = [AllowAny]  # Public access, adjust if needed


# ------------------------------
# Dashboard Stats
# ------------------------------
@api_view(["GET"])
@permission_classes([IsSuperAdmin])
def dashboard_stats(request):
    total_clients = Client.objects.count()
    total_revenue = ClientInvoice.objects.filter(status="paid").aggregate(
        total=models.Sum("total_amount")
    )["total"] or 0
    pending_demos = DemoRequest.objects.filter(status='pending').count()

    return Response({
        "total_clients": total_clients,
        "total_revenue": total_revenue,
        "pending_demos": pending_demos,
    })
