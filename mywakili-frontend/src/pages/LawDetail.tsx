import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, FileText, Calendar, User, AlertTriangle } from "lucide-react";
import api from "../services/api";
import { fallbackLaws } from "../data/legalContent";

export default function LawDetail() {
  const { id } = useParams<{ id: string }>();
  const [law, setLaw] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fallbackLaw = useMemo(
    () => fallbackLaws.find((item) => String(item.id) === id),
    [id]
  );

  useEffect(() => {
    if (!id) {
      setLaw(null);
      setError("Law not found");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    api.get(`legal/articles/${id}/`)
      .then(res => {
        setLaw(res.data);
      })
      .catch(err => {
        console.error("Error fetching law:", err);
        if (fallbackLaw) {
          setLaw(fallbackLaw);
          setError("Showing highlights while we reconnect to the live database.");
        } else {
          setLaw(null);
          setError("We couldn't find that law. Please try another entry.");
        }
      })
      .finally(() => setLoading(false));
  }, [id, fallbackLaw]);

  const formatContent = (content: string) => {
    return content
      .split('\n')
      .map((line, i) => {
        if (line.startsWith('# ')) {
          return <h1 key={i} className="text-3xl font-bold mt-8 mb-4 text-blue-900">{line.substring(2)}</h1>;
        } else if (line.startsWith('## ')) {
          return <h2 key={i} className="text-2xl font-bold mt-6 mb-3 text-blue-800">{line.substring(3)}</h2>;
        } else if (line.startsWith('### ')) {
          return <h3 key={i} className="text-xl font-semibold mt-4 mb-2 text-gray-800">{line.substring(4)}</h3>;
        } else if (line.startsWith('---')) {
          return <hr key={i} className="my-6 border-gray-300" />;
        } else if (line.trim() === '') {
          return <br key={i} />;
        } else {
          return <p key={i} className="mb-4 text-gray-700 leading-relaxed">{line}</p>;
        }
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading law...</p>
        </div>
      </div>
    );
  }

  if (!law) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">{error || "Law not found"}</p>
        <Link to="/laws" className="text-blue-600 hover:underline">Back to Laws</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link 
        to="/laws" 
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Laws
      </Link>

      {error && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="card p-8 md:p-12">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
              {law.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {law.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(law.publish_date).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          {formatContent(law.content)}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 bg-blue-50 p-6 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Note:</strong> This is a summary of key provisions. For the complete, official text, 
            please visit the{" "}
            <a 
              href="https://www.kenyalaw.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Kenya Law website
            </a>
            {" "}or refer to the official government publications.
          </p>
        </div>
      </div>
    </div>
  );
}

