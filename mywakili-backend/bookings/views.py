from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import PermissionDenied
from .models import Booking, AvailabilitySlot, Payment
from .serializers import BookingSerializer, AvailabilitySlotSerializer, PaymentSerializer


# Create booking
class CreateBookingView(generics.CreateAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# User Bookings List
class UserBookingsView(generics.ListAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user)


# Lawyer Bookings List
class LawyerBookingsView(generics.ListAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(lawyer__user=self.request.user)


# Lawyer Accept/Decline Booking
class UpdateBookingStatusView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, booking_id):
        try:
            booking = Booking.objects.get(id=booking_id, lawyer__user=request.user)
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found or unauthorized"}, status=404)

        action = request.data.get("action")

        if action == "accept":
            booking.status = "accepted"
        elif action == "decline":
            booking.status = "declined"
        else:
            return Response({"error": "Invalid action"}, status=400)

        booking.save()
        return Response({"message": "Status updated", "status": booking.status})


# Cancel Booking (Client)
class CancelBookingView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, booking_id):
        try:
            booking = Booking.objects.get(id=booking_id, user=request.user)
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found"}, status=404)

        booking.status = "cancelled"
        booking.save()
        return Response({"message": "Booking cancelled"})


# Availability
class CreateAvailabilityView(generics.CreateAPIView):
    serializer_class = AvailabilitySlotSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        if not hasattr(user, "lawyer_profile"):
            raise PermissionDenied("Only lawyers can manage availability.")
        serializer.save(lawyer=user.lawyer_profile)


class LawyerAvailabilityList(generics.ListAPIView):
    serializer_class = AvailabilitySlotSerializer

    def get_queryset(self):
        lawyer_id = self.kwargs['lawyer_id']
        return AvailabilitySlot.objects.filter(lawyer_id=lawyer_id)


# Payment Processing
class ProcessPaymentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, booking_id):
        try:
            booking = Booking.objects.get(id=booking_id, user=request.user)
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found"}, status=status.HTTP_404_NOT_FOUND)

        payment_method = request.data.get("payment_method")
        payment_details = request.data.get("payment_details", {})

        if not payment_method:
            return Response({"error": "Payment method is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Create or update payment
        payment, created = Payment.objects.get_or_create(
            booking=booking,
            defaults={
                "amount": booking.lawyer.consultation_fee,
                "payment_method": payment_method,
                "payment_details": payment_details,
                "status": "processing"
            }
        )

        if not created:
            payment.payment_details = payment_details
            payment.status = "processing"
            payment.save()

        # Simulate payment processing (in production, integrate with payment gateway)
        # For now, we'll mark it as completed after a short delay
        # In production, you'd use webhooks or polling to check payment status
        
        # Update booking payment status
        booking.payment_status = "pending"
        booking.save()

        return Response({
            "message": "Payment processing initiated",
            "payment_id": payment.id,
            "status": payment.status
        }, status=status.HTTP_200_OK)


class ConfirmPaymentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, payment_id):
        try:
            payment = Payment.objects.get(id=payment_id, booking__user=request.user)
        except Payment.DoesNotExist:
            return Response({"error": "Payment not found"}, status=status.HTTP_404_NOT_FOUND)

        # In production, verify payment with payment gateway
        # For now, we'll just mark it as completed
        payment.status = "completed"
        payment.booking.payment_status = "paid"
        payment.booking.save()
        payment.save()

        return Response({
            "message": "Payment confirmed",
            "payment_id": payment.id,
            "status": payment.status
        }, status=status.HTTP_200_OK)