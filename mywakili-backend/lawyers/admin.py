from django.contrib import admin
from .models import LawCategory, LawyerProfile

@admin.register(LawCategory)
class LawCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}

@admin.register(LawyerProfile)
class LawyerProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "location", "years_experience", "rating", "verified")
    list_filter = ("verified", "location")
    search_fields = ("user__username", "user__email", "bio", "location")
    raw_id_fields = ("user",)
