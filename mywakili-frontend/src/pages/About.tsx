import { Scale, Target, Heart, Shield, BookOpen } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Shield,
      title: "Trust & Security",
      description: "All lawyers are verified and qualified professionals"
    },
    {
      icon: Heart,
      title: "Accessibility",
      description: "Making legal help available to everyone, everywhere"
    },
    {
      icon: Target,
      title: "Quality Service",
      description: "Connecting you with the best legal professionals"
    },
    {
      icon: BookOpen,
      title: "Education",
      description: "Empowering people with legal knowledge and resources"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-8">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Scale className="w-12 h-12 text-blue-600" />
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">About MyWakili</h1>
        </div>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          MyWakili is a legal platform designed to connect people with qualified lawyers and provide 
          access to legal education. Our mission is to make legal help accessible, affordable, 
          and easy to understand for everyone in Kenya.
        </p>
      </section>

      {/* Mission Section */}
      <section className="card p-8 md:p-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Mission</h2>
        <div className="max-w-3xl mx-auto space-y-4 text-gray-700 leading-relaxed">
          <p className="text-lg">
            At MyWakili, we believe that everyone deserves access to quality legal representation 
            and education. We're breaking down barriers that prevent people from getting the legal 
            help they need.
          </p>
          <p>
            Whether you're facing a family matter, need criminal defense, dealing with property 
            issues, or have employment concerns, MyWakili connects you with verified, experienced 
            lawyers who can help.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <div key={i} className="card p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white text-center">
        <h2 className="text-3xl font-bold mb-8">MyWakili by the Numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-5xl font-bold mb-2">500+</div>
            <div className="text-blue-100">Verified Lawyers</div>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">10K+</div>
            <div className="text-blue-100">Happy Clients</div>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">98%</div>
            <div className="text-blue-100">Satisfaction Rate</div>
          </div>
        </div>
      </section>
    </div>
  );
}
  