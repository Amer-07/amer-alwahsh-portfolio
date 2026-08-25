import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import RaadChatbot from './components/RaadChatbot';
import Loader from './components/Loader';
import SEO from './components/SEO';
import { LanguageProvider } from './contexts/LanguageContext';
import { HelmetProvider } from 'react-helmet-async';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g., assets, fonts)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Image Protection Logic
  useEffect(() => {
    const preventImageTheft = (e: Event) => {
      const target = e.target as HTMLElement;
      // Check if the target is an image
      if (target.tagName === 'IMG') {
        e.preventDefault();
      }
    };

    // Prevent right-click (Context Menu) on images
    document.addEventListener('contextmenu', preventImageTheft);
    
    // Prevent dragging images
    document.addEventListener('dragstart', preventImageTheft);

    return () => {
      document.removeEventListener('contextmenu', preventImageTheft);
      document.removeEventListener('dragstart', preventImageTheft);
    };
  }, []);

  return (
    <HelmetProvider>
      <LanguageProvider>
        {loading ? (
          <Loader />
        ) : (
          <div className="min-h-screen bg-primary text-slate-200 font-sans selection:bg-accent selection:text-primary animate-[fadeIn_0.5s_ease-in-out]">
            <SEO />
            <style>{`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              
              /* Image Protection Styles */
              img {
                -webkit-user-drag: none;
                -khtml-user-drag: none;
                -moz-user-drag: none;
                -o-user-drag: none;
                user-select: none;
                -webkit-user-select: none;
                -webkit-touch-callout: none; /* Disable iOS touch menu */
                pointer-events: auto; /* Allows clicking if it's a link, but prevents native image actions */
              }
            `}</style>
            <Navbar />
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Contact />
            </main>
            <Footer />
            <RaadChatbot />
          </div>
        )}
      </LanguageProvider>
    </HelmetProvider>
  );
};

export default App;