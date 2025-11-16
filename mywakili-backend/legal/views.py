from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import models
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

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category')
        search = self.request.query_params.get('search')
        
        if category:
            queryset = queryset.filter(category=category)
        
        if search:
            queryset = queryset.filter(
                models.Q(title__icontains=search) |
                models.Q(summary__icontains=search) |
                models.Q(content__icontains=search)
            )
        
        return queryset


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

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def get_queryset(self):
        queryset = super().get_queryset()
        status_filter = self.request.query_params.get('status')
        category = self.request.query_params.get('category')
        
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        else:
            # By default, show open petitions first
            queryset = queryset.order_by('-status', '-created_at')
        
        if category:
            queryset = queryset.filter(category__icontains=category)
        
        return queryset


class PetitionDetailView(generics.RetrieveAPIView):
    queryset = Petition.objects.all()
    serializer_class = PetitionSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context



# -------------------
# Sign Petition
# -------------------
class SignPetitionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, petition_id):
        petition = Petition.objects.filter(id=petition_id, status="open").first()

        if not petition:
            return Response({"error": "Petition not found or closed"}, status=status.HTTP_404_NOT_FOUND)

        # prevent double signing
        if PetitionSignature.objects.filter(user=request.user, petition=petition).exists():
            return Response(
                {"message": "You already signed this petition", "already_signed": True},
                status=status.HTTP_200_OK
            )

        PetitionSignature.objects.create(user=request.user, petition=petition)

        return Response({
            "message": "Petition signed successfully",
            "signatures_count": petition.signatures.count()
        }, status=status.HTTP_201_CREATED)
