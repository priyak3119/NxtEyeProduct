from django.contrib import admin
from .models import Notification, EmailNotification

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'type', 'is_read', 'created_at']
    list_filter = ['type', 'is_read', 'created_at']
    search_fields = ['title', 'message', 'user__first_name', 'user__last_name']
    ordering = ['-created_at']

@admin.register(EmailNotification)
class EmailNotificationAdmin(admin.ModelAdmin):
    list_display = ['subject', 'user', 'status', 'sent_at', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['subject', 'user__email']
    ordering = ['-created_at']