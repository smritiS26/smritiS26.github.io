import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Mail, Phone, MapPin, Linkedin, Send, Copy, Check, CheckCircle2, ExternalLink, ShieldCheck, FileText } from 'lucide-react';
import {
  validateInquiryPayload,
  dispatchInquiry,
  buildGmailWebUrl,
  buildOutlookWebUrl,
  formatInquiryClipboardText,
  RECIPIENT_EMAIL,
  InquiryPayload
} from '../utils/inquiryService';

interface ContactSectionProps {
  onShowToast: (message: string) => void;
  onOpenTDDReport: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast, onOpenTDDReport }) => {
  const { personal } = PORTFOLIO_DATA;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<InquiryPayload>({
    name: '',
    email: '',
    inquiryType: 'Full-time Senior QA / SDET Role',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    onShowToast('Email copied to clipboard: ' + personal.email);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPayload = () => {
    const text = formatInquiryClipboardText(formData);
    navigator.clipboard.writeText(text);
    setCopiedPayload(true);
    onShowToast('Formatted inquiry text copied to clipboard!');
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TDD Validation Execution (Equivalence Partitioning & Boundary Value Analysis)
    const validation = validateInquiryPayload(formData);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      const firstError = Object.values(validation.errors)[0];
      onShowToast(`Validation error: ${firstError}`);
      return;
    }

    setValidationErrors({});

    // Active Multi-Channel Transmission
    dispatchInquiry(formData);
    setFormSubmitted(true);
    onShowToast(`Inquiry formatted and dispatched to ${RECIPIENT_EMAIL}`);
  };

  return (
    <section id="contact" className="py-20 border-t border-cyan-500/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <div className="text-cyan-400 font-mono text-xs font-semibold tracking-wider flex items-center gap-2">
            <span>// 05 CONNECT DIRECTLY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
            Get In Touch
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl font-sans">
            {personal.availabilityText}
          </p>
        </div>

        {/* Contact Layout: Left Info + Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="text-2xl font-heading font-bold text-white mb-2">
                Let's Discuss Quality Engineering
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                Whether you're building a new test framework from scratch or hardening GenAI outputs against hallucination, I bring proven rigor to the pipeline.
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {/* Email Card with direct mailto & Copy button */}
              <div className="glass-panel rounded-xl p-4 bg-[#0d1527]/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/20 text-cyan-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold tracking-wider">
                      PRIMARY EMAIL
                    </div>
                    <a
                      href={`mailto:${personal.email}`}
                      className="text-white hover:text-cyan-300 transition-colors break-all"
                      title="Send Email"
                    >
                      {personal.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 text-[11px] text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 hover:border-cyan-400 rounded transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                >
                  {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Phone with direct tel: and copy */}
              <div className="glass-panel rounded-xl p-4 bg-[#0d1527]/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/20 text-cyan-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold tracking-wider">
                      PHONE (DIRECT)
                    </div>
                    <a
                      href={`tel:${personal.rawPhone}`}
                      className="text-white hover:text-cyan-300 transition-colors"
                      title="Direct Call"
                    >
                      {personal.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 font-sans hidden sm:inline">{personal.timezone}</span>
                  <a
                    href={`tel:${personal.rawPhone}`}
                    className="px-2.5 py-1 text-[11px] text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 hover:border-cyan-400 rounded transition-colors cursor-pointer shrink-0"
                  >
                    Call
                  </a>
                </div>
              </div>

              {/* GitHub ID & Profile Navigation */}
              <div className="glass-panel rounded-xl p-4 bg-[#0d1527]/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/20 text-cyan-400">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold tracking-wider">
                      GITHUB ID &amp; REPOSITORIES
                    </div>
                    <a
                      href={personal.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-cyan-300 transition-colors font-mono text-xs"
                      title="Open GitHub Profile"
                    >
                      github.com/{personal.githubId}
                    </a>
                  </div>
                </div>

                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-[11px] text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 hover:border-cyan-400 rounded transition-colors cursor-pointer shrink-0"
                >
                  GitHub
                </a>
              </div>

              {/* LinkedIn Navigation */}
              <div className="glass-panel rounded-xl p-4 bg-[#0d1527]/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/20 text-cyan-400">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold tracking-wider">
                      PROFESSIONAL NETWORK
                    </div>
                    <a
                      href={personal.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-cyan-300 transition-colors font-sans text-xs"
                      title="Open LinkedIn Profile"
                    >
                      linkedin.com/in/{personal.linkedinHandle}
                    </a>
                  </div>
                </div>

                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-[11px] text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 hover:border-cyan-400 rounded transition-colors cursor-pointer shrink-0"
                >
                  Connect
                </a>
              </div>

              {/* Location */}
              <div className="glass-panel rounded-xl p-4 bg-[#0d1527]/80 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/20 text-cyan-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold tracking-wider">
                    LOCATION BASE
                  </div>
                  <div className="text-white font-sans text-xs">
                    {personal.location}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Messaging Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 bg-[#0d1527]/90 border border-cyan-500/20 shadow-2xl">
              {formSubmitted ? (
                <div className="py-6 space-y-6">
                  {/* Success Header */}
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-heading font-bold text-white">
                      Inquiry Dispatched &amp; Formatted
                    </h4>
                    <p className="text-xs text-slate-300 max-w-md mx-auto font-sans leading-relaxed">
                      Targeted recipient: <strong className="text-cyan-300 font-mono">{RECIPIENT_EMAIL}</strong>. Your native mail application was triggered. If your browser does not have a default mail app configured, choose a 1-click webmail option below:
                    </p>
                  </div>

                  {/* Multi-Channel Failover Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs pt-1">
                    {/* Gmail Web */}
                    <a
                      href={buildGmailWebUrl(formData)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/40 hover:border-cyan-400 text-cyan-200 transition-all flex items-center justify-between group cursor-pointer"
                      title="Send directly from Gmail in browser"
                    >
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-cyan-400" />
                        <span className="font-semibold">Send via Gmail Web</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                    </a>

                    {/* Outlook Web */}
                    <a
                      href={buildOutlookWebUrl(formData)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-700/80 hover:border-slate-500 text-slate-200 transition-all flex items-center justify-between group cursor-pointer"
                      title="Send directly from Outlook in browser"
                    >
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-sky-400" />
                        <span className="font-semibold">Send via Outlook Web</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </a>

                    {/* Copy to Clipboard */}
                    <button
                      type="button"
                      onClick={handleCopyPayload}
                      className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-700/80 hover:border-slate-500 text-slate-200 transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        {copiedPayload ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                        <span>{copiedPayload ? 'Copied to Clipboard' : 'Copy Formatted Text'}</span>
                      </div>
                    </button>

                    {/* View TDD QA Report */}
                    <button
                      type="button"
                      onClick={onOpenTDDReport}
                      className="p-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 text-emerald-300 transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>View TDD &amp; QA Report</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-500/40">
                        18/18 PASS
                      </span>
                    </button>
                  </div>

                  {/* Return / Edit Button */}
                  <div className="pt-2 text-center">
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                      }}
                      className="text-xs font-mono text-slate-400 hover:text-cyan-300 underline underline-offset-4 cursor-pointer"
                    >
                      ← Edit Message or Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-semibold tracking-wider text-slate-400">
                        YOUR NAME
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Alex Henderson"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (validationErrors.name) setValidationErrors({ ...validationErrors, name: '' });
                        }}
                        className={`w-full bg-[#070a13] border rounded-lg px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none font-mono transition-colors ${
                          validationErrors.name ? 'border-rose-500 focus:border-rose-400' : 'border-cyan-500/20 focus:border-cyan-400'
                        }`}
                      />
                      {validationErrors.name && (
                        <p className="text-[11px] font-mono text-rose-400">{validationErrors.name}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-semibold tracking-wider text-slate-400">
                        WORK EMAIL
                      </label>
                      <input
                        type="email"
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (validationErrors.email) setValidationErrors({ ...validationErrors, email: '' });
                        }}
                        className={`w-full bg-[#070a13] border rounded-lg px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none font-mono transition-colors ${
                          validationErrors.email ? 'border-rose-500 focus:border-rose-400' : 'border-cyan-500/20 focus:border-cyan-400'
                        }`}
                      />
                      {validationErrors.email && (
                        <p className="text-[11px] font-mono text-rose-400">{validationErrors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Inquiry Type */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono font-semibold tracking-wider text-slate-400">
                      INQUIRY TYPE
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-[#070a13] border border-cyan-500/20 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400 font-mono transition-colors cursor-pointer"
                    >
                      <option value="Full-time Senior QA / SDET Role">Full-time Senior QA / SDET Role</option>
                      <option value="Contract Automation Lead">Contract Automation Lead</option>
                      <option value="LLM Quality & Guardrails Consultation">LLM Quality & Guardrails Consultation</option>
                      <option value="Enterprise Framework Audit">Enterprise Framework Audit</option>
                    </select>
                  </div>

                  {/* Message Details */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono font-semibold tracking-wider text-slate-400">
                      MESSAGE DETAILS
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Provide details regarding role requirements, team objectives, or testing challenges..."
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (validationErrors.message) setValidationErrors({ ...validationErrors, message: '' });
                      }}
                      className={`w-full bg-[#070a13] border rounded-lg p-3.5 text-white placeholder-slate-600 focus:outline-none font-sans transition-colors resize-none leading-relaxed ${
                        validationErrors.message ? 'border-rose-500 focus:border-rose-400' : 'border-cyan-500/20 focus:border-cyan-400'
                      }`}
                    ></textarea>
                    {validationErrors.message && (
                      <p className="text-[11px] font-mono text-rose-400">{validationErrors.message}</p>
                    )}
                  </div>

                  {/* Submit Button & TDD Trigger */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={onOpenTDDReport}
                      className="text-[11px] font-mono text-slate-400 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>ISTQB Quality Verification (18/18 PASS)</span>
                    </button>

                    <button
                      type="submit"
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white glow-btn-primary rounded-lg transition-all cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
