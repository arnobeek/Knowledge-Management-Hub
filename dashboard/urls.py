# from django.urls import path
# from . import views

# app_name = "dashboard"

# urlpatterns = [
#     path("", views.dashboard, name="dashboard"),
# ]

from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()

router.register("agencies", AgencyViewSet)

router.register("themes", ThemeViewSet)

router.register("regions", RegionViewSet)

router.register("sdgs", SDGViewSet)

router.register("categories", CategoryViewSet)

router.register("keywords", KeywordViewSet)

router.register("knowledge-items", KnowledgeItemViewSet)

router.register("knowledge-files", KnowledgeFileViewSet)

urlpatterns = [
    path("", include(router.urls)),
]