import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ShieldCheck, GraduationCap, ExternalLink, Award, Sparkles } from 'lucide-react';

interface CertificationsEducationProps {
  onOpenISTQB: () => void;
}

export const CertificationsEducation: React.FC<CertificationsEducationProps> = ({ onOpenISTQB }) => {
  const { credentials } = PORTFOLIO_DATA;

  return (
    <section id="certifications" className="py-20 border-t border-cyan-500/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <div className="text-cyan-400 font-mono text-xs font-semibold tracking-wider flex items-center gap-2">
            <span>// 04 VERIFIED CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
            Certifications &amp; Education
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl font-sans">
            Formal credentials reflecting continuous mastery in software testing, artificial intelligence, and engineering management.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Industry Certifications (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 font-heading font-bold text-lg text-white">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <h3>Industry Certifications</h3>
            </div>

            {/* Featured ISTQB Card */}
            <div
              onClick={onOpenISTQB}
              className="glass-panel rounded-xl p-6 bg-[#0d1527]/90 border border-cyan-500/30 hover:border-cyan-400 cursor-pointer group transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
                      <Award className="w-4 h-4" />
                    </span>
                    <h4 className="text-base sm:text-lg font-heading font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {credentials.istqb.title}
                    </h4>
                  </div>
                  <div className="text-xs text-slate-400 font-mono pl-7">
                    {credentials.istqb.issuer}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-semibold tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    {credentials.istqb.status}
                  </span>
                  <ExternalLink className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans mt-3 pl-7">
                {credentials.istqb.description}
              </p>
            </div>

            {/* Anthropic AI Fluency Card */}
            <div className="glass-panel rounded-xl p-5 bg-[#0d1527]/70 border border-cyan-500/15 hover:border-cyan-500/30 transition-all">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-sm font-heading font-bold text-white">
                    {credentials.anthropic.title}
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-cyan-400 font-medium">
                  {credentials.anthropic.issuer}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {credentials.anthropic.description}
              </p>
            </div>

            {/* 2x2 Subgrid for Other Certifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {credentials.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="glass-panel rounded-xl p-4 bg-[#0d1527]/60 border border-cyan-500/15 hover:border-cyan-500/30 transition-all space-y-1.5"
                >
                  <div className="text-[10px] font-mono text-cyan-400 font-semibold tracking-wider">
                    {cert.platform}
                  </div>
                  <h5 className="text-xs font-heading font-bold text-white">
                    {cert.title}
                  </h5>
                  <p className="text-[11px] text-slate-400 font-sans leading-snug">
                    {cert.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Academic Degrees (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 font-heading font-bold text-lg text-white">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
              <h3>Academic Degrees</h3>
            </div>

            <div className="space-y-6">
              {credentials.degrees.map((degree, idx) => (
                <div
                  key={idx}
                  className="glass-panel rounded-xl p-6 bg-[#0d1527]/80 border border-cyan-500/20 hover:border-cyan-400/40 transition-all space-y-3"
                >
                  {/* Top Level and CGPA */}
                  <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
                    <span className="text-slate-400 font-medium">{degree.level}</span>
                    <span className="text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                      {degree.score}
                    </span>
                  </div>

                  {/* Degree Name & Institution */}
                  <div>
                    <h4 className="text-base font-heading font-bold text-white">
                      {degree.degree}
                    </h4>
                    <div className="text-xs font-semibold text-cyan-300 font-sans mt-0.5">
                      {degree.institution}
                    </div>
                  </div>

                  {/* Coursework & Description */}
                  <p className="text-xs text-slate-300 font-sans leading-relaxed pt-2 border-t border-cyan-500/10">
                    {degree.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
