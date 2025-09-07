from django.urls import path
from . import views

urlpatterns = [
    path('', views.NotificationListView.as_view(), name='notification-list'),
    path('<uuid:pk>/', views.NotificationDetailView.as_view(), name='notification-detail'),
    path('<uuid:pk>/mark-read/', views.mark_as_read, name='mark-as-read'),
    path('mark-all-read/', views.mark_all_as_read, name='mark-all-as-read'),
    path('create/', views.create_notification, name='create-notification'),
    path('emails/', views.EmailNotificationListView.as_view(), name='email-notification-list'),
]