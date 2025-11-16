import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, FileText, ArrowRight, Calendar, User, Filter } from "lucide-react";
import api from "../services/api";

export default function Laws() {
  const [laws, setLaws] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    { value: "", label: "All Categories" },
    { value: "criminal", label: "Criminal Law" },
    { value: "family", label: "Family Law" },
    { value: "civil", label: "Civil Law" },
    { value: "employment", label: "Employment Law" },
    { value: "property", label: "Property Law" },
    { value: "rights", label: "Human Rights" },
  ];

  useEffect(() => {
    setLoading(true);
    const params: any = {};
    if (selectedCategory) params.category = selectedCategory;
    if (searchTerm) params.search = searchTerm;

    api.get("/legal/articles/", { params })
      .then(res => {
        // Filter out the Constitution
        const articles = (res.data.results || res.data).filter(
          (a: any) => !a.is_constitution && !a.title.includes("Constitution")
        );
        setLaws(articles);
      })
      .catch(err => {
        console.error("Error fetching laws:", err);
        setLaws([]);
      })
      .finally(() => setLoading(false));
  }, [selectedCategory, searchTerm]);

  const formatContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
          Laws of Kenya
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          Browse and learn about the laws that govern Kenya
        </p>
      </div>

      {/* Search and Filter */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search laws..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-12 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading laws...</p>
          </div>
        </div>
      ) : laws.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No laws found matching your search.</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-800">{laws.length}</span> law{laws.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {laws.map((law) => (
              <div key={law.id} className="card p-6 group cursor-pointer hover:shadow-xl transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {law.category.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {law.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {formatContent(law.summary || law.content)}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {law.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(law.publish_date).toLocaleDateString()}
                  </span>
                </div>
                <Link
                  to={`/laws/${law.id}`}
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
                >
                  Read Full Law <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

