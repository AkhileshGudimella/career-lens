import React, { useEffect, useState } from 'react';
import './ProcessingScreen.css';

const ProcessingScreen = () => {
  const [loadingText, setLoadingText] = useState('Analyzing skill matrix...');

  useEffect(() => {
    const texts = [
      'Analyzing skill matrix...',
      'Matching industry requirements...',
      'Finding optimal career paths...',
      'Generating personalized insights...'
    ];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < texts.length) {
        setLoadingText(texts[i]);
      }
    }, 900);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="processing-container">
      <div className="ai-core">
        <div className="pulse-ring ring-1"></div>
        <div className="pulse-ring ring-2"></div>
        <div className="pulse-ring ring-3"></div>
        <div className="core-orb"></div>
      </div>
      <h2 className="loading-text text-gradient">{loadingText}</h2>
    </div>
  );
};

export default ProcessingScreen;
