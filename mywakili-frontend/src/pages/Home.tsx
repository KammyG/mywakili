import { Link } from "react-router-dom";
import { Scale, Users, Shield, BookOpen, ArrowRight, CheckCircle } from "lucide-react";
import CategoryCard from "../components/CategoryCard";

export default function Home() {
  const categories = [
    { 
      title: "Family Law", 
      description: "Divorce, custody, adoption, and family matters.", 
      icon: Users,
      color: "from-pink-500 to-rose-500"
    },
    { 
      title: "Criminal Law", 
      description: "Arrests, bail, defense, and criminal representation.", 
      icon: Shield,
      color: "from-red-500 to-orange-500"
    },
    { 
      title: "Land & Property", 
      description: "Property disputes, purchases, and land matters.", 
      icon: Scale,
      color: "from-green-500 to-emerald-500"
    },
    { 
      title: "Employment", 
      description: "Contracts, wrongful termination, and labor rights.", 
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500"
    },
  ];

  const features = [
    "Verified & Qualified Lawyers",
    "Affordable Consultation Fees",
    "24/7 Legal Support",
    "Easy Booking System"
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 px-4 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            Your Legal Help, Simplified
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Connect with qualified lawyers in Kenya. Get expert legal advice, book consultations, 
            and understand your rights—all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/lawyers" className="btn-primary inline-flex items-center gap-2">
              Find a Lawyer <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/legal-education" className="btn-secondary inline-flex items-center gap-2">
              Learn More <BookOpen className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-2 text-sm md:text-base">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700 font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
          Legal Services We Offer
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Browse our comprehensive legal categories and find the right lawyer for your needs
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c, i) => (
            <CategoryCard 
              key={i} 
              title={c.title}
              description={c.description}
              icon={c.icon}
              color={c.color}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center text-white shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
          Join thousands of Kenyans who trust MyWakili for their legal needs
        </p>
        <Link to="/signup" className="btn-secondary inline-flex items-center gap-2">
          Sign Up Free <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
