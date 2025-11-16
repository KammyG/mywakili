from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    USER_TYPE_CHOICES = (
        ('client', 'Client'),
        ('lawyer', 'Lawyer'),
        ('admin', 'Admin'),
    )

    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default='client')
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    specialization = models.CharField(max_length=100, blank=True, null=True)  # for lawyers
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.user_type})"
