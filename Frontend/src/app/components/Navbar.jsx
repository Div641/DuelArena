import React, { useState } from 'react';
import { Sun, Moon, BookOpen, User, LogOut } from 'lucide-react';
import GithubIcon from './GithubIcon';

export default function Navbar({ 
  theme, 
  onToggleTheme, 
  onOpenDoc, 
  showArenaPreview, 
  onToggleArena,
  isAuthPage = false,
  isAuthenticated = false,
  user = null,
  onLogout,
  onNavigate
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-transparent border-b-3 border-black dark:border-white transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left: DuelArena logo with Neo-Brutalist styling */}
        <div className="flex items-center gap-2">
          <span className="font-display text-2xl font-black uppercase tracking-tighter text-black dark:text-white select-none">
            DuelArena
          </span>
          <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-[#5CA1E6] text-black border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff]">
            v1.0
          </span>
        </div>

        {/* Center: documentation | github formatted as rounded brutalist buttons */}
        <nav className="hidden md:flex items-center gap-4 text-xs font-bold uppercase tracking-wider">
          <button 
            onClick={onOpenDoc}
            className="flex items-center gap-1 bg-white dark:bg-slate-900 text-black dark:text-white px-3 py-1.5 border-[2.5px] border-black dark:border-white shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_#fff] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_#000] dark:hover:shadow-[5px_5px_0px_0px_#fff] cursor-pointer transition-all duration-150"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Documentation
          </button>
          <span className="text-black dark:text-white font-extrabold">|</span>
          <a 
            href="https://github.com/Div641" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-white dark:bg-slate-900 text-black dark:text-white px-3 py-1.5 border-[2.5px] border-black dark:border-white shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_#fff] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_#000] dark:hover:shadow-[5px_5px_0px_0px_#fff] cursor-pointer transition-all duration-150"
          >
            <GithubIcon className="w-3.5 h-3.5 pointer-events-none" />
            GitHub
          </a>
        </nav>

        {/* Right: navigation buttons & theme selection button */}
        <div className="flex items-center gap-3">
          {isAuthPage ? (
            // On Auth or Arena pages, display Home button (takes user back to Home page)
            <button
              onClick={() => onNavigate('home')}
              className="px-4 py-2 text-xs font-black uppercase tracking-wider bg-white dark:bg-slate-900 text-black dark:text-white border-[3px] border-black dark:border-white shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] dark:hover:shadow-[6px_6px_0px_0px_#fff] cursor-pointer transition-all duration-150"
            >
              Home
            </button>
          ) : isAuthenticated ? (
            // On Home page, if Authenticated, display Enter Arena button (takes them to 'arena')
            <>
              <button
                onClick={() => onNavigate('arena')}
                className="px-4 py-2 text-xs font-black uppercase tracking-wider bg-[#5CA1E6] text-black border-[3px] border-black dark:border-white shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] dark:hover:shadow-[6px_6px_0px_0px_#fff] cursor-pointer transition-all duration-150"
              >
                Enter Arena
              </button>
            </>
          ) : (
            // On Home page, if Unauthenticated, display Get Started button (opens Register page)
            <button
              onClick={() => onNavigate('register')}
              className="px-4 py-2 text-xs font-black uppercase tracking-wider bg-[#5CA1E6] text-black rounded-none border-[3px] border-black dark:border-white shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] dark:hover:shadow-[6px_6px_0px_0px_#fff] cursor-pointer transition-all duration-150"
            >
              Get Started
            </button>
          )}

          {/* Theme selection toggle button */}
          <button
            onClick={onToggleTheme}
            className="p-2 bg-white dark:bg-slate-900 border-[3px] border-black dark:border-white shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] dark:hover:shadow-[6px_6px_0px_0px_#fff] text-black dark:text-white cursor-pointer transition-all duration-150"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500 animate-spin-slow" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Authenticated User profile dropdown trigger */}
          {isAuthenticated && (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="p-2 bg-white dark:bg-slate-900 border-[3px] border-black dark:border-white shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] dark:hover:shadow-[6px_6px_0px_0px_#fff] text-black dark:text-white cursor-pointer transition-all duration-150"
                aria-label="User Profile Dropdown"
              >
                <User className="w-4 h-4" />
              </button>
              
              {/* Dropdown Menu Popup */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-slate-900 border-[3px] border-black dark:border-white shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#fff] py-2 z-50 text-left font-mono">
                  <div className="px-4 py-1.5 border-b-2 border-black dark:border-white text-[9px] uppercase font-black text-slate-500 dark:text-slate-400">
                    User ID / Name
                  </div>
                  <div className="px-4 py-2 text-xs font-black text-black dark:text-white truncate">
                    {user?.username || 'Guest'}
                  </div>
                  {user?.email && (
                    <div className="px-4 pb-2 text-[10px] font-semibold text-slate-400 dark:text-slate-500 truncate">
                      {user?.email}
                    </div>
                  )}
                  <div className="border-t-2 border-black dark:border-white my-1" />
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-black uppercase tracking-wider hover:bg-[#5CA1E6] hover:text-black flex items-center gap-2 cursor-pointer transition"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-500" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </header>
  );
}
