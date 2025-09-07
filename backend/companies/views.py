import pycountry
from django_countries import countries
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import viewsets, permissions

from .models import Region, Company, Branch, State
from .serializers import (
    RegionSerializer, CompanySerializer, CompanyCreateSerializer,
    BranchSerializer, BranchCreateSerializer, StateSerializer
)

# -----------------------------
# Countries / Regions / States
# -----------------------------
@api_view(['GET'])
@permission_classes([AllowAny])
def country_list(request):
    data = [{"code": code, "name": name} for code, name in countries]
    return Response(data)

@api_view(['GET'])
@permission_classes([AllowAny])
def regions_by_country(request, country_code):
    regions = Region.objects.filter(country=country_code, is_active=True)
    serializer = RegionSerializer(regions, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def states_by_country(request, country_code):
    subdivisions = [
        {"code": s.code, "name": s.name}
        for s in pycountry.subdivisions
        if s.country_code == country_code
    ]
    return Response(subdivisions)



# -----------------------------
# Company Views
# -----------------------------

class CompanyListCreateView(generics.ListCreateAPIView):
    queryset = Company.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CompanyCreateSerializer
        return CompanySerializer

    # 👇 add this
    permission_classes = [AllowAny]

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticated] 

class CompanyRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

# -----------------------------
# Branch Views
# -----------------------------
class BranchListCreateView(generics.ListCreateAPIView):
    queryset = Branch.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return BranchCreateSerializer
        return BranchSerializer

class BranchRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer
