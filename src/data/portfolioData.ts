export interface SkillItem {
  id: string;
  categoryNumber: string;
  categoryLabel: string;
  categorySlug: 'automation' | 'backend' | 'mobile' | 'genai' | 'devops' | 'domains';
  title: string;
  description: string;
  tags: string[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  period: string;
  isCurrent?: boolean;
  bullets: string[];
  tags: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  statusHighlight: string;
  iconName: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Smriti Chudasama",
    brandTitle: "SC.dev // SMRITI CHUDASAMA",
    subBrand: "• ISTQB-CTFL SDET",
    role: "QA Automation Engineer & SDET",
    location: "Ahmedabad, Gujarat, India (Open to Remote & Relocation)",
    email: "chudasomasmriti02@gmail.com",
    secondaryEmail: "smritichudasama.10@gmail.com",
    phone: "+91-7990686359",
    rawPhone: "+917990686359",
    timezone: "IST (UTC+5:30)",
    linkedin: "https://linkedin.com/in/smriti-chudasama-4a2590215",
    linkedinHandle: "smriti-chudasama-4a2590215",
    github: "https://github.com/smritiS26",
    githubId: "smritiS26",
    resumePdfUrl: "/Smriti_Chudasama_Resume.pdf",
    istqbId: "ISTQB-CTFL-2023-IN-889421",
    statusBadge: "READY FOR SDET ROLES",
    availabilityText: "Available for Senior QA Automation, SDET, and Quality Architecture opportunities."
  },
  hero: {
    badge: "ISTQB Certified Tester (CTFL) • 4+ Years Experience",
    headline: "Engineering Flawless Quality Through Intelligent Automation & LLM Validation",
    subtitle: "QA Automation Engineer & SDET building resilient, scalable test frameworks across Web, Mobile (Android/iOS), Enterprise CRM/ERP, and GenAI/LLM-powered architectures.",
    stats: [
      { metric: "4+ Years", label: "SDET & QA Automation" },
      { metric: "6+ Clients", label: "Zero Critical Escapes" },
      { metric: "100+", label: "Automated Suites" },
      { metric: "25+", label: "Critical Pre-Prod Bugs" },
    ]
  },
  skillsCategories: [
    { id: "all", label: "All Skills" },
    { id: "automation", label: "Test Automation" },
    { id: "backend", label: "API & Backend" },
    { id: "mobile", label: "Mobile & Cloud" },
    { id: "genai", label: "GenAI & LLM" },
    { id: "devops", label: "Tools & DevOps" },
  ],
  skills: [
    {
      id: "automation",
      categoryNumber: "01 // AUTOMATION",
      categoryLabel: "AUTOMATION",
      categorySlug: "automation",
      title: "Test Automation Frameworks",
      description: "Architecting robust Page Object Model (POM) and data-driven frameworks designed for modularity, maintenance reduction, and high execution speed.",
      tags: ["Selenium WebDriver", "TestNG", "Maven", "Java", "POM Architecture", "Data-Driven"]
    },
    {
      id: "backend",
      categoryNumber: "02 // BACKEND",
      categoryLabel: "BACKEND",
      categorySlug: "backend",
      title: "API & Backend Validation",
      description: "Exhaustive endpoint contract verification, schema assertions, status audits, and database query-level data reconciliation.",
      tags: ["REST Assured", "Postman", "Restful Services", "SQL Verification", "Data Integrity"]
    },
    {
      id: "mobile",
      categoryNumber: "03 // MOBILE",
      categoryLabel: "MOBILE",
      categorySlug: "mobile",
      title: "Mobile & Cloud Grid",
      description: "Multi-device native & hybrid test harness across real Android and iOS devices utilizing cloud infrastructure for parallel execution.",
      tags: ["Appium", "LambdaTest Cloud", "UIAutomator2", "XCUITest", "Android & iOS E2E"]
    },
    {
      id: "genai",
      categoryNumber: "04 // GENAI / LLM",
      categoryLabel: "GENAI / LLM",
      categorySlug: "genai",
      title: "GenAI & LLM Testing",
      description: "Verification of intelligent generative outputs, hallucination metric thresholds, context fidelity, and ethical guardrail compliance.",
      tags: ["LLM Validation", "Hallucination Detection", "Semantic Relevance", "Guardrail Verification"]
    },
    {
      id: "devops",
      categoryNumber: "05 // DEVOPS",
      categoryLabel: "DEVOPS",
      categorySlug: "devops",
      title: "DevOps CI/CD & Process",
      description: "Automating build validation triggers in CI pipelines and coordinating defect lifecycle transparency across Agile sprints.",
      tags: ["Jenkins CI/CD", "Git & GitHub", "BVT (Build Verification)", "Agile/Scrum", "Jira & Redmine"]
    },
    {
      id: "domains",
      categoryNumber: "06 // DOMAINS",
      categoryLabel: "DOMAINS",
      categorySlug: "domains",
      title: "Enterprise Domain Depth",
      description: "Direct real-world experience validating mission-critical business logic across enterprise storefronts, CRM/ERP hubs, and warranty systems.",
      tags: ["Salesforce SFCC", "CRM / CPQ / ERP", "Healthcare AI", "Warranty Portals"]
    }
  ] as SkillItem[],
  experiences: [
    {
      id: "mobiuso",
      title: "QA Automation Engineer",
      company: "Mobiuso India Technologies Pvt. Ltd.",
      period: "Jan 2024 - Present • Full-time",
      isCurrent: true,
      bullets: [
        "Owned end-to-end quality assurance for Web, Android, iOS, enterprise CRM/ERP, and GenAI applications across 6 high-profile client projects.",
        "Built and maintained scalable Selenium, Appium, Java, and TestNG automation frameworks leveraging Page Object Model (POM) and data-driven principles.",
        "Automated REST API testing suites via REST Assured and Postman, seamlessly orchestrating them within Jenkins CI/CD pipelines for daily regression validation.",
        "Executed comprehensive cross-platform mobile automation runs across LambdaTest real device cloud (Android & iOS).",
        "Validated LLM & Generative AI model responses for factual accuracy, context relevance, prompt injection prevention, and hallucination reduction.",
        "Mentored junior QA test engineers and steered Agile sprint quality gates, driving sprint escape rates to zero."
      ],
      tags: ["Selenium", "Appium", "REST Assured", "GenAI Validation", "Jenkins CI/CD"]
    },
    {
      id: "otfcoder",
      title: "QA Engineer",
      company: "OTFCoder",
      period: "Sep 2023 - Dec 2023 • 4 mos",
      bullets: [
        "Executed 100+ comprehensive functional and regression test cases for an enterprise Warranty Management System.",
        "Logged and tracked 25+ critical defects prior to production release, cutting defect turnaround time by 20% in Jira.",
        "Automated API regression suites with REST Assured to enable continuous build verification testing."
      ],
      tags: ["Warranty Systems", "Defect Management", "REST Assured", "Regression Testing"]
    },
    {
      id: "astound",
      title: "QA Engineer",
      company: "Astound Commerce",
      period: "Sep 2022 - Sep 2023 • 1 yr 1 mo",
      bullets: [
        "Tested complex Salesforce Commerce Cloud (SFCC) storefronts for premier global fashion and beauty apparel brands.",
        "Validated multi-currency catalogs, checkout funnels, dynamic pricing tables, promotional rules, and 3rd-party payment gateways.",
        "Spearheaded seasonal high-traffic production releases with zero critical downtime or revenue-impacting regressions."
      ],
      tags: ["Salesforce B2C Commerce", "E-commerce E2E", "Payment Gateways", "Cart & Checkout"]
    }
  ] as ExperienceItem[],
  researchSpotlight: {
    badge: "ACADEMIC RESEARCH SPOTLIGHT • AMITY ONLINE MBA",
    domainBadge: "DOMAINS: AIOps / ITIL",
    title: "A Study on Agentic AI Adoption & Its Impact on IT Service Management (ITSM)",
    narrative: "Researched and evaluated how autonomous AI agents transform core ITSM workflows: automated incident triaging, service request fulfillment, and change risk modeling. Proposed an enterprise adoption blueprint incorporating least-privilege agent governance, continuous telemetry logging, and human-in-the-loop escalation gates to balance productivity gains with system safety.",
    metrics: [
      { value: "-45%", label: "Projected MTTR Reduction" },
      { value: "99.4%", label: "Guardrail Verification Rate" },
      { value: "Zero-Trust", label: "Agentic Least-Privilege" }
    ],
    tags: ["Agentic AI", "AIOps", "ITIL Incident Management", "AI Governance", "Agent Observability"],
    phases: [
      {
        phase: "Phase 1: Observational Pilot",
        detail: "Shadow mode ingestion for L1 ticket categorization."
      },
      {
        phase: "Phase 2: Assisted Action",
        detail: "Agent proposes scripted remediation with engineer sign-off."
      },
      {
        phase: "Phase 3: Autonomous Mesh",
        detail: "Self-healing workflows governed by runtime guardrails."
      }
    ]
  },
  projects: [
    {
      id: "mobile-grid",
      title: "Cross-Platform Mobile Automation Grid",
      description: "Centralized Appium test execution matrix utilizing LambdaTest device cloud. Supports seamless parallel test passes over 20+ Android and iOS permutations.",
      tags: ["Appium", "LambdaTest", "UIAutomator2", "XCUITest"],
      statusHighlight: "Verified 0% Session Dropout",
      iconName: "Smartphone"
    },
    {
      id: "api-harness",
      title: "Enterprise API Test Harness",
      description: "Modular REST Assured integration framework linked to Maven and Jenkins. Validates payload schemas, JWT auth lifecycles, and backend ERP syncing.",
      tags: ["REST Assured", "TestNG", "Jenkins BVT", "Maven"],
      statusHighlight: "Under 380ms Average Endpoint SLA",
      iconName: "Cpu"
    },
    {
      id: "academic-systems",
      title: "Academic Initiatives & Systems",
      description: "Architected a Women Security Android application with quick SOS dispatch and a Database-Driven Student Management System built with robust relational logic.",
      tags: ["Android SDK", "SQL Database", "GPS Services"],
      statusHighlight: "Capstone Distinction Award",
      iconName: "GraduationCap"
    }
  ] as ProjectItem[],
  credentials: {
    istqb: {
      title: "ISTQB Certified Tester - Foundation Level (CTFL)",
      issuer: "International Software Testing Qualifications Board",
      status: "ACTIVE",
      description: "Comprehensive certification in fundamental test design techniques, boundary value analysis, equivalence partitioning, risk analysis, and defect lifecycle governance."
    },
    anthropic: {
      title: "Anthropic AI Fluency: Framework and Foundations",
      issuer: "Anthropic",
      description: "Prompt engineering frameworks, model safety, context grounding, and LLM behavior evaluation."
    },
    certifications: [
      {
        platform: "UDEMY",
        title: "Learn Selenium with Java",
        detail: "Basics to Advanced Framework Architecture."
      },
      {
        platform: "UDEMY",
        title: "Mobile Automation with Appium",
        detail: "Android and iOS real-device test execution."
      },
      {
        platform: "COURSERA",
        title: "API Automation Testing",
        detail: "Contract testing, status codes & schema models."
      },
      {
        platform: "ORACLE / COURSERA",
        title: "Database Programming with SQL",
        detail: "Relational queries, index logic, data reconciliation."
      }
    ],
    degrees: [
      {
        level: "POSTGRADUATE • PURSUING",
        score: "9.2 / 10 CGPA",
        degree: "MBA in Information Technology Management",
        institution: "Amity Online University",
        description: "Key coursework: Enterprise IT Strategy, System Analysis, Software Project Management, AIOps, Quality Governance, and ITIL Frameworks."
      },
      {
        level: "UNDERGRADUATE • COMPLETED 2023",
        score: "8.43 / 10 CGPA",
        degree: "B.Tech in Computer Science & Engineering",
        institution: "Marwadi University",
        description: "Rigorous foundation in Object-Oriented Programming (Java), Data Structures & Algorithms, Database Management Systems (DBMS), and Software Engineering."
      }
    ]
  }
};
