import React from 'react';
import { Award, ArrowRight, Brain, Download } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { InteractiveTerminal } from './InteractiveTerminal';

interface HeroSectionProps {
  onOpenResume: () => void;
  onOpenISTQB: () => void;
  onDownloadCV: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume, onOpenISTQB, onDownloadCV }) => {
  const { hero } = PORTFOLIO_DATA;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="relative pt-32 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* Background Ambient Radial Glow Flares */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Narrative & Metrics */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Pill Credential Badge */}
            <div className="inline-block">
              <button
                onClick={onOpenISTQB}
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 text-xs font-mono tracking-wide transition-all cursor-pointer shadow-[0_0_15px_rgba(56,189,248,0.12)]"
              >
                <Award className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>{hero.badge}</span>
                <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
                <span className="text-[11px] text-cyan-400/80 underline underline-offset-2">Verify</span>
              </button>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-[46px] xl:text-[54px] text-white leading-[1.12] tracking-tight">
              Engineering Flawless{' '}
              <span className="text-white block sm:inline">Quality Through</span>{' '}
              <span className="text-gradient-cyan block sm:inline">
                Intelligent Automation &amp; LLM Validation
              </span>
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              {hero.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => scrollToSection('skills')}
                className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white glow-btn-primary rounded-lg transition-all cursor-pointer"
              >
                <span>Explore Test Frameworks</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollToSection('projects')}
                className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium glow-btn-secondary rounded-lg transition-all cursor-pointer"
              >
                <Brain className="w-4 h-4 text-cyan-400" />
                <span>View AI Research</span>
              </button>

              <button
                onClick={onDownloadCV}
                className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/60 hover:border-slate-500 rounded-lg transition-all cursor-pointer"
                title="Download Smriti Chudasama's SDET Resume"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download CV</span>
              </button>
            </div>

            {/* Hero Key Metric Counter Cards */}
            <div className="pt-6 border-t border-cyan-500/15">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {hero.stats.map((stat, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-baseline">
                      <span className="text-cyan-300">{stat.metric}</span>
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-400 font-sans leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive IDE & Test Terminal */}
          <div className="lg:col-span-5 relative">
            {/* Subtle glow border aura */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-cyan-400/20 rounded-2xl blur-lg opacity-40 group-hover:opacity-100 transition duration-1000 -z-10"></div>
            <InteractiveTerminal />
          </div>
        </div>
      </div>
    </section>
  );
};
