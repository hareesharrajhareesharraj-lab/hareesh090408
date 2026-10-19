import React, { createContext, useContext, useState, useEffect } from 'react';

export type SkillLevel = 'Advanced' | 'Proficient' | 'Familiar';
export type SkillGroup = 'ai_data' | 'dev_tools';

export interface SkillItem {
  id: string;
  name: string;
  group: SkillGroup;
  level: SkillLevel;
  description: string;
  highlights: string[];
  tag: string;
}

export interface PortfolioData {
  name: string;
  subheading: string;
  department: string;
  availability: string;
  careerGoal: string;
  email: string;
  heroDescription: string;
  aboutIntro: string;
  photoUrl: string;
  photoZoom: number;
  photoOffsetY: number;
  projectTitle: string;
  projectSubtitle: string;
  projectRecords: string;
  projectColumns: string;
  projectDataPeriod: string;
  projectAccuracy: string;
  projectClasses: string;
  projectPrediction: string;
  skills: SkillItem[];
}

const defaultSkills: SkillItem[] = [
  {
    id: 'python',
    name: 'Python Programming',
    group: 'ai_data',
    level: 'Advanced',
    description: 'Core language for ML, data analysis, and problem solving.',
    highlights: ['NumPy & Pandas', 'Scikit-learn models', 'Data cleaning & feature engineering'],
    tag: 'Primary Specialization',
  },
  {
    id: 'machine_learning',
    name: 'Machine Learning',
    group: 'ai_data',
    level: 'Advanced',
    description: 'Supervised classification, predictive analytics, and model validation.',
    highlights: ['Logistic Regression, Random Forest, Decision Trees', 'Cross-validation & confusion matrices', 'Feature selection'],
    tag: 'AI & Data Science',
  },
  {
    id: 'data_visualization',
    name: 'Data Visualization',
    group: 'ai_data',
    level: 'Proficient',
    description: 'Turning datasets into clear, decision-ready charts.',
    highlights: ['Matplotlib & Seaborn', 'Exploratory data analysis', 'Trend & distribution plots'],
    tag: 'Insight & Storytelling',
  },
  {
    id: 'excel',
    name: 'Microsoft Excel',
    group: 'ai_data',
    level: 'Advanced',
    description: 'Structured data analysis, formulas, and reporting.',
    highlights: ['XLOOKUP & INDEX/MATCH', 'Pivot tables & slicers', 'Data validation & cleansing'],
    tag: 'Data Analysis',
  },
  {
    id: 'java',
    name: 'Java',
    group: 'dev_tools',
    level: 'Proficient',
    description: 'Object-oriented programming and data structures.',
    highlights: ['OOP design & encapsulation', 'Collections framework', 'Algorithm implementation'],
    tag: 'Core Engineering',
  },
  {
    id: 'cpp',
    name: 'C++',
    group: 'dev_tools',
    level: 'Proficient',
    description: 'Performance-focused programming and algorithms.',
    highlights: ['Standard Template Library', 'Pointers & memory', 'Complexity optimization'],
    tag: 'High Performance',
  },
  {
    id: 'm365',
    name: 'Microsoft 365',
    group: 'dev_tools',
    level: 'Advanced',
    description: 'Cloud productivity and team collaboration.',
    highlights: ['Co-authoring & version history', 'Microsoft Teams', 'Word, Excel & Outlook integration'],
    tag: 'Cloud Productivity',
  },
  {
    id: 'sharepoint',
    name: 'SharePoint',
    group: 'dev_tools',
    level: 'Proficient',
    description: 'Team sites, document libraries, and permissions.',
    highlights: ['Team sites & intranet pages', 'Libraries & metadata views', 'Access control'],
    tag: 'Content & Intranet',
  },
  {
    id: 'powerpoint',
    name: 'Microsoft PowerPoint',
    group: 'dev_tools',
    level: 'Advanced',
    description: 'Clear technical and research presentations.',
    highlights: ['Architecture & flow diagrams', 'Data storytelling', 'Structured slide layouts'],
    tag: 'Communication & Delivery',
  },
];

export const initialPortfolioData: PortfolioData = {
  name: 'HAREESHARRAJ',
  subheading: 'Aspiring AI & Data Science Professional',
  department: 'B.Tech – Artificial Intelligence & Data Science',
  availability: 'Open to internships, collaborative projects, and learning opportunities.',
  careerGoal: 'To become a skilled, respected, successful, and proud professional.',
  email: 'hareesharrajhareesharraj@gmail.com',
  heroDescription: 'A motivated B.Tech student passionate about programming, data science, machine learning, and building impactful technology solutions.',
  aboutIntro: '“HAREESHARRAJ is a B.Tech Artificial Intelligence and Data Science student with a strong interest in programming, data analysis, and machine learning. He is committed to continuous learning and aims to become a skilled, respected, and proud technology professional.”',
  photoUrl: '/src/assets/images/hareesharraj_real_portrait_1792229556333.jpg',
  photoZoom: 1,
  photoOffsetY: 0,
  projectTitle: 'solar activity detection',
  projectSubtitle: 'Python for Data Science and Machine Learning Project',
  projectRecords: '8,776',
  projectColumns: '23',
  projectDataPeriod: 'January 2002 – January 2026',
  projectAccuracy: '99.49%',
  projectClasses: 'Low, Moderate, High',
  projectPrediction: 'High',
  skills: defaultSkills,
};

interface PortfolioContextType {
  data: PortfolioData;
  updateData: (newData: Partial<PortfolioData>) => void;
  updateSkillLevel: (id: string, level: SkillLevel) => void;
  updatePhoto: (photoUrl: string, zoom?: number, offsetY?: number) => void;
  resetAll: () => void;
  isEditorOpen: boolean;
  setIsEditorOpen: (open: boolean) => void;
  activeEditorTab: 'photo' | 'profile' | 'skills' | 'project';
  setActiveEditorTab: (tab: 'photo' | 'profile' | 'skills' | 'project') => void;
  openEditorWithTab: (tab: 'photo' | 'profile' | 'skills' | 'project') => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const STORAGE_KEY = 'hareesharraj_portfolio_data_v4';

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const savedSkills: SkillItem[] = parsed.skills || [];
        const mergedSkills = defaultSkills.map((skill) => {
          const match = savedSkills.find((s) => s.id === skill.id);
          return match?.level ? { ...skill, level: match.level } : skill;
        });
        return { ...initialPortfolioData, ...parsed, skills: mergedSkills };
      }
    } catch {
      // fallback
    }
    return initialPortfolioData;
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState<'photo' | 'profile' | 'skills' | 'project'>('photo');

  // Save to localStorage when data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.warn('Could not save to localStorage', err);
    }
  }, [data]);

  const updateData = (newData: Partial<PortfolioData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const updateSkillLevel = (id: string, level: SkillLevel) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, level } : s)),
    }));
  };

  const updatePhoto = (photoUrl: string, zoom = 1, offsetY = 0) => {
    setData((prev) => ({ ...prev, photoUrl, photoZoom: zoom, photoOffsetY: offsetY }));
  };

  const resetAll = () => {
    setData(initialPortfolioData);
    localStorage.removeItem(STORAGE_KEY);
  };

  const openEditorWithTab = (tab: 'photo' | 'profile' | 'skills' | 'project') => {
    setActiveEditorTab(tab);
    setIsEditorOpen(true);
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateData,
        updateSkillLevel,
        updatePhoto,
        resetAll,
        isEditorOpen,
        setIsEditorOpen,
        activeEditorTab,
        setActiveEditorTab,
        openEditorWithTab,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
