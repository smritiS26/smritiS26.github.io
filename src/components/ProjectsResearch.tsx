import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Sparkles, CheckCircle2, Smartphone, Cpu, GraduationCap, LayoutGrid } from 'lucide-react';

export const ProjectsResearch: React.FC = () => {
  const { researchSpotlight, projects } = PORTFOLIO_DATA;

  const getProjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <LayoutGrid className="w-5 h-5 text-cyan-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-cyan-400" />;
      default:
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="projects" className="py-20 border-t border-cyan-500/15 relative">
      {/* Background glow flare */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 mb-10">
          <div className="text-cyan-400 font-mono text-xs font-semibold tracking-wider flex items-center gap-2">
            <span>// 03 ARCHITECTURE & INVESTIGATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
            Featured Projects &amp; AI Research
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl font-sans">
            Advancing enterprise automation through empirical testing architectures and Agentic AI governance.
          </p>
        </div>

        {/* Big Academic Spotlight Card */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 lg:p-10 bg-[#0d1527]/90 border border-cyan-500/25 shadow-[0_15px_40px_rgba(0,0,0,0.6)] mb-10 group hover:border-cyan-400/40 transition-all duration-300">
          {/* Header Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-cyan-500/15">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{researchSpotlight.badge}</span>
            </div>
            <div className="text-xs font-mono text-slate-400 tracking-wider">
              {researchSpotlight.domainBadge}
            </div>
          </div>

          {/* Research Title */}
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-6 mb-6 group-hover:text-cyan-200 transition-colors">
            {researchSpotlight.title}
          </h3>

          {/* Split Content: Left Narrative + Right Phase Blueprint */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Narrative & Quantitative Findings */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {researchSpotlight.narrative}
              </p>

              {/* 3 Large Telemetry Metric Widgets */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {researchSpotlight.metrics.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-xl bg-[#090e1c] border border-cyan-500/20 text-center flex flex-col justify-center"
                  >
                    <div className="font-mono text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-400 tracking-tight">
                      {item.value}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-slate-400 font-sans mt-1 leading-tight">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Research Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {researchSpotlight.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-[11px] font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/20 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Blueprint Box: Adoption Phases Formulated */}
            <div className="lg:col-span-5 rounded-xl bg-[#090e1c] border border-cyan-500/20 p-5 font-mono space-y-4">
              <div className="text-cyan-400 text-xs font-semibold tracking-wider pb-2 border-b border-cyan-500/15">
                // ADOPTION PHASES FORMULATED
              </div>

              <div className="space-y-4">
                {researchSpotlight.phases.map((phase, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-xs font-semibold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      <span>{phase.phase}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 pl-3.5 leading-normal">
                      {phase.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3 Secondary Architecture Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="glass-panel rounded-xl p-6 bg-[#0d1527]/70 flex flex-col justify-between group hover:border-cyan-400/40 transition-all duration-300"
            >
              <div>
                {/* Header Icon */}
                <div className="p-2.5 w-fit rounded-lg bg-cyan-950/50 border border-cyan-500/20 mb-4 group-hover:border-cyan-400 transition-colors">
                  {getProjectIcon(proj.iconName)}
                </div>

                {/* Title */}
                <h4 className="text-base font-heading font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {proj.title}
                </h4>

                {/* Description */}
                <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
                  {proj.description}
                </p>
              </div>

              <div>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-mono text-slate-300 bg-slate-900/80 border border-slate-800 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Verified Green Status Check */}
                <div className="pt-3 border-t border-cyan-500/10 flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-[11px] font-medium">{proj.statusHighlight}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
