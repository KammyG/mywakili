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

    class Meta:
        model = LawyerProfile
        fields = (
            "id", "user", "photo", "bio", "categories", "location",
            "years_experience", "languages", "consultation_fee", "rating", "verified"
        )

class LawyerProfileDetailSerializer(LawyerProfileListSerializer):
    # same as list for now; extend if needed
    pass

class LawyerProfileCreateSerializer(serializers.ModelSerializer):
    # create serializer expects categories ids
    categories = serializers.PrimaryKeyRelatedField(many=True, queryset=LawCategory.objects.all(), required=False)

    class Meta:
        model = LawyerProfile
        fields = ("photo", "bio", "categories", "location", "phone", "years_experience", "languages", "consultation_fee", "verified")
