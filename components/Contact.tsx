import React, { useState } from 'react';
import { CONTACT_INFO, FORMSPREE_ENDPOINT } from '../constants';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Reveal from './Reveal';

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const location = language === 'ar' ? CONTACT_INFO.location : CONTACT_INFO.locationEn;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // Reset button state after animation finishes
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  // Helper function to generate spans for the wave animation
  const renderSpans = (text: string) => {
    // FIX: For Arabic, split by words to preserve connected letters (ligatures)
    // Splitting by character breaks Arabic rendering
    if (language === 'ar') {
      return text.split(/(\s+)/).filter(Boolean).map((part, index) => (
        <span key={index} style={{ '--i': index * 3 } as React.CSSProperties}>
          {part === ' ' ? '\u00A0' : part}
        </span>
      ));
    }

    // For English, split by character for the wave effect
    return text.split('').map((char, index) => (
      <span key={index} style={{ '--i': index } as React.CSSProperties}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section id="contact" className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.contact.title}</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-slate-400">
              {t.contact.subtitle}
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <Reveal direction="right">
              <h3 className="text-2xl font-bold text-white">{t.contact.infoTitle}</h3>
              <p className="text-slate-400 mt-2">
                {t.contact.infoDesc}
              </p>
            </Reveal>
            
            <div className="space-y-6">
                <Reveal delay={0.2} direction="right">
                  <div className="flex items-center gap-4 text-slate-300 group">
                      <div className="p-3 bg-secondary rounded-lg border border-slate-700 group-hover:border-accent/50 transition-colors">
                          <Mail className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                          <div className="text-sm text-slate-500">{t.contact.labels.email}</div>
                          <div className="font-medium group-hover:text-accent transition-colors">{CONTACT_INFO.email}</div>
                      </div>
                  </div>
                </Reveal>

                <Reveal delay={0.3} direction="right">
                  <div className="flex items-center gap-4 text-slate-300 group">
                      <div className="p-3 bg-secondary rounded-lg border border-slate-700 group-hover:border-accent/50 transition-colors">
                          <Phone className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                          <div className="text-sm text-slate-500">{t.contact.labels.phone}</div>
                          <div className="font-medium group-hover:text-accent transition-colors" dir="ltr">{CONTACT_INFO.phone}</div>
                      </div>
                  </div>
                </Reveal>

                <Reveal delay={0.4} direction="right">
                  <div className="flex items-center gap-4 text-slate-300 group">
                      <div className="p-3 bg-secondary rounded-lg border border-slate-700 group-hover:border-accent/50 transition-colors">
                          <MapPin className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                          <div className="text-sm text-slate-500">{t.contact.labels.location}</div>
                          <div className="font-medium group-hover:text-accent transition-colors">{location}</div>
                      </div>
                  </div>
                </Reveal>
            </div>
          </div>

          {/* Contact Form */}
          <Reveal direction="up" delay={0.3}>
            <form className="bg-secondary p-8 rounded-2xl border border-slate-700 shadow-xl space-y-6" onSubmit={handleSubmit}>
              <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">{t.contact.labels.nameLabel}</label>
                  <input 
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required 
                      className="w-full bg-primary border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                      placeholder={t.contact.labels.namePlaceholder}
                  />
              </div>
              <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">{t.contact.labels.emailLabel}</label>
                  <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-primary border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                      placeholder={t.contact.labels.emailPlaceholder}
                  />
              </div>
              <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">{t.contact.labels.messageLabel}</label>
                  <textarea 
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full bg-primary border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                      placeholder={t.contact.labels.msgPlaceholder}
                  ></textarea>
              </div>
              
              <div className="flex justify-center md:justify-start w-full">
                {/* Custom Button Structure */}
                <button 
                  className={`contact-btn ${status === 'success' || status === 'submitting' ? 'active-state' : ''}`} 
                  type="submit"
                  disabled={status === 'submitting' || status === 'success'}
                >
                  <div className="outline"></div>
                  
                  {/* Default State */}
                  <div className="state state--default">
                    <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        height="1.2em"
                        width="1.2em"
                      >
                        <g style={{ filter: "url(#shadow)" }}>
                          <path
                            fill="currentColor"
                            d="M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63ZM7.63988 7.03001C4.85988 7.96001 3.86988 9.06001 3.86988 9.78001C3.86988 10.5 4.85988 11.6 7.63988 12.52L10.1599 13.36C10.3799 13.43 10.5599 13.61 10.6299 13.83L11.4699 16.35C12.3899 19.13 13.4999 20.12 14.2199 20.12C14.9399 20.12 16.0399 19.13 16.9699 16.35L19.7999 7.86001C20.3099 6.32001 20.2199 5.06001 19.5699 4.41001C18.9199 3.76001 17.6599 3.68001 16.1299 4.19001L7.63988 7.03001Z"
                          ></path>
                          <path
                            fill="currentColor"
                            d="M10.11 14.4C9.92005 14.4 9.73005 14.33 9.58005 14.18C9.29005 13.89 9.29005 13.41 9.58005 13.12L13.16 9.53C13.45 9.24 13.93 9.24 14.22 9.53C14.51 9.82 14.51 10.3 14.22 10.59L10.64 14.18C10.5 14.33 10.3 14.4 10.11 14.4Z"
                          ></path>
                        </g>
                        <defs>
                          <filter id="shadow">
                            <feDropShadow
                              floodOpacity="0.6"
                              stdDeviation="0.8"
                              dy="1"
                              dx="0"
                            ></feDropShadow>
                          </filter>
                        </defs>
                      </svg>
                    </div>
                    <p>
                      {status === 'submitting' 
                        ? renderSpans(t.contact.labels.submitting) 
                        : renderSpans(t.contact.labels.submit)
                      }
                    </p>
                  </div>

                  {/* Sent State */}
                  <div className="state state--sent">
                    <div className="icon">
                      <svg
                        stroke="black"
                        strokeWidth="0.5px"
                        width="1.2em"
                        height="1.2em"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g style={{ filter: "url(#shadow)" }}>
                          <path
                            d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M10.5795 15.5801C10.3795 15.5801 10.1895 15.5001 10.0495 15.3601L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601C10.9695 15.5001 10.7795 15.5801 10.5795 15.5801Z"
                            fill="currentColor"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <p>
                      {renderSpans(t.contact.labels.success)}
                    </p>
                  </div>
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
      
      {/* Styles applied exactly as requested with variable overrides for theme */}
      <style>{`
        .contact-btn {
          /* Theme Variables Mapping */
          --primary: #f59e0b;      /* Accent color (Amber) */
          --neutral-1: #f59e0b;    /* Button BG Main */
          --neutral-2: #d97706;    /* Button BG Darker */
          --text-color: #0f172a;   /* Slate 900 (Dark text on button) */
          --outline-color: #ffffff; /* White outline */
          --radius: 10px;          /* Radius to match inputs better (10px approx) */

          cursor: pointer;
          border-radius: var(--radius);
          text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
          border: none;
          box-shadow:
            0 1px 1px rgba(255, 255, 255, 0.4),
            0 4px 6px rgba(0, 0, 0, 0.1); /* Slightly reduced shadow */
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          width: 100%;             /* Full Width to match inputs */
          padding: 0 20px;         /* Standard padding */
          height: 56px;            /* More logical height (was 72px) */
          font-family: "Cairo", sans-serif;
          font-style: normal;
          font-size: 18px;         /* Slightly smaller font */
          font-weight: 700;
          letter-spacing: -0.2px;
          color: var(--text-color);
        }

        .contact-btn:hover {
          transform: translateY(-2px) scale(1.01);
          box-shadow:
            0 2px 2px rgba(255, 255, 255, 0.4),
            0 10px 20px rgba(0, 0, 0, 0.15),
            0 6px 10px rgba(0, 0, 0, 0.1);
        }

        .contact-btn:active {
          transform: scale(1);
          box-shadow:
            0 0 1px 2px rgba(255, 255, 255, 0.3),
            0 5px 3px -3px rgba(0, 0, 0, 0.2);
        }

        .contact-btn:after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: var(--radius);
          border: 2.5px solid transparent;
          background:
            linear-gradient(var(--neutral-1), var(--neutral-2)) padding-box,
            linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.45))
              border-box;
          z-index: 0;
          transition: all 0.4s ease;
        }

        .contact-btn:hover::after {
          transform: scale(1.02, 1.05); /* Reduced scale effect */
          box-shadow: inset 0 -1px 3px 0 rgba(255, 255, 255, 1);
        }

        .contact-btn::before {
          content: "";
          inset: 4px; /* Adjusted inset for smaller size */
          position: absolute;
          background: linear-gradient(to top, var(--neutral-1), var(--neutral-2));
          border-radius: var(--radius);
          filter: blur(0.5px);
          z-index: 2;
        }

        .state p {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .state .icon {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          transform: scale(1.1); /* Slightly smaller icon scale */
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .state .icon svg {
          overflow: visible;
        }

        /* Outline */
        .outline {
          position: absolute;
          border-radius: inherit;
          overflow: hidden;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.4s ease;
          inset: -2px -2px; /* Adjusted */
        }

        .outline::before {
          content: "";
          position: absolute;
          inset: -100%;
          background: conic-gradient(
            from 180deg,
            transparent 60%,
            var(--outline-color) 85%,
            transparent 100%
          );
          animation: spin 2.5s linear infinite;
          animation-play-state: paused;
          opacity: 0.7;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .contact-btn:hover .outline {
          opacity: 1;
        }

        .contact-btn:hover .outline::before {
          animation-play-state: running;
        }

        /* Letters */
        .state p span {
          display: block;
          opacity: 0;
          animation: slideDown 0.8s ease forwards calc(var(--i) * 0.03s);
        }

        .contact-btn:hover p span {
          opacity: 1;
          animation: wave 0.5s ease forwards calc(var(--i) * 0.02s);
        }

        /* Mimic :focus logic with .active-state class */
        .contact-btn:focus p span,
        .contact-btn.active-state p span {
          opacity: 1;
          animation: disapear 0.6s ease forwards calc(var(--i) * 0.03s);
        }

        @keyframes wave {
          30% {
            opacity: 1;
            transform: translateY(4px) translateX(0) rotate(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-4px) translateX(0) rotate(0);
            color: var(--text-color);
          }
          100% {
            opacity: 1;
            transform: translateY(0) translateX(0) rotate(0);
          }
        }

        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-20px) translateX(5px) rotate(-90deg);
            color: var(--text-color);
            filter: blur(5px);
          }
          30% {
            opacity: 1;
            transform: translateY(4px) translateX(0) rotate(0);
            filter: blur(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-3px) translateX(0) rotate(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) translateX(0) rotate(0);
          }
        }

        @keyframes disapear {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
            transform: translateX(5px) translateY(20px);
            color: var(--text-color);
            filter: blur(5px);
          }
        }

        /* Plane */
        .state--default .icon svg {
          animation: land 0.6s ease forwards;
        }

        .contact-btn:hover .state--default .icon {
          transform: rotate(45deg) scale(1.1);
        }

        .contact-btn:focus .state--default svg,
        .contact-btn.active-state .state--default svg {
          animation: takeOff 0.8s linear forwards;
        }

        .contact-btn:focus .state--default .icon,
        .contact-btn.active-state .state--default .icon {
          transform: rotate(0) scale(1.1);
        }

        @keyframes takeOff {
          0% {
            opacity: 1;
          }
          60% {
            opacity: 1;
            transform: translateX(80px) rotate(45deg) scale(2.2);
          }
          100% {
            opacity: 0;
            transform: translateX(180px) rotate(45deg) scale(0);
          }
        }

        @keyframes land {
          0% {
            transform: translateX(-60px) translateY(30px) rotate(-50deg) scale(2);
            opacity: 0;
            filter: blur(3px);
          }
          100% {
            transform: translateX(0) translateY(0) rotate(0);
            opacity: 1;
            filter: blur(0);
          }
        }

        /* Contrail */
        .state--default .icon:before {
          content: "";
          position: absolute;
          top: 50%;
          height: 2px;
          width: 0;
          left: -5px;
          background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.5));
        }

        .contact-btn:focus .state--default .icon:before,
        .contact-btn.active-state .state--default .icon:before {
          animation: contrail 0.8s linear forwards;
        }

        @keyframes contrail {
          0% {
            width: 0;
            opacity: 1;
          }
          8% {
            width: 15px;
          }
          60% {
            opacity: 0.7;
            width: 80px;
          }
          100% {
            opacity: 0;
            width: 160px;
          }
        }

        /* States */
        .state {
          padding-left: 29px;
          z-index: 2;
          display: flex;
          position: relative;
        }

        .state--default span:nth-child(4) {
          margin-right: 5px;
        }

        .state--sent {
          display: none;
        }

        .state--sent svg {
          transform: scale(1.1);
          margin-right: 8px;
        }

        .contact-btn:focus .state--default,
        .contact-btn.active-state .state--default {
          position: absolute;
        }

        .contact-btn:focus .state--sent,
        .contact-btn.active-state .state--sent {
          display: flex;
        }

        .contact-btn:focus .state--sent span,
        .contact-btn.active-state .state--sent span {
          opacity: 0;
          animation: slideDown 0.8s ease forwards calc(var(--i) * 0.2s);
        }

        .contact-btn:focus .state--sent .icon svg,
        .contact-btn.active-state .state--sent .icon svg {
          opacity: 0;
          animation: appear 1.2s ease forwards 0.8s;
        }

        @keyframes appear {
          0% {
            opacity: 0;
            transform: scale(4) rotate(-40deg);
            color: var(--text-color);
            filter: blur(4px);
          }
          30% {
            opacity: 1;
            transform: scale(0.6);
            filter: blur(1px);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;