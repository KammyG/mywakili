from rest_framework import serializers
from .models import Booking, AvailabilitySlot, Payment
from lawyers.serializers import LawyerProfileListSerializer
from lawyers.models import LawyerProfile
from users.serializers import SimpleUserSerializer


class AvailabilitySlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvailabilitySlot
        fields = "__all__"


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = (
            "id", "amount", "payment_method", "status", 
            "transaction_id", "created_at", "completed_at"
        )
        read_only_fields = ["status", "transaction_id", "created_at", "completed_at"]


class BookingSerializer(serializers.ModelSerializer):
    user = SimpleUserSerializer(read_only=True)
    lawyer = LawyerProfileListSerializer(read_only=True)
    lawyer_id = serializers.PrimaryKeyRelatedField(
        queryset=LawyerProfile.objects.all(),
        write_only=True,
        source="lawyer",
        required=False
    )
    payment = PaymentSerializer(read_only=True)

    class Meta:
        model = Booking
        fields = (
            "id", "user", "lawyer", "lawyer_id", "schedule_time", 
            "reason_for_booking", "status", "payment_status", 
            "created_at", "payment"
        )
        read_only_fields = ["status", "payment_status", "user", "lawyer", "payment"]
