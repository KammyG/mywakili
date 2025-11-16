import { Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Lawyers from './pages/Lawyers';
import LawyerProfile from './pages/LawyerProfile';
import LegalEducation from './pages/LegalEducation';
import Constitution from './pages/Constitution';
import Laws from './pages/Laws';
import LawDetail from './pages/LawDetail';
import Petitions from './pages/Petitions';
import PetitionDetail from './pages/PetitionDetail';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* main content area */}
      <main className="flex-grow container mx-auto px-4 py-8">
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
      </main>

      <Footer />
    </div>
  );
}
