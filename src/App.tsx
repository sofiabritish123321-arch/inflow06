import React, { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import SecurityPage from './pages/SecurityPage';
import ContactPage from './pages/ContactPage';
import FeaturesPage from './pages/FeaturesPage';
import FAQPage from './pages/FAQPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // Handle URL-based routing
    const path = window.location.pathname;
    if (path === '/login' || path === '/signup') {
      // These are handled separately below
      return;
    }
    
    // Handle hash-based navigation for other pages
    const hash = window.location.hash.replace('#', '');
    if (hash && hash !== currentPage) {
      setCurrentPage(hash);
    }
    
    const handleNavigate = (event: CustomEvent) => {
      setCurrentPage(event.detail);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setCurrentPage(hash);
    };

    window.addEventListener('navigate', handleNavigate as EventListener);
    window.addEventListener('popstate', handlePopState);
    
    return () => window.removeEventListener('navigate', handleNavigate as EventListener);
  }, []);

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToVideo = () => {
    const videoSection = document.getElementById('video-section');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle standalone auth pages
  if (window.location.pathname === '/login') {
    return (
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );
  }

  if (window.location.pathname === '/signup') {
    return (
      <AuthProvider>
        <SignupPage />
      </AuthProvider>
    );
  }
  
  const renderPage = () => {
    switch (currentPage) {
      case 'features':
        return <FeaturesPage onNavigate={handleNavigation} />;
      case 'pricing':
        return <PricingPage />;
      case 'faqs':
        return <FAQPage />;
      case 'contact':
        return <ContactPage />;
      case 'about':
        return <AboutPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      case 'security':
        return <SecurityPage />;
      default:
        return <HomePage onNavigate={handleNavigation} onScrollToVideo={handleScrollToVideo} />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <Header currentPage={currentPage} onNavigate={handleNavigation} />
        <main>
          {renderPage()}
        </main>
        <Footer onNavigate={handleNavigation} />
      </div>
    </AuthProvider>
  );
}

export default App;