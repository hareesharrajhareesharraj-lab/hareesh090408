import React from 'react';
import { ArrowUp } from 'lucide-react';
import { navigateTo } from '../lib/navigation';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#040814] py-12 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Brand & Copyright */}
          <div className="text-center sm:text-left space-y-1">
            <div className="text-lg font-bold text-white font-display tracking-tight">
              HAREESHARRAJ
            </div>
            <p className="text-xs text-slate-400">
              © 2026 HAREESHARRAJ. Built with passion and purpose.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex items-center gap-6 text-xs text-slate-400 font-medium">
            {['Home', 'About', 'Skills', 'Project', 'Blog', 'Contact'].map((label) => {
              const href = `#${label.toLowerCase()}`;
              return (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(href);
                  }}
                  className="hover:text-blue-400 transition-colors"
                >
                  {label}
                </a>
              );
            })}
          </div>

          {/* Back to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-blue-500/50 transition-all cursor-pointer group"
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
