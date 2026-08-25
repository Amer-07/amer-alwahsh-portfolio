import React from 'react';
import { Sparkles, Code, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Reveal from './Reveal';

const About: React.FC = () => {
  const { t } = useLanguage();

  const icons = [Sparkles, Code, Users];

  return (
    <section id="about" className="py-24 bg-primary relative overflow-hidden">
       {/* Ambient Background Elements */}
       <div className="absolute top-1/4 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-x-1/2"></div>
       <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid md:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image / Visual */}
          <div className="md:col-span-5 relative group">
             <Reveal direction="right" duration={1000}>
               <div className="absolute inset-0 bg-gradient-to-tr from-accent to-blue-600 rounded-2xl transform rotate-6 opacity-20 transition-transform duration-500 group-hover:rotate-3"></div>
               <div className="absolute inset-0 bg-secondary rounded-2xl border border-slate-700 transform -rotate-3 transition-transform duration-500 group-hover:-rotate-1"></div>
               
               <div className="relative bg-secondary rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                  <img 
                      src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop" 
                      alt="Coding Workspace" 
                      className="w-full h-[400px] object-cover opacity-80 hover:opacity-100 transition-opacity duration-500 hover:scale-105 transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                      <div className="text-white font-bold text-xl">{t.hero.name}</div>
                      <div className="text-accent text-sm font-mono mt-1">Full Stack Developer</div>
                  </div>
               </div>
             </Reveal>
          </div>

          {/* Right Column: Content */}
          <div className="md:col-span-7 space-y-8">
            <div>
                 <Reveal delay={0.2}>
                   <div className="flex items-center gap-3 mb-4">
                      <span className="w-12 h-0.5 bg-accent"></span>
                      <span className="text-accent font-bold tracking-wider uppercase text-sm">{t.about.title}</span>
                   </div>
                 </Reveal>
                 
                 <Reveal delay={0.3}>
                   <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                      {t.about.bioTitle}
                   </h2>
                 </Reveal>

                 <Reveal delay={0.4}>
                   <p className="text-slate-400 text-lg leading-relaxed">
                      {t.about.bio}
                   </p>
                 </Reveal>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800">
                {t.about.stats.map((stat, index) => {
                    const Icon = icons[index % icons.length];
                    return (
                        <Reveal key={index} delay={0.5 + (index * 0.1)} direction="up">
                            <div className="text-center md:text-start group">
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-2 text-white">
                                    <Icon className="w-5 h-5 text-accent transition-transform group-hover:scale-125 duration-300" />
                                    <span className="text-3xl font-bold">{stat.value}</span>
                                </div>
                                <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                            </div>
                        </Reveal>
                    );
                })}
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;