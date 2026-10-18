import React, { useState } from 'react';
import { Mail, Send, Copy, Check, Sparkles, MessageSquare, ArrowUpRight, Linkedin } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Contact: React.FC = () => {
  const { data } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactEmail = data.email;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    // Construct mailto link as working fallback
    const subjectEncoded = encodeURIComponent(formData.subject || `Portfolio Inquiry from ${formData.name}`);
    const bodyContent = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const bodyEncoded = encodeURIComponent(bodyContent);

    // Open user's email client
    window.location.href = `mailto:${contactEmail}?subject=${subjectEncoded}&body=${bodyEncoded}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-semibold text-[#0EA5C6] tracking-wider uppercase mb-2">
            05 · Let's Connect
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-display tracking-tight">
            Contact Me
          </h2>
          <p className="mt-3 text-[#475569] text-base sm:text-lg">
            Have a project idea or would like to connect? Send me a message.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-[#0EA5C6] to-[#14B8A6] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info & Quick Copy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-[#DCE7F2] space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#0F172A] font-display mb-2">
                  Get in Touch
                </h3>
                <p className="text-[#475569] text-sm leading-relaxed">
                  I am always eager to collaborate on AI and data science research, algorithmic software development, or innovative technical projects.
                </p>
              </div>

              {/* Email Card with 1-click copy */}
              <div className="p-4 rounded-xl bg-white/90 border border-[#DCE7F2] space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  <Mail className="w-4 h-4 text-[#0EA5C6]" />
                  <span>Direct Email</span>
                </div>
                
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-sm font-medium text-[#0284C7] hover:text-[#0284C7] transition-colors truncate font-data"
                  >
                    {contactEmail}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-[#EEF6FF] hover:bg-[#DCE7F2] text-[#475569] hover:text-[#0284C7] transition-all shrink-0 cursor-pointer"
                    title="Copy email to clipboard"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {copied && (
                  <p className="text-[11px] text-emerald-600 font-data">
                    Email copied to clipboard!
                  </p>
                )}
              </div>

              <a
                href="https://www.linkedin.com/in/hareesharraj-udayakumar090408"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 p-4 rounded-xl bg-white/90 border border-[#DCE7F2] hover:border-[#0EA5C6]/60 transition-colors"
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                    <Linkedin className="w-4 h-4 text-[#0EA5C6]" aria-hidden="true" />
                    <span>LinkedIn</span>
                  </div>
                  <p className="text-sm font-medium text-[#0284C7] group-hover:text-[#0284C7] transition-colors truncate font-data">
                    in/hareesharraj-udayakumar090408
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#64748B] group-hover:text-[#0284C7] shrink-0 transition-colors" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>

              {/* Status details */}
              <div className="space-y-3 pt-2 text-xs text-[#64748B] font-data border-t border-[#DCE7F2]">
                <div className="flex justify-between py-1 border-b border-[#DCE7F2]">
                  <span>Location</span>
                  <span className="text-[#1E293B]">India</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#DCE7F2]">
                  <span>Academic Focus</span>
                  <span className="text-[#1E293B]">B.Tech AI & Data Science</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Response Time</span>
                  <span className="text-emerald-600">Usually within 24 hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-[#DCE7F2] shadow-xl">
              <h3 className="text-xl font-bold text-[#0F172A] font-display mb-6">
                Send a Direct Message
              </h3>

              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm flex items-center justify-between gap-3">
                  <span>Your email client has been prepared with your message!</span>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs underline text-emerald-700 hover:text-[#0284C7]"
                  >
                    Reset
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-[#475569] uppercase tracking-wider mb-2">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#DCE7F2] text-[#0F172A] placeholder-[#94A3B8] text-sm focus:outline-none focus:border-[#0EA5C6] focus:ring-1 focus:ring-[#0EA5C6] transition-colors"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-[#475569] uppercase tracking-wider mb-2">
                      Your Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#DCE7F2] text-[#0F172A] placeholder-[#94A3B8] text-sm focus:outline-none focus:border-[#0EA5C6] focus:ring-1 focus:ring-[#0EA5C6] transition-colors"
                    />
                  </div>
                </div>

                {/* Subject field */}
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-[#475569] uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Collaboration / Opportunity"
                    className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#DCE7F2] text-[#0F172A] placeholder-[#94A3B8] text-sm focus:outline-none focus:border-[#0EA5C6] focus:ring-1 focus:ring-[#0EA5C6] transition-colors"
                  />
                </div>

                {/* Message field */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-[#475569] uppercase tracking-wider mb-2">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message or inquiry here..."
                    className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#DCE7F2] text-[#0F172A] placeholder-[#94A3B8] text-sm focus:outline-none focus:border-[#0EA5C6] focus:ring-1 focus:ring-[#0EA5C6] transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn-primary w-full py-3.5 px-6 text-sm font-semibold text-white bg-gradient-to-r from-[#0EA5C6] to-[#0EA5C6] hover:from-[#0284C7] hover:to-[#0284C7] rounded-xl shadow-lg shadow-[#0EA5C6]/25 transition-all duration-200 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
