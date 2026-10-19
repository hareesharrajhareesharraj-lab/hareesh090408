import React from 'react';
import { ArrowUp } from 'lucide-react';
import { prefersReducedMotion } from '../lib/motion';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  return (
    <footer className="border-t border-[#DCE7F2] bg-[#EEF6FF] py-12 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Brand & Copyright */}
          <div className="text-center sm:text-left space-y-1">
            <div className="text-lg font-bold text-[#0F172A] font-display tracking-tight">
              HAREESHARRAJ
            </div>
            <p className="text-xs text-[#475569]">
              © 2026 Hareesharraj. Built with passion and purpose.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#475569] font-medium">
            <a href="#home" className="hover:text-[#0284C7] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#0284C7] transition-colors">About</a>
            <a href="#skills" className="hover:text-[#0284C7] transition-colors">Skills</a>
            <a href="#project" className="hover:text-[#0284C7] transition-colors">Projects</a>
            <a href="#contact" className="hover:text-[#0284C7] transition-colors">Contact</a>
          </nav>

          {/* Back to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-white border border-[#DCE7F2] text-[#64748B] hover:text-[#0284C7] hover:border-[#0EA5C6]/50 transition-all cursor-pointer group"
            aria-label="Back to top"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
