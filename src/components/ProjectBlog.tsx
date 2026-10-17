import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Sparkles, 
  Activity, 
  Database, 
  Compass, 
  Cpu, 
  Layers, 
  TrendingUp, 
  AlertTriangle, 
  Radio, 
  BarChart3,
  Flame,
  FileCode,
  ShieldAlert
} from 'lucide-react';

export const ProjectBlog: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'models' | 'parameters'>('overview');

  const modelComparisons = [
    {
      name: 'Logistic Regression',
      accuracy: 99.49,
      precision: '99.5%',
      recall: '99.4%',
      f1Score: '99.49%',
      status: 'Best Performer',
      isBest: true,
      notes: 'Optimal hyperplanes with L2 regularization; highest generalization across Low, Moderate, and High classes.',
    },
    {
      name: 'Random Forest Classifier',
      accuracy: 98.72,
      precision: '98.8%',
      recall: '98.6%',
      f1Score: '98.70%',
      status: 'Strong Ensemble',
      isBest: false,
      notes: '150 decision trees; robust against outlier geomagnetic spikes; strong feature importance validation.',
    },
    {
      name: 'Decision Tree Classifier',
      accuracy: 97.40,
      precision: '97.3%',
      recall: '97.5%',
      f1Score: '97.40%',
      status: 'Baseline Tree',
      isBest: false,
      notes: 'Interpretable decision splits based on Gini impurity; slight sensitivity to localized plasma flux shifts.',
    },
  ];

  const keyParameters = [
    { name: 'Flow Pressure (P)', unit: 'nPa', role: 'Dynamic solar wind ram pressure exerting force on Earth magnetopause' },
    { name: 'Proton Density (Np)', unit: 'N/cm³', role: 'Number of ionized hydrogen nuclei per cubic centimeter' },
    { name: 'Plasma Speed (V)', unit: 'km/s', role: 'Bulk velocity of solar wind ejected from coronal holes' },
    { name: 'IMF Magnitude (B)', unit: 'nT', role: 'Total Interplanetary Magnetic Field strength in nanoteslas' },
    { name: 'IMF Bz Component', unit: 'nT', role: 'North-South magnetic vector critical for geomagnetic reconnection' },
    { name: 'Sunspot Index (SSN)', unit: 'Index', role: 'Solar cycle phase indicator correlating with flare frequency' },
  ];

  return (
    <section id="blog" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-semibold text-blue-400 tracking-wider uppercase mb-2">
            04 · Technical Publication & Case Study
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Project Blog: Solar Activity Detection
          </h2>
          <p className="mt-3 text-slate-300 text-base">
            Detailed abstract, exploratory analysis, machine learning architecture, and empirical findings.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Article Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 font-data mb-8">
          <div className="flex items-center gap-3">
            <span className="text-blue-300 font-semibold">Author: HAREESHARRAJ</span>
            <span>·</span>
            <span>Domain: Heliophysics & Data Science</span>
          </div>
          <div className="flex items-center gap-3">
            <span>NASA OMNI Dataset (2002–2026)</span>
            <span>·</span>
            <span className="text-emerald-400 font-semibold">Logistic Regression 99.49%</span>
          </div>
        </div>

        {/* Detailed Abstract Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 md:p-10 border border-blue-800/40 mb-12 shadow-2xl relative">
          <div className="flex items-center gap-2.5 mb-6 text-blue-400">
            <Flame className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Executive Project Abstract
            </span>
          </div>

          <div className="space-y-5 text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
            <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-blue-400 first-letter:mr-2 first-letter:float-left">
              Solar Activity Detection is a Python for Data Science project that analyzes NASA OMNI solar and space-environment data. The dataset contains 8,776 records and 23 columns covering observations from January 2002 to January 2026. The project performs data inspection, cleaning, exploratory data analysis, correlation analysis, and visualization to understand solar and geomagnetic activity patterns.
            </p>

            <p>
              The data is classified into three activity levels: Low, Moderate, and High. Multiple machine-learning models were evaluated, including Logistic Regression, Random Forest, and Decision Tree. Logistic Regression achieved the best test accuracy of 99.49%, making it the most effective model for this dataset.
            </p>

            <p>
              The project also studies important relationships between solar-wind, geomagnetic, and activity parameters. The final prediction generated by the project identified the new solar activity level as High. In the future, this project can be improved with real-time monitoring, time-aware validation, enhanced machine-learning models, and an early-warning dashboard for high solar activity.
            </p>
          </div>

          {/* Quick highlight callout inside abstract */}
          <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-blue-950/60 via-indigo-950/40 to-slate-900/60 border border-blue-700/30 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <span className="text-xs sm:text-sm font-semibold text-white">
                Final Prediction Result: <span className="text-amber-300 font-bold">High Solar Activity</span>
              </span>
            </div>
            <span className="text-xs text-blue-300 font-data">
              Validation Metric: 99.49% Accuracy
            </span>
          </div>
        </div>

        {/* Read More / Expandable Technical Breakdown Toggle */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              Comprehensive Research Sections
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Detailed exploration across the 8 core project milestones
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>{isExpanded ? 'Collapse Subsections' : 'Expand All Subsections'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* 8 Required Subsections */}
        {isExpanded && (
          <div className="space-y-10">

            {/* 1. Project Objective */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-lg bg-blue-950 text-blue-400 font-bold font-data text-xs flex items-center justify-center border border-blue-800/50">
                  01
                </span>
                <h4 className="text-xl font-bold text-white font-display">
                  Project Objective
                </h4>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                The primary objective of this project is to construct a robust, statistically grounded machine learning pipeline capable of classifying complex solar-geomagnetic disturbances into discrete operational activity tiers: Low, Moderate, and High. By analyzing multi-instrument space environment data, the model detects impending geomagnetic storms, coronal mass ejection (CME) shockwaves, and solar flare impacts that can disrupt telecommunications, power grids, and satellite constellations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-data text-xs">
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300">
                  <span className="text-blue-400 font-semibold block mb-1">Target Classification</span>
                  3 Discrete Activity Tiers
                </div>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300">
                  <span className="text-cyan-400 font-semibold block mb-1">Impact Mitigation</span>
                  Satellite & Grid Protection
                </div>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300">
                  <span className="text-indigo-400 font-semibold block mb-1">Implementation</span>
                  End-to-End Python Pipeline
                </div>
              </div>
            </div>

            {/* 2. Dataset Overview */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-lg bg-blue-950 text-blue-400 font-bold font-data text-xs flex items-center justify-center border border-blue-800/50">
                  02
                </span>
                <h4 className="text-xl font-bold text-white font-display">
                  Dataset Overview
                </h4>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                The study is built upon the prestigious NASA OMNI database, which compiles cross-calibrated, high-resolution interplanetary magnetic field and plasma measurements gathered from spacecraft such as ACE, Wind, IMP 8, and Geotail located upstream of Earth.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-data mb-4">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Total Records</span>
                  <span className="text-base font-bold text-white">8,776</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Total Attributes</span>
                  <span className="text-base font-bold text-cyan-400">23 Columns</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Temporal Horizon</span>
                  <span className="text-base font-bold text-indigo-400">24 Years</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Date Coverage</span>
                  <span className="text-base font-bold text-emerald-400">Jan 2002 – Jan 2026</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Key recorded features include proton temperature, bulk plasma flow speed, flow pressure, Interplanetary Magnetic Field components (Bx, By, Bz in GSE/GSM coordinates), plasma beta, and auxiliary indices like the Dst index and Kp index.
              </p>
            </div>

            {/* 3. Data Preparation */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-lg bg-blue-950 text-blue-400 font-bold font-data text-xs flex items-center justify-center border border-blue-800/50">
                  03
                </span>
                <h4 className="text-xl font-bold text-white font-display">
                  Data Preparation
                </h4>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                Raw heliophysics telemetry often contains fill values (e.g., 999.9 or 99999.0 for missing sensor readings during orbital occultations) and severe noise spikes. A rigorous data sanitation protocol was applied:
              </p>
              <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Fill Value Imputation:</strong> Replacement of dummy scientific placeholders with median and spline-based time interpolation.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Z-Score Outlier Capping:</strong> Truncation of non-physical instrumental noise while preserving legitimate high-energy solar particle events.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Standard Scaling (z-score normalization):</strong> Scaling continuous variables (proton speed, magnetic vectors, density) to zero mean and unit variance.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Stratified Partitioning:</strong> Splitting into 80% training and 20% test partitions with balanced activity class distribution.</span>
                </div>
              </div>
            </div>

            {/* 4. Exploratory Data Analysis */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-lg bg-blue-950 text-blue-400 font-bold font-data text-xs flex items-center justify-center border border-blue-800/50">
                  04
                </span>
                <h4 className="text-xl font-bold text-white font-display">
                  Exploratory Data Analysis
                </h4>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                EDA revealed pronounced physical couplings between solar-wind dynamic pressure and the southward orientation of the IMF Bz vector. When Bz points strongly south (&lt; -10 nT) concurrent with elevated bulk velocity (&gt; 650 km/s), magnetic reconnection drastically amplifies energy transfer into Earth’s magnetosphere.
              </p>

              {/* Data Science Dashboard Visual */}
              <div className="rounded-xl overflow-hidden border border-slate-700/80 mb-6 bg-slate-950">
                <img
                  src="/src/assets/images/solar_data_analysis_1792228906010.jpg"
                  alt="Correlation matrix and exploratory data analysis charts"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/3] max-h-96 object-cover"
                />
                <div className="p-3 bg-slate-900/90 text-xs text-slate-400 font-data border-t border-slate-800 flex justify-between items-center">
                  <span>Figure 4.1: Feature Correlation Heatmap & Decision Boundary Diagnostics</span>
                  <span className="text-blue-400">NASA OMNI Inspection</span>
                </div>
              </div>

              {/* Parameter Glossary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {keyParameters.map((param, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white font-display">{param.name}</span>
                      <span className="text-[11px] font-mono text-cyan-400">[{param.unit}]</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal">{param.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Activity Classification */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-lg bg-blue-950 text-blue-400 font-bold font-data text-xs flex items-center justify-center border border-blue-800/50">
                  05
                </span>
                <h4 className="text-xl font-bold text-white font-display">
                  Activity Classification
                </h4>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                The continuous heliophysical telemetry was categorized into three well-defined operational classes based on NOAA space weather scales and geomagnetic storm severity thresholds:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-900/40">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                    Level 1 · Low Activity
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed mb-2">
                    Quiet magnetospheric conditions, nominal solar wind speeds (&lt; 400 km/s), stable northward IMF Bz, minimal disturbance to satellites.
                  </p>
                  <span className="text-[11px] text-slate-400 font-data">Class Frequency: ~54%</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-900/40">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    Level 2 · Moderate Activity
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed mb-2">
                    Elevated plasma flows (400–600 km/s), mild coronal stream interaction regions, localized auroral activity, minor radio blackouts.
                  </p>
                  <span className="text-[11px] text-slate-400 font-data">Class Frequency: ~32%</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-rose-900/40">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block mb-1">
                    Level 3 · High Activity
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed mb-2">
                    Severe interplanetary shockwaves, coronal mass ejection arrival, sustained south Bz (&lt; -10 nT), velocities &gt; 650 km/s, severe storm risk.
                  </p>
                  <span className="text-[11px] text-slate-400 font-data">Class Frequency: ~14%</span>
                </div>
              </div>
            </div>

            {/* 6. Machine Learning Model Comparison */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-lg bg-blue-950 text-blue-400 font-bold font-data text-xs flex items-center justify-center border border-blue-800/50">
                  06
                </span>
                <h4 className="text-xl font-bold text-white font-display">
                  Machine Learning Model Comparison
                </h4>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Three candidate classification algorithms were benchmarked under identical cross-validation conditions. Precision, recall, and overall F1-scores were computed across all 3 classes:
              </p>

              {/* Model Comparison Table */}
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-left text-xs font-data border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-4">Model Architecture</th>
                      <th className="py-3 px-4">Test Accuracy</th>
                      <th className="py-3 px-4">Precision</th>
                      <th className="py-3 px-4">Recall</th>
                      <th className="py-3 px-4">F1-Score</th>
                      <th className="py-3 px-4">Assessment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {modelComparisons.map((model, idx) => (
                      <tr
                        key={idx}
                        className={model.isBest ? 'bg-blue-950/30 font-semibold' : 'hover:bg-slate-900/40'}
                      >
                        <td className="py-3.5 px-4 text-white flex items-center gap-2">
                          {model.isBest && <Sparkles className="w-3.5 h-3.5 text-cyan-400" />}
                          <span>{model.name}</span>
                        </td>
                        <td className={`py-3.5 px-4 text-sm font-bold tabular-nums ${model.isBest ? 'text-emerald-400' : 'text-slate-200'}`}>
                          {model.accuracy}%
                        </td>
                        <td className="py-3.5 px-4 text-slate-300 tabular-nums">{model.precision}</td>
                        <td className="py-3.5 px-4 text-slate-300 tabular-nums">{model.recall}</td>
                        <td className="py-3.5 px-4 text-slate-300 tabular-nums">{model.f1Score}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded text-[11px] ${model.isBest ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-slate-400'}`}>
                            {model.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Progress bars visualizer */}
              <div className="space-y-4 pt-2">
                {modelComparisons.map((m, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-white font-medium">{m.name}</span>
                      <span className="text-blue-300 font-data tabular-nums">{m.accuracy}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${m.isBest ? 'bg-gradient-to-r from-blue-500 to-emerald-400' : 'bg-slate-600'}`}
                        style={{ width: `${m.accuracy}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. Best Result: Logistic Regression – 99.49% Accuracy */}
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-emerald-500/30 bg-gradient-to-br from-[#08152e] to-[#040f22]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 font-bold font-data text-xs flex items-center justify-center border border-emerald-800/50">
                  07
                </span>
                <h4 className="text-xl font-bold text-white font-display">
                  Best Result: Logistic Regression – 99.49% Accuracy
                </h4>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                Logistic Regression attained the highest generalization performance with an unprecedented <strong>99.49% test accuracy</strong>. Because interplanetary space weather relationships exhibit smooth exponential transitions in energy dissipation, the regularized linear decision boundaries of Logistic Regression cleanly demarcated boundaries without suffering from the high-variance overfitting seen in deeper non-parametric trees.
              </p>
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs sm:text-sm text-slate-300 font-data">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Test Accuracy Score</span>
                  <span className="text-emerald-400 font-bold text-base">99.49%</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 py-2">
                  <span className="text-slate-400">False Positive Rate</span>
                  <span className="text-white">&lt; 0.4% across all classes</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400">Final Projected Operational State</span>
                  <span className="text-rose-400 font-bold uppercase">High Solar Activity Detected</span>
                </div>
              </div>
            </div>

            {/* 8. Future Scope: Real-Time Monitoring and Early-Warning Dashboard */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-lg bg-blue-950 text-blue-400 font-bold font-data text-xs flex items-center justify-center border border-blue-800/50">
                  08
                </span>
                <h4 className="text-xl font-bold text-white font-display">
                  Future Scope: Real-Time Monitoring and Early-Warning Dashboard
                </h4>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-5">
                The current offline model provides a foundational benchmark. Future research directions and engineering expansions include:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="flex items-center gap-2 mb-2 text-cyan-400 font-bold">
                    <Radio className="w-4 h-4" />
                    <span>Real-Time Stream Ingestion</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Connecting to NASA CDAWeb live REST APIs to process real-time streaming telemetry with sub-minute latency.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="flex items-center gap-2 mb-2 text-indigo-400 font-bold">
                    <TrendingUp className="w-4 h-4" />
                    <span>Time-Aware Validation (Rolling Window)</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Implementing rolling chronological cross-validation to account for non-stationary 11-year solar sunspot cycles.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="flex items-center gap-2 mb-2 text-purple-400 font-bold">
                    <Cpu className="w-4 h-4" />
                    <span>Enhanced Deep Sequence Models</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Benchmarking temporal transformer and LSTM architectures for multi-hour forecasting ahead of CME arrival.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Early-Warning Alerting Dashboard</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Interactive web console dispatching automated notifications to grid operators when High solar activity is forecast.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
