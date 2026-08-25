import React from 'react';
import { SKILLS_DATA } from '../constants';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Reveal from './Reveal';

const Skills: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.skills.title}</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              {t.skills.subtitle}
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SKILLS_DATA.map((category, index) => (
            <Reveal key={index} delay={index * 0.15} direction="up" width="100%">
              <div className="bg-secondary rounded-xl p-6 border border-slate-800 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 h-full group">
                <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-3 group-hover:text-accent transition-colors">
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.items.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center gap-3 group/item">
                      <CheckCircle2 className="w-5 h-5 text-slate-600 group-hover/item:text-accent transition-colors duration-300" />
                      <span className="text-slate-300 group-hover/item:text-white transition-colors duration-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;