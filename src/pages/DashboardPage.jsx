import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import ProgressBar from '../components/ProgressBar';
import RadialChart from '../components/RadialChart';
import InteractivePath from '../components/InteractivePath';
import { Briefcase, Activity, Target, ExternalLink, Lightbulb, TrendingUp, GitMerge, ChevronDown, ChevronUp } from 'lucide-react';
import './DashboardPage.css';

const ExplanationSection = ({ expanded, toggle, title, content }) => (
  <div className="explanation-accordion">
    <div className="explanation-header" onClick={toggle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Lightbulb size={18} className="text-warning" />
        <h4 style={{ margin: 0, fontSize: '1rem' }}>{title}</h4>
      </div>
      {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
    </div>
    {expanded && (
      <div className="explanation-content animate-slide-up">
        {content}
      </div>
    )}
  </div>
);

const DashboardPage = ({ results, onRestart }) => {
  const [expandedRole, setExpandedRole] = useState(null);

  if (!results) return null;

  return (
    <div className="dashboard-page animate-slide-up">
      <div className="dashboard-header">
        <div>
          <h2>Your Career <span className="text-gradient">Intelligence Report</span></h2>
          <p className="text-muted">Based on your proficiency in {results.skills.length} skills</p>
        </div>
        <button className="btn-secondary" onClick={onRestart}>Start Over</button>
      </div>

      <div className="dashboard-grid">
        {/* Top Recommendations */}
        <div className="main-column">
          <GlassCard className="top-matches-card">
            <h3 className="section-title"><Target className="text-primary"/> Top Stream Matches</h3>
            <div className="streams-list">
              {results.streams.map((stream, idx) => (
                <div key={idx} className="stream-item">
                  <div className="stream-info">
                    <h4>{stream.name}</h4>
                    <span className="match-badge">
                      {stream.match}% Match
                    </span>
                  </div>
                  <ProgressBar percentage={stream.match} color={idx === 0 ? "var(--success)" : "var(--primary)"} />
                </div>
              ))}
            </div>
          </GlassCard>

          <h3 className="section-title mt-8"><Briefcase className="text-secondary"/> Recommended Roles</h3>
          <div className="roles-list">
            {results.roles.map((role, idx) => {
              const isExpanded = expandedRole === idx;
              return (
                <GlassCard key={idx} className="role-card" hoverEffect={false}>
                  <div className="role-main">
                    <div className="role-title-row">
                      <h4>{role.title}</h4>
                      <span className={`readiness-badge ${role.readiness.toLowerCase()}`}>
                        {role.readiness} Readiness
                      </span>
                    </div>
                    <p className="gap-text">
                      <span className="text-warning">Major Gap: </span> {role.gap}
                    </p>
                    
                    <button 
                      className="btn-outline expand-btn"
                      onClick={() => setExpandedRole(isExpanded ? null : idx)}
                    >
                      {isExpanded ? 'Hide Details' : 'View Explanation'}
                      {isExpanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                    </button>
                  </div>
                  
                  {isExpanded && (
                    <div className="role-explanation animate-slide-up">
                      <div className="exp-grid">
                        <div className="exp-box success-box">
                          <h5>Why you match this role</h5>
                          <p>Your strong background in {results.skills[0]?.name || 'core technologies'} heavily aligns with the day-to-day requirements of a {role.title}. Specifically, the industry looks for your exact proficiency level in these areas.</p>
                        </div>
                        <div className="exp-box warning-box">
                          <h5>What's missing</h5>
                          <p>You need to bridge the gap in {role.gap}. While you have the foundation, enterprise environments expect practical exposure to this specific domain.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* Sidebar: Analytics & Improvement */}
        <div className="side-column">
          <GlassCard className="analytics-card">
            <h3 className="section-title"><Activity className="text-secondary"/> Overall Readiness</h3>
            <div className="radial-container">
              <RadialChart percentage={82} size={160} strokeWidth={12} color="var(--success)"/>
            </div>
            <p className="analytics-desc text-muted mt-4 text-center">
              You are highly competitive for mid-level technical roles based on current market trends.
            </p>
          </GlassCard>

          <GlassCard className="improvement-card mt-6">
            <h3 className="section-title"><TrendingUp className="text-primary"/> Interactive Growth Path</h3>
            <InteractivePath improvements={results.improvements} />
          </GlassCard>
          
          <GlassCard className="mt-6 info-card">
            <GitMerge className="text-secondary mb-2" />
            <h4>Next Step</h4>
            <p className="text-muted text-sm mt-2">Start a targeted project using your suggested growth skills to bridge the final gaps in your profile.</p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
