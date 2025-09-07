from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views
from .views import AdminLoginView,SuperAdminLoginView





urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('admin-login/', views.admin_login, name='admin_login'),
    path("super-admin-login/", SuperAdminLoginView.as_view(), name="super_admin_login"),
    path("admin-login/", AdminLoginView.as_view(), name="admin-login"),
    # path('super-admin-login/', views.super_admin_login, name='super_admin_login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', views.UserProfileView.as_view(), name='user_profile'),
    path('change-password/', views.change_password, name='change_password'),
    path('reset-password/', views.reset_password, name='reset_password'),
    path('users/', views.UserListView.as_view(), name='user_list'),
    path('users/<uuid:pk>/', views.UserDetailView.as_view(), name='user_detail'),
    path('user-roles/', views.UserRoleListView.as_view(), name='user_role_list'),
    path('user-roles/<uuid:pk>/', views.UserRoleDetailView.as_view(), name='user_role_detail'),
]