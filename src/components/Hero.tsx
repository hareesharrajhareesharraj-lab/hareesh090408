import React, { useState } from 'react';
import { ArrowRight, Mail, Sparkles, Database, Brain, Cpu } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Hero: React.FC = () => {
  const { data } = usePortfolio();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imgFallback, setImgFallback] = useState(false);

  const handleImageError = () => {
    setImgFallback(true);
  };

  const currentPhoto = imgFallback ? '/meeeeeeeee.jpeg' : data.photoUrl;

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const elem = document.querySelector(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[28rem] h-[28rem] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle data grid overlay */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* Left Column: Text & CTAs */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            
            {/* Department kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300 text-xs sm:text-sm font-medium shadow-inner shadow-blue-500/10">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>{data.department}</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-[1.1] text-balance">
              Hi, I’m{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                {data.name}
              </span>
            </h1>

            {/* Subheading */}
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-200 font-display">
              {data.subheading}
            </h2>

            {/* Short Description */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              {data.heroDescription}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#project"
                onClick={(e) => scrollToSection(e, '#project')}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transition-all duration-200 active:scale-95 flex items-center gap-2 group cursor-pointer"
              >
                <span>View My Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800/80 border border-slate-700/60 hover:border-blue-500/50 rounded-xl shadow-sm transition-all duration-200 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Quick trust metrics row */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-data">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-blue-400" />
                <span>Machine Learning & Modeling</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                <span>Data Analysis & Python</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-400" />
                <span>Algorithms & Systems</span>
              </div>
            </div>
          </div>

          {/* Right Column (Above text on mobile): Real Portrait Image */}
          <div className="w-full sm:w-auto flex justify-center lg:justify-end shrink-0">
            <div className="relative group">
              
              {/* Outer subtle electric blue & purple ambient glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-400 rounded-3xl blur-xl opacity-60 group-hover:opacity-85 transition-opacity duration-500" />
              <div className="absolute -inset-0.5 bg-gradient-to-b from-blue-500/30 to-indigo-500/20 rounded-3xl pointer-events-none" />

              {/* Polished portrait container with rounded frame, subtle blue glow, and responsive crop */}
              <div className="relative w-64 sm:w-72 md:w-80 lg:w-[22rem] aspect-[3/4] rounded-2xl overflow-hidden border-2 border-blue-400/30 bg-[#081226] shadow-2xl shadow-blue-950/60">
                <img
                  src={currentPhoto}
                  alt="Professional portrait of Hareesharraj"
                  referrerPolicy="no-referrer"
                  style={{
                    transform: `scale(${data.photoZoom || 1}) translateY(${data.photoOffsetY || 0}px)`,
                  }}
                  onLoad={() => setImageLoaded(true)}
                  onError={handleImageError}
                  className={`w-full h-full object-cover object-top transition-transform duration-300 ease-out ${
                    imageLoaded ? 'opacity-100' : 'opacity-90'
                  }`}
                />

                {/* Subtle bottom gradient scrim for contrast */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#050b18]/90 via-[#050b18]/40 to-transparent pointer-events-none" />

                {/* Name & status badge over image bottom */}
                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-blue-500/20 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white font-display tracking-wide">
                        {data.name}
                      </p>
                      <p className="text-[11px] text-blue-300 font-medium">
                        {data.department} · Age {data.age}
                      </p>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/60" title="Active & Open to Opportunities" />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
