import React from 'react';
import { PROJECTS_DATA } from '../constants';
import { ExternalLink, Github } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Reveal from './Reveal';

const Projects: React.FC = () => {
  const { t, language } = useLanguage();
  const projects = PROJECTS_DATA[language];

  return (
    <section id="projects" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.projects.title}</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.15} width="100%">
              <div className="group bg-primary rounded-xl overflow-hidden border border-slate-800 hover:border-accent/50 transition-all duration-300 flex flex-col h-full hover:shadow-2xl hover:shadow-accent/5">
                <div className="relative h-48 overflow-hidden">
                  <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.demoUrl && (
                      <a href={project.demoUrl} className="p-2 bg-accent text-primary rounded-full hover:bg-white transition-colors transform hover:scale-110" title="Live Demo">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a href={project.repoUrl} className="p-2 bg-secondary text-white rounded-full hover:bg-white hover:text-primary transition-colors transform hover:scale-110" title="View Code">
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                  <p className="text-slate-400 text-sm mb-4 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-800 text-accent text-xs rounded-full border border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;