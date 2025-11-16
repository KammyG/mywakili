from django.db import models
from django.conf import settings
from django.utils.text import slugify

User = settings.AUTH_USER_MODEL

class LawCategory(models.Model):
    """E.g. Family Law, Criminal Law, Land & Property"""
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)

    class Meta:
        verbose_name = "Law Category"
        verbose_name_plural = "Law Categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class LawyerProfile(models.Model):
    """Profile for lawyers — linked to your custom User model."""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="lawyer_profile")
    photo = models.ImageField(upload_to="lawyers/photos/", blank=True, null=True)
    bio = models.TextField(blank=True)
    categories = models.ManyToManyField(LawCategory, related_name="lawyers", blank=True)
    location = models.CharField(max_length=200, blank=True)
    phone = models.CharField(max_length=30, blank=True)
    years_experience = models.PositiveSmallIntegerField(default=0)
    languages = models.CharField(max_length=200, blank=True, help_text="Comma-separated languages")
    consultation_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    rating = models.FloatField(default=0.0)
    verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-rating", "-years_experience", "user__username"]

    @property
    def full_name(self):
        """Get the full name of the lawyer"""
        if self.user.get_full_name():
            return self.user.get_full_name()
        return self.user.username

    def __str__(self):
        return f"{self.full_name} — {self.location or 'N/A'}"
