/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SkillsMatrix } from './components/SkillsMatrix';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ProjectsResearch } from './components/ProjectsResearch';
import { CertificationsEducation } from './components/CertificationsEducation';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingDock } from './components/FloatingDock';
import { ResumeModal } from './components/ResumeModal';
import { ISTQBModal } from './components/ISTQBModal';
import { TDDReportModal } from './components/TDDReportModal';
import { Toast } from './components/Toast';
import { downloadResumeDirect } from './utils/downloadResume';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [istqbOpen, setIstqbOpen] = useState(false);
  const [tddReportOpen, setTddReportOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleShowToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleDownloadResume = () => {
    downloadResumeDirect();
    handleShowToast('Downloading official resume: Smriti_Chudasama_QA_Automation_Engineer_Resume.pdf');
  };

  const handleContactClick = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070a13] text-[#dee2f6] selection:bg-cyan-500/30 selection:text-white relative">
      {/* Toast System */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Global Navigation Header */}
      <Navbar
        onOpenResume={() => setResumeOpen(true)}
        onOpenISTQB={() => setIstqbOpen(true)}
        onContactClick={handleContactClick}
        onDownloadResume={handleDownloadResume}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection
          onOpenResume={() => setResumeOpen(true)}
          onOpenISTQB={() => setIstqbOpen(true)}
          onDownloadCV={handleDownloadResume}
        />

        <SkillsMatrix />

        <ExperienceTimeline />

        <ProjectsResearch />

        <CertificationsEducation
          onOpenISTQB={() => setIstqbOpen(true)}
        />

        <ContactSection
          onShowToast={handleShowToast}
          onOpenTDDReport={() => setTddReportOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenISTQB={() => setIstqbOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
        onOpenTDDReport={() => setTddReportOpen(true)}
      />

      {/* Floating Action HUD Dock */}
      <FloatingDock
        onOpenResume={() => setResumeOpen(true)}
        onContactClick={handleContactClick}
      />

      {/* Modals */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        onShowToast={handleShowToast}
      />

      <ISTQBModal
        isOpen={istqbOpen}
        onClose={() => setIstqbOpen(false)}
        onShowToast={handleShowToast}
      />

      <TDDReportModal
        isOpen={tddReportOpen}
        onClose={() => setTddReportOpen(false)}
        onShowToast={handleShowToast}
      />
    </div>
  );
}
