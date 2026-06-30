import React, { useState } from 'react';
import Navbar from '../app/components/Navbar';

export default function Login({ 
  theme, 
  onToggleTheme, 
  onOpenDoc, 
  onNavigate,
  onLogin 
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('All fields are required.');
      return;
    }
    setError('');
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-dark-grid flex flex-col relative overflow-hidden text-black transition-colors duration-300">
      
      {/* Header / Navbar called here */}
      <Navbar 
        theme={theme}
        onOpenDoc={onOpenDoc}
        onToggleTheme={onToggleTheme}
        isAuthPage={true}
        onNavigate={onNavigate}
      />

      {/* Main card viewport container */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        
        {/* Card: 90% width, 78% height */}
        <div className="w-[90vw] max-w-5xl h-[78vh] min-h-[500px] bg-white dark:bg-slate-900 border-[3.5px] border-black dark:border-white shadow-[10px_10px_0px_0px_#000] dark:shadow-[10px_10px_0px_0px_#fff] grid grid-cols-1 md:grid-cols-2 overflow-hidden transition-all duration-300">
          
          {/* Left Section: login/reg image from public folder */}
          <div className="hidden md:block relative border-r-[3.5px] border-black dark:border-white h-full bg-slate-100 dark:bg-slate-950">
            <img 
              src="/login:reg.png" 
              alt="Login Side Artwork" 
              className="absolute inset-0 w-full h-full object-cover select-none"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80";
              }}
            />
            {/* Visual branding tint overlay */}
            <div className="absolute inset-0 bg-[#5CA1E6]/10 mix-blend-multiply pointer-events-none" />
          </div>

          {/* Right Section: Form for login */}
          <div className="flex flex-col justify-center p-8 sm:p-12 h-full overflow-y-auto bg-[#FAF9F5] dark:bg-slate-900 text-black dark:text-white">
            <div className="max-w-md w-full mx-auto">
              
              <h2 className="font-mono text-4xl font-black uppercase tracking-tighter mb-2 text-black dark:text-white">
                LOGIN
              </h2>
              <p className="font-serif italic text-sm text-slate-600 dark:text-slate-400 mb-6">
                Sign in to unlock the arena graph executor.
              </p>

              {error && (
                <div className="mb-4 p-3 border-2 border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-400 font-semibold text-xs uppercase tracking-wide">
                  ⚠️ {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email / Username */}
                <div>
                  <label className="block font-display font-bold uppercase tracking-wider text-[10px] text-slate-700 dark:text-slate-300 mb-1.5 group-focus-within:text-white transition-colors duration-150">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="
                      w-full
                      px-3 py-2.5
                      bg-white dark:bg-slate-950
                      text-black dark:text-white
                      border-[2.5px] border-black dark:border-white
                      text-xs font-semibold
                      transition-all duration-150
                      focus:outline-none
                      focus:bg-white
                      focus:text-black
                      focus:font-mono
                      dark:focus:bg-white
                      dark:focus:text-black
                    "
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block font-display font-bold uppercase tracking-wider text-[10px] text-slate-700 dark:text-slate-300 mb-1.5 group-focus-within:text-white transition-colors duration-150">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="
                      w-full
                      px-3 py-2.5
                      bg-white dark:bg-slate-950
                      text-black dark:text-white
                      border-[2.5px] border-black dark:border-white
                      text-xs font-semibold
                      transition-all duration-150
                      focus:outline-none
                      focus:bg-white
                      focus:text-black
                      focus:font-mono
                      dark:focus:bg-white
                      dark:focus:text-black
                    "
                  />
                </div>

                {/* Submit Login button */}
                <button
                  type="submit"
                  className="w-full mt-6 py-3 font-black uppercase tracking-wider bg-[#5CA1E6] text-black border-[3px] border-black dark:border-white shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] dark:hover:shadow-[6px_6px_0px_0px_#fff] active:translate-x-[0px] active:translate-y-[0px] active:shadow-[4px_4px_0px_0px_#000] cursor-pointer transition-all duration-150 text-xs"
                >
                  Login
                </button>
              </form>

              {/* don't have an account? register */}
              <div className="mt-8 text-center border-t-2 border-black/10 dark:border-white/10 pt-6">
                <p className="font-serif italic text-xs text-slate-600 dark:text-slate-400">
                  don't have an account?{' '}
                  <button 
                    onClick={() => onNavigate('register')}
                    className="font-sans font-black uppercase text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer tracking-wider"
                  >
                    register
                  </button>
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
