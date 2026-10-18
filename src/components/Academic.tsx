import React from 'react';
import { GraduationCap, Calendar, Star, Users } from 'lucide-react';

const academic = {
  institution: 'M.A.M. College of Engineering',
  degree: 'B.Tech, Artificial Intelligence and Data Science',
  period: 'Sep 2025 – 2029',
  grade: '8.4/10',
  activities: ['Technical Events', 'Symposium', 'Workshops'],
  description:
    'Currently pursuing B.Tech in Artificial Intelligence and Data Science, with a strong interest in Artificial Intelligence, Data Science, Python, and Machine Learning. Actively developing programming, problem-solving, communication, and technical skills through academic projects, workshops, symposiums, and practical learning.',
};

export const Academic: React.FC = () => {
  return (
    <section id="academics" className="py-20 relative scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-blue-400 tracking-wider uppercase mb-2">
          <GraduationCap className="w-4 h-4" aria-hidden="true" />
          Education
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
          Academics
        </h2>
        <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full" />
      </div>

      <article className="glass-panel rounded-2xl overflow-hidden border border-blue-900/30 shadow-xl flex flex-col md:flex-row">
        <div className="relative md:w-2/5 h-48 md:h-auto">
          <img
            src="/mamce.jpg"
            alt="Entrance gate of M.A.M. College of Engineering"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent md:bg-gradient-to-r" />
        </div>

        <div className="flex-1 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">
            <div className="bg-white rounded-lg px-3 py-2 w-fit shrink-0">
              <img
                src="/mamce-logo.png"
                alt="M.A.M. College of Engineering logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-white font-display leading-snug">
                {academic.institution}
              </h4>
              <p className="text-sm text-blue-300 font-medium">{academic.degree}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 bg-slate-800/60 border border-slate-700 rounded-full px-3 py-1">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
              {academic.period}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 bg-slate-800/60 border border-slate-700 rounded-full px-3 py-1">
              <Star className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
              Grade: {academic.grade}
            </span>
          </div>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-5">
            {academic.description}
          </p>

          <div>
            <p className="flex items-center gap-1.5 text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              <Users className="w-3.5 h-3.5" aria-hidden="true" />
              Activities and societies
            </p>
            <ul className="flex flex-wrap gap-2">
              {academic.activities.map((activity) => (
                <li
                  key={activity}
                  className="text-xs font-semibold text-blue-300 bg-blue-950/50 border border-blue-800/40 rounded-md px-2.5 py-1"
                >
                  {activity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
      </div>
    </section>
  );
};
