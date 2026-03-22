import React, { useEffect, useState } from 'react';

const ProgressBar = ({ label, percentage, color = 'var(--primary)' }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Small delay to trigger animation after mount
    const timer = setTimeout(() => {
      setWidth(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="progress-container" style={{ marginBottom: '16px' }}>
      <div className="progress-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.875rem' }}>
        <span style={{ fontWeight: 500 }}>{label}</span>
        <span style={{ color: 'var(--text-muted)' }}>{percentage}%</span>
      </div>
      <div className="progress-track" style={{ height: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px', overflow: 'hidden' }}>
        <div 
          className="progress-fill" 
          style={{ 
            height: '100%', 
            width: `${width}%`, 
            background: color,
            borderRadius: '4px',
            transition: 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: `0 0 10px ${color}`
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
