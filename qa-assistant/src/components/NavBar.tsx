import React from 'react';

type Props = {
  current: 'dashboard' | 'main' | 'select';
  onNavigate: (page: 'dashboard' | 'main' | 'select') => void;
  isDark: boolean;
  onToggleDark: () => void;
};

export default function NavBar({ current, onNavigate, isDark, onToggleDark }: Props) {
  return (
    <nav className="qa-nav">
      <div className="qa-nav-left">
        <div className="qa-logo" onClick={() => onNavigate('dashboard')}>QA Assistant</div>
      </div>

      <div className="qa-nav-center">
        <button
          className={`qa-nav-btn ${current === 'dashboard' ? 'active' : ''}`}
          onClick={() => onNavigate('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`qa-nav-btn ${current === 'main' ? 'active' : ''}`}
          onClick={() => onNavigate('main')}
        >
          Main Defect
        </button>
        <button
          className={`qa-nav-btn ${current === 'select' ? 'active' : ''}`}
          onClick={() => onNavigate('select')}
        >
          Select Defect
        </button>
      </div>

      <div className="qa-nav-right">
        <button className="qa-toggle" onClick={onToggleDark} aria-pressed={!isDark}>
          {isDark ? 'Dark' : 'Light'}
        </button>
      </div>
    </nav>
  );
}
