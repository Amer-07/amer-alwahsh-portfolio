import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import SocialLinks from './SocialLinks';
import Reveal from './Reveal';
import { HERO_IMAGE } from '../constants';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing Effect Logic
  useEffect(() => {
    const fullText = t.hero.title;
    let timer: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      // Deleting Phase
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(prev => prev.slice(0, -1));
        }, 50); // Deleting speed
      } else {
        // Finished deleting, start typing immediately
        setIsDeleting(false);
      }
    } else {
      // Typing Phase
      if (displayedText.length < fullText.length) {
        timer = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length + 1));
        }, 100); // Typing speed
      } else {
        // Finished typing, wait before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000); // Wait time at end of sentence
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, t.hero.title]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 md:pt-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Increased gap from gap-8 to gap-20 on mobile to fix overlapping issue */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-20 md:gap-12 pb-12 md:pb-0">
          
          <div className="md:w-1/2 text-center md:text-start space-y-6">
            <Reveal delay={0.1}>
              <div className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-2 border border-accent/20">
                {t.hero.welcome}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="text-accent">{t.hero.name}</span>
                <br />
                <span className="text-slate-300 text-2xl md:text-4xl mt-2 block min-h-[1.5em]">
                  {displayedText}
                  <span className="text-accent animate-pulse">|</span>
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.4}>
              <p className="text-slate-400 text-lg md:text-xl max-w-lg mx-auto md:mx-0">
                {t.hero.tagline}. {t.hero.description}
              </p>
            </Reveal>
            
            <Reveal delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                <a 
                  href="#projects" 
                  onClick={(e) => handleScroll(e, '#projects')}
                  className="px-8 py-3 bg-accent hover:bg-accent-hover text-primary font-bold rounded-lg transition-all transform hover:-translate-y-1 shadow-lg shadow-accent/20"
                >
                  {t.hero.ctaProject}
                </a>
                <a 
                  href="#contact" 
                  onClick={(e) => handleScroll(e, '#contact')}
                  className="px-8 py-3 bg-secondary hover:bg-slate-700 text-white font-medium rounded-lg border border-slate-600 transition-all"
                >
                  {t.hero.ctaContact}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.8}>
              <div className="flex items-center justify-center md:justify-start pt-6">
                 <SocialLinks />
              </div>
            </Reveal>
          </div>

          <div className="md:w-1/2 flex justify-center relative">
            <Reveal direction="left" delay={0.3} width="100%" className="flex justify-center">
              <div className="relative w-64 h-64 md:w-96 md:h-96">
                <div className="absolute inset-0 bg-accent rounded-full rotate-6 opacity-20 animate-pulse"></div>
                <div className="absolute inset-0 bg-blue-500 rounded-full -rotate-6 opacity-20"></div>
                <img 
                  src={HERO_IMAGE} 
                  alt="Amer Alwahsh" 
                  className="relative w-full h-full object-cover rounded-full border-4 border-slate-800 shadow-2xl transition-transform hover:scale-105 duration-500"
                />
              </div>
            </Reveal>
          </div>

        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-500 hidden md:block">
        <ArrowDown className="w-6 h-6" />
      </div>
    </section>
  );
};

export default Hero;