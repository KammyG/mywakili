from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Booking, AvailabilitySlot
from .serializers import BookingSerializer, AvailabilitySlotSerializer


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
        return Booking.objects.filter(lawyer__lawyer=self.request.user)


# Lawyer Accept/Decline Booking
class UpdateBookingStatusView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, booking_id):
        try:
            booking = Booking.objects.get(id=booking_id, lawyer__lawyer=request.user)
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


class LawyerAvailabilityList(generics.ListAPIView):
    serializer_class = AvailabilitySlotSerializer

    def get_queryset(self):
        lawyer_id = self.kwargs['lawyer_id']
        return AvailabilitySlot.objects.filter(lawyer_id=lawyer_id)
