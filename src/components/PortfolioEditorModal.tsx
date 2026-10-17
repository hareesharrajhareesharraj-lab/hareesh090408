import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Camera, 
  RotateCcw, 
  Check, 
  User, 
  Sliders, 
  Rocket, 
  Image as ImageIcon,
  ZoomIn,
  MoveVertical,
  CheckCircle2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const PortfolioEditorModal: React.FC = () => {
  const {
    data,
    updateData,
    updateSkillProficiency,
    updatePhoto,
    resetAll,
    isEditorOpen,
    setIsEditorOpen,
    activeEditorTab,
    setActiveEditorTab,
  } = usePortfolio();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // Local form state for live editing
  const [formData, setFormData] = useState(data);

  // Sync when data changes or modal opens
  useEffect(() => {
    setFormData(data);
  }, [data, isEditorOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsEditorOpen(false);
    };
    if (isEditorOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isEditorOpen, setIsEditorOpen]);

  if (!isEditorOpen) return null;

  const handleFileProcess = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        updatePhoto(result, formData.photoZoom, formData.photoOffsetY);
        setFormData((prev) => ({ ...prev, photoUrl: result }));
        triggerToast();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const triggerToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleSaveAll = () => {
    updateData(formData);
    triggerToast();
    setTimeout(() => {
      setIsEditorOpen(false);
    }, 400);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset all edited content and photo back to initial portfolio defaults?')) {
      resetAll();
      setFormData(data);
      triggerToast();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#09142b] border border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0c1a38]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Portfolio Editor & Image Studio
              </h3>
              <p className="text-xs text-slate-400">
                Customize profile photo, personal information, skills, and project details live
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsEditorOpen(false)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-slate-800/80 bg-[#09142b] overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveEditorTab('photo')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeEditorTab === 'photo'
                ? 'bg-[#0f2147] text-blue-300 border-t-2 border-blue-500'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Profile Photo & Frame</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveEditorTab('profile')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeEditorTab === 'profile'
                ? 'bg-[#0f2147] text-blue-300 border-t-2 border-blue-500'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Personal Details</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveEditorTab('skills')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeEditorTab === 'skills'
                ? 'bg-[#0f2147] text-blue-300 border-t-2 border-blue-500'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Skills & Levels</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveEditorTab('project')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeEditorTab === 'project'
                ? 'bg-[#0f2147] text-blue-300 border-t-2 border-blue-500'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Rocket className="w-4 h-4" />
            <span>Project Stats</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* TAB 1: Photo & Image Upload */}
          {activeEditorTab === 'photo' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Left Column: Dropzone and controls */}
              <div className="md:col-span-7 space-y-5">
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                    Upload Your Portrait Photo
                  </h4>
                  <p className="text-xs text-slate-400">
                    Upload your real portrait (e.g. <code className="text-blue-300 font-mono">meeeeeeeee.jpeg</code>). It will immediately display in the hero section and persist across visits.
                  </p>
                </div>

                {/* Drag and Drop Zone */}
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${
                    dragActive
                      ? 'border-blue-400 bg-blue-600/20'
                      : 'border-slate-700 hover:border-blue-500/50 bg-slate-900/60'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileProcess(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                  />
                  <div className="w-12 h-12 rounded-xl bg-blue-950/70 border border-blue-700/40 text-blue-400 flex items-center justify-center mx-auto mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-white mb-1">
                    Click to browse or drag and drop image here
                  </p>
                  <p className="text-xs text-slate-400">
                    Supports JPG, PNG, WEBP (Recommended: vertical 3:4 portrait)
                  </p>
                </div>

                {/* Adjustments: Zoom and Position */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1.5 font-data">
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <ZoomIn className="w-3.5 h-3.5 text-blue-400" />
                        <span>Scale / Zoom</span>
                      </span>
                      <span className="text-blue-400 font-bold">{Math.round(formData.photoZoom * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.8"
                      max="2"
                      step="0.05"
                      value={formData.photoZoom}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setFormData((prev) => ({ ...prev, photoZoom: val }));
                        updateData({ photoZoom: val });
                      }}
                      className="w-full accent-blue-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-xs mb-1.5 font-data">
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <MoveVertical className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Vertical Position Alignment</span>
                      </span>
                      <span className="text-cyan-400 font-bold">{formData.photoOffsetY}px</span>
                    </div>
                    <input
                      type="range"
                      min="-80"
                      max="80"
                      step="5"
                      value={formData.photoOffsetY}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        setFormData((prev) => ({ ...prev, photoOffsetY: val }));
                        updateData({ photoOffsetY: val });
                      }}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Presets */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const defaultImg = '/src/assets/images/hareesharraj_real_portrait_1792229556333.jpg';
                      updatePhoto(defaultImg, 1, 0);
                      setFormData((prev) => ({ ...prev, photoUrl: defaultImg, photoZoom: 1, photoOffsetY: 0 }));
                      triggerToast();
                    }}
                    className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Photo Defaults</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Live Frame Preview */}
              <div className="md:col-span-5 flex flex-col items-center justify-center">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Live Hero Frame Preview
                </p>
                <div className="relative group">
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-400 rounded-3xl blur-xl opacity-75" />
                  <div className="relative w-48 sm:w-56 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-blue-400/40 bg-[#081226] shadow-2xl">
                    <img
                      src={formData.photoUrl}
                      alt="Portrait preview"
                      referrerPolicy="no-referrer"
                      style={{
                        transform: `scale(${formData.photoZoom}) translateY(${formData.photoOffsetY}px)`,
                      }}
                      className="w-full h-full object-cover object-top transition-transform duration-100"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#050b18]/90 to-transparent pointer-events-none" />
                    <div className="absolute bottom-2 left-2 right-2 p-2 rounded-lg bg-slate-900/80 backdrop-blur-sm border border-blue-500/20 text-center">
                      <p className="text-[11px] font-bold text-white truncate">{formData.name}</p>
                      <p className="text-[9px] text-blue-300 truncate">{formData.subheading}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Profile Details */}
          {activeEditorTab === 'profile' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Subheading / Professional Title
                  </label>
                  <input
                    type="text"
                    value={formData.subheading}
                    onChange={(e) => setFormData({ ...formData, subheading: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Department & Degree
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Age
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value, 10) || 19 })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Contact Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Career Goal
                  </label>
                  <input
                    type="text"
                    value={formData.careerGoal}
                    onChange={(e) => setFormData({ ...formData, careerGoal: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Hero Section Short Description
                  </label>
                  <textarea
                    rows={2}
                    value={formData.heroDescription}
                    onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none resize-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    About Section Introduction
                  </label>
                  <textarea
                    rows={3}
                    value={formData.aboutIntro}
                    onChange={(e) => setFormData({ ...formData, aboutIntro: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Skills Proficiencies */}
          {activeEditorTab === 'skills' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                  Adjust Skill Proficiency Levels
                </h4>
                <p className="text-xs text-slate-400">
                  Slide to adjust the percentage displayed across your technical cards in real-time.
                </p>
              </div>

              <div className="space-y-4">
                {formData.skills.map((skill) => (
                  <div key={skill.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-white text-sm font-display">{skill.name}</span>
                        <span className="text-slate-400 ml-2">({skill.level})</span>
                      </div>
                      <span className="text-blue-400 font-bold font-data text-sm tabular-nums">
                        {skill.proficiency}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={skill.proficiency}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        const updatedSkills = formData.skills.map((s) =>
                          s.id === skill.id ? { ...s, proficiency: val } : s
                        );
                        setFormData({ ...formData, skills: updatedSkills });
                        updateSkillProficiency(skill.id, val);
                      }}
                      className="w-full accent-blue-500 cursor-pointer"
                    />
                    <p className="text-[11px] text-slate-400 leading-normal">{skill.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Project Stats */}
          {activeEditorTab === 'project' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={formData.projectTitle}
                    onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Project Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.projectSubtitle}
                    onChange={(e) => setFormData({ ...formData, projectSubtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Records Analyzed
                  </label>
                  <input
                    type="text"
                    value={formData.projectRecords}
                    onChange={(e) => setFormData({ ...formData, projectRecords: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none font-data"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Best Model Test Accuracy
                  </label>
                  <input
                    type="text"
                    value={formData.projectAccuracy}
                    onChange={(e) => setFormData({ ...formData, projectAccuracy: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none font-data"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Data Period Covered
                  </label>
                  <input
                    type="text"
                    value={formData.projectDataPeriod}
                    onChange={(e) => setFormData({ ...formData, projectDataPeriod: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none font-data"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Final Activity Prediction
                  </label>
                  <select
                    value={formData.projectPrediction}
                    onChange={(e) => setFormData({ ...formData, projectPrediction: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none font-data"
                  >
                    <option value="Low">Low Activity</option>
                    <option value="Moderate">Moderate Activity</option>
                    <option value="High">High Activity</option>
                  </select>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-[#070e22]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="px-3.5 py-2 text-xs font-medium text-slate-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-lg transition-colors cursor-pointer"
            >
              Reset All Defaults
            </button>
            {saveToast && (
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>Changes saved!</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsEditorOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Apply & Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
