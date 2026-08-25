import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import SocialLinks from './SocialLinks';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-secondary border-t border-slate-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-slate-400 text-sm">
          © {new Date().getFullYear()} <span className="text-white font-bold">{t.hero.name}</span>. {t.footer.rights}
        </div>
        <div>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
};

export default Footer;