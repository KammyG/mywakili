import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Lawyers from "../pages/Lawyers";
import LegalEducation from "../pages/LegalEducation";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lawyers" element={<Lawyers />} />
        <Route path="/legal-education" element={<LegalEducation />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
