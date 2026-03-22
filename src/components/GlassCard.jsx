import React from 'react';

const GlassCard = ({ children, className = '', hoverEffect = true, ...props }) => {
  return (
    <div 
      className={`glass-card ${hoverEffect ? 'hoverable' : ''} ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
