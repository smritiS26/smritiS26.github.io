import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Copy, Check, ExternalLink, Award } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ISTQBModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (message: string) => void;
}

export const ISTQBModal: React.FC<ISTQBModalProps> = ({ isOpen, onClose, onShowToast }) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);
  const { personal, credentials } = PORTFOLIO_DATA;

  const handleCopyId = () => {
    navigator.clipboard.writeText(personal.istqbId);
    setCopied(true);
    onShowToast(`Copied Credential ID: ${personal.istqbId}`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#090e1c] border border-cyan-500/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0d1527] border-b border-cyan-500/20">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ISTQB® Credential Registry Verification</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-200">
          {/* Official Badge Card */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-[#0e1628] to-[#0a101f] border border-cyan-500/30 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold">
                  VERIFIED &amp; ACTIVE
                </span>
                <span className="text-[11px] font-mono text-slate-400">Foundation Level</span>
              </div>
              <h3 className="text-lg font-heading font-bold text-white">
                {credentials.istqb.title}
              </h3>
              <p className="text-xs text-slate-300 font-sans">
                {credentials.istqb.issuer}
              </p>
            </div>
          </div>

          {/* Verification Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-[#0d1527] border border-cyan-500/15">
              <div className="text-[10px] text-slate-400">CANDIDATE NAME</div>
              <div className="text-white font-semibold mt-0.5">{personal.name}</div>
            </div>

            <div className="p-3 rounded-lg bg-[#0d1527] border border-cyan-500/15 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-400">CREDENTIAL ID</div>
                <div className="text-cyan-300 font-semibold mt-0.5">{personal.istqbId}</div>
              </div>
              <button
                onClick={handleCopyId}
                className="p-1.5 text-slate-400 hover:text-white rounded bg-slate-800/60 border border-slate-700/60 cursor-pointer"
                title="Copy Credential ID"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="p-3 rounded-lg bg-[#0d1527] border border-cyan-500/15">
              <div className="text-[10px] text-slate-400">EXAM BOARD</div>
              <div className="text-white font-semibold mt-0.5">Indian Testing Board (ITB)</div>
            </div>

            <div className="p-3 rounded-lg bg-[#0d1527] border border-cyan-500/15">
              <div className="text-[10px] text-slate-400">STATUS LIFECYCLE</div>
              <div className="text-emerald-400 font-semibold mt-0.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Certified / Lifelong</span>
              </div>
            </div>
          </div>

          {/* Certified Syllabus Competencies */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-cyan-400 font-semibold tracking-wider">
              // VERIFIED COMPETENCY MODULES
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Equivalence Partitioning &amp; Boundary Value Analysis (BVA)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Decision Table Testing, State Transition &amp; Use Case Verification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Static Analysis, Formal Code Reviews &amp; Defect Triage Management</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Test Execution Tools, Test Harness Design &amp; Continuous Integration</span>
              </li>
            </ul>
          </div>

          {/* Action button */}
          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-2.5 text-xs font-mono font-medium text-slate-300 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700 rounded-lg cursor-pointer transition-colors"
            >
              Close Verification Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
