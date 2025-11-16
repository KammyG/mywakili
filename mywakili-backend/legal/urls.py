from django.urls import path
from .views import (
    LegalArticleListCreateView,
    LegalArticleDetailView,
    PetitionListCreateView,
    PetitionDetailView,
    SignPetitionView,
)

urlpatterns = [
    # Legal Education
    path("articles/", LegalArticleListCreateView.as_view(), name="articles"),
    path("articles/<int:pk>/", LegalArticleDetailView.as_view(), name="article-detail"),

    # Petitions
    path("petitions/", PetitionListCreateView.as_view(), name="petitions"),
    path("petitions/<int:pk>/", PetitionDetailView.as_view(), name="petition-detail"),
    path("petitions/<int:petition_id>/sign/", SignPetitionView.as_view(), name="sign-petition"),
]
