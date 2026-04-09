import React, { useState } from 'react';
import SkillBadge from '../components/SkillBadge';
import { Search, ChevronRight, Brain, Upload } from 'lucide-react';
import './SkillSelectionPage.css';

const MOCK_SKILLS = [
  { id: 'python', name: 'Python', category: 'Language', icon: '🐍' },
  { id: 'js', name: 'JavaScript', category: 'Language', icon: '🟨' },
  { id: 'sql', name: 'SQL', category: 'Database', icon: '💾' },
  { id: 'react', name: 'React', category: 'Frontend', icon: '⚛️' },
  { id: 'ml', name: 'Machine Learning', category: 'AI/Data', icon: '🤖' },
  { id: 'docker', name: 'Docker', category: 'DevOps', icon: '🐳' },
  { id: 'aws', name: 'AWS', category: 'Cloud', icon: '☁️' },
  { id: 'java', name: 'Java', category: 'Language', icon: '☕' },
  { id: 'nodejs', name: 'Node.js', category: 'Backend', icon: '🟢' },
  { id: 'figma', name: 'Figma', category: 'Design', icon: '🎨' },
  { id: 'git', name: 'HTML/CSS', category: 'Frontend', icon: '🌐' },
  { id: 'csharp', name: 'C#', category: 'Language', icon: '🔷' },
];

const CATEGORIES = ['All', 'Language', 'Frontend', 'Backend', 'Database', 'AI/Data', 'DevOps', 'Cloud', 'Design'];

const SkillSelectionPage = ({ onComplete }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedSkills, setSelectedSkills] = useState({});
  const [isParsing, setIsParsing] = useState(false);

  const simulateResumeParsing = () => {
    setIsParsing(true);
    setTimeout(() => {
      const parsedMatches = {
        'python': { id: 'python', name: 'Python', category: 'Language', icon: '🐍', level: 2 },
        'react': { id: 'react', name: 'React', category: 'Frontend', icon: '⚛️', level: 3 },
        'sql': { id: 'sql', name: 'SQL', category: 'Database', icon: '💾', level: 2 },
        'aws': { id: 'aws', name: 'AWS', category: 'Cloud', icon: '☁️', level: 1 }
      };
      setSelectedSkills(prev => ({ ...prev, ...parsedMatches }));
      setIsParsing(false);
    }, 2000);
  };

  const handleSkillClick = (skill) => {
    setSelectedSkills(prev => {
      const next = { ...prev };
      if (next[skill.id]) {
        delete next[skill.id];
      } else {
        next[skill.id] = { ...skill, level: 1 };
      }
      return next;
    });
  };

  const handleLevelChange = (skillId, level) => {
    setSelectedSkills(prev => ({
      ...prev,
      [skillId]: { ...prev[skillId], level }
    }));
  };

  const filteredSkills = MOCK_SKILLS.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || skill.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedCount = Object.keys(selectedSkills).length;

  return (
    <div className="skills-page animate-slide-up">
      <div className="skills-header">
        <div className="header-top-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
          <div className="header-content">
            <div className="subtitle-badge">
              <Brain size={14} /> Step 1: Skill Profile
            </div>
            <h2>What are your core <span className="text-gradient">skills</span>?</h2>
            <p className="text-muted">Select the technologies you know and set your proficiency level.</p>
          </div>
          
          <button 
            className="btn-outline upload-btn" 
            onClick={simulateResumeParsing}
            disabled={isParsing}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.1)', borderColor: 'var(--primary)', color: 'white' }}
          >
            {isParsing ? (
               <><span style={{ animation: 'spin 1s linear infinite' }}>🔄</span> Parsing PDF...</>
            ) : (
              <><Upload size={18} className="text-secondary" /> Auto-fill from Resume</>
            )}
          </button>
        </div>
        
        <div className="search-bar">
          <Search className="search-icon text-muted" size={20} />
          <input 
            type="text" 
            placeholder="Search skills (e.g., Python, React)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="categories-scroll">
        {CATEGORIES.map(category => (
          <button 
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="skills-grid">
        {filteredSkills.map(skill => (
          <SkillBadge 
            key={skill.id}
            skill={skill}
            selected={!!selectedSkills[skill.id]}
            level={selectedSkills[skill.id]?.level}
            onClick={handleSkillClick}
            onLevelChange={handleLevelChange}
          />
        ))}
        {filteredSkills.length === 0 && (
          <div className="no-results text-muted">No skills found matching your search.</div>
        )}
      </div>

      <div className={`action-footer ${selectedCount > 0 ? 'visible' : ''}`}>
        <div className="selected-info">
          <span className="count-badge">{selectedCount}</span>
          <span>skills selected</span>
        </div>
        <button 
          className="btn-primary"
          onClick={() => onComplete(Object.values(selectedSkills))}
          disabled={selectedCount === 0}
        >
          Analyze Profile <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default SkillSelectionPage;
