from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import LegalArticle, Petition, PetitionSignature
from .serializers import (
    LegalArticleSerializer,
    PetitionSerializer,
    PetitionSignatureSerializer,
)

# -------------------
# Legal Articles
# -------------------
class LegalArticleListCreateView(generics.ListCreateAPIView):
    queryset = LegalArticle.objects.all()
    serializer_class = LegalArticleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class LegalArticleDetailView(generics.RetrieveAPIView):
    queryset = LegalArticle.objects.all()
    serializer_class = LegalArticleSerializer



# -------------------
# Petitions
# -------------------
class PetitionListCreateView(generics.ListCreateAPIView):
    queryset = Petition.objects.all()
    serializer_class = PetitionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class PetitionDetailView(generics.RetrieveAPIView):
    queryset = Petition.objects.all()
    serializer_class = PetitionSerializer



# -------------------
# Sign Petition
# -------------------
class SignPetitionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, petition_id):
        petition = Petition.objects.filter(id=petition_id, status="open").first()

        if not petition:
            return Response({"error": "Petition not found or closed"}, status=404)

        # prevent double signing
        if PetitionSignature.objects.filter(user=request.user, petition=petition).exists():
            return Response({"message": "You already signed this petition"})

        PetitionSignature.objects.create(user=request.user, petition=petition)

        return Response({"message": "Petition signed successfully"})
