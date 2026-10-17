import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SkillItem {
  id: string;
  name: string;
  category: 'programming' | 'productivity';
  level: string;
  proficiency: number;
  description: string;
  highlights: string[];
  tag: string;
}

export interface PortfolioData {
  name: string;
  subheading: string;
  department: string;
  age: number;
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
    category: 'programming',
    level: 'Advanced',
    proficiency: 95,
    description: 'Core language for machine learning, data engineering, statistical modeling, and algorithmic problem solving.',
    highlights: [
      'NumPy, Pandas & Data Manipulation',
      'Scikit-Learn Machine Learning Models',
      'Data Cleaning & Feature Engineering',
      'Scientific Data Visualization (Matplotlib & Seaborn)',
    ],
    tag: 'Primary Specialization',
  },
  {
    id: 'machine_learning',
    name: 'Machine Learning',
    category: 'programming',
    level: 'Advanced',
    proficiency: 94,
    description: 'Supervised and unsupervised learning, classification models, predictive analytics, and statistical validation.',
    highlights: [
      'Scikit-Learn Predictive Pipelines',
      'Logistic Regression, Random Forest & Decision Trees',
      'Cross-Validation, Metrics & Confusion Matrices',
      'Feature Engineering & Dimensionality Reduction',
    ],
    tag: 'AI & Data Science',
  },
  {
    id: 'java',
    name: 'Java',
    category: 'programming',
    level: 'Proficient',
    proficiency: 88,
    description: 'Robust object-oriented programming for scalable software architecture, data structures, and enterprise logic.',
    highlights: [
      'Object-Oriented Design & Encapsulation',
      'Data Structures & Algorithm Implementations',
      'Collections Framework & Memory Model',
      'Modular & Maintainable Code Standards',
    ],
    tag: 'Core Engineering',
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'programming',
    level: 'Proficient',
    proficiency: 85,
    description: 'High-performance computing, systems programming, and computational efficiency for performance-critical applications.',
    highlights: [
      'Standard Template Library (STL)',
      'Low-Level Memory Optimization & Pointers',
      'Algorithmic Complexity & Speed Optimization',
      'Computationally Intensive Math Routines',
    ],
    tag: 'High Performance',
  },
  {
    id: 'm365',
    name: 'Microsoft 365',
    category: 'productivity',
    level: 'Advanced',
    proficiency: 92,
    description: 'Comprehensive enterprise cloud productivity suite for document authoring, communication, and organizational collaboration.',
    highlights: [
      'Cloud Document Co-authoring & Version History',
      'Microsoft Teams & Real-Time Collaboration',
      'Cross-App Integration (Word, Excel, Outlook)',
      'Enterprise Workplace Workflows & Productivity',
    ],
    tag: 'Cloud Productivity',
  },
  {
    id: 'sharepoint',
    name: 'SharePoint',
    category: 'productivity',
    level: 'Proficient',
    proficiency: 88,
    description: 'Enterprise content and intranet platform for team sites, structured document libraries, metadata management, and permissions.',
    highlights: [
      'Team Sites & Intranet Portal Management',
      'Document Libraries & Custom Metadata Views',
      'Lists, Form Automation & Workflow Linking',
      'Granular Access Control & Permission Governance',
    ],
    tag: 'Content & Intranet',
  },
  {
    id: 'excel',
    name: 'Microsoft Excel',
    category: 'productivity',
    level: 'Advanced',
    proficiency: 92,
    description: 'Analytical data management, structured exploratory inspection, statistical formulas, and business intelligence.',
    highlights: [
      'Advanced Lookup & Dynamic Formulas (XLOOKUP, INDEX/MATCH)',
      'Pivot Tables & Multi-Dimensional Slicers',
      'Data Validation & Structured Cleansing',
      'Executive Reporting & Trend Charting',
    ],
    tag: 'Data Analysis',
  },
  {
    id: 'powerpoint',
    name: 'Microsoft PowerPoint',
    category: 'productivity',
    level: 'Advanced',
    proficiency: 90,
    description: 'Professional visual storytelling, architecture schematics, scientific research decks, and executive demonstrations.',
    highlights: [
      'Technical Architecture & Flowchart Diagrams',
      'Research Findings & Data Storytelling',
      'Structured Slide Layouts & Typography',
      'Polished Executive Presentations',
    ],
    tag: 'Communication & Delivery',
  },
];

export const initialPortfolioData: PortfolioData = {
  name: 'HAREESHARRAJ',
  subheading: 'Aspiring AI & Data Science Professional',
  department: 'B.Tech – Artificial Intelligence & Data Science',
  age: 19,
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
  updateSkillProficiency: (id: string, newProficiency: number) => void;
  updatePhoto: (photoUrl: string, zoom?: number, offsetY?: number) => void;
  resetAll: () => void;
  isEditorOpen: boolean;
  setIsEditorOpen: (open: boolean) => void;
  activeEditorTab: 'photo' | 'profile' | 'skills' | 'project';
  setActiveEditorTab: (tab: 'photo' | 'profile' | 'skills' | 'project') => void;
  openEditorWithTab: (tab: 'photo' | 'profile' | 'skills' | 'project') => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const STORAGE_KEY = 'hareesharraj_portfolio_data_v3';

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('hareesharraj_portfolio_data_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge skills to ensure newly added skills (Machine Learning, Microsoft 365, SharePoint) are present
        const savedSkills: SkillItem[] = parsed.skills || [];
        const mergedSkills = [...defaultSkills];
        savedSkills.forEach((s) => {
          const idx = mergedSkills.findIndex((m) => m.id === s.id);
          if (idx >= 0) {
            mergedSkills[idx] = { ...mergedSkills[idx], proficiency: s.proficiency };
          }
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

  const updateSkillProficiency = (id: string, newProficiency: number) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, proficiency: newProficiency } : s)),
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
        updateSkillProficiency,
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
