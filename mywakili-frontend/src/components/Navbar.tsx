import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons for menu toggle (from lucide-react)

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          MyWakili
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/lawyers" className="hover:text-gray-200">Lawyers</Link>
          <Link to="/legal-education" className="hover:text-gray-200">Legal Education</Link>
          <Link to="/about" className="hover:text-gray-200">About</Link>
          <Link to="/contact" className="hover:text-gray-200">Contact</Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-white text-blue-600 font-semibold rounded hover:bg-gray-100 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-yellow-400 text-blue-800 font-semibold rounded hover:bg-yellow-300 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 px-4 pb-4 space-y-3">
          <Link to="/" className="block hover:text-gray-200" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/lawyers" className="block hover:text-gray-200" onClick={() => setIsOpen(false)}>Lawyers</Link>
          <Link to="/legal-education" className="block hover:text-gray-200" onClick={() => setIsOpen(false)}>Legal Education</Link>
          <Link to="/about" className="block hover:text-gray-200" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/contact" className="block hover:text-gray-200" onClick={() => setIsOpen(false)}>Contact</Link>

          <div className="pt-3 border-t border-blue-500">
            <Link
              to="/login"
              className="block px-4 py-2 bg-white text-blue-600 font-semibold rounded hover:bg-gray-100 transition text-center"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block mt-2 px-4 py-2 bg-yellow-400 text-blue-800 font-semibold rounded hover:bg-yellow-300 transition text-center"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
