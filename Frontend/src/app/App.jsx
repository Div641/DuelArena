import React, { useState, useEffect } from 'react';
import { Cpu, Layers, Zap } from 'lucide-react';
import WaveBackground from './WaveBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import Register from '../pages/Register';
import Login from '../pages/Login';
import ArenaWorkspace from '../services/ArenaWorkspace';
import DocModal from './components/DocModal';
import axios from 'axios';

// API Client configuration
const API = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default function App() {
  // Page routing state: 'home' | 'login' | 'register' | 'arena'
  const [currentPage, setCurrentPage] = useState('home');

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'light';
  });

  const [isDocOpen, setIsDocOpen] = useState(false);
  const [showArenaPreview, setShowArenaPreview] = useState(false);

  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  // Connection states
  const [backendStatus, setBackendStatus] = useState('checking');
  const [promptInput, setPromptInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [battleResult, setBattleResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Check backend health on load
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await API.get('/health');
        if (response.data?.status === 'ok') {
          setBackendStatus('connected');
        } else {
          setBackendStatus('disconnected');
        }
      } catch (err) {
        setBackendStatus('disconnected');
      }
    };
    checkHealth();
  }, []);

  // Update HTML class when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Auth Operations
  const handleRegister = (username, email, password) => {
    const newUser = { username, email, password };
    localStorage.setItem('registered_user', JSON.stringify(newUser));
    alert('Registration successful! Please login with your credentials.');
    setCurrentPage('login');
  };

  const handleLogin = (email, password) => {
    const savedUserJson = localStorage.getItem('registered_user');
    let registeredUser = null;

    if (savedUserJson) {
      registeredUser = JSON.parse(savedUserJson);
    }

    if (registeredUser) {
      if (registeredUser.email === email && registeredUser.password === password) {
        const loggedInUser = { username: registeredUser.username, email };
        setIsAuthenticated(true);
        setUser(loggedInUser);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        setCurrentPage('arena'); // Open ArenaWorkspace directly on login success
      } else {
        alert('Invalid email or password. Please try again.');
      }
    } else {
      // Fallback developer bypass if database is empty for testing ease
      const username = email.split('@')[0];
      const loggedInUser = { username, email };
      setIsAuthenticated(true);
      setUser(loggedInUser);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setCurrentPage('arena'); // Open ArenaWorkspace directly on login success
    }
  };

  const handleLogout = async () => {
    try {
      // Call backend API logout route
      await API.post('/logout');
    } catch (err) {
      console.warn("Backend logout endpoint failed or unreachable, clearing local session.", err);
    } finally {
      // Clean frontend session
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      setPromptInput('');
      setBattleResult(null);
      setErrorMessage('');
      setCurrentPage('home');
    }
  };

  // Run the AI Duel
  const handleDuel = async (e) => {
    e.preventDefault();
    if (!promptInput.trim()) return;

    setIsLoading(true);
    setErrorMessage('');
    setBattleResult(null);

    try {
      const response = await API.post('/use-graph', { message: promptInput });
      setBattleResult(response.data);
    } catch (err) {
      console.error(err);
      setErrorMessage(
        err.response?.data?.error || 
        'Could not connect to the LangGraph Backend. Make sure server.ts is running on port 3000.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // RENDER ROUTING ENGINE
  if (currentPage === 'register') {
    return (
      <Register 
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenDoc={() => setIsDocOpen(true)}
        onNavigate={setCurrentPage}
        onRegister={handleRegister}
      />
    );
  }

  if (currentPage === 'login') {
    return (
      <Login 
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenDoc={() => setIsDocOpen(true)}
        onNavigate={setCurrentPage}
        onLogin={handleLogin}
      />
    );
  }

  if (currentPage === 'arena') {
    return (
      <ArenaWorkspace 
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenDoc={() => setIsDocOpen(true)}
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
        user={user}
        promptInput={promptInput}
        onPromptChange={setPromptInput}
        onDuelSubmit={handleDuel}
        isLoading={isLoading}
        battleResult={battleResult}
        errorMessage={errorMessage}
      />
    );
  }

  // DEFAULT: Home view
  return (
    <div className="min-h-screen bg-grid-paper flex flex-col relative overflow-hidden transition-colors duration-300">
      {/* Neo-Brutalist Wave Canvas Background */}
      <WaveBackground theme={theme} />

      {/* Decorative Wavy Margin Ribbons */}
      <div className="absolute top-[8%] left-[10%] w-16 h-0.5 bg-black dark:bg-white hidden xl:block" />
      <div className="absolute top-[18%] right-[8%] w-24 h-0.5 bg-black dark:bg-white hidden xl:block" />

      {/* Header / Navbar called here */}
      <Navbar 
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenDoc={() => setIsDocOpen(true)}
        showArenaPreview={showArenaPreview}
        onToggleArena={setShowArenaPreview}
        isAuthPage={false}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
        onNavigate={setCurrentPage}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12 flex flex-col items-center justify-center relative z-10">
        
        {/* Connection Status Flag (Server Status badge) */}
        <div className="mb-8 flex items-center gap-2 px-4 py-1.5 border-[2.5px] border-black dark:border-white bg-white dark:bg-slate-950 font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_#fff]">
          <div className={`w-3.5 h-3.5 border-2 border-black dark:border-white ${
            backendStatus === 'connected' ? 'bg-emerald-400' : 
            backendStatus === 'checking' ? 'bg-amber-400' : 
            'bg-rose-400'
          }`} />
          <span>
            Server Status: {
              backendStatus === 'connected' ? 'CONNECTED (PORT 3000)' : 
              backendStatus === 'checking' ? 'ESTABLISHING...' : 
              'OFFLINE / LOCAL'
            }
          </span>
        </div>

        {/* Hero Branding Section */}
        <HeroSection />

        {/* Informative Grid Cards in brutalist style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-6">
          
          <div className="p-6 bg-white dark:bg-slate-950 border-[3px] border-black dark:border-white shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#fff] transition hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_#000] dark:hover:shadow-[8px_8px_0px_0px_#fff]">
            <div className="w-10 h-10 border-2 border-black bg-[#5CA1E6] flex items-center justify-center text-black mb-4 shadow-[2px_2px_0px_0px_#000]">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-display font-black uppercase text-lg mb-2">Double Generation</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold leading-normal">
              Mistral and Cohere process your prompt in parallel, producing distinct code solutions optimized for logic and structure.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-950 border-[3px] border-black dark:border-white shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#fff] transition hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_#000] dark:hover:shadow-[8px_8px_0px_0px_#fff]">
            <div className="w-10 h-10 border-2 border-black bg-white flex items-center justify-center text-black mb-4 shadow-[2px_2px_0px_0px_#000]">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-display font-black uppercase text-lg mb-2">LangGraph Pipeline</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold leading-normal">
              A stateful agentic graph pipes outputs from code generation nodes to a central judging hub validation stream.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-950 border-[3px] border-black dark:border-white shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#fff] transition hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_#000] dark:hover:shadow-[8px_8px_0px_0px_#fff]">
            <div className="w-10 h-10 border-2 border-black bg-[#5CA1E6] flex items-center justify-center text-black mb-4 shadow-[2px_2px_0px_0px_#000]">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-display font-black uppercase text-lg mb-2">Gemini Arbitrator</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold leading-normal">
              Gemini model grades both results using Zod-constrained JSON schemas, enforcing reliable scoring attributes.
            </p>
          </div>

        </div>

      </main>

      {/* Footer copyright */}
      <Footer />

      {/* Documentation Modal */}
      <DocModal 
        isOpen={isDocOpen} 
        onClose={() => setIsDocOpen(false)} 
      />
    </div>
  );
}
