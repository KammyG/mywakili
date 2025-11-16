from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import LawCategory, LawyerProfile
from .serializers import (
    LawCategorySerializer,
    LawyerProfileListSerializer,
    LawyerProfileDetailSerializer,
    LawyerProfileCreateSerializer,
)
from django.shortcuts import get_object_or_404
from django.db.models import Q

class LawCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LawCategory.objects.all()
    serializer_class = LawCategorySerializer
    permission_classes = [permissions.AllowAny]


class LawyerViewSet(viewsets.ModelViewSet):
    queryset = LawyerProfile.objects.select_related("user").prefetch_related("categories").all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.action in ["list"]:
            return LawyerProfileListSerializer
        if self.action in ["retrieve"]:
            return LawyerProfileDetailSerializer
        if self.action in ["create", "update", "partial_update"]:
            return LawyerProfileCreateSerializer
        return LawyerProfileListSerializer

    def perform_create(self, serializer):
        # only allow a user to create their lawyer profile once
        user = self.request.user
        if hasattr(user, "lawyer_profile"):
            raise serializers.ValidationError("User already has a lawyer profile.")
        profile = serializer.save(user=user)
        # attach categories if provided handled by serializer
        return profile

    def get_queryset(self):
        qs = super().get_queryset()
        q = self.request.query_params
        # filters: category, location, min_rating, language, search
        category = q.get("category")
        location = q.get("location")
        min_rating = q.get("min_rating")
        language = q.get("language")
        search = q.get("search")

        if category:
            qs = qs.filter(categories__slug__iexact=category) | qs.filter(categories__name__icontains=category)
        if location:
            qs = qs.filter(location__icontains=location)
        if min_rating:
            try:
                r = float(min_rating)
                qs = qs.filter(rating__gte=r)
            except ValueError:
                pass
        if language:
            qs = qs.filter(languages__icontains=language)
        if search:
            qs = qs.filter(
                Q(user__first_name__icontains=search)
                | Q(user__last_name__icontains=search)
                | Q(bio__icontains=search)
                | Q(user__username__icontains=search)
            )

        return qs.distinct()

    @action(detail=True, methods=["post"], permission_classes=[permissions.IsAuthenticated])
    def contact(self, request, pk=None):
        # simple contact stub: send message to lawyer (implementation TBD)
        profile = self.get_object()
        message = request.data.get("message", "")
        # You would normally queue an email, SMS, or internal message
        return Response({"detail": "Message sent (stub).", "lawyer_id": profile.id, "message": message}, status=status.HTTP_200_OK)
