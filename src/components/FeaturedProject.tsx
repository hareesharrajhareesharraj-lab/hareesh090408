import React, { useState } from 'react';
import {
  Database,
  BarChart2,
  Calendar,
  Layers,
  BookOpen,
  FileText,
  Mail,
  TrendingUp,
  Sparkles,
  Github,
  NotebookPen,
  Target,
  Workflow,
  Cpu,
  Award,
} from 'lucide-react';
import { AbstractModal } from './AbstractModal';
import { usePortfolio } from '../context/PortfolioContext';
import { PROJECT_LINKS } from '../config/site';
import { scrollToId } from '../lib/motion';

const techTags = ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Machine Learning'];

/** Logistic Regression test-set results, as reported in the project blog / notebook. */
const modelEvaluation: { label: string; value: string | null }[] = [
  { label: 'Accuracy', value: '99.49%' },
  { label: 'Precision', value: '99.5%' },
  { label: 'Recall', value: '99.4%' },
  { label: 'F1-score', value: '99.49%' },
];

const secondaryBtn =
  'px-5 py-3 text-xs sm:text-sm font-semibold text-[#1E293B] hover:text-[#0284C7] bg-white/90 hover:bg-[#EEF6FF] border border-[#DCE7F2] hover:border-[#0EA5C6]/50 rounded-xl transition-all duration-200 active:scale-95 inline-flex items-center gap-2 cursor-pointer';

export const FeaturedProject: React.FC = () => {
  const { data } = usePortfolio();
  const [abstractModalOpen, setAbstractModalOpen] = useState(false);

  const highlightCards = [
    { title: data.projectRecords, label: 'Records Analyzed', icon: Database, desc: 'NASA OMNI space-environment telemetry data', color: 'text-[#0284C7]' },
    { title: data.projectColumns, label: 'Dataset Columns', icon: Layers, desc: 'Solar-wind velocity, magnetic vectors, proton flux & indices', color: 'text-[#0284C7]' },
    { title: data.projectDataPeriod.replace(/January /g, 'Jan '), label: 'Data Period', icon: Calendar, desc: 'Multi-decade heliophysical observational span', color: 'text-[#0F766E]' },
    { title: data.projectAccuracy, label: 'Best Model Accuracy', icon: TrendingUp, desc: 'Logistic Regression on the test set', color: 'text-emerald-700' },
    { title: data.projectClasses, label: 'Activity Classes', icon: BarChart2, desc: 'Solar & geomagnetic activity levels', color: 'text-purple-700' },
  ];

  const pipeline = [
    { step: 'Problem', icon: Target, text: 'Classify solar & geomagnetic activity as Low, Moderate, or High from space-weather telemetry.' },
    { step: 'Dataset', icon: Database, text: `NASA OMNI data — ${data.projectRecords} records, ${data.projectColumns} columns, ${data.projectDataPeriod}.` },
    { step: 'Approach', icon: Workflow, text: 'Data cleaning, exploratory analysis, feature selection, and train/test splitting.' },
    { step: 'Model', icon: Cpu, text: 'Benchmarked Logistic Regression, Random Forest, and Decision Tree classifiers.' },
    { step: 'Results', icon: Award, text: `Logistic Regression performed best with ${data.projectAccuracy} test accuracy.` },
  ];

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToId(id);
  };

  const hasAllMetrics = modelEvaluation.every((m) => m.value);

  return (
    <section id="project" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-semibold text-[#0284C7] tracking-wider uppercase mb-2">
            03 · Featured Project
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-display tracking-tight">
            solar activity detection
          </h2>
          <p className="mt-3 text-lg font-medium text-[#0284C7] font-display">{data.projectSubtitle}</p>
          <div className="w-12 h-1 bg-gradient-to-r from-[#0EA5C6] to-[#14B8A6] mx-auto mt-4 rounded-full" />
        </div>

        <div className="glass-panel rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#DCE7F2] mb-12 shadow-2xl relative overflow-hidden">
          <div className="space-y-6">
            <figure className="rounded-2xl overflow-hidden border border-[#DCE7F2] shadow-lg bg-[#0B1220]">
              <img
                src="/solar-magnetosphere.jpg"
                alt="The Sun releasing solar wind toward a planet surrounded by blue magnetic field lines of its magnetosphere"
                className="w-full h-56 sm:h-72 lg:h-80 object-cover"
                loading="lazy"
                decoding="async"
              />
            </figure>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0EA5C6]/10 border border-[#DCE7F2] text-[#0369A1] text-xs font-data">
              <Sparkles className="w-3.5 h-3.5 text-[#0F766E]" aria-hidden="true" />
              <span>NASA OMNI Heliophysics & Space Weather Study</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-display leading-tight">
              Predictive Machine Learning for Heliophysical Telemetry & Space Weather
            </h3>

            <p className="text-[#334155] text-sm sm:text-base leading-relaxed">
              An end-to-end data science study analyzing 24 years of NASA OMNI space-environment observations. The project examines critical relationships between interplanetary magnetic fields, solar wind density, and proton speeds to classify and forecast solar disturbances with high statistical precision.
            </p>

            <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
              {techTags.map((tag) => (
                <li key={tag} className="px-3 py-1 rounded-full text-xs font-semibold font-data bg-white border border-[#DCE7F2] text-[#0369A1]">
                  {tag}
                </li>
              ))}
            </ul>

            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {pipeline.map(({ step, icon: Icon, text }, idx) => (
                <li key={step} className="rounded-2xl bg-white/80 border border-[#DCE7F2] p-4 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-lg bg-[#0EA5C6]/10 text-[#0284C7] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                      <span className="text-[#0284C7] font-data mr-1">{idx + 1}.</span>
                      {step}
                    </span>
                  </div>
                  <p className="text-xs text-[#334155] leading-relaxed">{text}</p>
                </li>
              ))}
            </ol>

            <div className="rounded-2xl border border-[#0EA5C6]/30 bg-[#EEF6FF]/70 p-4 sm:p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h4 className="text-sm font-bold text-[#0F172A] font-display uppercase tracking-wider">Model Evaluation</h4>
                <span className="text-xs text-[#475569] font-data">Best model: Logistic Regression</span>
              </div>
              {hasAllMetrics ? (
                <dl className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {modelEvaluation.map((m) => (
                    <div key={m.label} className="rounded-xl bg-white border border-[#DCE7F2] px-3 py-2.5 min-w-0">
                      <dt className="text-[11px] font-semibold uppercase tracking-wider text-[#475569]">{m.label}</dt>
                      <dd className="text-xl font-extrabold text-[#0F172A] font-display tabular-nums">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="text-sm text-[#334155]">Metrics available in project notebook.</p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={PROJECT_LINKS.githubRepository || '#'}
                {...(PROJECT_LINKS.githubRepository
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : { onClick: (e: React.MouseEvent) => e.preventDefault(), 'aria-disabled': true, title: 'Repository link coming soon' })}
                className="btn-primary px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#0284C7] hover:bg-[#0369A1] rounded-xl shadow-lg shadow-[#0EA5C6]/25 transition-all duration-200 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                <span>GitHub Repository</span>
                {PROJECT_LINKS.githubRepository && <span className="sr-only">(opens in a new tab)</span>}
              </a>

              <a
                href={PROJECT_LINKS.reportOrNotebook || '#'}
                {...(PROJECT_LINKS.reportOrNotebook
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : { onClick: (e: React.MouseEvent) => e.preventDefault(), 'aria-disabled': true, title: 'Report link coming soon' })}
                className={secondaryBtn}
              >
                <NotebookPen className="w-4 h-4 text-[#0F766E]" aria-hidden="true" />
                <span>View Project Report / Notebook</span>
                {PROJECT_LINKS.reportOrNotebook && <span className="sr-only">(opens in a new tab)</span>}
              </a>

              <a href="#contact" onClick={(e) => handleAnchor(e, '#contact')} className={secondaryBtn}>
                <Mail className="w-4 h-4 text-[#0284C7]" aria-hidden="true" />
                <span>Contact Me</span>
              </a>

              <a href="#blog" onClick={(e) => handleAnchor(e, '#blog')} className={secondaryBtn}>
                <BookOpen className="w-4 h-4 text-[#0284C7]" aria-hidden="true" />
                <span>Read Project Blog</span>
              </a>

              <button type="button" onClick={() => setAbstractModalOpen(true)} className={secondaryBtn}>
                <FileText className="w-4 h-4 text-[#0F766E]" aria-hidden="true" />
                <span>View Abstract</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {highlightCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="glass-card rounded-2xl p-5 border border-[#DCE7F2] flex flex-col motion-safe:hover:-translate-y-1 transition-all duration-200 min-w-0"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0EA5C6]/10 border border-[#DCE7F2] flex items-center justify-center mb-3">
                  <Icon className={`w-5 h-5 ${card.color}`} aria-hidden="true" />
                </div>
                <p className="text-xl lg:text-lg xl:text-xl font-extrabold text-[#0F172A] font-display tabular-nums tracking-tight mb-1 break-words leading-snug">
                  {card.title}
                </p>
                <p className="text-xs font-semibold text-[#334155] uppercase tracking-wider mb-2">{card.label}</p>
                <p className="text-xs text-[#475569] leading-relaxed">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <AbstractModal
        isOpen={abstractModalOpen}
        onClose={() => setAbstractModalOpen(false)}
        onNavigateToBlog={() => scrollToId('#blog')}
      />
    </section>
  );
};
