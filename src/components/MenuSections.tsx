import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ChevronRight, GraduationCap, LayoutGrid, NotebookText, X } from 'lucide-react';
import { Academic } from './Academic';
import { ProjectBlog } from './ProjectBlog';

type SectionKey = 'academics' | 'blog';

const menuItems: {
  key: SectionKey;
  number: string;
  parent: string;
  title: string;
  summary: string;
  icon: React.ElementType;
}[] = [
  {
    key: 'academics',
    number: '02',
    parent: 'About',
    title: 'Academics',
    summary: 'Education, grade, and activities at M.A.M. College of Engineering.',
    icon: GraduationCap,
  },
  {
    key: 'blog',
    number: '05',
    parent: 'Blog',
    title: 'Project Blog',
    summary: 'Detailed summary of my project, models, and parameters.',
    icon: NotebookText,
  },
];

const slide = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -60 },
  transition: { duration: 0.35, ease: 'easeOut' as const },
};

export const MenuSections: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionKey | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href="#academics"], a[href="#blog"]');
      if (!anchor) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      const key = anchor.getAttribute('href')!.slice(1) as SectionKey;
      setMenuOpen(true);
      setActiveSection(key);
      document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
    };
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveSection(null);
  };

  return (
    <section id="menu" className="py-16 relative scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel rounded-2xl border border-blue-900/30 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-blue-900/30">
            <div className="flex items-center gap-2">
              {activeSection ? (
                <button
                  type="button"
                  onClick={() => setActiveSection(null)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:border-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  Sections
                </button>
              ) : (
                <span className="flex items-center gap-2 text-sm font-bold text-white font-display">
                  <LayoutGrid className="w-4 h-4 text-blue-400" aria-hidden="true" />
                  Explore More
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
              aria-expanded={menuOpen}
              aria-controls="menu-panel"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-1.5 text-xs font-semibold text-white shadow-lg shadow-blue-900/40 hover:from-blue-500 hover:to-indigo-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              {menuOpen ? <X className="w-3.5 h-3.5" aria-hidden="true" /> : <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />}
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>

          <AnimatePresence initial={false}>
            {menuOpen && (
              <motion.div
                id="menu-panel"
                key="panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {activeSection === null ? (
                    <motion.ul key="list" {...slide} className="grid gap-4 p-5 sm:grid-cols-2">
                      {menuItems.map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <motion.li
                            key={item.key}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.08 * i, duration: 0.3 }}
                          >
                            <button
                              type="button"
                              onClick={() => setActiveSection(item.key)}
                              className="group w-full text-left flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/50 p-4 hover:border-blue-700/60 hover:bg-blue-950/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                            >
                              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-950/70 border border-blue-800/40 text-blue-300">
                                <Icon className="w-5 h-5" aria-hidden="true" />
                              </span>
                              <span className="flex-1 min-w-0">
                                <span className="block text-[11px] font-semibold uppercase tracking-wider text-blue-400">
                                  Section {item.number} &middot; {item.parent}
                                </span>
                                <span className="block text-base font-bold text-white font-display">{item.title}</span>
                                <span className="block text-xs text-slate-400 leading-relaxed">{item.summary}</span>
                              </span>
                              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-blue-300 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                            </button>
                          </motion.li>
                        );
                      })}
                    </motion.ul>
                  ) : (
                    <motion.div key={activeSection} {...slide}>
                      {activeSection === 'academics' ? <Academic /> : <ProjectBlog />}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
