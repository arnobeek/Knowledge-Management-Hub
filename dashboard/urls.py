from django.urls import path
from . import views

app_name = "dashbaord"

urlpatterns = [
    path("", views.dashboard, name="dashboard"),
    path("about/", views.about, name="about"),
]