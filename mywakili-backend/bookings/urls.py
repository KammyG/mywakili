from django.urls import path
from .views import (
    CreateBookingView, UserBookingsView, LawyerBookingsView, 
    UpdateBookingStatusView, CancelBookingView,
    CreateAvailabilityView, LawyerAvailabilityList
)

urlpatterns = [
    path("book/", CreateBookingView.as_view(), name="create-booking"),
    path("my-bookings/", UserBookingsView.as_view(), name="my-bookings"),
    path("lawyer/bookings/", LawyerBookingsView.as_view(), name="lawyer-bookings"),
    path("booking/<int:booking_id>/update-status/", UpdateBookingStatusView.as_view(), name="update-status"),
    path("booking/<int:booking_id>/cancel/", CancelBookingView.as_view(), name="cancel-booking"),

    path("availability/create/", CreateAvailabilityView.as_view(), name="create-availability"),
    path("availability/<int:lawyer_id>/", LawyerAvailabilityList.as_view(), name="lawyer-availability"),
]
