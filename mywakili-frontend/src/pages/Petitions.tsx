import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FileSignature, Users, Calendar, CheckCircle, AlertCircle, ArrowRight, Search } from "lucide-react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Petitions() {
  const [petitions, setPetitions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("open");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const params: any = { status: statusFilter };
    if (searchTerm) params.search = searchTerm;

    api.get("/legal/petitions/", { params })
      .then(res => {
        setPetitions(res.data.results || res.data);
      })
      .catch(err => {
        console.error("Error fetching petitions:", err);
        setPetitions([]);
      })
      .finally(() => setLoading(false));
  }, [statusFilter, searchTerm]);

  const handleSignPetition = async (petitionId: number) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      const response = await api.post(`/legal/petitions/${petitionId}/sign/`);
      if (response.data.already_signed) {
        alert("You have already signed this petition.");
      } else {
        alert("Thank you! Your signature has been recorded.");
        // Refresh petitions to update signature count
        const params: any = { status: statusFilter };
        if (searchTerm) params.search = searchTerm;
        api.get("/legal/petitions/", { params })
          .then(res => setPetitions(res.data.results || res.data));
      }
    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to sign petition. Please try again.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
          Petitions
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          Make your voice heard. Sign petitions for causes that matter to you.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search petitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter("open")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                statusFilter === "open"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Open
            </button>
            <button
              onClick={() => setStatusFilter("closed")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                statusFilter === "closed"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Closed
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading petitions...</p>
          </div>
        </div>
      ) : petitions.length === 0 ? (
        <div className="text-center py-12">
          <FileSignature className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No petitions found.</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-800">{petitions.length}</span> petition{petitions.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {petitions.map((petition) => (
              <div key={petition.id} className="card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                    <FileSignature className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    petition.status === "open"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {petition.status.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {petition.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                  {petition.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {petition.signatures_count || 0} signatures
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(petition.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex gap-2">
                  {petition.status === "open" && (
                    <button
                      onClick={() => handleSignPetition(petition.id)}
                      disabled={petition.user_signed}
                      className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                        petition.user_signed
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg"
                      }`}
                    >
                      {petition.user_signed ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Signed
                        </>
                      ) : (
                        <>
                          <FileSignature className="w-5 h-5" />
                          Sign Petition
                        </>
                      )}
                    </button>
                  )}
                  <Link
                    to={`/petitions/${petition.id}`}
                    className="px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    View Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

