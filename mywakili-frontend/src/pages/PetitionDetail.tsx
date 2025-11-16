import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, FileSignature, Users, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function PetitionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [petition, setPetition] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [signing, setSigning] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`/legal/petitions/${id}/`)
      .then(res => setPetition(res.data))
      .catch(err => {
        console.error("Error fetching petition:", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSignPetition = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setSigning(true);
    try {
      const response = await api.post(`/legal/petitions/${id}/sign/`);
      if (response.data.already_signed) {
        alert("You have already signed this petition.");
      } else {
        alert("Thank you! Your signature has been recorded.");
        // Refresh petition to update signature count
        api.get(`/legal/petitions/${id}/`)
          .then(res => setPetition(res.data));
      }
    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to sign petition. Please try again.");
    } finally {
      setSigning(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading petition...</p>
        </div>
      </div>
    );
  }

  if (!petition) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Petition not found</p>
        <Link to="/petitions" className="text-blue-600 hover:underline">Back to Petitions</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link 
        to="/petitions" 
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Petitions
      </Link>

      <div className="card p-8 md:p-12">
        <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-200">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <FileSignature className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  petition.status === "open"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}>
                  {petition.status.toUpperCase()}
                </span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              {petition.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="font-semibold text-lg text-gray-800">{petition.signatures_count || 0}</span>
                <span>signatures</span>
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Created {new Date(petition.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {petition.description}
          </p>
        </div>

        {petition.external_link && (
          <div className="mb-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700 mb-2">
              <strong>External Link:</strong>
            </p>
            <a
              href={petition.external_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {petition.external_link}
            </a>
          </div>
        )}

        {petition.status === "open" && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            {petition.user_signed ? (
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-green-800 mb-2">You've Signed This Petition!</h3>
                <p className="text-green-700">Thank you for your support. Your signature has been recorded.</p>
              </div>
            ) : (
              <div className="text-center">
                <button
                  onClick={handleSignPetition}
                  disabled={signing}
                  className="btn-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {signing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Signing...
                    </>
                  ) : (
                    <>
                      <FileSignature className="w-5 h-5" />
                      Sign This Petition
                    </>
                  )}
                </button>
                {!isAuthenticated && (
                  <p className="text-sm text-gray-600 mt-4">
                    You need to <Link to="/login" className="text-blue-600 hover:underline">log in</Link> to sign petitions.
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {petition.status === "closed" && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">This Petition is Closed</h3>
              <p className="text-gray-600">This petition is no longer accepting signatures.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

