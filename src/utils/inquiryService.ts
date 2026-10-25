/**
 * Inquiry Service & Email Dispatch Engine
 * Architected with Test-Driven Development (TDD) principles and ISTQB standards.
 */

export interface InquiryPayload {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const VALID_INQUIRY_TYPES = [
  'Full-time Senior QA / SDET Role',
  'Contract Automation Lead',
  'LLM Quality & Guardrails Consultation',
  'Enterprise Framework Audit'
] as const;

export const RECIPIENT_EMAIL = 'chudasomasmriti02@gmail.com';

/**
 * Validates inquiry payload using Equivalence Partitioning & Boundary Value Analysis.
 */
export function validateInquiryPayload(data: Partial<InquiryPayload>): ValidationResult {
  const errors: Record<string, string> = {};

  // Name validation
  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Full name is required.';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  } else if (data.name.length > 100) {
    errors.name = 'Name must not exceed 100 characters.';
  }

  // Email validation (RFC 5322 regex approximation)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!data.email || data.email.trim().length === 0) {
    errors.email = 'Work email address is required.';
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid work email address.';
  }

  // Inquiry type validation
  if (!data.inquiryType || data.inquiryType.trim().length === 0) {
    errors.inquiryType = 'Inquiry type selection is required.';
  }

  // Message validation
  if (!data.message || data.message.trim().length === 0) {
    errors.message = 'Message details are required.';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must provide at least 10 characters of detail.';
  } else if (data.message.length > 4000) {
    errors.message = 'Message exceeds maximum threshold of 4000 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Builds formatted plain text for the email body.
 */
export function formatInquiryBody(data: InquiryPayload): string {
  return [
    `Hello Smriti,`,
    ``,
    `I would like to connect with you regarding an opportunity:`,
    ``,
    `• Sender Name: ${data.name.trim()}`,
    `• Sender Email: ${data.email.trim()}`,
    `• Opportunity Type: ${data.inquiryType.trim()}`,
    ``,
    `Message Details:`,
    `--------------------------------------------------`,
    `${data.message.trim()}`,
    `--------------------------------------------------`,
    ``,
    `Transmission Origin: SC.dev Portfolio Direct Inquiry Engine`,
    `Recipient Target: ${RECIPIENT_EMAIL}`
  ].join('\n');
}

/**
 * Builds the subject line for the email.
 */
export function buildInquirySubject(data: InquiryPayload): string {
  const cleanName = data.name.trim();
  const cleanType = data.inquiryType.trim();
  return `[Inquiry: ${cleanType}] from ${cleanName}`;
}

/**
 * Constructs a fully encoded mailto: URL.
 */
export function buildInquiryMailto(data: InquiryPayload): string {
  const subject = encodeURIComponent(buildInquirySubject(data));
  const body = encodeURIComponent(formatInquiryBody(data));
  return `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
}

/**
 * Constructs a direct Gmail Web Compose URL (bypasses missing desktop email clients).
 */
export function buildGmailWebUrl(data: InquiryPayload): string {
  const subject = encodeURIComponent(buildInquirySubject(data));
  const body = encodeURIComponent(formatInquiryBody(data));
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(RECIPIENT_EMAIL)}&su=${subject}&body=${body}`;
}

/**
 * Constructs a direct Outlook Web Compose URL.
 */
export function buildOutlookWebUrl(data: InquiryPayload): string {
  const subject = encodeURIComponent(buildInquirySubject(data));
  const body = encodeURIComponent(formatInquiryBody(data));
  return `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(RECIPIENT_EMAIL)}&subject=${subject}&body=${body}`;
}

/**
 * Formats a clean snippet for clipboard copying.
 */
export function formatInquiryClipboardText(data: InquiryPayload): string {
  return [
    `To: ${RECIPIENT_EMAIL}`,
    `Subject: ${buildInquirySubject(data)}`,
    ``,
    formatInquiryBody(data)
  ].join('\n');
}

/**
 * Dispatches the inquiry by invoking the browser mailto protocol.
 */
export function dispatchInquiry(data: InquiryPayload): {
  success: boolean;
  mailtoUrl: string;
  gmailUrl: string;
  outlookUrl: string;
} {
  const mailtoUrl = buildInquiryMailto(data);
  const gmailUrl = buildGmailWebUrl(data);
  const outlookUrl = buildOutlookWebUrl(data);

  // Attempt to open mailto safely without navigation drops
  try {
    const hiddenLink = document.createElement('a');
    hiddenLink.href = mailtoUrl;
    hiddenLink.target = '_blank';
    hiddenLink.rel = 'noopener noreferrer';
    document.body.appendChild(hiddenLink);
    hiddenLink.click();
    document.body.removeChild(hiddenLink);
  } catch (err) {
    console.warn('Mailto link execution deferred to fallback channels:', err);
  }

  return {
    success: true,
    mailtoUrl,
    gmailUrl,
    outlookUrl
  };
}
