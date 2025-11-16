from rest_framework import serializers
from .models import LegalArticle, Petition, PetitionSignature


class LegalArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = LegalArticle
        fields = "__all__"



class PetitionSerializer(serializers.ModelSerializer):
    signatures_count = serializers.SerializerMethodField()

    class Meta:
        model = Petition
        fields = [
            "id", "title", "description", "category", "external_link",
            "status", "created_at", "signatures_count"
        ]

    def get_signatures_count(self, obj):
        return obj.signatures.count()



class PetitionSignatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetitionSignature
        fields = "__all__"
        read_only_fields = ["user"]
