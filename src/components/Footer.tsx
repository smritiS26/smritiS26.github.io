import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface FooterProps {
  onOpenISTQB: () => void;
  onOpenResume: () => void;
  onOpenTDDReport?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenISTQB, onOpenResume, onOpenTDDReport }) => {
  const { personal } = PORTFOLIO_DATA;

  return (
    <footer className="border-t border-cyan-500/15 bg-[#070a13] py-12 pb-24 md:pb-12 text-slate-400 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left Brand & Copyright */}
          <div className="space-y-1">
            <div className="font-heading font-extrabold text-base text-white flex items-center gap-1.5">
              <span>SC.dev</span>
            </div>
            <div className="text-slate-500 text-[11px] font-mono">
              © {new Date().getFullYear()} {personal.name}. ISTQB-CTFL Certified SDET. Architected for High-Precision Automation.
            </div>
          </div>

          {/* Right Navigation / Verification Links */}
          <div className="flex flex-wrap items-center gap-6 text-[12px] font-mono">
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-300 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-300 transition-colors"
            >
              GitHub
            </a>
            <button
              onClick={onOpenResume}
              className="text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Artifacts Terminal
            </button>
            <button
              onClick={onOpenISTQB}
              className="text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              ISTQB Verification
            </button>
            {onOpenTDDReport && (
              <button
                onClick={onOpenTDDReport}
                className="text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>TDD Report (18/18 PASS)</span>
              </button>
            )}
            <span className="text-slate-600">Privacy Notice</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
