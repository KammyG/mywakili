from rest_framework import routers
from django.urls import path, include
from .views import LawCategoryViewSet, LawyerViewSet

router = routers.DefaultRouter()
router.register(r"categories", LawCategoryViewSet, basename="categories")
router.register(r"", LawyerViewSet, basename="lawyers")

urlpatterns = [
    path("", include(router.urls)),
]