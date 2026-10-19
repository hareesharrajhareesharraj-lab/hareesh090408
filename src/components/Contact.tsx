import React, { useEffect, useState } from 'react';
import { Mail, Send, Copy, Check, ArrowUpRight, Linkedin, CheckCircle2, AlertCircle, X, Loader2 } from 'lucide-react';
import { CONTACT_EMAIL, CONTACT_FORM_ENDPOINT, LINKEDIN_URL } from '../config/site';

type FieldName = 'name' | 'email' | 'subject' | 'message';
type FormState = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;
type Status = 'idle' | 'sending' | 'success' | 'error';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const validate = (values: FormState): Errors => {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your name (at least 2 characters).';
  if (!values.email.trim()) errors.email = 'Please enter your email address.';
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (values.subject.trim().length < 3) errors.subject = 'Please add a short subject (at least 3 characters).';
  if (values.message.trim().length < 10) errors.message = 'Please write a message of at least 10 characters.';
  return errors;
};

const inputBase =
  'w-full px-4 py-3 rounded-xl bg-white/80 border text-[#0F172A] placeholder-[#64748B] text-sm focus:outline-none focus:ring-1 transition-colors';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  const endpointConfigured = CONTACT_FORM_ENDPOINT.trim().length > 0;

  useEffect(() => {
    if (status !== 'success') return;
    const timer = window.setTimeout(() => setStatus('idle'), 6000);
    return () => window.clearTimeout(timer);
  }, [status]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const updateField = (field: FieldName, value: string) => {
    const next = { ...formData, [field]: value };
    setFormData(next);
    if (touched[field]) setErrors(validate(next));
  };

  const handleBlur = (field: FieldName) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(formData));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate(formData);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, subject: true, message: true });

    const firstInvalid = (Object.keys(nextErrors) as FieldName[])[0];
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    if (!endpointConfigured) {
      const subject = encodeURIComponent(formData.subject.trim());
      const body = encodeURIComponent(
        `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\n${formData.message.trim()}`,
      );
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });
      if (!res.ok) throw new Error(`Request failed with ${res.status}`);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTouched({});
      setErrors({});
    } catch {
      setStatus('error');
    }
  };

  const fieldClass = (field: FieldName) =>
    `${inputBase} ${
      touched[field] && errors[field]
        ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
        : 'border-[#DCE7F2] focus:border-[#0EA5C6] focus:ring-[#0EA5C6]'
    }`;

  const fieldA11y = (field: FieldName) => {
    const invalid = Boolean(touched[field] && errors[field]);
    return {
      'aria-invalid': invalid,
      'aria-describedby': invalid ? `contact-${field}-error` : undefined,
    };
  };

  const FieldError: React.FC<{ field: FieldName }> = ({ field }) =>
    touched[field] && errors[field] ? (
      <p id={`contact-${field}-error`} className="mt-1.5 flex items-start gap-1.5 text-xs text-red-700">
        <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-px" aria-hidden="true" />
        <span>{errors[field]}</span>
      </p>
    ) : null;

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-semibold text-[#0284C7] tracking-wider uppercase mb-2">04 · Contact Me</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-display tracking-tight">Contact Me</h2>
          <p className="mt-3 text-[#334155] text-base sm:text-lg">
            Have a project idea or would like to connect? Send me a message.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-[#0EA5C6] to-[#14B8A6] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6 min-w-0">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-[#DCE7F2] space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#0F172A] font-display mb-2">Get in Touch</h3>
                <p className="text-[#334155] text-sm leading-relaxed">
                  I am always eager to collaborate on AI and data science research, algorithmic software development, or innovative technical projects.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/90 border border-[#DCE7F2] space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#475569] uppercase tracking-wider">
                  <Mail className="w-4 h-4 text-[#0284C7]" aria-hidden="true" />
                  <span>Direct Email</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="min-w-0 text-sm font-medium text-[#0284C7] hover:text-[#0369A1] hover:underline transition-colors font-data break-all"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-[#EEF6FF] hover:bg-[#DCE7F2] text-[#334155] hover:text-[#0284C7] transition-all shrink-0 cursor-pointer"
                    aria-label={copied ? 'Email address copied' : 'Copy email address'}
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-700" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
                  </button>
                </div>
                <p className="text-[11px] text-emerald-700 font-data min-h-[1em]" role="status" aria-live="polite">
                  {copied ? 'Email copied to clipboard!' : ''}
                </p>
              </div>

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View LinkedIn Profile (opens in a new tab)"
                className="group flex items-center justify-between gap-3 p-4 rounded-xl bg-white/90 border border-[#DCE7F2] hover:border-[#0EA5C6]/60 transition-colors"
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#475569] uppercase tracking-wider">
                    <Linkedin className="w-4 h-4 text-[#0284C7]" aria-hidden="true" />
                    <span>LinkedIn</span>
                  </div>
                  <p className="text-sm font-semibold text-[#0284C7] group-hover:text-[#0369A1] transition-colors">
                    View LinkedIn Profile <span aria-hidden="true">↗</span>
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#475569] group-hover:text-[#0284C7] shrink-0 transition-colors" aria-hidden="true" />
              </a>

              <dl className="space-y-3 pt-2 text-xs text-[#475569] font-data border-t border-[#DCE7F2]">
                <div className="flex flex-wrap justify-between gap-x-3 gap-y-1 py-1 border-b border-[#DCE7F2]">
                  <dt>Location</dt>
                  <dd className="text-[#1E293B]">India</dd>
                </div>
                <div className="flex flex-wrap justify-between gap-x-3 gap-y-1 py-1 border-b border-[#DCE7F2]">
                  <dt>Academic Focus</dt>
                  <dd className="text-[#1E293B]">B.Tech AI & Data Science</dd>
                </div>
                <div className="flex flex-wrap justify-between gap-x-3 gap-y-1 py-1">
                  <dt>Response Time</dt>
                  <dd className="text-emerald-700">Usually within 24 hours</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="lg:col-span-7 min-w-0">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-[#DCE7F2] shadow-xl">
              <h3 className="text-xl font-bold text-[#0F172A] font-display mb-2">Send a Direct Message</h3>
              <p className="text-xs text-[#475569] mb-6">
                Fields marked <span aria-hidden="true">*</span>
                <span className="sr-only">with an asterisk</span> are required.
                {!endpointConfigured && ' Submitting opens your email app with the message pre-filled.'}
              </p>

              {status === 'error' && (
                <div role="alert" className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    Something went wrong sending your message. Please try again or{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="underline font-semibold">email me directly</a>.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-[#334155] uppercase tracking-wider mb-2">
                      Your Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      onBlur={() => handleBlur('name')}
                      placeholder="e.g. John Doe"
                      className={fieldClass('name')}
                      {...fieldA11y('name')}
                    />
                    <FieldError field="name" />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-[#334155] uppercase tracking-wider mb-2">
                      Your Email <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      required
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      placeholder="e.g. john@example.com"
                      className={fieldClass('email')}
                      {...fieldA11y('email')}
                    />
                    <FieldError field="email" />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-[#334155] uppercase tracking-wider mb-2">
                    Subject <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => updateField('subject', e.target.value)}
                    onBlur={() => handleBlur('subject')}
                    placeholder="Project Inquiry / Collaboration / Opportunity"
                    className={fieldClass('subject')}
                    {...fieldA11y('subject')}
                  />
                  <FieldError field="subject" />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-[#334155] uppercase tracking-wider mb-2">
                    Message <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    onBlur={() => handleBlur('message')}
                    placeholder="Write your message or inquiry here..."
                    className={`${fieldClass('message')} resize-none`}
                    {...fieldA11y('message')}
                  />
                  <FieldError field="message" />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary flex-1 py-3.5 px-6 text-sm font-semibold text-white bg-[#0284C7] hover:bg-[#0369A1] disabled:opacity-70 disabled:cursor-wait rounded-xl shadow-lg shadow-[#0EA5C6]/25 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {status === 'sending' ? (
                      <Loader2 className="w-4 h-4 motion-safe:animate-spin" aria-hidden="true" />
                    ) : (
                      <Send className="w-4 h-4" aria-hidden="true" />
                    )}
                    <span>{status === 'sending' ? 'Sending…' : 'Send Message'}</span>
                  </button>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="flex-1 py-3.5 px-6 text-sm font-semibold text-[#1E293B] hover:text-[#0284C7] bg-white/90 hover:bg-[#EEF6FF] border border-[#DCE7F2] hover:border-[#0EA5C6]/50 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    <span>Email Me Directly</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div aria-live="polite" className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:bottom-6 z-[60] flex justify-center sm:justify-end pointer-events-none">
        {status === 'success' && (
          <div
            role="status"
            className="toast-in pointer-events-auto w-full sm:w-96 max-w-full rounded-2xl bg-white border border-emerald-200 shadow-2xl shadow-slate-300/60 p-4 flex items-start gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#0F172A]">Message sent successfully</p>
              <p className="text-xs text-[#334155] mt-0.5">Thanks for reaching out — I&apos;ll get back to you soon.</p>
            </div>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="p-1 rounded-md text-[#475569] hover:text-[#0F172A] hover:bg-[#EEF6FF] shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
