# from django.shortcuts import render


# def dashboard(request):
#     """Main repository view — item data is currently rendered client-side
#     from static/dashboard/script.js. Once real repository data is
#     available server-side, pass it into the context here and read it
#     from the template instead of the hardcoded JS array."""
#     return render(request, "dashboard/dashboard.html")

from rest_framework import viewsets
from .models import *
from .serializers import *

class AgencyViewSet(viewsets.ModelViewSet):

    queryset = Agency.objects.all()

    serializer_class = AgencySerializer

class ThemeViewSet(viewsets.ModelViewSet):
    queryset = Theme.objects.all()
    serializer_class = ThemeSerializer


class RegionViewSet(viewsets.ModelViewSet):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer


class SDGViewSet(viewsets.ModelViewSet):
    queryset = SDG.objects.all()
    serializer_class = SDGSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class KeywordViewSet(viewsets.ModelViewSet):
    queryset = Keyword.objects.all()
    serializer_class = KeywordSerializer


class KnowledgeItemViewSet(viewsets.ModelViewSet):
    queryset = KnowledgeItem.objects.all()
    serializer_class = KnowledgeItemSerializer


class KnowledgeFileViewSet(viewsets.ModelViewSet):
    queryset = KnowledgeFile.objects.all()
    serializer_class = KnowledgeFileSerializer