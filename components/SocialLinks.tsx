import React from 'react';
import { Github, Linkedin, Instagram, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const SocialLinks: React.FC = () => {
  const links = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: CONTACT_INFO.social.linkedin,
      colorClass: 'bg-[#0077b5]', // LinkedIn Blue
    },
    {
      name: 'GitHub',
      icon: Github,
      url: CONTACT_INFO.social.github,
      colorClass: 'bg-[#333333]', // GitHub Dark
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: CONTACT_INFO.social.instagram,
      colorClass: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]', // Instagram Gradient
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: CONTACT_INFO.social.whatsapp,
      colorClass: 'bg-[#25D366]', // WhatsApp Green
    }
  ];

  return (
    <div className="flex items-center gap-5">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className="group relative flex items-center justify-center w-12 h-12 bg-secondary border border-slate-700 rounded-xl overflow-hidden transition-all duration-300 hover:border-transparent hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:-translate-y-1"
        >
          {/* Animated Fill Effect (Bottom to Top) */}
          <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out ${link.colorClass}`}></div>

          {/* Icon */}
          <link.icon className="relative z-10 w-5 h-5 text-slate-400 transition-colors duration-300 group-hover:text-white" />

          {/* Tooltip */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1 pointer-events-none">
            <div className="bg-white text-primary text-xs font-bold py-1 px-3 rounded shadow-lg whitespace-nowrap relative">
              {link.name}
              {/* Tooltip Arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white"></div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;