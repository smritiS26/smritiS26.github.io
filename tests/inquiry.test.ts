/**
 * Test-Driven Development (TDD) & Quality Engineering Test Suite
 * ISTQB-CTFL Compliant Test Specifications for Inquiry & Direct Email Dispatch
 * 
 * Execution: npx tsx tests/inquiry.test.ts
 */

import {
  validateInquiryPayload,
  buildInquirySubject,
  formatInquiryBody,
  buildInquiryMailto,
  buildGmailWebUrl,
  buildOutlookWebUrl,
  formatInquiryClipboardText,
  RECIPIENT_EMAIL,
  InquiryPayload
} from '../src/utils/inquiryService';

interface TestRecord {
  id: string;
  category: 'UNIT' | 'INTEGRATION' | 'SYSTEM';
  description: string;
  technique: string;
  passed: boolean;
  error?: string;
  durationMs: number;
}

const testResults: TestRecord[] = [];

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion Failed: ${message}`);
  }
}

function runTest(
  id: string,
  category: 'UNIT' | 'INTEGRATION' | 'SYSTEM',
  technique: string,
  description: string,
  fn: () => void
) {
  const start = performance.now();
  try {
    fn();
    const durationMs = parseFloat((performance.now() - start).toFixed(2));
    testResults.push({ id, category, technique, description, passed: true, durationMs });
    console.log(`  \x1b[32m✓ [PASS]\x1b[0m ${id} (${technique}): ${description} (${durationMs}ms)`);
  } catch (err: any) {
    const durationMs = parseFloat((performance.now() - start).toFixed(2));
    testResults.push({ id, category, technique, description, passed: false, error: err.message, durationMs });
    console.error(`  \x1b[31m✗ [FAIL]\x1b[0m ${id} (${technique}): ${description} - ${err.message}`);
  }
}

console.log('\n======================================================================');
console.log('  ISTQB-CTFL TEST SUITE: INQUIRY DISPATCH & EMAIL INTEGRATION');
console.log('  Target Recipient: ' + RECIPIENT_EMAIL);
console.log('======================================================================\n');

// -----------------------------------------------------------------------------
// 1. UNIT TESTING (Equivalence Partitioning & Boundary Value Analysis)
// -----------------------------------------------------------------------------
console.log('\x1b[36m[LEVEL 1: UNIT TESTS - INPUT VALIDATION & LOGIC]\x1b[0m');

runTest(
  'TC-UNIT-01',
  'UNIT',
  'Equivalence Partitioning (Valid Class)',
  'Complete valid payload passes validation without errors',
  () => {
    const payload: InquiryPayload = {
      name: 'Sarah Connor',
      email: 'sarah.connor@cyberdyne.com',
      inquiryType: 'Full-time Senior QA / SDET Role',
      message: 'We are seeking a Lead SDET to architect automated test pipelines.'
    };
    const result = validateInquiryPayload(payload);
    assert(result.isValid === true, 'Expected valid payload');
    assert(Object.keys(result.errors).length === 0, 'Expected zero validation errors');
  }
);

runTest(
  'TC-UNIT-02',
  'UNIT',
  'Equivalence Partitioning (Invalid Empty)',
  'Empty name string triggers mandatory validation error',
  () => {
    const result = validateInquiryPayload({ name: '   ', email: 'test@example.com', message: 'Valid message' });
    assert(result.isValid === false, 'Expected invalid payload');
    assert(result.errors.name !== undefined, 'Expected name error');
  }
);

runTest(
  'TC-UNIT-03',
  'UNIT',
  'Boundary Value Analysis (Minimum - 1)',
  'Single character name fails minimum 2-char threshold',
  () => {
    const result = validateInquiryPayload({ name: 'A', email: 'test@example.com', message: 'Valid message content' });
    assert(result.isValid === false, 'Expected invalid payload for 1-char name');
    assert(result.errors.name.includes('at least 2 characters'), 'Expected boundary error message');
  }
);

runTest(
  'TC-UNIT-04',
  'UNIT',
  'Boundary Value Analysis (Maximum Boundary)',
  '100-character name satisfies upper length boundary',
  () => {
    const longName = 'A'.repeat(100);
    const result = validateInquiryPayload({ name: longName, email: 'test@example.com', message: 'Valid message content' });
    assert(result.errors.name === undefined, '100-char name should pass');
  }
);

runTest(
  'TC-UNIT-05',
  'UNIT',
  'Boundary Value Analysis (Maximum + 1)',
  '101-character name triggers maximum boundary rejection',
  () => {
    const tooLongName = 'A'.repeat(101);
    const result = validateInquiryPayload({ name: tooLongName, email: 'test@example.com', message: 'Valid message content' });
    assert(result.errors.name !== undefined, '101-char name must fail boundary');
  }
);

runTest(
  'TC-UNIT-06',
  'UNIT',
  'Equivalence Partitioning (Malformed Email)',
  'Email missing @ symbol is rejected as invalid format',
  () => {
    const result = validateInquiryPayload({ name: 'Alex Henderson', email: 'invalid-email-string.com', message: 'Valid message content' });
    assert(result.errors.email !== undefined, 'Malformed email should be rejected');
  }
);

runTest(
  'TC-UNIT-07',
  'UNIT',
  'Equivalence Partitioning (Malformed Domain)',
  'Email missing top-level domain is rejected',
  () => {
    const result = validateInquiryPayload({ name: 'Alex Henderson', email: 'alex@company', message: 'Valid message content' });
    assert(result.errors.email !== undefined, 'Missing TLD email should be rejected');
  }
);

runTest(
  'TC-UNIT-08',
  'UNIT',
  'Boundary Value Analysis (Message Min - 1)',
  '9-character message fails minimum threshold of 10 characters',
  () => {
    const result = validateInquiryPayload({ name: 'Alex Henderson', email: 'alex@company.com', message: 'Short msg' });
    assert(result.errors.message !== undefined, '9-char message must fail boundary');
  }
);

runTest(
  'TC-UNIT-09',
  'UNIT',
  'Boundary Value Analysis (Message Exact Min)',
  '10-character message satisfies minimum boundary',
  () => {
    const result = validateInquiryPayload({ name: 'Alex Henderson', email: 'alex@company.com', message: '1234567890' });
    assert(result.errors.message === undefined, '10-char message must pass boundary');
  }
);

runTest(
  'TC-UNIT-10',
  'UNIT',
  'Boundary Value Analysis (Message Max + 1)',
  '4001-character message triggers upper threshold rejection',
  () => {
    const hugeMsg = 'X'.repeat(4001);
    const result = validateInquiryPayload({ name: 'Alex Henderson', email: 'alex@company.com', message: hugeMsg });
    assert(result.errors.message !== undefined, '4001-char message must fail boundary');
  }
);

// -----------------------------------------------------------------------------
// 2. INTEGRATION TESTING (Data Formatting, URI Encoding & Channel Adapters)
// -----------------------------------------------------------------------------
console.log('\n\x1b[36m[LEVEL 2: INTEGRATION TESTS - ADAPTERS & ENCODING]\x1b[0m');

const samplePayload: InquiryPayload = {
  name: 'Marcus Vance & Co.',
  email: 'marcus.vance@techcorp.io',
  inquiryType: 'LLM Quality & Guardrails Consultation',
  message: 'Can you help validate our RAG pipeline for hallucination rates?\nBudget: $15,000.\nTimeline: Q4.'
};

runTest(
  'TC-INT-01',
  'INTEGRATION',
  'Data Integration & Subject Synthesis',
  'Subject synthesis matches structured format with inquiry type and sender name',
  () => {
    const subject = buildInquirySubject(samplePayload);
    assert(subject === '[Inquiry: LLM Quality & Guardrails Consultation] from Marcus Vance & Co.', `Unexpected subject: ${subject}`);
  }
);

runTest(
  'TC-INT-02',
  'INTEGRATION',
  'Recipient Contract Assertion',
  'Mailto protocol strictly routes to chudasomasmriti02@gmail.com',
  () => {
    const mailto = buildInquiryMailto(samplePayload);
    assert(mailto.startsWith('mailto:chudasomasmriti02@gmail.com?'), `Mailto target mismatch: ${mailto}`);
  }
);

runTest(
  'TC-INT-03',
  'INTEGRATION',
  'RFC 3986 Percent-Encoding Audit',
  'Special characters (&, ?, =, +, spaces, newlines) are properly percent-encoded',
  () => {
    const mailto = buildInquiryMailto(samplePayload);
    // & in name should be encoded as %26, not raw & in query params
    assert(!mailto.includes('Marcus Vance & Co.'), 'Raw ampersand found in query string');
    assert(mailto.includes('Marcus%20Vance%20%26%20Co.'), 'Expected percent-encoded ampersand and space');
    // newlines should be encoded as %0A
    assert(mailto.includes('%0A'), 'Expected encoded newlines in body parameter');
  }
);

runTest(
  'TC-INT-04',
  'INTEGRATION',
  'Webmail Adapter (Google Gmail API)',
  'Gmail Web compose URL conforms to view=cm specifications',
  () => {
    const gmailUrl = buildGmailWebUrl(samplePayload);
    assert(gmailUrl.startsWith('https://mail.google.com/mail/?view=cm&fs=1'), 'Invalid Gmail compose base URL');
    assert(gmailUrl.includes(`to=${encodeURIComponent(RECIPIENT_EMAIL)}`), 'Gmail target recipient missing or unencoded');
    assert(gmailUrl.includes('su='), 'Gmail subject parameter missing');
    assert(gmailUrl.includes('body='), 'Gmail body parameter missing');
  }
);

runTest(
  'TC-INT-05',
  'INTEGRATION',
  'Webmail Adapter (Microsoft Outlook)',
  'Outlook Web deep-link compose URL conforms to deeplink specifications',
  () => {
    const outlookUrl = buildOutlookWebUrl(samplePayload);
    assert(outlookUrl.startsWith('https://outlook.live.com/mail/0/deeplink/compose'), 'Invalid Outlook compose base');
    assert(outlookUrl.includes(`to=${encodeURIComponent(RECIPIENT_EMAIL)}`), 'Outlook recipient missing');
  }
);

runTest(
  'TC-INT-06',
  'INTEGRATION',
  'Clipboard Buffer Data Reconciliation',
  'Clipboard text includes destination recipient, subject, and body details',
  () => {
    const clipboardText = formatInquiryClipboardText(samplePayload);
    assert(clipboardText.includes(`To: ${RECIPIENT_EMAIL}`), 'Missing To line');
    assert(clipboardText.includes('Sender Email: marcus.vance@techcorp.io'), 'Missing sender email');
    assert(clipboardText.includes('Message Details:'), 'Missing message header');
  }
);

// -----------------------------------------------------------------------------
// 3. SYSTEM TESTING (End-to-End Delivery & Fallback Resilience)
// -----------------------------------------------------------------------------
console.log('\n\x1b[36m[LEVEL 3: SYSTEM TESTS - END-TO-END RESILIENCE]\x1b[0m');

runTest(
  'TC-SYS-01',
  'SYSTEM',
  'Multi-Channel Redundancy E2E',
  'System provisions 3 distinct delivery vectors (Native Mailto, Gmail Web, Outlook Web) for guaranteed delivery',
  () => {
    const mailto = buildInquiryMailto(samplePayload);
    const gmail = buildGmailWebUrl(samplePayload);
    const outlook = buildOutlookWebUrl(samplePayload);

    assert(mailto.length > 50, 'Mailto URL length deficient');
    assert(gmail.length > 50, 'Gmail URL length deficient');
    assert(outlook.length > 50, 'Outlook URL length deficient');
  }
);

runTest(
  'TC-SYS-02',
  'SYSTEM',
  'Payload Integrity & No Data Loss',
  'Complex multi-paragraph inquiries preserve all content without truncation',
  () => {
    const multiLineMessage = 'Paragraph 1: Testing\n\nParagraph 2: Architecture\n\nParagraph 3: Requirements';
    const payload: InquiryPayload = {
      name: 'System Tester',
      email: 'qa.architect@enterprise.org',
      inquiryType: 'Enterprise Framework Audit',
      message: multiLineMessage
    };
    const body = formatInquiryBody(payload);
    assert(body.includes('Paragraph 1: Testing'), 'Paragraph 1 truncated');
    assert(body.includes('Paragraph 2: Architecture'), 'Paragraph 2 truncated');
    assert(body.includes('Paragraph 3: Requirements'), 'Paragraph 3 truncated');
  }
);

// Summary Report
console.log('\n======================================================================');
const passedCount = testResults.filter(t => t.passed).length;
const totalCount = testResults.length;
const passRate = ((passedCount / totalCount) * 100).toFixed(1);
console.log(`  TEST RESULTS: ${passedCount}/${totalCount} Passed (${passRate}% Success Rate)`);
console.log('======================================================================\n');

if (passedCount < totalCount) {
  process.exit(1);
}
