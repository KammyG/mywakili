from django.db import models
from django.conf import settings


# ---------------------
# LEGAL EDUCATION
# ---------------------
class LegalArticle(models.Model):
    CATEGORY_CHOICES = [
        ('constitutional', 'Constitutional Law'),
        ('criminal', 'Criminal Law'),
        ('family', 'Family Law'),
        ('civil', 'Civil Law'),
        ('rights', 'Human Rights'),
        ('employment', 'Employment Law'),
        ('property', 'Property Law'),
    ]

    title = models.CharField(max_length=255)
    summary = models.TextField()
    content = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    author = models.CharField(max_length=150, default="Admin")
    publish_date = models.DateField(auto_now_add=True)
    is_constitution = models.BooleanField(default=False, help_text="Mark if this is the Constitution of Kenya")

    class Meta:
        ordering = ['-publish_date']

    def __str__(self):
        return self.title



# ---------------------
# PETITIONS
# ---------------------
class Petition(models.Model):
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('closed', 'Closed'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=100)
    external_link = models.URLField(blank=True, null=True)  # If hosted elsewhere
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="open")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class PetitionSignature(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    petition = models.ForeignKey(Petition, on_delete=models.CASCADE, related_name="signatures")
    signed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'petition')  # Prevent double signing

    def __str__(self):
        return f"{self.user.email} signed {self.petition.title}"
