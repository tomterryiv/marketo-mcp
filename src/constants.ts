// Base URL for Marketo API
const rawBaseUrl = process.env.MARKETO_BASE_URL || '';
const rawClientId = process.env.MARKETO_CLIENT_ID || '';
const rawClientSecret = process.env.MARKETO_CLIENT_SECRET || '';

/**
 * Validates that a URL is a valid HTTPS URL pointing to a Marketo instance
 */
function validateMarketoUrl(url: string): string {
  if (!url) {
    throw new Error('MARKETO_BASE_URL environment variable is required');
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    throw new Error(`MARKETO_BASE_URL is not a valid URL: ${url}`);
  }

  // Enforce HTTPS for security
  if (parsedUrl.protocol !== 'https:') {
    throw new Error('MARKETO_BASE_URL must use HTTPS protocol for security');
  }

  // Validate it looks like a Marketo URL (optional but recommended)
  if (!parsedUrl.hostname.includes('mktorest.com') && !parsedUrl.hostname.includes('marketo.com')) {
    console.warn(
      'Warning: MARKETO_BASE_URL does not appear to be a standard Marketo domain. ' +
      'Ensure this is intentional.'
    );
  }

  // Remove trailing slash for consistency
  return url.replace(/\/+$/, '');
}

export const MARKETO_BASE_URL = validateMarketoUrl(rawBaseUrl);
export const MARKETO_CLIENT_ID = rawClientId;
export const MARKETO_CLIENT_SECRET = rawClientSecret;

// Request timeout in milliseconds (30 seconds)
export const API_REQUEST_TIMEOUT = 30000;
