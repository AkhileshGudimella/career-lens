import React, { useEffect, useState } from 'react';

const RadialChart = ({ percentage, size = 120, strokeWidth = 10, color = "var(--primary)" }) => {
  const [offset, setOffset] = useState(0);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    // Delay animation start slightly
    setTimeout(() => {
      const progressOffset = circumference - (percentage / 100) * circumference;
      setOffset(progressOffset);
    }, 100);
  }, [percentage, circumference]);

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset || circumference}
          style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
          strokeLinecap="round"
        />
      </svg>
      <div style={{ position: 'absolute', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '1.25rem' }}>
        {percentage}%
      </div>
    </div>
  );
};

export default RadialChart;
