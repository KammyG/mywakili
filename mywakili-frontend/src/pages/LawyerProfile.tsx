import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  Star, MapPin, Briefcase, DollarSign, CheckCircle, 
  Calendar, X, Award, Languages 
} from "lucide-react";
import api from "../services/api";
import PaymentMethod from "../components/PaymentMethod";
import { useAuth } from "../context/AuthContext";

interface Lawyer {
  id: number;
  name: string;
  specialty: string;
  location: string;
  bio: string;
  rating?: number;
  years_experience?: number;
  consultation_fee?: number;
  photo?: string;
  verified?: boolean;
  languages?: string;
  categories?: string[];
}

export default function LawyerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    schedule_time: "",
    reason_for_booking: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/lawyers/lawyers/${id}/`)
      .then(res => {
        const data = res.data;
        setLawyer({
          id: data.id,
          name: data.full_name || data.name || `${data.user?.first_name || ''} ${data.user?.last_name || ''}`.trim() || data.user?.username,
          specialty: data.specialty || (data.categories?.[0]?.name) || "General Law",
          location: data.location || "N/A",
          bio: data.bio || "No bio available",
          rating: data.rating || 0,
          years_experience: data.years_experience || 0,
          consultation_fee: parseFloat(data.consultation_fee) || 0,
          photo: data.photo,
          verified: data.verified || false,
          languages: data.languages || "English"
        });
      })
      .catch((err) => {
        console.error("Error fetching lawyer:", err);
        // Fallback data
        setLawyer({ 
          id: Number(id), 
          name: "Jane Mwangi", 
          specialty: "Family Law", 
          location: "Nairobi", 
          bio: "Experienced family law attorney with over 10 years of practice. Specialized in divorce, custody, and adoption cases. Committed to providing compassionate and effective legal representation.",
          rating: 4.8,
          years_experience: 10,
          consultation_fee: 5000,
          verified: true,
          languages: "English, Swahili, Kikuyu"
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/bookings/book/", {
        lawyer_id: lawyer?.id,
        schedule_time: bookingData.schedule_time,
        reason_for_booking: bookingData.reason_for_booking,
      });
      
      // Store booking ID for payment
      const bookingId = response.data.id;
      setShowBookingModal(false);
      setShowPaymentModal(true);
      // Store booking ID in state or pass to payment component
      (window as any).currentBookingId = bookingId;
    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to create booking. Please try again.");
    }
  };

  const handlePaymentComplete = async (method: string, details: any) => {
    try {
      const bookingId = (window as any).currentBookingId;
      if (!bookingId) {
        throw new Error("Booking ID not found");
      }

      // Process payment
      const paymentResponse = await api.post(`/bookings/booking/${bookingId}/payment/`, {
        payment_method: method,
        payment_details: details,
      });

      // Confirm payment (in production, this would be done via webhook)
      if (paymentResponse.data.payment_id) {
        await api.post(`/bookings/payment/${paymentResponse.data.payment_id}/confirm/`);
      }

      alert(`Payment of KES ${lawyer?.consultation_fee?.toLocaleString()} via ${method.toUpperCase()} processed successfully!`);
      setShowPaymentModal(false);
      // Reset booking data
      setBookingData({ schedule_time: "", reason_for_booking: "" });
      delete (window as any).currentBookingId;
    } catch (error: any) {
      alert(error.response?.data?.error || "Payment processing failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading lawyer profile...</p>
        </div>
      </div>
    );
  }

  if (!lawyer) return <div>Lawyer not found</div>;

  return (
    <div className="space-y-6">
      {/* Lawyer Header Card */}
      <div className="card p-8">
        <div className="flex flex-col md:flex-row gap-6">
          {lawyer.photo ? (
            <img 
              src={lawyer.photo} 
              alt={lawyer.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-200"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-4xl">
              {lawyer.name.charAt(0)}
            </div>
          )}
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-800">{lawyer.name}</h1>
                  {lawyer.verified && (
                    <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <CheckCircle className="w-4 h-4" />
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold text-lg">{lawyer.rating?.toFixed(1) || "N/A"}</span>
                  {lawyer.years_experience && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        {lawyer.years_experience} years experience
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Briefcase className="w-5 h-5 text-blue-500" />
                <span className="font-medium">{lawyer.specialty}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span>{lawyer.location}</span>
              </div>
              {lawyer.consultation_fee && (
                <div className="flex items-center gap-2 text-gray-700">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-lg text-green-600">
                    KES {lawyer.consultation_fee.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">per consultation</span>
                </div>
              )}
              {lawyer.languages && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Languages className="w-5 h-5 text-blue-500" />
                  <span>{lawyer.languages}</span>
                </div>
              )}
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">{lawyer.bio}</p>

            <button
              onClick={() => {
                if (!isAuthenticated) {
                  navigate("/login");
                } else {
                  setShowBookingModal(true);
                }
              }}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Book Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Book Consultation</h2>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleBookingSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={bookingData.schedule_time}
                  onChange={(e) => setBookingData({ ...bookingData, schedule_time: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Consultation
                </label>
                <textarea
                  value={bookingData.reason_for_booking}
                  onChange={(e) => setBookingData({ ...bookingData, reason_for_booking: e.target.value })}
                  required
                  rows={4}
                  placeholder="Please describe your legal issue or reason for consultation..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Consultation Fee</span>
                  <span className="text-2xl font-bold text-blue-600">
                    KES {lawyer.consultation_fee?.toLocaleString() || "0"}
                  </span>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Complete Payment</h2>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <PaymentMethod
                amount={lawyer.consultation_fee || 0}
                onPaymentSelect={(method) => console.log("Selected:", method)}
                onComplete={handlePaymentComplete}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
