import React, { useState, useEffect } from 'react';
import { Code2, Globe, Menu, X, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, toggleLanguage, language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '#hero' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.skills, href: '#skills' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.contact, href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      setIsOpen(false);
      setTimeout(() => {
        const navHeight = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }, 300);
    }
  };

  return (
    <>
      {/* DESKTOP NAVIGATION (Standard Bar) */}
      <nav 
        className={`hidden md:flex fixed top-0 left-0 right-0 z-[60] transition-all duration-500 border-b ${
          scrolled 
            ? 'bg-primary/80 backdrop-blur-md border-white/5 py-4' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
            {/* Logo */}
            <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-2 group" dir="ltr">
              <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                <Code2 className="h-6 w-6 text-accent transition-transform group-hover:scale-110" />
              </div>
              <span className="font-black text-2xl tracking-widest text-white">
                AMER<span className="text-accent">.DEV</span>
              </span>
            </a>

            {/* Links */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="relative px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors group"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-1/2 group-hover:left-1/4"></span>
                  </a>
                ))}
              </div>
              
              {/* Language Toggle */}
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-slate-400 hover:text-accent border border-slate-700 hover:border-accent/50 px-4 py-1.5 rounded-full transition-all text-xs font-bold tracking-wide"
              >
                <Globe className="w-3 h-3" />
                <span>{language === 'ar' ? 'EN' : 'AR'}</span>
              </button>
            </div>
        </div>
      </nav>

      {/* MOBILE NAVIGATION (Premium Floating Island) */}
      <div className="md:hidden fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        
        {/* Glow Effect behind the island */}
        <div className={`absolute top-0 w-3/4 h-20 bg-accent/20 blur-3xl rounded-full transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}></div>

        <div 
          className={`
            pointer-events-auto relative bg-[#0f172a]/20 backdrop-blur-2xl border border-white/20 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]
            transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) overflow-hidden
            ${isOpen 
              ? 'w-full max-w-[360px] rounded-[2rem] ring-1 ring-white/10' 
              : 'w-auto rounded-full ltr:pl-5 ltr:pr-1 rtl:pr-5 rtl:pl-1 py-1.5'
            }
          `}
        >
           {/* Header Row (Always Visible) */}
           <div className={`flex items-center justify-between ${isOpen ? 'px-6 py-5 border-b border-white/10' : ''}`}>
              
              {/* Mobile Logo */}
              <a href="#hero" onClick={(e) => !isOpen && handleNavClick(e, '#hero')} className="flex items-center gap-2.5" dir="ltr">
                 <Code2 className={`text-accent transition-all duration-300 ${isOpen ? 'w-6 h-6' : 'w-5 h-5'}`} />
                 <span className={`font-black tracking-widest text-white ${isOpen ? 'text-lg' : 'text-sm'}`}>
                    AMER<span className="text-accent">.DEV</span>
                 </span>
              </a>
              
              <div className="flex items-center gap-2">
                {/* Mobile Language Toggle (Moved to Header) */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent closing/opening menu when clicking lang
                    toggleLanguage();
                  }}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-300 hover:text-white transition-all"
                >
                  {language === 'ar' ? 'EN' : 'AR'}
                </button>

                {/* Menu Toggle */}
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className={`
                      relative flex items-center justify-center transition-all duration-300
                      ${isOpen 
                          ? 'w-10 h-10 bg-white/10 rounded-full text-white hover:bg-white/20 hover:rotate-90' 
                          : 'w-10 h-10 bg-accent text-primary rounded-full hover:bg-accent-hover'
                      }
                  `}
                  aria-label="Toggle Menu"
                >
                  {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
           </div>

           {/* Dropdown Content */}
           <div className={`
              px-5 transition-all duration-500 ease-in-out flex flex-col
              ${isOpen ? 'opacity-100 max-h-[600px] py-6' : 'opacity-0 max-h-0 hidden'}
           `}>
              {/* Links List - Premium Style */}
              <div className="flex flex-col space-y-2">
                 {navLinks.map((link, idx) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      style={{ transitionDelay: `${idx * 50}ms` }}
                      className={`
                        group flex items-center justify-between p-4 rounded-xl hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-white/10
                        ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                      `}
                    >
                       <span className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors">
                            {link.name}
                       </span>
                       <ArrowRight className={`w-4 h-4 text-accent opacity-0 group-hover:opacity-100 ltr:-translate-x-2 rtl:translate-x-2 group-hover:translate-x-0 transition-all duration-300 ${language === 'ar' ? 'rotate-180' : ''}`} />
                    </a>
                 ))}
              </div>
           </div>
        </div>
      </div>
      
      {/* Backdrop Overlay for Mobile when open */}
      <div 
        className={`md:hidden fixed inset-0 bg-[#020617]/80 backdrop-blur-sm z-40 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      ></div>
    </>
  );
};

export default Navbar;