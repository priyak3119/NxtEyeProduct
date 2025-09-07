# Run this script in Django shell to ensure a working super admin user
from accounts.models import User

def ensure_super_admin(email, password):
    user, created = User.objects.get_or_create(email=email, defaults={
        "username": email,
        "first_name": "Super",
        "last_name": "Admin",
        "role": "super_admin",
        "is_staff": True,
        "is_superuser": True,
        "is_active": True,
    })
    user.role = "super_admin"
    user.is_staff = True
    user.is_superuser = True
    user.is_active = True
    user.set_password(password)
    user.save()
    print(f"Super admin ready: {user.email}")

# Change these values as needed
ensure_super_admin("superadmin@example.com", "YourStrongPassword")
