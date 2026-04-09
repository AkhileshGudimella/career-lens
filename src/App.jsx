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
    
    setTimeout(() => {
      // Determine categories based on skills
      const hasFrontend = skills.some(s => ['react', 'figma', 'js', 'git'].includes(s.id));
      const hasBackend = skills.some(s => ['nodejs', 'java', 'csharp', 'sql', 'python'].includes(s.id));
      const hasData = skills.some(s => ['python', 'ml', 'sql'].includes(s.id));
      const hasCloud = skills.some(s => ['aws', 'docker'].includes(s.id));

      let streams = [];
      let roles = [];
      let improvements = [];

      if (hasData && !hasFrontend) {
        streams = [
          { name: 'Data Science & ML', match: 94 },
          { name: 'Data Engineering', match: 88 },
          { name: 'Backend Engineering', match: 72 }
        ];
        roles = [
          { title: 'Machine Learning Engineer', readiness: 'High', gap: 'Advanced Deep Learning concepts' },
          { title: 'Data Scientist', readiness: 'High', gap: 'Business BI Tools' },
          { title: 'Data Analyst', readiness: 'Medium', gap: 'Advanced Statistics' }
        ];
        improvements = [
          { skill: 'Spark / Hadoop', reason: 'Essential for large scale data engineering.' },
          { skill: 'Deep Learning', reason: 'Required for advanced AI roles.' }
        ];
      } else if (hasFrontend && !hasBackend) {
        streams = [
          { name: 'Frontend Engineering', match: 95 },
          { name: 'UI/UX Design', match: 85 },
          { name: 'Full Stack Engineering', match: 60 }
        ];
        roles = [
          { title: 'Frontend Developer', readiness: 'High', gap: 'Complex State Management' },
          { title: 'UI Engineer', readiness: 'High', gap: 'Accessibility (a11y) standards' },
          { title: 'Web Designer', readiness: 'Medium', gap: 'Advanced animation libraries' }
        ];
        improvements = [
          { skill: 'TypeScript', reason: 'Modern standard for robust frontend applications.' },
          { skill: 'Next.js', reason: 'Industry standard for React-based static generation & SSR.' }
        ];
      } else if (hasBackend && !hasFrontend) {
        streams = [
          { name: 'Backend Engineering', match: 96 },
          { name: 'Cloud Architecture', match: 82 },
          { name: 'DevOps', match: 75 }
        ];
        roles = [
          { title: 'Backend Developer', readiness: 'High', gap: 'System Design Patterns' },
          { title: 'API Engineer', readiness: 'High', gap: 'GraphQL integration' },
          { title: 'Cloud Engineer', readiness: 'Medium', gap: 'Infrastructure as Code' }
        ];
        improvements = [
          { skill: 'Docker/Kubernetes', reason: 'Critical for deploying ML models and backend services.' },
          { skill: 'System Design', reason: 'Required for senior/architect roles in software engineering.' }
        ];
      } else if (hasCloud) {
        streams = [
          { name: 'DevOps & Cloud', match: 94 },
          { name: 'Backend Engineering', match: 85 },
          { name: 'SRE', match: 80 }
        ];
        roles = [
          { title: 'Cloud Architect', readiness: 'Medium', gap: 'Kubernetes orchestration' },
          { title: 'DevOps Engineer', readiness: 'High', gap: 'CI/CD pipeline mastery' },
          { title: 'Backend Developer', readiness: 'High', gap: 'Microservices design' }
        ];
        improvements = [
          { skill: 'Terraform', reason: 'Industry standard for Infrastructure as Code.' },
          { skill: 'Kubernetes', reason: 'Essential for container orchestration at scale.' }
        ];
      } else {
        // Fallback or Full Stack
        streams = [
          { name: 'Full Stack Engineering', match: 92 },
          { name: 'Software Engineering', match: 88 },
          { name: 'Product Engineering', match: 81 }
        ];
        roles = [
          { title: 'Full Stack Developer', readiness: 'High', gap: 'Advanced system scaling' },
          { title: 'Software Engineer', readiness: 'High', gap: 'Performance optimization' },
          { title: 'Tech Lead', readiness: 'Medium', gap: 'Team management & architecture' }
        ];
        improvements = [
          { skill: 'System Architecture', reason: 'Crucial for leading full-stack projects.' },
          { skill: 'CI/CD', reason: 'Automating deployment pipelines.' }
        ];
      }

      setResults({ skills, streams, roles, improvements });
      navigateTo('dashboard');
    }, 4000);
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
