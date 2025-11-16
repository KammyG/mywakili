import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Scale, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold hover:scale-105 transition-transform">
          <Scale className="w-7 h-7" />
          <span>MyWakili</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-1">
          <Link 
            to="/" 
            className={`px-4 py-2 rounded-lg transition-all ${
              isActive("/") 
                ? "bg-white/20 font-semibold" 
                : "hover:bg-white/10"
            }`}
          >
            Home
          </Link>
          <Link 
            to="/lawyers" 
            className={`px-4 py-2 rounded-lg transition-all ${
              isActive("/lawyers") 
                ? "bg-white/20 font-semibold" 
                : "hover:bg-white/10"
            }`}
          >
            Lawyers
          </Link>
          <Link 
            to="/legal-education" 
            className={`px-4 py-2 rounded-lg transition-all ${
              isActive("/legal-education") 
                ? "bg-white/20 font-semibold" 
                : "hover:bg-white/10"
            }`}
          >
            Legal Education
          </Link>
          <Link 
            to="/laws" 
            className={`px-4 py-2 rounded-lg transition-all ${
              isActive("/laws") 
                ? "bg-white/20 font-semibold" 
                : "hover:bg-white/10"
            }`}
          >
            Laws
          </Link>
          <Link 
            to="/petitions" 
            className={`px-4 py-2 rounded-lg transition-all ${
              isActive("/petitions") 
                ? "bg-white/20 font-semibold" 
                : "hover:bg-white/10"
            }`}
          >
            Petitions
          </Link>
          <Link 
            to="/about" 
            className={`px-4 py-2 rounded-lg transition-all ${
              isActive("/about") 
                ? "bg-white/20 font-semibold" 
                : "hover:bg-white/10"
            }`}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={`px-4 py-2 rounded-lg transition-all ${
              isActive("/contact") 
                ? "bg-white/20 font-semibold" 
                : "hover:bg-white/10"
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg">
                <User className="w-4 h-4" />
                <span className="text-sm">{user?.username || user?.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 transition-all border border-white/30 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 transition-all border border-white/30"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 bg-gradient-to-r from-accent-400 to-accent-500 text-blue-900 font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700/95 backdrop-blur-sm px-4 pb-4 space-y-2 animate-slide-up">
          <Link 
            to="/" 
            className={`block px-4 py-2 rounded-lg transition-all ${
              isActive("/") ? "bg-white/20 font-semibold" : "hover:bg-white/10"
            }`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/lawyers" 
            className={`block px-4 py-2 rounded-lg transition-all ${
              isActive("/lawyers") ? "bg-white/20 font-semibold" : "hover:bg-white/10"
            }`}
            onClick={() => setIsOpen(false)}
          >
            Lawyers
          </Link>
          <Link 
            to="/legal-education" 
            className={`block px-4 py-2 rounded-lg transition-all ${
              isActive("/legal-education") ? "bg-white/20 font-semibold" : "hover:bg-white/10"
            }`}
            onClick={() => setIsOpen(false)}
          >
            Legal Education
          </Link>
          <Link 
            to="/laws" 
            className={`block px-4 py-2 rounded-lg transition-all ${
              isActive("/laws") ? "bg-white/20 font-semibold" : "hover:bg-white/10"
            }`}
            onClick={() => setIsOpen(false)}
          >
            Laws
          </Link>
          <Link 
            to="/petitions" 
            className={`block px-4 py-2 rounded-lg transition-all ${
              isActive("/petitions") ? "bg-white/20 font-semibold" : "hover:bg-white/10"
            }`}
            onClick={() => setIsOpen(false)}
          >
            Petitions
          </Link>
          <Link 
            to="/about" 
            className={`block px-4 py-2 rounded-lg transition-all ${
              isActive("/about") ? "bg-white/20 font-semibold" : "hover:bg-white/10"
            }`}
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={`block px-4 py-2 rounded-lg transition-all ${
              isActive("/contact") ? "bg-white/20 font-semibold" : "hover:bg-white/10"
            }`}
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>

          <div className="pt-3 border-t border-blue-500 space-y-2">
            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 bg-white/20 text-white rounded-lg text-center">
                  <User className="w-4 h-4 inline mr-2" />
                  {user?.username || user?.email}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition text-center flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 bg-gradient-to-r from-accent-400 to-accent-500 text-blue-900 font-semibold rounded-lg hover:shadow-lg transition text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
