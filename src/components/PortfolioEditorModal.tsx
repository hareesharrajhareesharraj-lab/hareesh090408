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
import { usePortfolio, type SkillLevel } from '../context/PortfolioContext';

export const PortfolioEditorModal: React.FC = () => {
  const {
    data,
    updateData,
    updateSkillLevel,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0F172A]/40 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white border border-[#0EA5C6]/30 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col text-[#1E293B]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#DCE7F2] bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0EA5C6]/10 border border-[#0EA5C6]/40 flex items-center justify-center text-[#0EA5C6]">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A] font-display">
                Portfolio Editor & Image Studio
              </h3>
              <p className="text-xs text-[#64748B]">
                Customize profile photo, personal information, skills, and project details live
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsEditorOpen(false)}
            className="p-2 text-[#64748B] hover:text-[#0284C7] hover:bg-[#EEF6FF] rounded-lg transition-colors cursor-pointer"
            aria-label="Close editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-[#DCE7F2] bg-white overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveEditorTab('photo')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeEditorTab === 'photo'
                ? 'bg-[#EEF6FF] text-[#0284C7] border-t-2 border-[#0EA5C6]'
                : 'text-[#64748B] hover:text-[#0284C7]'
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
                ? 'bg-[#EEF6FF] text-[#0284C7] border-t-2 border-[#0EA5C6]'
                : 'text-[#64748B] hover:text-[#0284C7]'
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
                ? 'bg-[#EEF6FF] text-[#0284C7] border-t-2 border-[#0EA5C6]'
                : 'text-[#64748B] hover:text-[#0284C7]'
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
                ? 'bg-[#EEF6FF] text-[#0284C7] border-t-2 border-[#0EA5C6]'
                : 'text-[#64748B] hover:text-[#0284C7]'
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
                  <h4 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider mb-1">
                    Upload Your Portrait Photo
                  </h4>
                  <p className="text-xs text-[#64748B]">
                    Upload your real portrait (e.g. <code className="text-[#0284C7] font-mono">meeeeeeeee.jpeg</code>). It will immediately display in the hero section and persist across visits.
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
                      ? 'border-[#0EA5C6] bg-[#0EA5C6]/10'
                      : 'border-[#DCE7F2] hover:border-[#0EA5C6]/50 bg-white/60'
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
                  <div className="w-12 h-12 rounded-xl bg-[#0EA5C6]/10 border border-[#DCE7F2] text-[#0EA5C6] flex items-center justify-center mx-auto mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-[#0F172A] mb-1">
                    Click to browse or drag and drop image here
                  </p>
                  <p className="text-xs text-[#64748B]">
                    Supports JPG, PNG, WEBP (Recommended: vertical 3:4 portrait)
                  </p>
                </div>

                {/* Adjustments: Zoom and Position */}
                <div className="p-4 rounded-xl bg-white/80 border border-[#DCE7F2] space-y-4">
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1.5 font-data">
                      <span className="flex items-center gap-1.5 text-[#475569]">
                        <ZoomIn className="w-3.5 h-3.5 text-[#0EA5C6]" />
                        <span>Scale / Zoom</span>
                      </span>
                      <span className="text-[#0EA5C6] font-bold">{Math.round(formData.photoZoom * 100)}%</span>
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
                      className="w-full accent-[#0EA5C6] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-xs mb-1.5 font-data">
                      <span className="flex items-center gap-1.5 text-[#475569]">
                        <MoveVertical className="w-3.5 h-3.5 text-[#14B8A6]" />
                        <span>Vertical Position Alignment</span>
                      </span>
                      <span className="text-[#14B8A6] font-bold">{formData.photoOffsetY}px</span>
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
                    className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#EEF6FF] hover:bg-[#DCE7F2] text-[#475569] hover:text-[#0284C7] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Photo Defaults</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Live Frame Preview */}
              <div className="md:col-span-5 flex flex-col items-center justify-center">
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">
                  Live Hero Frame Preview
                </p>
                <div className="relative group">
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-[#0EA5C6] via-[#0EA5C6] to-[#14B8A6] rounded-3xl blur-xl opacity-75" />
                  <div className="relative w-48 sm:w-56 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-[#0EA5C6]/40 bg-white shadow-2xl">
                    <img
                      src={formData.photoUrl}
                      alt="Portrait preview"
                      referrerPolicy="no-referrer"
                      style={{
                        transform: `scale(${formData.photoZoom}) translateY(${formData.photoOffsetY}px)`,
                      }}
                      className="w-full h-full object-cover object-top transition-transform duration-100"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#F8FAFC]/90 to-transparent pointer-events-none" />
                    <div className="absolute bottom-2 left-2 right-2 p-2 rounded-lg bg-white/80 backdrop-blur-sm border border-[#0EA5C6]/20 text-center">
                      <p className="text-[11px] font-bold text-[#0F172A] truncate">{formData.name}</p>
                      <p className="text-[9px] text-[#0284C7] truncate">{formData.subheading}</p>
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
                  <label className="block text-xs font-semibold text-[#475569] uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#DCE7F2] text-[#0F172A] text-sm focus:border-[#0EA5C6] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#475569] uppercase tracking-wider mb-1.5">
                    Subheading / Professional Title
                  </label>
                  <input
                    type="text"
                    value={formData.subheading}
                    onChange={(e) => setFormData({ ...formData, subheading: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#DCE7F2] text-[#0F172A] text-sm focus:border-[#0EA5C6] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#475569] uppercase tracking-wider mb-1.5">
                    Department & Degree
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#DCE7F2] text-[#0F172A] text-sm focus:border-[#0EA5C6] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#475569] uppercase tracking-wider mb-1.5">
                    Availability
                  </label>
                  <input
                    type="text"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#DCE7F2] text-[#0F172A] text-sm focus:border-[#0EA5C6] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#475569] uppercase tracking-wider mb-1.5">
                    Contact Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#DCE7F2] text-[#0F172A] text-sm focus:border-[#0EA5C6] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#475569] uppercase tracking-wider mb-1.5">
                    Career Goal
                  </label>
                  <input
                    type="text"
                    value={formData.careerGoal}
                    onChange={(e) => setFormData({ ...formData, careerGoal: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#DCE7F2] text-[#0F172A] text-sm focus:border-[#0EA5C6] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#475569] uppercase tracking-wider mb-1.5">
                    Hero Section Short Description
                  </label>
                  <textarea
                    rows={2}
                    value={formData.heroDescription}
                    onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#DCE7F2] text-[#0F172A] text-sm focus:border-[#0EA5C6] focus:outline-none resize-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#475569] uppercase tracking-wider mb-1.5">
                    About Section Introduction
                  </label>
                  <textarea
                    rows={3}
                    value={formData.aboutIntro}
                    onChange={(e) => setFormData({ ...formData, aboutIntro: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#DCE7F2] text-[#0F172A] text-sm focus:border-[#0EA5C6] focus:outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Skills Proficiencies */}
          {activeEditorTab === 'skills' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider mb-1">
                  Adjust Skill Levels
                </h4>
                <p className="text-xs text-[#64748B]">
                  Choose the level label shown on each skill card.
                </p>
              </div>

              <div className="space-y-4">
                {formData.skills.map((skill) => (
                  <div key={skill.id} className="p-4 rounded-xl bg-white/80 border border-[#DCE7F2] space-y-2">
                    <div className="flex justify-between items-center gap-3 text-xs">
                      <span className="font-bold text-[#0F172A] text-sm font-display">{skill.name}</span>
                      <select
                        aria-label={`${skill.name} level`}
                        value={skill.level}
                        onChange={(e) => {
                          const level = e.target.value as SkillLevel;
                          const updatedSkills = formData.skills.map((s) =>
                            s.id === skill.id ? { ...s, level } : s
                          );
                          setFormData({ ...formData, skills: updatedSkills });
                          updateSkillLevel(skill.id, level);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-white border border-[#DCE7F2] text-[#0F172A] text-xs font-semibold"
                      >
                        <option value="Advanced">Advanced</option>
                        <option value="Proficient">Proficient</option>
                        <option value="Familiar">Familiar</option>
                      </select>
                    </div>
                    <p className="text-[11px] text-[#64748B] leading-normal">{skill.description}</p>
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
                  <label className="block text-xs font-semibold text-[#475569] uppercase tracking-wider mb-1.5">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={formData.projectTitle}
                    onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#DCE7F2] text-[#0F172A] text-sm focus:border-[#0EA5C6] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#475569] uppercase tracking-wider mb-1.5">
                    Project Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.projectSubtitle}
                    onChange={(e) => setFormData({ ...formData, projectSubtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#DCE7F2] text-[#0F172A] text-sm focus:border-[#0EA5C6] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#475569] uppercase tracking-wider mb-1.5">
                    Records Analyzed
                  </label>
                  <input
                    type="text"
                    value={formData.projectRecords}
                    onChange={(e) => setFormData({ ...formData, projectRecords: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#DCE7F2] text-[#0F172A] text-sm focus:border-[#0EA5C6] focus:outline-none font-data"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#475569] uppercase tracking-wider mb-1.5">
                    Best Model Test Accuracy
                  </label>
                  <input
                    type="text"
                    value={formData.projectAccuracy}
                    onChange={(e) => setFormData({ ...formData, projectAccuracy: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#DCE7F2] text-[#0F172A] text-sm focus:border-[#0EA5C6] focus:outline-none font-data"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#475569] uppercase tracking-wider mb-1.5">
                    Data Period Covered
                  </label>
                  <input
                    type="text"
                    value={formData.projectDataPeriod}
                    onChange={(e) => setFormData({ ...formData, projectDataPeriod: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#DCE7F2] text-[#0F172A] text-sm focus:border-[#0EA5C6] focus:outline-none font-data"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#475569] uppercase tracking-wider mb-1.5">
                    Final Activity Prediction
                  </label>
                  <select
                    value={formData.projectPrediction}
                    onChange={(e) => setFormData({ ...formData, projectPrediction: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#DCE7F2] text-[#0F172A] text-sm focus:border-[#0EA5C6] focus:outline-none font-data"
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
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#DCE7F2] bg-white">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="px-3.5 py-2 text-xs font-medium text-[#64748B] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            >
              Reset All Defaults
            </button>
            {saveToast && (
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>Changes saved!</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsEditorOpen(false)}
              className="px-4 py-2 text-xs font-medium text-[#64748B] hover:text-[#0284C7] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              className="btn-primary px-5 py-2 text-xs font-semibold text-white bg-[#0EA5C6] hover:bg-[#0284C7] rounded-lg shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
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
