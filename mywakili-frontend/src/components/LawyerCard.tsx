import { Link } from "react-router-dom";
import { MapPin, Star, Briefcase, ArrowRight } from "lucide-react";

interface LawyerCardProps {
  id: number;
  name: string;
  specialty: string;
  location: string;
  rating?: number;
  years_experience?: number;
  consultation_fee?: number;
  photo?: string;
}

export default function LawyerCard({ 
  id, 
  name, 
  specialty, 
  location, 
  rating = 0, 
  years_experience = 0,
  consultation_fee = 0,
  photo 
}: LawyerCardProps) {
  return (
    <div className="card p-6 group">
      <div className="flex items-start gap-4 mb-4">
        {photo ? (
          <img 
            src={photo} 
            alt={name}
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xl">
            {name.charAt(0)}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-semibold text-gray-700">{rating.toFixed(1)}</span>
            {years_experience > 0 && (
              <>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-600">{years_experience} years</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Briefcase className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium">{specialty}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4 text-blue-500" />
          <span className="text-sm">{location}</span>
        </div>
        {consultation_fee > 0 && (
          <div className="text-sm">
            <span className="text-gray-600">Consultation: </span>
            <span className="font-bold text-blue-600">KES {consultation_fee.toLocaleString()}</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-4 border-t border-gray-100">
        <Link 
          to={`/lawyers/${id}`} 
          className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 text-center flex items-center justify-center gap-2"
        >
          View Profile <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
