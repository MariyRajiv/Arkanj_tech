import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
const Home = lazy(() => import('./pages/Home'));
const ChatWidget = lazy(() => import('./components/ChatWidget'));

const Contact = lazy(() => import('./pages/Contact'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const EduTechLanding = lazy(() => import('./pages/EduTechLanding'));
const UpTechLanding = lazy(() => import('./pages/UpTechLanding'));
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
      // Use a small timeout to ensure the DOM has updated and scroll is possible
      const timer = setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant' as any // Use 'instant' to override CSS smooth scroll for page transitions
        });
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [pathname, hash]);
  
  return null;
}

function AppContent() {
  const location = useLocation();
  const validRoutes = [
    '/', '/home', '/contact', '/services', '/about', 
    '/edutech', '/edutech/german', '/uptech'
  ];
  
  // Normalize path by removing trailing slash for consistent route checking
  const normalizedPath = location.pathname === '/' ? '/' : location.pathname.replace(/\/$/, '');
  
  const isGermanPage = normalizedPath === '/edutech/german';
  const is404Page = !validRoutes.includes(normalizedPath);
  const hideLayout = isGermanPage || is404Page;

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {!hideLayout && <Navbar />}
      <main className="flex-grow">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} /> 
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/edutech" element={<EduTechLanding />} />
            <Route path="/uptech" element={<UpTechLanding />} />
            <Route path="/edutech/german" element={<GermanCourse />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Suspense fallback={null}>
        {!hideLayout && <Footer />}
      </Suspense>
      <Suspense fallback={null}>
        <ChatWidget />
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
