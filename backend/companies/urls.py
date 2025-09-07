# companies/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("", views.CompanyListCreateView.as_view(), name="company-list-create"),
    path("<int:pk>/", views.CompanyRetrieveUpdateDeleteView.as_view(), name="company-detail"),
    path("countries/", views.country_list, name="country-list"),
    path("regions/<str:country_code>/", views.regions_by_country, name="regions-by-country"),
    path("states/<str:country_code>/", views.states_by_country, name="states-by-country"),
]
