import React from 'react';
import { Linkedin, Github, FileText, Mail, ArrowUp, Phone } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface FloatingDockProps {
  onOpenResume: () => void;
  onContactClick: () => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({ onOpenResume, onContactClick }) => {
  const { personal } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40">
      <div className="glass-dock rounded-full px-4 py-2 flex items-center gap-2 sm:gap-4 shadow-[0_20px_48px_rgba(0,0,0,0.8)] border border-cyan-500/25">
        {/* LinkedIn */}
        <a
          href={personal.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-slate-400 hover:text-cyan-300 hover:scale-110 transition-all rounded-full hover:bg-cyan-500/10 cursor-pointer"
          title="LinkedIn Profile"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </a>

        {/* GitHub */}
        <a
          href={personal.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-slate-400 hover:text-cyan-300 hover:scale-110 transition-all rounded-full hover:bg-cyan-500/10 cursor-pointer"
          title="GitHub Repositories"
          aria-label="GitHub"
        >
          <Github className="w-4 h-4" />
        </a>

        {/* Separator */}
        <div className="w-[1px] h-4 bg-cyan-500/20" />

        {/* Resume Modal trigger */}
        <button
          onClick={onOpenResume}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-cyan-300 hover:text-white bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/30 rounded-full transition-all cursor-pointer hover:shadow-[0_0_12px_rgba(56,189,248,0.3)]"
          title="View & Download Resume"
        >
          <FileText className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Resume</span>
        </button>

        {/* Quick Email mailto */}
        <a
          href={`mailto:${personal.email}`}
          className="p-2 text-slate-400 hover:text-cyan-300 hover:scale-110 transition-all rounded-full hover:bg-cyan-500/10 cursor-pointer"
          title={`Email: ${personal.email}`}
          aria-label="Email"
        >
          <Mail className="w-4 h-4" />
        </a>

        {/* Quick Direct Phone */}
        <a
          href={`tel:${personal.rawPhone}`}
          className="p-2 text-slate-400 hover:text-cyan-300 hover:scale-110 transition-all rounded-full hover:bg-cyan-500/10 cursor-pointer"
          title={`Call: ${personal.phone}`}
          aria-label="Phone"
        >
          <Phone className="w-4 h-4" />
        </a>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="p-2 text-slate-400 hover:text-cyan-300 hover:scale-110 transition-all rounded-full hover:bg-cyan-500/10 cursor-pointer"
          title="Back to Top"
          aria-label="Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
