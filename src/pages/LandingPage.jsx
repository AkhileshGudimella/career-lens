import React, { useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import { Sparkles, ArrowRight, Brain, Target, LineChart } from 'lucide-react';
import './LandingPage.css';

const LandingPage = ({ onStart }) => {
  // Simple intersection observer for scroll animations if needed later
  
  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="logo">
          <Brain className="text-primary" size={28} />
          <span>Career<span className="text-gradient">Lens</span></span>
        </div>
      </nav>

      <div className="hero-section animate-slide-up">
        <div className="badge-wrapper">
          <div className="badge-glow">
            <Sparkles size={16} className="text-secondary" />
            <span>AI-Powered Career Intelligence</span>
          </div>
        </div>
        
        <h1 className="hero-title">
          See your career through <br/> 
          <span className="text-gradient">your skills</span>
        </h1>
        
        <p className="hero-subtitle">
          Discover the perfect career path based on what you already know. 
          Our advanced matching system analyzes your unique skill profile 
          to recommend the most suitable technical roles.
        </p>

        <div className="cta-container">
          <button className="btn-primary start-btn" onClick={onStart}>
            Analyze My Skills
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
      
      <div className="hero-graphics animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <GlassCard className="graphic-card feature-card-1 animate-float" style={{ animationDelay: '0s' }}>
          <div className="card-header">
            <Target className="text-success" size={24} />
            <h4>Skill Matching</h4>
          </div>
          <div className="mock-chart mt-4">
            <div className="bar-container"><div className="bar bg-success" style={{width: '94%'}}></div></div>
            <div className="bar-container"><div className="bar bg-primary" style={{width: '82%'}}></div></div>
            <div className="bar-container"><div className="bar bg-warning" style={{width: '65%'}}></div></div>
          </div>
        </GlassCard>
        
        <GlassCard className="graphic-card feature-card-2 animate-float" style={{ animationDelay: '2s' }}>
          <div className="card-header">
            <LineChart className="text-secondary" size={24} />
            <h4>Career Paths</h4>
          </div>
          <div className="mock-nodes mt-4">
            <div className="node master bg-primary"></div>
            <div className="path-line"></div>
            <div className="nodes-row">
              <div className="node child bg-secondary"></div>
              <div className="node child bg-success"></div>
            </div>
          </div>
        </GlassCard>
      </div>
      
      <div className="background-decorations">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
    </div>
  );
};

export default LandingPage;
