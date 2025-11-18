import { Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Lawyers from "./pages/Lawyers";
import LawyerProfile from "./pages/LawyerProfile";
import LegalEducation from "./pages/LegalEducation";
import Constitution from "./pages/Constitution";
import Laws from "./pages/Laws";
import LawDetail from "./pages/LawDetail";
import Petitions from "./pages/Petitions";
import PetitionDetail from "./pages/PetitionDetail";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <div className="relative min-h-screen">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-80"
        aria-hidden="true"
      >
        <div className="h-full w-full bg-[radial-gradient(circle_at_top,#ffffff55,transparent_45%),radial-gradient(circle_at_bottom,#1d4ed833,transparent_40%)]" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />

        {/* main content area */}
        <main className="flex-grow px-4 py-10">
          <div className="mx-auto w-full max-w-6xl">
            <div className="glass-panel">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/lawyers" element={<Lawyers />} />
                <Route path="/lawyers/:id" element={<LawyerProfile />} />
                <Route path="/legal-education" element={<LegalEducation />} />
                <Route path="/constitution" element={<Constitution />} />
                <Route path="/laws" element={<Laws />} />
                <Route path="/laws/:id" element={<LawDetail />} />
                <Route path="/petitions" element={<Petitions />} />
                <Route path="/petitions/:id" element={<PetitionDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
