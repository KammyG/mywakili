from rest_framework import serializers
from .models import LegalArticle, Petition, PetitionSignature


class LegalArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = LegalArticle
        fields = [
            "id", "title", "summary", "content", "category", 
            "author", "publish_date", "is_constitution"
        ]



class PetitionSerializer(serializers.ModelSerializer):
    signatures_count = serializers.SerializerMethodField()
    user_signed = serializers.SerializerMethodField()

    class Meta:
        model = Petition
        fields = [
            "id", "title", "description", "category", "external_link",
            "status", "created_at", "signatures_count", "user_signed"
        ]

    def get_signatures_count(self, obj):
        return obj.signatures.count()

    def get_user_signed(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.signatures.filter(user=request.user).exists()
        return False



class PetitionSignatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetitionSignature
        fields = "__all__"
        read_only_fields = ["user"]
