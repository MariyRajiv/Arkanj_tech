import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Services from './pages/Services';
import About from './pages/About';
import EduTechLanding from './pages/EduTechLanding';
import GermanCourse from './pages/GermanCourse';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  React.useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function AppContent() {
  const location = useLocation();
  const isGermanPage = location.pathname === '/edutech/german';

  return (
    <div className="flex flex-col min-h-screen">
      {!isGermanPage && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} /> 
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/edutech" element={<EduTechLanding />} />
          <Route path="/edutech/german" element={<GermanCourse />} />
        </Routes>
      </main>
      {!isGermanPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}
