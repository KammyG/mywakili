from rest_framework import serializers
from .models import LawCategory, LawyerProfile
from django.contrib.auth import get_user_model

User = get_user_model()

class LawCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = LawCategory
        fields = ("id", "name", "slug")

class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "first_name", "last_name")

class LawyerProfileListSerializer(serializers.ModelSerializer):
    user = SimpleUserSerializer(read_only=True)
    categories = LawCategorySerializer(many=True, read_only=True)
    full_name = serializers.CharField(source="full_name", read_only=True)
    name = serializers.SerializerMethodField()
    specialty = serializers.SerializerMethodField()

    class Meta:
        model = LawyerProfile
        fields = (
            "id", "user", "full_name", "name", "photo", "bio", "categories", 
            "location", "years_experience", "languages", "consultation_fee", 
            "rating", "verified", "specialty"
        )

    def get_name(self, obj):
        return obj.full_name

    def get_specialty(self, obj):
        if obj.categories.exists():
            return obj.categories.first().name
        return "General Law"

class LawyerProfileDetailSerializer(LawyerProfileListSerializer):
    # Include availability slots in detail view
    availability = serializers.SerializerMethodField()
    
    def get_availability(self, obj):
        from bookings.serializers import AvailabilitySlotSerializer
        slots = obj.availability.all()
        return AvailabilitySlotSerializer(slots, many=True).data

class LawyerProfileCreateSerializer(serializers.ModelSerializer):
    # create serializer expects categories ids
    categories = serializers.PrimaryKeyRelatedField(many=True, queryset=LawCategory.objects.all(), required=False)

    class Meta:
        model = LawyerProfile
        fields = ("photo", "bio", "categories", "location", "phone", "years_experience", "languages", "consultation_fee", "verified")
