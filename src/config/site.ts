/**
 * Central place for links and integrations. Replace the empty strings
 * below with real URLs when they become available — every button that
 * reads from here updates automatically.
 */

export const CONTACT_EMAIL = 'hareesharrajhareesharraj@gmail.com';

export const LINKEDIN_URL = 'https://www.linkedin.com/in/hareesharraj-udayakumar090408';

export const PROJECT_LINKS = {
  /** e.g. 'https://github.com/<username>/solar-activity-detection' */
  githubRepository: '',
  /** e.g. a link to the Jupyter notebook, Colab, or PDF report */
  reportOrNotebook: '',
};

/**
 * Contact form endpoint. Works with any service that accepts a JSON POST:
 *  - Formspree: 'https://formspree.io/f/<form-id>'
 *  - Your own API route / Resend backend: '/api/contact'
 *  - EmailJS-compatible proxy endpoint
 *
 * Set it here or via the VITE_CONTACT_FORM_ENDPOINT environment variable.
 * When left empty, the form falls back to opening the visitor's email app.
 */
export const CONTACT_FORM_ENDPOINT: string =
  (import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined) ?? '';
