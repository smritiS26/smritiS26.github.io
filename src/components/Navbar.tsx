import React, { useState, useEffect } from 'react';
import { Download, ArrowRight, Menu, X, ShieldCheck, Github } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenISTQB: () => void;
  onContactClick: () => void;
  onDownloadResume?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenISTQB, onContactClick, onDownloadResume }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['about', 'skills', 'experience', 'projects', 'certifications', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090e1c]/90 backdrop-blur-md border-b border-cyan-500/20 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.7)]'
          : 'bg-[#070a13]/60 backdrop-blur-sm border-b border-cyan-500/10 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('about');
            }}
            className="group flex flex-col cursor-pointer"
          >
            <div className="flex items-center gap-1.5 font-heading font-extrabold text-base tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              <span>SC.dev</span>
              <span className="text-cyan-400 font-mono font-light">//</span>
              <span className="tracking-wider">SMRITI CHUDASAMA</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400/90 tracking-wide mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>ISTQB-CTFL SDET</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-6 text-[13px] font-medium text-slate-300">
            <button
              onClick={() => scrollTo('about')}
              className={`transition-colors hover:text-cyan-300 cursor-pointer ${
                activeSection === 'about' ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              About
            </button>
            <button
              onClick={() => scrollTo('skills')}
              className={`transition-colors hover:text-cyan-300 cursor-pointer ${
                activeSection === 'skills' ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              Skills
            </button>
            <button
              onClick={() => scrollTo('experience')}
              className={`transition-colors hover:text-cyan-300 cursor-pointer ${
                activeSection === 'experience' ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              Experience
            </button>
            <button
              onClick={() => scrollTo('projects')}
              className={`transition-colors hover:text-cyan-300 cursor-pointer ${
                activeSection === 'projects' ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              Projects & Research
            </button>
            <button
              onClick={() => scrollTo('certifications')}
              className={`transition-colors hover:text-cyan-300 cursor-pointer ${
                activeSection === 'certifications' ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              Certifications
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className={`transition-colors hover:text-cyan-300 cursor-pointer ${
                activeSection === 'contact' ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action Items */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Status Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono font-medium shadow-[0_0_12px_rgba(52,211,153,0.15)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
              <span className="tracking-wide">READY FOR SDET ROLES</span>
            </div>

            {/* GitHub Profile Navigation */}
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-cyan-300 rounded-lg hover:bg-slate-800/60 border border-slate-700/60 transition-colors"
              title="GitHub Profile (@smritichudasama)"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* Resume Button */}
            <button
              onClick={() => {
                if (onDownloadResume) {
                  onDownloadResume();
                } else {
                  onOpenResume();
                }
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/40 border border-cyan-500/30 rounded-lg transition-all hover:border-cyan-400 cursor-pointer"
              title="Download SDET Resume"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume</span>
            </button>

            {/* Contact CTA */}
            <button
              onClick={onContactClick}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white glow-btn-primary rounded-lg cursor-pointer"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={onOpenResume}
              className="p-1.5 text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 rounded-md sm:hidden"
              title="Resume"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800/40 border border-slate-700/60"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0a0f1d]/98 border-b border-cyan-500/20 backdrop-blur-2xl px-5 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between py-2 border-b border-slate-800">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>READY FOR SDET ROLES</span>
            </div>
            <button
              onClick={onOpenISTQB}
              className="text-xs text-cyan-400 flex items-center gap-1 hover:underline"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verify ISTQB</span>
            </button>
          </div>

          <div className="flex flex-col space-y-2 pt-2">
            {[
              { id: 'about', label: 'About & Vision' },
              { id: 'skills', label: 'Interactive Skills Matrix' },
              { id: 'experience', label: 'Professional Experience' },
              { id: 'projects', label: 'Projects & AI Research' },
              { id: 'certifications', label: 'Certifications & Degrees' },
              { id: 'contact', label: 'Get in Touch' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left py-2 px-3 rounded text-sm text-slate-200 hover:bg-cyan-950/30 hover:text-cyan-300 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 rounded-lg"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onContactClick();
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white glow-btn-primary rounded-lg"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
