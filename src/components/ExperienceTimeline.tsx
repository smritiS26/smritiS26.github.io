import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Briefcase, ChevronRight, Calendar } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-20 border-t border-cyan-500/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <div className="text-cyan-400 font-mono text-xs font-semibold tracking-wider flex items-center gap-2">
            <span>// 02 CAREER TRAJECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
            Professional Experience
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl font-sans">
            A proven track record of zero-defect delivery across international enterprise clients.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-8 border-l border-cyan-500/20 space-y-10 sm:space-y-12">
          {PORTFOLIO_DATA.experiences.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Concentric Glowing Node on Timeline Track */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-6 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-[#070a13] border-2 border-cyan-400 flex items-center justify-center group-hover:scale-125 transition-transform duration-300 shadow-[0_0_12px_rgba(56,189,248,0.5)]">
                  <div className="w-2 h-2 rounded-full bg-cyan-300"></div>
                </div>
              </div>

              {/* Card Container */}
              <div className="glass-panel rounded-xl p-6 sm:p-7 bg-[#0d1527]/80 hover:border-cyan-500/40 transition-all duration-300">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-cyan-500/10">
                  <div>
                    {exp.isCurrent && (
                      <span className="inline-block px-2.5 py-0.5 mb-2 text-[10px] font-mono font-semibold tracking-widest text-cyan-300 bg-cyan-950/70 border border-cyan-400/40 rounded">
                        CURRENT ROLE
                      </span>
                    )}
                    <h3 className="text-xl font-heading font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {exp.title}
                    </h3>
                    <div className="text-sm font-semibold text-slate-300 mt-0.5 flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  {/* Date & Mode in Monospace */}
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-900/60 px-3 py-1.5 rounded border border-slate-800 self-start sm:self-center">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Scannable Bullet Points */}
                <ul className="mt-5 space-y-3">
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-300 leading-relaxed font-sans">
                      <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                      <span>
                        {/* Highlights bold text */}
                        <span
                          dangerouslySetInnerHTML={{
                            __html: bullet
                              .replace(
                                /(6 high-profile client projects|Page Object Model \(POM\) and data-driven principles|REST Assured and Postman|LambdaTest real device cloud|prompt injection prevention, and hallucination reduction|sprint escape rates to zero|100\+ comprehensive functional and regression test cases|25\+ critical defects prior to production release|Salesforce Commerce Cloud \(SFCC\)|zero critical downtime)/g,
                                '<strong class="text-white font-semibold">$1</strong>'
                              )
                          }}
                        />
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Tech Badges */}
                <div className="mt-6 pt-4 border-t border-cyan-500/10 flex flex-wrap gap-2">
                  {exp.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-[11px] font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/20 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
