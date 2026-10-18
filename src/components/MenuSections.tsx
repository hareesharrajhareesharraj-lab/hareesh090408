import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronRight, GraduationCap, NotebookText, X } from 'lucide-react';
import { Academic } from './Academic';
import { ProjectBlog } from './ProjectBlog';

type SectionKey = 'academics' | 'blog';

const sectionConfig: Record<
  SectionKey,
  { label: string; summary: string; icon: React.ElementType; Content: React.FC }
> = {
  academics: {
    label: 'Academics',
    summary: 'Education, grade, and activities at M.A.M. College of Engineering.',
    icon: GraduationCap,
    Content: Academic,
  },
  blog: {
    label: 'Blog',
    summary: 'Detailed summary of my project, models, and parameters.',
    icon: NotebookText,
    Content: ProjectBlog,
  },
};

export const MenuSection: React.FC<{ section: SectionKey }> = ({ section }) => {
  const [open, setOpen] = useState(false);
  const { label, summary, icon: Icon, Content } = sectionConfig[section];
  const panelId = `${section}-panel`;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest(`a[href="#${section}"]`);
      if (!anchor) return;
      e.preventDefault();
      setOpen(true);
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    };
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [section]);

  return (
    <section id={section} className="pb-12 relative scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            title={summary}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 hover:from-blue-500 hover:to-indigo-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <Icon className="w-4 h-4" aria-hidden="true" />
            {label}
            {open ? (
              <X className="w-4 h-4" aria-hidden="true" />
            ) : (
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            )}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -60, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="mt-6 glass-panel rounded-2xl border border-blue-900/30 shadow-xl overflow-hidden"
              >
                <Content />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
