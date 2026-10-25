import React from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, Linkedin, CheckCircle2, Award, ExternalLink, Github } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { downloadResumeDirect } from '../utils/downloadResume';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (message: string) => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, onShowToast }) => {
  if (!isOpen) return null;

  const { personal, experiences, credentials, skills } = PORTFOLIO_DATA;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    onShowToast('Downloading official SDET resume document...');
    downloadResumeDirect();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#090e1c] border border-cyan-500/30 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0d1527] border-b border-cyan-500/20 shrink-0">
          <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs">
            <Award className="w-4 h-4 text-cyan-400" />
            <span className="truncate">Smriti_Chudasama_QA_Automation_Engineer_Resume.pdf</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/Smriti_Chudasama_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded cursor-pointer transition-colors"
              title="Open Official PDF in New Tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Open PDF</span>
            </a>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-cyan-300 bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-500/40 rounded cursor-pointer transition-colors"
              title="Download Official PDF Resume"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Resume Content */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 text-slate-200 font-sans text-xs sm:text-sm print:p-0 print:bg-white print:text-black">
          {/* Header */}
          <div className="border-b border-cyan-500/20 pb-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
                  Smriti Chudasama
                </h1>
                <div className="text-cyan-400 font-mono text-xs sm:text-sm font-semibold tracking-wide mt-1">
                  ISTQB-CTFL Certified SDET &amp; QA Automation Engineer
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Ready For Hire
                </span>
              </div>
            </div>

            {/* Quick Contacts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 text-slate-300 text-xs font-mono pt-2">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <a href={`mailto:${personal.email}`} className="truncate hover:text-cyan-300" title="Send Email">
                  {personal.email}
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <a href={`tel:${personal.rawPhone}`} className="hover:text-cyan-300" title="Direct Call">
                  {personal.phone}
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">Ahmedabad, India</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <a href={personal.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline truncate" title="LinkedIn">
                  LinkedIn
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <a href={personal.github} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline truncate" title="GitHub">
                  github.com/{personal.githubId}
                </a>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h2 className="text-sm font-heading font-bold text-white tracking-wider font-mono text-cyan-400">
              // EXECUTIVE PROFILE
            </h2>
            <p className="text-slate-300 leading-relaxed font-sans text-xs sm:text-[13px]">
              High-precision QA Automation Engineer &amp; SDET with 4+ years of industry experience architecting resilient test automation frameworks across Web, Mobile (Android/iOS), API, and Enterprise CRM/ERP ecosystems. Demonstrated success in orchestrating CI/CD quality gates, driving sprint escape rates to zero, and validating emerging GenAI/LLM-powered interfaces for hallucination suppression, contextual grounding, and prompt-injection defense.
            </p>
          </div>

          {/* Technical Arsenal Matrix */}
          <div className="space-y-3">
            <h2 className="text-sm font-heading font-bold tracking-wider font-mono text-cyan-400">
              // TECHNICAL SKILLS &amp; ARSENAL
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-[#0d1527] border border-cyan-500/15">
                <div className="text-cyan-300 font-semibold mb-1">Test Automation Frameworks:</div>
                <div className="text-slate-300">Selenium WebDriver, Appium, REST Assured, TestNG, Maven, Page Object Model (POM), Data-Driven Testing</div>
              </div>
              <div className="p-3 rounded-lg bg-[#0d1527] border border-cyan-500/15">
                <div className="text-cyan-300 font-semibold mb-1">Mobile &amp; Cloud Infrastructure:</div>
                <div className="text-slate-300">LambdaTest Real Device Cloud, UIAutomator2, XCUITest, Android Studio, Xcode Testing</div>
              </div>
              <div className="p-3 rounded-lg bg-[#0d1527] border border-cyan-500/15">
                <div className="text-cyan-300 font-semibold mb-1">GenAI &amp; LLM Quality Engineering:</div>
                <div className="text-slate-300">Output Validation, Hallucination Detection, Prompt Injection Guardrails, Semantic Cosine Similarity</div>
              </div>
              <div className="p-3 rounded-lg bg-[#0d1527] border border-cyan-500/15">
                <div className="text-cyan-300 font-semibold mb-1">DevOps, Tools &amp; Methodologies:</div>
                <div className="text-slate-300">Jenkins CI/CD, Git, GitHub, Postman, SQL Verification, Jira, Agile/Scrum, Defect Lifecycle Governance</div>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h2 className="text-sm font-heading font-bold tracking-wider font-mono text-cyan-400">
              // PROFESSIONAL EXPERIENCE
            </h2>

            {experiences.map((exp) => (
              <div key={exp.id} className="p-4 rounded-xl bg-[#0d1527]/70 border border-cyan-500/15 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="text-base font-heading font-bold text-white">
                      {exp.title} <span className="text-cyan-400 font-normal">| {exp.company}</span>
                    </h3>
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    {exp.period}
                  </div>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-300 pt-1">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">›</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education & Credentials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
              <h2 className="text-sm font-heading font-bold tracking-wider font-mono text-cyan-400">
                // EDUCATION
              </h2>
              {credentials.degrees.map((deg, i) => (
                <div key={i} className="p-3 rounded-lg bg-[#0d1527] border border-cyan-500/15 space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">{deg.degree}</span>
                    <span className="text-emerald-400 font-mono">{deg.score}</span>
                  </div>
                  <div className="text-[11px] text-cyan-300">{deg.institution}</div>
                  <div className="text-[10px] text-slate-400">{deg.level}</div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h2 className="text-sm font-heading font-bold tracking-wider font-mono text-cyan-400">
                // CERTIFICATIONS
              </h2>
              <div className="p-3 rounded-lg bg-[#0d1527] border border-cyan-500/15 space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">ISTQB Certified Tester (CTFL)</span>
                  <span className="text-emerald-400 font-mono text-[10px]">ACTIVE</span>
                </div>
                <div className="text-[11px] text-slate-300">International Software Testing Qualifications Board</div>
              </div>
              <div className="p-3 rounded-lg bg-[#0d1527] border border-cyan-500/15 space-y-1">
                <div className="text-xs font-bold text-white">Anthropic AI Fluency: Framework and Foundations</div>
                <div className="text-[11px] text-slate-400">Prompt engineering, model safety &amp; LLM behavior evaluation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
