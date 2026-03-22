import React from 'react';
import './components.css';

const SkillBadge = ({ skill, selected, level, onClick, onLevelChange }) => {
  return (
    <div 
      className={`skill-badge ${selected ? 'selected' : ''}`}
      onClick={() => onClick(skill)}
    >
      <div className="skill-content">
        <span className="skill-icon">{skill.icon || '⚡'}</span>
        <span className="skill-name">{skill.name}</span>
      </div>
      
      {selected && onLevelChange && (
        <div className="skill-level-control" onClick={e => e.stopPropagation()}>
          <div className="slider-container">
            <input 
              type="range" 
              min="1" max="3" step="1"
              value={level || 1} 
              onChange={(e) => onLevelChange(skill.id, parseInt(e.target.value))}
              className="level-slider"
            />
            <div className="level-ticks">
              <span></span><span></span><span></span>
            </div>
          </div>
          <div className="level-labels">
            <span className={level === 1 ? 'active text-muted' : 'text-muted'}>Novice</span>
            <span className={level === 2 ? 'active text-primary' : 'text-muted'}>Inter.</span>
            <span className={level === 3 ? 'active text-success' : 'text-muted'}>Pro</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillBadge;
