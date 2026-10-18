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
  Sparkles
} from 'lucide-react';
import { AbstractModal } from './AbstractModal';
import { usePortfolio } from '../context/PortfolioContext';

export const FeaturedProject: React.FC = () => {
  const { data } = usePortfolio();
  const [abstractModalOpen, setAbstractModalOpen] = useState(false);

  const highlightCards = [
    {
      title: data.projectRecords,
      label: 'Records Analyzed',
      icon: Database,
      desc: 'NASA OMNI space-environment hourly & daily telemetry data',
      color: 'text-[#0EA5C6]',
    },
    {
      title: data.projectColumns,
      label: 'Dataset Columns',
      icon: Layers,
      desc: 'Solar-wind velocity, magnetic vectors, proton flux & indices',
      color: 'text-[#0284C7]',
    },
    {
      title: data.projectDataPeriod.replace('January ', 'Jan ').replace('January ', 'Jan '),
      label: 'Data Period',
      icon: Calendar,
      desc: 'Multi-decade heliophysical telemetry and observational span',
      color: 'text-[#14B8A6]',
    },
    {
      title: data.projectAccuracy,
      label: 'Best Model Accuracy',
      icon: TrendingUp,
      desc: 'Achieved by Logistic Regression classifier on test evaluation',
      color: 'text-emerald-600',
    },
    {
      title: data.projectClasses,
      label: 'Activity Classes',
      icon: BarChart2,
      desc: 'Low, Moderate, and High solar & geomagnetic activity',
      color: 'text-purple-600',
    },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const elem = document.querySelector(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="project" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-semibold text-[#0EA5C6] tracking-wider uppercase mb-2">
            03 · Featured Engineering Project
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-display tracking-tight">
            solar activity detection
          </h2>
          <p className="mt-3 text-lg font-medium text-[#0284C7] font-display">
            {data.projectSubtitle}
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-[#0EA5C6] to-[#14B8A6] mx-auto mt-4 rounded-full" />
        </div>

        {/* Project Hero Showcase Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#DCE7F2] mb-12 shadow-2xl relative overflow-hidden group">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Col: Overview & Actions */}
            <div className="lg:col-span-12 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0EA5C6]/10 border border-[#DCE7F2] text-[#0284C7] text-xs font-data">
                  <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
                  <span>NASA OMNI Heliophysics & Space Weather Study</span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-display leading-tight">
                Predictive Machine Learning for Heliophysical Telemetry & Space Weather
              </h3>

              <p className="text-[#475569] text-sm sm:text-base leading-relaxed">
                An end-to-end data science study analyzing 24 years of NASA OMNI space-environment observations. The project examines critical relationships between interplanetary magnetic fields, solar wind density, and proton speeds to classify and forecast solar disturbances with high statistical precision.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#blog"
                  onClick={(e) => scrollToSection(e, '#blog')}
                  className="btn-primary px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#0EA5C6] hover:bg-[#0284C7] rounded-xl shadow-lg shadow-[#0EA5C6]/25 transition-all duration-200 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Read Project Blog</span>
                </a>

                <button
                  type="button"
                  onClick={() => setAbstractModalOpen(true)}
                  className="px-5 py-3 text-xs sm:text-sm font-semibold text-[#1E293B] hover:text-[#0284C7] bg-white/90 hover:bg-[#EEF6FF] border border-[#DCE7F2] hover:border-[#0EA5C6]/50 rounded-xl transition-all duration-200 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#14B8A6]" />
                  <span>View Abstract</span>
                </button>

                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="px-5 py-3 text-xs sm:text-sm font-semibold text-[#475569] hover:text-[#0284C7] bg-transparent hover:bg-[#EEF6FF]/40 border border-transparent hover:border-[#DCE7F2] rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-[#0EA5C6]" />
                  <span>Contact Me</span>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* 5 Highlight Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {highlightCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-5 border border-[#DCE7F2] flex flex-col justify-between hover:-translate-y-1 transition-all duration-200"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#0EA5C6]/10 border border-[#DCE7F2] flex items-center justify-center mb-3">
                    <Icon className={`w-5 h-5 ${card.color}`} />
                  </div>
                  <h4 className="text-2xl font-extrabold text-[#0F172A] font-display tabular-nums tracking-tight mb-1">
                    {card.title}
                  </h4>
                  <p className="text-xs font-semibold text-[#475569] uppercase tracking-wider mb-2">
                    {card.label}
                  </p>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Abstract Modal Component */}
      <AbstractModal
        isOpen={abstractModalOpen}
        onClose={() => setAbstractModalOpen(false)}
        onNavigateToBlog={() => {
          const blogElem = document.querySelector('#blog');
          if (blogElem) {
            blogElem.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />
    </section>
  );
};
