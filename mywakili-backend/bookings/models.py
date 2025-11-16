from django.db import models
from django.conf import settings
from lawyers.models import LawyerProfile


class AvailabilitySlot(models.Model):
    lawyer = models.ForeignKey(LawyerProfile, on_delete=models.CASCADE, related_name="availability")
    day = models.CharField(max_length=20)  # e.g. Monday
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f"{self.lawyer.full_name} - {self.day} {self.start_time}-{self.end_time}"


class Payment(models.Model):
    PAYMENT_METHOD_CHOICES = [
        ("mpesa", "M-Pesa"),
        ("card", "Credit/Debit Card"),
        ("bank", "Bank Transfer"),
    ]

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("processing", "Processing"),
        ("completed", "Completed"),
        ("failed", "Failed"),
        ("cancelled", "Cancelled"),
    ]

    booking = models.OneToOneField("Booking", on_delete=models.CASCADE, related_name="payment")
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    transaction_id = models.CharField(max_length=255, blank=True, null=True)
    payment_details = models.JSONField(default=dict, blank=True)  # Store method-specific details
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"Payment {self.id} - {self.booking.id} - {self.amount}"


class Booking(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("accepted", "Accepted"),
        ("declined", "Declined"),
        ("cancelled", "Cancelled"),
        ("completed", "Completed"),
    ]

    PAYMENT_STATUS = [
        ("unpaid", "Unpaid"),
        ("pending", "Pending Confirmation"),
        ("paid", "Paid"),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="bookings")
    lawyer = models.ForeignKey(LawyerProfile, on_delete=models.CASCADE, related_name="lawyer_bookings")
    schedule_time = models.DateTimeField()
    reason_for_booking = models.TextField()

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS, default="unpaid")

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Booking {self.id} - {self.user.email} → {self.lawyer.full_name}"
