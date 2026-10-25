import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import {
  Code2,
  Database,
  Smartphone,
  Brain,
  GitBranch,
  Layers,
  Search,
  CheckCircle2
} from 'lucide-react';

export const SkillsMatrix: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getIcon = (slug: string) => {
    switch (slug) {
      case 'automation':
        return <Code2 className="w-5 h-5 text-cyan-400" />;
      case 'backend':
        return <Database className="w-5 h-5 text-cyan-400" />;
      case 'mobile':
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'genai':
        return <Brain className="w-5 h-5 text-emerald-400" />;
      case 'devops':
        return <GitBranch className="w-5 h-5 text-cyan-400" />;
      case 'domains':
        return <Layers className="w-5 h-5 text-cyan-400" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-cyan-400" />;
    }
  };

  const filteredSkills = PORTFOLIO_DATA.skills.filter((skill) => {
    const matchesCategory =
      activeCategory === 'all' ||
      (activeCategory === 'devops' ? skill.categorySlug === 'devops' : skill.categorySlug === activeCategory);

    const matchesSearch =
      searchQuery.trim() === '' ||
      skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-20 border-t border-cyan-500/15 relative">
      {/* Background glow spot */}
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 mb-8">
          <div className="text-cyan-400 font-mono text-xs font-semibold tracking-wider flex items-center gap-2">
            <span>// 01 CORE CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
            Interactive Skills Matrix
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl font-sans">
            Rigorous automation stacks, enterprise validation protocols, and GenAI guardrails.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-4 border-b border-cyan-500/10">
          {/* Category Chips / Segmented Control */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-2 md:pb-0">
            {PORTFOLIO_DATA.skillsCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-mono font-medium rounded-full transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-400/60 shadow-[0_0_12px_rgba(56,189,248,0.25)]'
                      : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search stack or tool..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0d1527] border border-cyan-500/20 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="glass-panel rounded-xl p-6 flex flex-col justify-between group hover:border-cyan-500/40 hover:-translate-y-1 transition-all duration-300 bg-[#0d1527]/70"
            >
              <div>
                {/* Header with Icon and Monospace Category Number */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/20 group-hover:border-cyan-400/50 transition-colors">
                    {getIcon(skill.categorySlug)}
                  </div>
                  <span className="font-mono text-[11px] text-cyan-400 font-semibold tracking-wider">
                    {skill.categoryNumber}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="text-lg font-heading font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {skill.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed font-sans mb-6">
                  {skill.description}
                </p>
              </div>

              {/* Tags Container */}
              <div className="pt-4 border-t border-cyan-500/10">
                <div className="flex flex-wrap gap-1.5">
                  {skill.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-block px-2.5 py-1 text-[11px] font-mono text-slate-300 bg-slate-900/80 border border-slate-800 rounded-md group-hover:border-cyan-500/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 text-slate-400 font-mono text-xs">
            No matching capabilities found for "{searchQuery}". Clear query to see all stacks.
          </div>
        )}
      </div>
    </section>
  );
};
