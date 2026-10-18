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
      accentColor: 'from-[#0EA5C6] to-[#14B8A6]',
      borderColor: 'hover:border-[#0EA5C6]/50',
      iconBg: 'bg-[#0EA5C6]/10 text-[#0EA5C6] border-[#DCE7F2]',
    },
    machine_learning: {
      accentColor: 'from-[#14B8A6] via-[#0EA5C6] to-[#14B8A6]',
      borderColor: 'hover:border-[#14B8A6]/50',
      iconBg: 'bg-cyan-50 text-[#14B8A6] border-cyan-200',
    },
    java: {
      accentColor: 'from-amber-500 to-orange-400',
      borderColor: 'hover:border-amber-500/50',
      iconBg: 'bg-amber-50 text-amber-600 border-amber-200',
    },
    cpp: {
      accentColor: 'from-[#0284C7] to-[#0EA5C6]',
      borderColor: 'hover:border-[#0284C7]/50',
      iconBg: 'bg-sky-50 text-[#0284C7] border-sky-200',
    },
    m365: {
      accentColor: 'from-[#0EA5C6] via-[#0EA5C6] to-[#14B8A6]',
      borderColor: 'hover:border-[#0EA5C6]/50',
      iconBg: 'bg-[#0EA5C6]/10 text-[#0284C7] border-[#DCE7F2]',
    },
    sharepoint: {
      accentColor: 'from-teal-500 to-emerald-400',
      borderColor: 'hover:border-teal-500/50',
      iconBg: 'bg-teal-50 text-[#14B8A6] border-teal-200',
    },
    excel: {
      accentColor: 'from-emerald-500 to-teal-400',
      borderColor: 'hover:border-emerald-500/50',
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
    powerpoint: {
      accentColor: 'from-orange-500 to-rose-400',
      borderColor: 'hover:border-orange-500/50',
      iconBg: 'bg-orange-50 text-orange-600 border-orange-200',
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
          <div className="text-xs font-semibold text-[#0EA5C6] tracking-wider uppercase mb-2">
            02 · Technical Toolkit
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-display tracking-tight">
            Skills & Competencies
          </h2>
          <p className="mt-3 text-[#64748B] text-sm sm:text-base">
            Focused technical capabilities spanning programming languages, artificial intelligence, enterprise cloud tools, and data analytics.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-[#0EA5C6] to-[#14B8A6] mx-auto mt-4 rounded-full" />
        </div>

        {/* Category Filter Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <div className="inline-flex items-center p-1 bg-white/80 rounded-xl border border-[#DCE7F2]">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#0EA5C6] text-white shadow-md shadow-[#0EA5C6]/25'
                  : 'text-[#64748B] hover:text-[#0284C7]'
              }`}
            >
              All Skills ({data.skills.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('programming')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'programming'
                  ? 'bg-[#0EA5C6] text-white shadow-md shadow-[#0EA5C6]/25'
                  : 'text-[#64748B] hover:text-[#0284C7]'
              }`}
            >
              Programming & AI ({programmingCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('productivity')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'productivity'
                  ? 'bg-[#0EA5C6] text-white shadow-md shadow-[#0EA5C6]/25'
                  : 'text-[#64748B] hover:text-[#0284C7]'
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
                className={`glass-panel rounded-2xl p-5 border border-[#DCE7F2] ${style.borderColor} transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1`}
              >
                <div>
                  {/* Top Bar with Icon and Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${style.iconBg} shadow-sm group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold text-[#64748B] tracking-wide font-data">
                      {skill.tag}
                    </span>
                  </div>

                  {/* Title & Level */}
                  <h3 className="text-lg font-bold text-[#0F172A] font-display mb-1 group-hover:text-[#0284C7] transition-colors">
                    {skill.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#64748B] mb-3 font-data">
                    <span className="text-[#0EA5C6] font-medium">{skill.level}</span>
                    <span>·</span>
                    <span className="tabular-nums">{skill.proficiency}% Proficiency</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-[#EEF6FF] rounded-full overflow-hidden mb-4">
                    <div
                      className={`h-full bg-gradient-to-r ${style.accentColor} rounded-full transition-all duration-700`}
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#475569] leading-relaxed mb-4">
                    {skill.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 pt-2 border-t border-[#DCE7F2]">
                    <p className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">
                      Key Competencies
                    </p>
                    {skill.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-[#475569]">
                        <CheckCircle2 className="w-3 h-3 text-[#0EA5C6] shrink-0 mt-0.5" />
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
