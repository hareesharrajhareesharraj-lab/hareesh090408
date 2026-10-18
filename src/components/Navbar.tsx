import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Project', href: '#project' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F8FAFC]/85 backdrop-blur-md border-b border-[#DCE7F2] shadow-lg shadow-slate-900/5 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="group flex items-center gap-2 whitespace-nowrap shrink-0 text-[#0F172A] font-display text-lg sm:text-xl font-bold tracking-tight hover:text-[#0284C7] transition-colors"
          >
            <span className="w-8 h-8 rounded-lg bg-white overflow-hidden flex items-center justify-center shadow-md shadow-[#0EA5C6]/20 group-hover:scale-105 transition-transform">
              <img src="/logo.png" alt="" aria-hidden="true" className="w-full h-full object-cover scale-125" />
            </span>
            <span>HAREESHARRAJ</span>
          </a>

          {/* Zone 2: 6 clean single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#475569]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                    isActive ? 'text-[#0EA5C6] font-semibold' : 'hover:text-[#0284C7]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0EA5C6] to-[#14B8A6] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn-primary px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#0EA5C6] to-[#0EA5C6] hover:from-[#0284C7] hover:to-[#0284C7] rounded-lg shadow-sm shadow-[#0EA5C6]/25 transition-all duration-200 active:scale-95 whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>Contact Me</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#475569] hover:text-[#0284C7] hover:bg-[#EEF6FF]/60 rounded-lg transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#DCE7F2] px-6 py-5 shadow-2xl space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#0EA5C6]/10 text-[#0284C7] font-semibold border-l-2 border-[#0EA5C6]'
                      : 'text-[#475569] hover:text-[#0284C7] hover:bg-[#EEF6FF]/40'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
          <div className="pt-3 border-t border-[#DCE7F2]">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn-primary w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#0EA5C6] hover:bg-[#0284C7] rounded-lg shadow-md transition-colors"
            >
              <span>Contact Me</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
