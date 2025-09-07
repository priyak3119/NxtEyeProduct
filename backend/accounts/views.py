import logging
logger = logging.getLogger(__name__)
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from rest_framework.views import APIView
from .models import User, UserRole

from .serializers import (
    UserRegistrationSerializer, 
    UserLoginSerializer, 
    UserSerializer,
    UserRoleSerializer
)

# ------------------------------
# USER REGISTRATION
# ------------------------------
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        refresh = RefreshToken.for_user(user)
        
        return Response({
            "user": UserSerializer(user).data,
            "tokens": {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }
        }, status=status.HTTP_201_CREATED)


# ------------------------------
# USER LOGIN
# ------------------------------
class LoginView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        
        refresh = RefreshToken.for_user(user)
        
        return Response({
            "user": UserSerializer(user).data,
            "tokens": {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }
        })


# ------------------------------
# ADMIN LOGIN (special endpoint)
# ------------------------------

class SuperAdminLoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]

        if user.role != "super_admin":
            return Response({"error": "Super admin access required"}, status=status.HTTP_403_FORBIDDEN)

        refresh = RefreshToken.for_user(user)
        user_data = UserSerializer(user).data
        # Ensure roles array includes super_admin if not present
        if not user_data.get("roles"):
            user_data["roles"] = [{"name": "super_admin"}]
        return Response({
            "user": user_data,
            "tokens": {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            },
        })

@api_view(["POST"])
@permission_classes([AllowAny])
def admin_login(request):
    serializer = UserLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data["user"]
    
    if not user.is_staff and not user.is_superuser:
        return Response(
            {"error": "Admin access required"},
            status=status.HTTP_403_FORBIDDEN
        )
    
    refresh = RefreshToken.for_user(user)
    
    return Response({
        "user": UserSerializer(user).data,
        "tokens": {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }
    })


@api_view(['POST'])
@permission_classes([AllowAny])
def super_admin_login(request):
    """Super admin login endpoint"""
    logger.info("super_admin_login called with data: %s", request.data)
    serializer = UserLoginSerializer(data=request.data)
    if not serializer.is_valid():
        logger.error("Serializer validation failed: %s", serializer.errors)
        return Response({'error': serializer.errors}, status=status.HTTP_401_UNAUTHORIZED)
    user = serializer.validated_data['user']

    logger.info("Authenticated user: %s, role: %s, is_active: %s, is_staff: %s, is_superuser: %s", user.email, user.role, user.is_active, user.is_staff, user.is_superuser)

    if user.role != 'super_admin':
        logger.warning("User is not super_admin: %s", user.email)
        return Response(
            {'error': 'Super admin access required'}, 
            status=status.HTTP_403_FORBIDDEN
        )

    refresh = RefreshToken.for_user(user)
    update_last_login(None, user)

    user_data = UserSerializer(user).data
    # Ensure roles array includes super_admin if not present
    if not user_data.get("roles"):
        user_data["roles"] = [{"name": "super_admin"}]

    logger.info("Super admin login successful for: %s", user.email)
    return Response({
        'user': user_data,
        'tokens': {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
    })


# ------------------------------
# PROFILE VIEW/UPDATE
# ------------------------------
class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


# ------------------------------
# USER MANAGEMENT
# ------------------------------
class UserListView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ["is_active", "company", "branch"]
    search_fields = ["first_name", "last_name", "email", "username"]
    ordering_fields = ["created_at", "first_name", "last_name"]


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


# ------------------------------
# USER ROLE MANAGEMENT
# ------------------------------
class UserRoleListView(generics.ListCreateAPIView):
    queryset = UserRole.objects.all()
    serializer_class = UserRoleSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ["user", "role", "is_active"]

    def perform_create(self, serializer):
        serializer.save(assigned_by=self.request.user)


class UserRoleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserRole.objects.all()
    serializer_class = UserRoleSerializer
    permission_classes = [IsAuthenticated]


# ------------------------------
# PASSWORD CHANGE
# ------------------------------
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user
    old_password = request.data.get("old_password")
    new_password = request.data.get("new_password")
    
    if not old_password or not new_password:
        return Response(
            {"error": "Both old and new passwords are required"},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if not user.check_password(old_password):
        return Response(
            {"error": "Invalid old password"},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    user.set_password(new_password)
    user.save()
    
    return Response({"message": "Password changed successfully"})

@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password(request):
    """Reset password"""
    email = request.data.get('email')
    try:
        user = User.objects.get(email=email)
        # Here you would typically send an email with reset link
        # For demo purposes, we'll just return success
        return Response({'message': 'Password reset email sent'})
    except User.DoesNotExist:
        return Response(
            {'error': 'User with this email does not exist'}, 
            status=status.HTTP_404_NOT_FOUND
        )
        
class AdminLoginView(APIView):
    # THIS IS THE IMPORTANT PART
    permission_classes = [AllowAny]  # Allow unauthenticated users to access

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(request, username=email, password=password)
        if user and user.is_active and user.role == "admin":
            refresh = RefreshToken.for_user(user)
            return Response({
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "role": user.role,
                    "name": user.get_full_name(),
                },
                "tokens": {
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                }
            })
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)        
