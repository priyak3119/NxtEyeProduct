# superadmin/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import DemoRequest, Client
from django.contrib.auth.hashers import make_password
from django.utils.crypto import get_random_string

User = get_user_model()

@receiver(post_save, sender=DemoRequest)
def create_client_on_conversion(sender, instance, created, **kwargs):
    if not created and instance.status == "converted" and not hasattr(instance, "processed_by_user_created"):
        # Check if User already exists
        if not User.objects.filter(email=instance.email).exists():
            raw_password = get_random_string(10)
            user = User.objects.create(
                email=instance.email,
                username=instance.email,
                first_name=instance.first_name,
                last_name=instance.last_name,
                password=make_password(raw_password),
                role="admin",  # as you said superadmin shares the client as admin
                is_active=True, # initially can be inactive if you want superadmin approval
            )

            Client.objects.create(
                user=user,
                company_name=instance.company,
                is_active=False,  # activate after plan assignment
            )

            # Optional: send email to client with credentials
            print(f"[INFO] Client created: {user.email} / {raw_password}")

            # Avoid recursive signal call
            instance.processed_by_user_created = True
