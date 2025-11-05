import React, { useEffect, useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import MainDefect from './components/MainDefect';
import SelectDefect from './components/SelectDefect';

type Page = 'dashboard' | 'main' | 'select';

function App() {
  const [page, setPage] = useState<Page>('dashboard');
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const theme = isDark ? 'dark' : 'light';
    // apply theme to root so CSS variables switch
    document.documentElement.setAttribute('data-theme', theme);
  }, [isDark]);

  return (
    <div className="App">
      <NavBar
        current={page}
        onNavigate={(p) => setPage(p)}
        isDark={isDark}
        onToggleDark={() => setIsDark((s) => !s)}
      />

      <main className="app-main">
        {page === 'dashboard' && <Dashboard />}
        {page === 'main' && <MainDefect />}
        {page === 'select' && <SelectDefect />}
      </main>
    </div>
  );
}

export default App;
