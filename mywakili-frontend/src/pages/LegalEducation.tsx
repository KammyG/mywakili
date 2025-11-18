import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, GraduationCap, FileText, Shield, Scale, ArrowRight } from "lucide-react";
import api from "../services/api";

export default function LegalEducation() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["All", "Criminal Law", "Family Law", "Property Law", "Employment Law", "Constitutional Law"];

  useEffect(() => {
    setLoading(true);
    const params: any = {};
    if (selectedCategory && selectedCategory !== "All") {
      params.category = selectedCategory.toLowerCase().replace(' ', '_');
    }

    api.get("legal/articles/", { params })
      .then(res => {
        const articlesData = res.data.results || res.data;
        setArticles(articlesData);
      })
      .catch(err => {
        console.error("Error fetching articles:", err);
        setArticles([]);
      })
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  const getIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes("criminal")) return Shield;
    if (cat.includes("family")) return Scale;
    if (cat.includes("property")) return FileText;
    if (cat.includes("employment")) return GraduationCap;
    if (cat.includes("constitutional")) return BookOpen;
    return FileText;
  };

  const getColor = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes("criminal")) return "from-red-500 to-orange-500";
    if (cat.includes("family")) return "from-pink-500 to-rose-500";
    if (cat.includes("property")) return "from-green-500 to-emerald-500";
    if (cat.includes("employment")) return "from-blue-500 to-cyan-500";
    if (cat.includes("constitutional")) return "from-purple-500 to-indigo-500";
    return "from-blue-500 to-indigo-500";
  };

  const topics = articles.length > 0 ? articles.map((article: any) => ({
    id: article.id,
    title: article.title,
    summary: article.summary,
    category: article.category.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
    icon: getIcon(article.category),
    color: getColor(article.category),
    isConstitution: article.is_constitution
  })) : [
    { 
      id: 1, 
      title: "What to do if arrested", 
      summary: "Know your rights during police arrests and how to protect yourself legally.",
      category: "Criminal Law",
      icon: Shield,
      color: "from-red-500 to-orange-500",
      isConstitution: false
    },
    { 
      id: 2, 
      title: "Child custody process", 
      summary: "How to file for child custody and what to expect during the legal process.",
      category: "Family Law",
      icon: Scale,
      color: "from-pink-500 to-rose-500",
      isConstitution: false
    },
    { 
      id: 3, 
      title: "Property ownership rights", 
      summary: "Understanding your rights as a property owner and how to handle disputes.",
      category: "Property Law",
      icon: FileText,
      color: "from-green-500 to-emerald-500",
      isConstitution: false
    },
    { 
      id: 4, 
      title: "Employment contract basics", 
      summary: "Essential information about employment contracts and your rights as an employee.",
      category: "Employment Law",
      icon: GraduationCap,
      color: "from-blue-500 to-cyan-500",
      isConstitution: false
    },
    { 
      id: 5, 
      title: "Divorce proceedings in Kenya", 
      summary: "A comprehensive guide to the divorce process and legal requirements.",
      category: "Family Law",
      icon: FileText,
      color: "from-purple-500 to-pink-500",
      isConstitution: false
    },
    { 
      id: 6, 
      title: "Land dispute resolution", 
      summary: "How to resolve land disputes through legal channels and mediation.",
      category: "Property Law",
      icon: Shield,
      color: "from-indigo-500 to-blue-500",
      isConstitution: false
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="text-center py-8">
        <div className="flex items-center justify-center gap-3 mb-6">
          <BookOpen className="w-12 h-12 text-blue-600" />
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">Legal Education</h1>
        </div>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Empower yourself with legal knowledge. Learn about your rights, understand legal processes, 
          and make informed decisions with our comprehensive legal education resources.
        </p>
      </section>

      {/* Constitution Link */}
      <div className="card p-8 bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Constitution of Kenya, 2010</h2>
            <p className="text-gray-700">Read the supreme law of Kenya</p>
          </div>
          <Link
            to="/constitution"
            className="btn-primary inline-flex items-center gap-2"
          >
            Read Constitution <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full border-2 font-semibold transition-all ${
              selectedCategory === category
                ? "border-blue-500 text-blue-600 bg-blue-50"
                : "border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Topics Grid */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading articles...</p>
          </div>
        </div>
      ) : topics.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No articles found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <div key={topic.id} className="card p-6 group cursor-pointer">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="mb-2">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {topic.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{topic.summary}</p>
                {topic.isConstitution ? (
                  <Link
                    to="/constitution"
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <Link
                    to={`/laws/${topic.id}`}
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Need More Help?
        </h2>
        <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
          While education is important, complex legal matters often require professional guidance. 
          Connect with our verified lawyers for personalized advice.
        </p>
        <a href="/lawyers" className="btn-secondary inline-flex items-center gap-2">
          Find a Lawyer <ArrowRight className="w-5 h-5" />
        </a>
      </section>
    </div>
  );
}
  