import React from 'react';
import { Target, GraduationCap, Calendar, Mail, Award, BookOpen, Compass, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const About: React.FC = () => {
  const { data } = usePortfolio();

  const personalDetails = [
    {
      icon: GraduationCap,
      label: 'Department',
      value: data.department,
      color: 'text-[#0EA5C6]',
    },
    {
      icon: Calendar,
      label: 'Age',
      value: `${data.age} Years`,
      color: 'text-[#0284C7]',
    },
    {
      icon: Target,
      label: 'Career Goal',
      value: data.careerGoal,
      color: 'text-[#14B8A6]',
    },
    {
      icon: Mail,
      label: 'Contact Email',
      value: data.email,
      color: 'text-purple-600',
      isLink: true,
      href: `mailto:${data.email}`,
    },
  ];

  const pillars = [
    {
      icon: Compass,
      title: 'Principled Curiosity',
      description: 'Driven by scientific methodology, seeking deep understanding of how statistical learning algorithms interpret real-world phenomena.',
    },
    {
      icon: Award,
      title: 'Commitment to Excellence',
      description: 'Dedicated to high standards of code craftsmanship, reproducible data pipelines, and clear analytical documentation.',
    },
    {
      icon: BookOpen,
      title: 'Continuous Evolution',
      description: 'Constantly sharpening foundational knowledge across machine learning, computational mathematics, and modern programming languages.',
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-semibold text-[#0EA5C6] tracking-wider uppercase mb-2">
            01 · Professional Profile
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-display tracking-tight">
            About Me
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-[#0EA5C6] to-[#14B8A6] mx-auto mt-4 rounded-full" />
        </div>

        {/* Main Introduction Card */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 md:p-10 mb-10 shadow-xl border border-[#DCE7F2] relative group">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-display leading-snug">
                Building the Future of Technology with AI & Data Science
              </h3>
            </div>
            <p className="text-[#475569] text-base sm:text-lg leading-relaxed mb-6 font-normal">
              {data.aboutIntro}
            </p>
            <p className="text-[#64748B] text-sm sm:text-base leading-relaxed">
              With hands-on experience in complex algorithmic development, exploratory data analysis on real-world space telemetry, and predictive modeling, he bridges theoretical computer science concepts with actionable technological implementations.
            </p>
          </div>
        </div>

        {/* Personal Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {personalDetails.map((detail, index) => {
            const Icon = detail.icon;
            return (
              <div
                key={index}
                className="glass-card rounded-xl p-5 border border-[#DCE7F2] flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-[#0EA5C6]/10 border border-[#DCE7F2] flex items-center justify-center mb-3">
                    <Icon className={`w-5 h-5 ${detail.color}`} />
                  </div>
                  <p className="text-xs font-medium text-[#64748B] uppercase tracking-wider mb-1">
                    {detail.label}
                  </p>
                  {detail.isLink ? (
                    <a
                      href={detail.href}
                      className="text-sm font-semibold text-[#0284C7] hover:text-[#0284C7] transition-colors break-all"
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-[#1E293B] leading-snug">
                      {detail.value}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mb-10">
          <a
            href="#academics"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('academics')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#DCE7F2] bg-[#0EA5C6]/10 px-3.5 py-1.5 text-xs font-semibold text-[#0284C7] hover:bg-[#0EA5C6]/10 hover:text-[#0284C7] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5C6]"
          >
            <GraduationCap className="w-3.5 h-3.5" aria-hidden="true" />
            Academics
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>

        {/* Three Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-xl p-6 border border-[#DCE7F2] hover:border-[#0EA5C6]/30 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EEF6FF] to-[#EEF6FF]/40 border border-[#DCE7F2] flex items-center justify-center mb-4 text-[#0EA5C6]">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-[#0F172A] font-display mb-2">
                  {pillar.title}
                </h4>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
