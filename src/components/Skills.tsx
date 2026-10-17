import React, { useState } from 'react';
import { 
  Code2, 
  Coffee, 
  Terminal, 
  Table2, 
  Presentation, 
  CheckCircle2,
  Brain,
  LayoutGrid,
  Share2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Skills: React.FC = () => {
  const { data } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<'all' | 'programming' | 'productivity'>('all');

  const iconMap: Record<string, any> = {
    python: Code2,
    machine_learning: Brain,
    java: Coffee,
    cpp: Terminal,
    m365: LayoutGrid,
    sharepoint: Share2,
    excel: Table2,
    powerpoint: Presentation,
  };

  const styleMap: Record<string, { accentColor: string; borderColor: string; iconBg: string }> = {
    python: {
      accentColor: 'from-blue-500 to-cyan-400',
      borderColor: 'hover:border-blue-500/50',
      iconBg: 'bg-blue-950/70 text-blue-400 border-blue-800/50',
    },
    machine_learning: {
      accentColor: 'from-cyan-400 via-blue-500 to-indigo-500',
      borderColor: 'hover:border-cyan-400/50',
      iconBg: 'bg-cyan-950/70 text-cyan-300 border-cyan-800/60',
    },
    java: {
      accentColor: 'from-amber-500 to-orange-400',
      borderColor: 'hover:border-amber-500/50',
      iconBg: 'bg-amber-950/50 text-amber-400 border-amber-800/50',
    },
    cpp: {
      accentColor: 'from-indigo-500 to-blue-400',
      borderColor: 'hover:border-indigo-500/50',
      iconBg: 'bg-indigo-950/50 text-indigo-400 border-indigo-800/50',
    },
    m365: {
      accentColor: 'from-blue-600 via-indigo-500 to-cyan-400',
      borderColor: 'hover:border-blue-500/50',
      iconBg: 'bg-blue-950/60 text-blue-300 border-blue-700/50',
    },
    sharepoint: {
      accentColor: 'from-teal-500 to-emerald-400',
      borderColor: 'hover:border-teal-500/50',
      iconBg: 'bg-teal-950/60 text-teal-300 border-teal-700/50',
    },
    excel: {
      accentColor: 'from-emerald-500 to-teal-400',
      borderColor: 'hover:border-emerald-500/50',
      iconBg: 'bg-emerald-950/50 text-emerald-400 border-emerald-800/50',
    },
    powerpoint: {
      accentColor: 'from-orange-500 to-rose-400',
      borderColor: 'hover:border-orange-500/50',
      iconBg: 'bg-orange-950/50 text-orange-400 border-orange-800/50',
    },
  };

  const programmingCount = data.skills.filter((s) => s.category === 'programming').length;
  const productivityCount = data.skills.filter((s) => s.category === 'productivity').length;

  const filteredSkills = data.skills.filter((skill) => {
    if (activeCategory === 'all') return true;
    return skill.category === activeCategory;
  });

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold text-blue-400 tracking-wider uppercase mb-2">
            02 · Technical Toolkit
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Skills & Competencies
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Focused technical capabilities spanning programming languages, artificial intelligence, enterprise cloud tools, and data analytics.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Category Filter Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <div className="inline-flex items-center p-1 bg-slate-900/80 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Skills ({data.skills.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('programming')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'programming'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Programming & AI ({programmingCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('productivity')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'productivity'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Productivity & Enterprise ({productivityCount})
            </button>
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredSkills.map((skill) => {
            const Icon = iconMap[skill.id] || Code2;
            const style = styleMap[skill.id] || styleMap.python;

            return (
              <div
                key={skill.id}
                className={`glass-panel rounded-2xl p-5 border border-slate-800/90 ${style.borderColor} transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1`}
              >
                <div>
                  {/* Top Bar with Icon and Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${style.iconBg} shadow-sm group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400 tracking-wide font-data">
                      {skill.tag}
                    </span>
                  </div>

                  {/* Title & Level */}
                  <h3 className="text-lg font-bold text-white font-display mb-1 group-hover:text-blue-300 transition-colors">
                    {skill.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-3 font-data">
                    <span className="text-blue-400 font-medium">{skill.level}</span>
                    <span>·</span>
                    <span className="tabular-nums">{skill.proficiency}% Proficiency</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-4">
                    <div
                      className={`h-full bg-gradient-to-r ${style.accentColor} rounded-full transition-all duration-700`}
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {skill.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800/70">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      Key Competencies
                    </p>
                    {skill.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3 h-3 text-blue-400 shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
