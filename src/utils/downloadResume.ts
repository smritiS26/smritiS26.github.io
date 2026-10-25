import { PORTFOLIO_DATA } from '../data/portfolioData';

export const generateResumeHTML = (): string => {
  const { personal, experiences, credentials, skills, hero } = PORTFOLIO_DATA;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${personal.name} - Resume (ISTQB-CTFL SDET)</title>
  <style>
    @page { margin: 15mm; size: A4; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
      line-height: 1.5;
      font-size: 13px;
      margin: 0;
      padding: 24px;
      background: #ffffff;
    }
    h1 {
      font-size: 24px;
      margin: 0;
      color: #0f172a;
      letter-spacing: -0.02em;
    }
    .role-title {
      font-size: 14px;
      font-weight: 600;
      color: #0284c7;
      margin-top: 2px;
      margin-bottom: 8px;
    }
    .contacts {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      font-size: 12px;
      color: #475569;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 12px;
      margin-bottom: 16px;
    }
    .contacts a {
      color: #0284c7;
      text-decoration: none;
    }
    .section-title {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #0369a1;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 3px;
      margin-top: 14px;
      margin-bottom: 8px;
    }
    .summary {
      color: #334155;
      font-size: 12.5px;
      line-height: 1.6;
    }
    .job {
      margin-bottom: 12px;
    }
    .job-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-weight: 700;
      font-size: 13px;
      color: #0f172a;
    }
    .job-company {
      color: #0284c7;
      font-weight: 600;
    }
    .job-period {
      font-size: 11.5px;
      color: #64748b;
      font-weight: 500;
    }
    ul {
      margin: 4px 0 0 18px;
      padding: 0;
    }
    li {
      margin-bottom: 3px;
      color: #334155;
      font-size: 12px;
      line-height: 1.45;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      font-size: 12px;
    }
    .skill-block {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 6px 10px;
    }
    .skill-name {
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 2px;
    }
    .skill-detail {
      color: #475569;
    }
    .edu-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
    }
    @media print {
      body { padding: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="no-print" style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 12px; border-radius: 6px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
    <span style="color: #166534; font-weight: 600;">✓ Official Resume Document — Press Ctrl+P / Cmd+P to Save as PDF</span>
    <button onclick="window.print()" style="background: #0284c7; color: white; border: none; padding: 6px 14px; border-radius: 4px; cursor: pointer; font-weight: 600;">Print / Save as PDF</button>
  </div>

  <h1>${personal.name}</h1>
  <div class="role-title">${personal.role} • ${personal.subBrand.replace('• ', '')}</div>

  <div class="contacts">
    <span>📧 <a href="mailto:${personal.email}">${personal.email}</a></span>
    <span>📞 <a href="tel:${personal.rawPhone}">${personal.phone}</a></span>
    <span>📍 ${personal.location}</span>
    <span>🔗 <a href="${personal.linkedin}" target="_blank">LinkedIn: in/${personal.linkedinHandle}</a></span>
    <span>💻 <a href="${personal.github}" target="_blank">GitHub: @${personal.githubId}</a></span>
  </div>

  <div class="section-title">Professional Summary</div>
  <div class="summary">
    ${personal.name} is a results-driven QA Automation Engineer &amp; SDET with 4+ years of hands-on expertise architecting scalable test automation frameworks across Web, Mobile (Android/iOS), API, and Enterprise CRM/ERP systems. Certified ISTQB Foundation Level (CTFL) with demonstrated success delivering zero critical production escapes across 6+ international clients. Specializes in Selenium WebDriver, Appium, REST Assured, TestNG, Jenkins CI/CD, and GenAI/LLM output validation &amp; hallucination prevention.
  </div>

  <div class="section-title">Core Technical Capabilities</div>
  <div class="skills-grid">
    <div class="skill-block">
      <div class="skill-name">Automation &amp; Frameworks</div>
      <div class="skill-detail">Selenium WebDriver, Appium, REST Assured, TestNG, Maven, Page Object Model (POM), Data-Driven Frameworks</div>
    </div>
    <div class="skill-block">
      <div class="skill-name">Mobile &amp; Cloud Testing</div>
      <div class="skill-detail">LambdaTest Real Device Cloud, UIAutomator2, XCUITest, Android &amp; iOS E2E Testing</div>
    </div>
    <div class="skill-block">
      <div class="skill-name">GenAI &amp; LLM Quality Engineering</div>
      <div class="skill-detail">Output Verification, Hallucination Detection, Prompt Injection Defense, Semantic Grounding</div>
    </div>
    <div class="skill-block">
      <div class="skill-name">DevOps, Databases &amp; Methodologies</div>
      <div class="skill-detail">Jenkins CI/CD, Git, GitHub, Postman, SQL Verification, Jira, Agile/Scrum, Defect Lifecycle Management</div>
    </div>
  </div>

  <div class="section-title">Work Experience</div>
  ${experiences.map(exp => `
    <div class="job">
      <div class="job-header">
        <div>${exp.title} &mdash; <span class="job-company">${exp.company}</span></div>
        <div class="job-period">${exp.period}</div>
      </div>
      <ul>
        ${exp.bullets.map(b => `<li>${b}</li>`).join('')}
      </ul>
    </div>
  `).join('')}

  <div class="section-title">Certifications</div>
  <div style="margin-bottom: 8px;">
    <strong>ISTQB® Certified Tester - Foundation Level (CTFL)</strong> &mdash; <em>International Software Testing Qualifications Board</em> (Active • ID: ${personal.istqbId})<br>
    <strong>Anthropic AI Fluency: Framework and Foundations</strong> &mdash; <em>Anthropic</em><br>
    <strong>Learn Selenium with Java</strong> &mdash; <em>Udemy</em> | <strong>Mobile Automation with Appium</strong> &mdash; <em>Udemy</em><br>
    <strong>API Automation Testing</strong> &mdash; <em>Coursera</em> | <strong>Database Programming with SQL</strong> &mdash; <em>Oracle / Coursera</em>
  </div>

  <div class="section-title">Education</div>
  ${credentials.degrees.map(deg => `
    <div class="edu-item">
      <div><strong>${deg.degree}</strong> &mdash; ${deg.institution}</div>
      <div style="font-weight: 600; color: #0284c7;">${deg.score}</div>
    </div>
  `).join('')}
</body>
</html>`;
};

export const downloadResumeDirect = (): void => {
  // Download the official PDF resume provided by Smriti Chudasama
  const link = document.createElement('a');
  link.href = '/Smriti_Chudasama_Resume.pdf';
  link.download = 'Smriti_Chudasama_QA_Automation_Engineer_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const viewResumePdf = (): void => {
  window.open('/Smriti_Chudasama_Resume.pdf', '_blank');
};

export const printResumeDirect = (): void => {
  window.open('/Smriti_Chudasama_Resume.pdf', '_blank');
};
