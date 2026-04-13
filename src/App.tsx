import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';

const Contact = lazy(() => import('./pages/Contact'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const EduTechLanding = lazy(() => import('./pages/EduTechLanding'));
const GermanCourse = lazy(() => import('./pages/GermanCourse'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Footer = lazy(() => import('./components/Footer'));

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
  const validRoutes = ['/', '/home', '/contact', '/services', '/about', '/edutech', '/edutech/german'];
  const isGermanPage = location.pathname === '/edutech/german';
  const is404Page = !validRoutes.includes(location.pathname);
  const hideLayout = isGermanPage || is404Page;

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Navbar />}
      <main className="flex-grow">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-brand-navy text-white">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} /> 
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/edutech" element={<EduTechLanding />} />
            <Route path="/edutech/german" element={<GermanCourse />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Suspense fallback={null}>
        {!hideLayout && <Footer />}
      </Suspense>
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
