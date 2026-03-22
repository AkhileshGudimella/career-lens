import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import SkillSelectionPage from './pages/SkillSelectionPage';
import ProcessingScreen from './pages/ProcessingScreen';
import DashboardPage from './pages/DashboardPage';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [results, setResults] = useState(null);

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const startAnalysis = (skills) => {
    setSelectedSkills(skills);
    navigateTo('processing');
    
    // Simulate AI processing
    setTimeout(() => {
      // Mock results generation based on skills
      const mockResults = {
        skills,
        streams: [
          { name: 'Data Science & ML', match: 94 },
          { name: 'Full Stack Engineering', match: 82 },
          { name: 'Cloud Architecture', match: 75 }
        ],
        roles: [
          { title: 'Machine Learning Engineer', readiness: 'High', gap: 'Advanced Deep Learning concepts' },
          { title: 'Data Scientist', readiness: 'High', gap: 'Business BI Tools' },
          { title: 'Backend Developer', readiness: 'Medium', gap: 'System Design Patterns' }
        ],
        improvements: [
          { skill: 'Docker/Kubernetes', reason: 'Critical for deploying ML models and backend services.' },
          { skill: 'System Design', reason: 'Required for senior/architect roles in software engineering.' }
        ]
      };
      setResults(mockResults);
      navigateTo('dashboard');
    }, 4000); // 4 second processing animation
  };

  return (
    <div className="app-container">
      {currentPage === 'landing' && <LandingPage onStart={() => navigateTo('skills')} />}
      {currentPage === 'skills' && <SkillSelectionPage onComplete={startAnalysis} />}
      {currentPage === 'processing' && <ProcessingScreen />}
      {currentPage === 'dashboard' && <DashboardPage results={results} onRestart={() => navigateTo('landing')} />}
    </div>
  );
}

export default App;
