import { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import LawyerCard from "../components/LawyerCard";
import api from "../services/api";

export default function Lawyers() {
  const [lawyers, setLawyers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get("/lawyers/lawyers/")
      .then(res => {
        // Transform backend data to match frontend format
        const transformedLawyers = res.data.results || res.data;
        setLawyers(transformedLawyers.map((lawyer: any) => ({
          id: lawyer.id,
          name: lawyer.full_name || lawyer.name || `${lawyer.user?.first_name || ''} ${lawyer.user?.last_name || ''}`.trim() || lawyer.user?.username,
          specialty: lawyer.specialty || (lawyer.categories?.[0]?.name) || "General Law",
          location: lawyer.location || "N/A",
          rating: lawyer.rating || 0,
          years_experience: lawyer.years_experience || 0,
          consultation_fee: parseFloat(lawyer.consultation_fee) || 0,
          photo: lawyer.photo,
          verified: lawyer.verified || false
        })));
      })
      .catch((err) => {
        console.error("Error fetching lawyers:", err);
        // Fallback data
        setLawyers([
          { 
            id: 1, 
            name: "Jane Mwangi", 
            specialty: "Family Law", 
            location: "Nairobi",
            rating: 4.8,
            years_experience: 10,
            consultation_fee: 5000
          },
          { 
            id: 2, 
            name: "Peter Otieno", 
            specialty: "Criminal Law", 
            location: "Mombasa",
            rating: 4.6,
            years_experience: 8,
            consultation_fee: 4500
          },
          { 
            id: 3, 
            name: "Sarah Wanjiku", 
            specialty: "Land & Property", 
            location: "Nairobi",
            rating: 4.9,
            years_experience: 12,
            consultation_fee: 6000
          },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredLawyers = lawyers.filter(lawyer =>
    lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lawyer.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lawyer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
          Find Your Perfect Lawyer
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Browse our network of verified, qualified lawyers ready to help with your legal needs
        </p>
      </div>

      {/* Search and Filter */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, specialty, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading lawyers...</p>
          </div>
        </div>
      ) : filteredLawyers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No lawyers found matching your search.</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-800">{filteredLawyers.length}</span> lawyer{filteredLawyers.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLawyers.map(l => (
              <LawyerCard key={l.id} {...l} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
