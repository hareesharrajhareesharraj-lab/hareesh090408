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
  Share2,
  BarChart3,
  type LucideIcon,
} from 'lucide-react';
import { usePortfolio, type SkillGroup, type SkillItem, type SkillLevel } from '../context/PortfolioContext';

type Filter = 'all' | SkillGroup;

const iconMap: Record<string, LucideIcon> = {
  python: Code2,
  machine_learning: Brain,
  data_visualization: BarChart3,
  java: Coffee,
  cpp: Terminal,
  m365: LayoutGrid,
  sharepoint: Share2,
  excel: Table2,
  powerpoint: Presentation,
};

const iconStyleMap: Record<string, string> = {
  python: 'bg-[#0EA5C6]/10 text-[#0284C7] border-[#DCE7F2]',
  machine_learning: 'bg-cyan-50 text-[#0F766E] border-cyan-200',
  data_visualization: 'bg-sky-50 text-[#0284C7] border-sky-200',
  java: 'bg-amber-50 text-amber-700 border-amber-200',
  cpp: 'bg-sky-50 text-[#0284C7] border-sky-200',
  m365: 'bg-[#0EA5C6]/10 text-[#0284C7] border-[#DCE7F2]',
  sharepoint: 'bg-teal-50 text-[#0F766E] border-teal-200',
  excel: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  powerpoint: 'bg-orange-50 text-orange-700 border-orange-200',
};

const levelStyle: Record<SkillLevel, string> = {
  Advanced: 'bg-[#0EA5C6]/10 text-[#0369A1] border-[#0EA5C6]/30',
  Proficient: 'bg-teal-50 text-[#0F766E] border-teal-200',
  Familiar: 'bg-slate-100 text-[#334155] border-slate-200',
};

const groups: { id: SkillGroup; label: string; title: string; description: string }[] = [
  {
    id: 'ai_data',
    label: 'A',
    title: 'AI & Data Science',
    description: 'Primary focus — modeling, analysis, and turning data into insight.',
  },
  {
    id: 'dev_tools',
    label: 'B',
    title: 'Development & Productivity Tools',
    description: 'Supporting languages and tools for engineering and collaboration.',
  },
];

const SkillCard: React.FC<{ skill: SkillItem; featured: boolean }> = ({ skill, featured }) => {
  const Icon = iconMap[skill.id] ?? Code2;
  const iconStyle = iconStyleMap[skill.id] ?? iconStyleMap.python;

  return (
    <article
      className={`glass-panel rounded-2xl p-5 border transition-all duration-300 flex flex-col group motion-safe:hover:-translate-y-1 min-w-0 ${
        featured ? 'border-[#0EA5C6]/30 hover:border-[#0EA5C6]/60' : 'border-[#DCE7F2] hover:border-[#0EA5C6]/40'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${iconStyle} shadow-sm`}>
          <Icon className="w-5 h-5" aria-hidden="true" />
        </div>
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap ${levelStyle[skill.level]}`}>
          {skill.level}
        </span>
      </div>

      <h4 className="text-lg font-bold text-[#0F172A] font-display leading-snug break-words">
        {skill.name}
      </h4>
      <p className="text-[11px] font-semibold text-[#475569] tracking-wide font-data mb-2">{skill.tag}</p>

      <p className="text-sm text-[#334155] leading-relaxed mb-4">{skill.description}</p>

      <ul className="mt-auto space-y-1.5 pt-3 border-t border-[#DCE7F2]">
        {skill.highlights.map((item) => (
          <li key={item} className="flex items-start gap-1.5 text-xs text-[#334155]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0EA5C6] shrink-0 mt-px" aria-hidden="true" />
            <span className="leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
};

export const Skills: React.FC = () => {
  const { data } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState<Filter>('all');

  const countFor = (group: SkillGroup) => data.skills.filter((s) => s.group === group).length;

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: `All Skills (${data.skills.length})` },
    { id: 'ai_data', label: `AI & Data Science (${countFor('ai_data')})` },
    { id: 'dev_tools', label: `Dev & Productivity (${countFor('dev_tools')})` },
  ];

  const visibleGroups = groups.filter((g) => activeFilter === 'all' || activeFilter === g.id);

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold text-[#0284C7] tracking-wider uppercase mb-2">
            02 · Technical Skills
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-display tracking-tight">
            Skills & Competencies
          </h2>
          <p className="mt-3 text-[#334155] text-sm sm:text-base">
            AI and data science first, backed by core programming and productivity tools.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-[#0EA5C6] to-[#14B8A6] mx-auto mt-4 rounded-full" />
        </div>

        <div className="flex justify-center mb-10">
          <div
            role="group"
            aria-label="Filter skills by group"
            className="inline-flex flex-wrap justify-center items-center gap-1 p-1 bg-white/80 rounded-xl border border-[#DCE7F2]"
          >
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                aria-pressed={activeFilter === f.id}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-[#0284C7] text-white shadow-md shadow-[#0EA5C6]/25'
                    : 'text-[#334155] hover:text-[#0284C7]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-12">
          {visibleGroups.map((group) => {
            const skills = data.skills.filter((s) => s.group === group.id);
            if (skills.length === 0) return null;
            const featured = group.id === 'ai_data';

            return (
              <div key={group.id} aria-labelledby={`skills-group-${group.id}`}>
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold font-display shrink-0 ${
                      featured ? 'bg-[#0284C7] text-white' : 'bg-white border border-[#DCE7F2] text-[#0284C7]'
                    }`}
                    aria-hidden="true"
                  >
                    {group.label}
                  </span>
                  <div className="min-w-0">
                    <h3 id={`skills-group-${group.id}`} className="text-lg sm:text-xl font-bold text-[#0F172A] font-display">
                      {group.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#475569]">{group.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {skills.map((skill) => (
                    <SkillCard key={skill.id} skill={skill} featured={featured} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
