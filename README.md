# Business Management System (Django REST API)

A full-featured **Business Management System** built with Django and Django REST Framework.  
It includes user management, roles & permissions, company handling, attendance tracking, invoicing, notifications, and subscription plans.

---

## 🚀 Features

### 🔐 Authentication & Users
- Custom user model (`accounts`)
- Email & password authentication
- JWT authentication (SimpleJWT)
- Role-based access control (RBAC)

### 🏢 Company Management
- Company creation & management
- Multi-company support

### 👨‍💼 Employee Management
- Employee onboarding
- Employee profiles
- Department handling

### ⏱ Attendance System
- Daily attendance tracking
- Attendance reports

### 💰 Invoice Management
- Create and manage invoices
- Billing history

### 🔔 Notifications
- System notifications for users
- Email notification support

### 👑 Super Admin Panel
- Full system control
- User & company management
- Plan management

### 📦 Subscription Plans
- Plan creation & management
- Feature-based access control

---

## 🛠 Tech Stack

- **Backend:** Django 5.x
- **API:** Django REST Framework
- **Authentication:** JWT (SimpleJWT)
- **Database:** MySQL
- **CORS:** django-cors-headers
- **Filtering:** django-filter

---

## 📁 Project Structure
accounts/ → User management & authentication
companies/ → Company module
employees/ → Employee management
attendance/ → Attendance tracking
invoices/ → Invoice system
roles/ → Role-based permissions
notifications/ → Alerts & notifications
superadmin/ → Admin dashboard
plans/ → Subscription plans

## Backend

python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
