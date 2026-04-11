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
      // Dynamic scoring system
      const scores = {
        'Data Science & ML': { score: 0, roles: [{ title: 'Machine Learning Engineer', gap: 'Advanced Deep Learning concepts' }, { title: 'Data Scientist', gap: 'Business BI Tools' }, { title: 'Data Analyst', gap: 'Advanced Statistics' }], improvements: [{ skill: 'Deep Learning', reason: 'Required for advanced AI roles.' }, { skill: 'Spark / Hadoop', reason: 'Essential for large scale data engineering.' }] },
        'Frontend Engineering': { score: 0, roles: [{ title: 'Frontend Developer', gap: 'Complex State Management' }, { title: 'UI Engineer', gap: 'Accessibility (a11y) standards' }], improvements: [{ skill: 'TypeScript', reason: 'Modern standard for robust frontend applications.' }, { skill: 'Next.js', reason: 'Industry standard for SSR.' }] },
        'Backend Engineering': { score: 0, roles: [{ title: 'Backend Developer', gap: 'System Design Patterns' }, { title: 'API Engineer', gap: 'GraphQL integration' }], improvements: [{ skill: 'System Design', reason: 'Required for senior/architect roles.' }, { skill: 'Microservices', reason: 'Crucial for scalable backend architectures.' }] },
        'DevOps & Cloud': { score: 0, roles: [{ title: 'Cloud Architect', gap: 'Kubernetes orchestration' }, { title: 'DevOps Engineer', gap: 'CI/CD pipeline mastery' }], improvements: [{ skill: 'Terraform', reason: 'Industry standard for Infrastructure as Code.' }, { skill: 'Kubernetes', reason: 'Essential for container orchestration.' }] },
        'UI/UX Design': { score: 0, roles: [{ title: 'Product Designer', gap: 'User Research methodologies' }, { title: 'UX Engineer', gap: 'Prototyping tools' }], improvements: [{ skill: 'Framer', reason: 'High-fidelity interactive prototyping.' }, { skill: 'User Testing', reason: 'Validating design decisions.' }] },
        'Full Stack Engineering': { score: 0, roles: [{ title: 'Full Stack Developer', gap: 'Advanced system scaling' }, { title: 'Product Engineer', gap: 'End-to-end performance optimization' }], improvements: [{ skill: 'System Architecture', reason: 'Crucial for leading full-stack projects.' }, { skill: 'CI/CD', reason: 'Automating deployment pipelines.' }] }
      };

      const skillIds = skills.map(s => s.id);
      
      // Calculate scores based on weights
      if (skillIds.includes('python')) { scores['Data Science & ML'].score += 30; scores['Backend Engineering'].score += 15; }
      if (skillIds.includes('ml')) { scores['Data Science & ML'].score += 45; }
      if (skillIds.includes('sql')) { scores['Data Science & ML'].score += 20; scores['Backend Engineering'].score += 20; scores['Full Stack Engineering'].score += 15; }
      if (skillIds.includes('react')) { scores['Frontend Engineering'].score += 40; scores['Full Stack Engineering'].score += 20; }
      if (skillIds.includes('js')) { scores['Frontend Engineering'].score += 30; scores['Full Stack Engineering'].score += 20; }
      if (skillIds.includes('git')) { scores['Frontend Engineering'].score += 10; scores['Backend Engineering'].score += 10; scores['Full Stack Engineering'].score += 10; }
      if (skillIds.includes('figma')) { scores['UI/UX Design'].score += 50; scores['Frontend Engineering'].score += 10; }
      if (skillIds.includes('docker')) { scores['DevOps & Cloud'].score += 40; scores['Backend Engineering'].score += 10; }
      if (skillIds.includes('aws')) { scores['DevOps & Cloud'].score += 40; scores['Backend Engineering'].score += 15; }
      if (skillIds.includes('nodejs')) { scores['Backend Engineering'].score += 40; scores['Full Stack Engineering'].score += 20; }
      if (skillIds.includes('java')) { scores['Backend Engineering'].score += 35; }
      if (skillIds.includes('csharp')) { scores['Backend Engineering'].score += 35; }

      // Full Stack bonus if both frontend and backend are selected
      const hasFrontend = skillIds.some(id => ['react', 'js'].includes(id));
      const hasBackend = skillIds.some(id => ['nodejs', 'java', 'csharp', 'python'].includes(id));
      if (hasFrontend && hasBackend) {
        scores['Full Stack Engineering'].score += 40;
      }

      // Add baseline randomness/base score to all to maintain UI values
      Object.keys(scores).forEach(key => {
        scores[key].score = Math.min(98, Math.max(45, scores[key].score + 40));
      });

      // Sort categories by score
      const sortedStreams = Object.entries(scores)
        .map(([name, data]) => ({ name, match: data.score, roles: data.roles, improvements: data.improvements }))
        .sort((a, b) => b.match - a.match);

      const topStreams = sortedStreams.slice(0, 3);
      
      // Calculate dynamic readiness score based on average match of the top 2 streams + skills count bonus
      const averageMatch = (topStreams[0].match + topStreams[1].match) / 2;
      const overallReadiness = Math.min(98, Math.max(40, Math.round((averageMatch * 0.8) + (skills.length * 3))));
      
      const getReadinessLabel = (score) => {
        if (score > 85) return 'High';
        if (score > 70) return 'Medium';
        return 'Low';
      };

      let combinedRoles = [];
      let combinedImprovements = [];
      topStreams.forEach(stream => {
        stream.roles.forEach(role => {
          if (combinedRoles.length < 4) {
            combinedRoles.push({ title: role.title, readiness: getReadinessLabel(stream.match), gap: role.gap });
          }
        });
        stream.improvements.forEach(imp => {
          if (combinedImprovements.length < 3 && !combinedImprovements.find(i => i.skill === imp.skill)) {
            combinedImprovements.push(imp);
          }
        });
      });

      setResults({ 
        skills, 
        streams: topStreams.map(s => ({ name: s.name, match: Math.round(s.match) })), 
        roles: combinedRoles.slice(0, 3), 
        improvements: combinedImprovements.slice(0, 3),
        overallReadiness
      });
      navigateTo('dashboard');
    }, 2500);
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
