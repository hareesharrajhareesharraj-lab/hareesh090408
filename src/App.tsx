/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { FeaturedProject } from './components/FeaturedProject';
import { ProjectBlog } from './components/ProjectBlog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ParticleBackground } from './components/ParticleBackground';
import { PortfolioProvider } from './context/PortfolioContext';
import {
  SECTION_IDS,
  SECTION_CHANGE_EVENT,
  type SectionId,
  isSectionId,
} from './lib/navigation';

const SECTION_COMPONENTS: Record<SectionId, React.FC> = {
  home: Hero,
  about: About,
  skills: Skills,
  project: FeaturedProject,
  blog: ProjectBlog,
  contact: Contact,
};

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? '-100%' : '100%', opacity: 0 }),
};

function getInitialSection(): SectionId {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.replace('#', '');
  return isSectionId(hash) ? hash : 'home';
}

function PortfolioContent() {
  const [activeSection, setActiveSection] = useState<SectionId>(getInitialSection);
  const [direction, setDirection] = useState(1);
  const activeRef = useRef<SectionId>(activeSection);

  useEffect(() => {
    const showSection = (next: SectionId) => {
      const current = activeRef.current;
      if (next === current) return;
      setDirection(SECTION_IDS.indexOf(next) > SECTION_IDS.indexOf(current) ? 1 : -1);
      activeRef.current = next;
      setActiveSection(next);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCustom = (e: Event) => showSection((e as CustomEvent<SectionId>).detail);
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      showSection(isSectionId(hash) ? hash : 'home');
    };

    window.addEventListener(SECTION_CHANGE_EVENT, handleCustom);
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('popstate', handleHash);
    return () => {
      window.removeEventListener(SECTION_CHANGE_EVENT, handleCustom);
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('popstate', handleHash);
    };
  }, []);

  const ActiveComponent = SECTION_COMPONENTS[activeSection];

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-100 relative flex flex-col selection:bg-blue-600/40 selection:text-white">
      <ParticleBackground />

      <Navbar activeSection={activeSection} />

      <main className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-10">
        <div className="relative overflow-hidden rounded-3xl border border-blue-900/40 bg-[#060d1f]/70 backdrop-blur-sm shadow-2xl shadow-black/40">
          <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400" />
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={activeSection}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: 'tween', ease: [0.22, 1, 0.36, 1], duration: 0.45 }, opacity: { duration: 0.3 } }}
            >
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}
