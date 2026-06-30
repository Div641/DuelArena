import React from 'react';
import { Terminal, X, ArrowRight } from 'lucide-react';

export default function ArenaWorkspace({
  show,
  onClose,
  promptInput,
  onPromptChange,
  onDuelSubmit,
  isLoading,
  battleResult,
  errorMessage,
  isAuthenticated = false,
  onNavigate
}) {
  if (!show) return null;

  return (
    <div className="w-full max-w-4xl bg-white dark:bg-slate-950 border-[3px] border-black dark:border-white p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#fff] mb-16 animate-fade-in transition-all duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b-3 border-black dark:border-white pb-4 mb-6">
        <div>
          <h3 className="font-display text-2xl font-black uppercase tracking-tight flex items-center gap-2">
            <Terminal className="w-6 h-6 text-[#5CA1E6]" />
            ARENA DUEL WORKSPACE
          </h3>
          <p className="font-serif italic text-sm text-slate-600 dark:text-slate-400 mt-1">
            Ready to invoke the stateful agent pipeline.
          </p>
        </div>
        <button 
          onClick={onClose}
          className="p-1 border-2 border-black dark:border-white bg-white dark:bg-slate-900 text-black dark:text-white hover:bg-slate-100 cursor-pointer shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Form with 2-way data binding, visible only when Authenticated */}
      {!isAuthenticated ? (
        <div className="text-center py-12 border-[3px] border-dashed border-black dark:border-white p-6 bg-slate-50 dark:bg-slate-900/40 flex flex-col items-center justify-center space-y-4">
          <span className="text-5xl">🔒</span>
          <h4 className="font-display font-black text-xl uppercase tracking-wider text-black dark:text-white">
            Workspace Locked
          </h4>
          <p className="font-serif italic text-sm text-slate-600 dark:text-slate-400 max-w-md">
            The Competitive Coding Duel Arena is a restricted zone. You must create an account or sign in to execute agentic comparison code.
          </p>
          <button
            onClick={() => onNavigate('register')}
            className="px-5 py-2.5 bg-[#5CA1E6] text-black border-2 border-black font-black text-xs uppercase tracking-wide shadow-[3px_3px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_#000] cursor-pointer transition-all duration-150"
          >
            Create Account / Register
          </button>
        </div>
      ) : (
        <form onSubmit={onDuelSubmit} className="space-y-4">
          <div>
            <label className="block font-display font-bold uppercase tracking-wider text-xs text-black dark:text-white mb-2">
              Enter Coding Query / Problem Statement
            </label>
            <div className="relative">
              <input
                type="text"
                value={promptInput}
                onChange={(e) => onPromptChange(e.target.value)} // 2-way binding update
                placeholder="e.g. Write a bubble sort function in JavaScript"
                className="w-full pl-4 pr-14 py-4 bg-white dark:bg-slate-900 text-black dark:text-white border-[3px] border-black dark:border-white focus:outline-none focus:bg-[#FAF9F5] dark:focus:bg-slate-800 text-sm font-semibold"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="absolute right-2 top-2 p-2 border-2 border-black dark:border-white bg-[#5CA1E6] text-black hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[2px_2px_0px_0px_#000] transition cursor-pointer disabled:opacity-50"
                disabled={isLoading}
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="mt-6 p-4 border-[3px] border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-400 font-semibold text-xs flex gap-2">
          <span>⚠️</span>
          <div>
            <p className="uppercase tracking-widest font-black">Connection Failure</p>
            <p className="mt-1 font-mono">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="mt-12 flex flex-col items-center justify-center py-10 space-y-4 text-center">
          <div className="relative w-16 h-16 flex items-center justify-center border-[3px] border-black dark:border-white bg-white dark:bg-slate-900 shadow-[4px_4px_0px_0px_#5CA1E6] p-2">
            <div className="text-3xl animate-bounce">⚔️</div>
          </div>
          <div>
            <p className="font-display font-black text-sm uppercase tracking-wider">DUELING IN PROGRESS...</p>
            <p className="font-serif italic text-xs text-slate-600 dark:text-slate-400 mt-1">
              Mistral and Cohere are compiling code. Gemini is reviewing scores.
            </p>
          </div>
        </div>
      )}

      {/* Results Grid */}
      {battleResult && (
        <div className="mt-8 space-y-6 animate-fade-in">
          {/* Scores Summary / Announcement */}
          <div className="p-4 border-[3px] border-black dark:border-white bg-[#5CA1E6]/10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff]">
            <div>
              <h4 className="font-display font-black text-lg uppercase tracking-tight">
                🏆 EVALUATION MATRIX
              </h4>
              <p className="font-serif italic text-xs text-slate-600 dark:text-slate-400">
                Zod structured scoring output from Gemini model.
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="px-4 py-2 bg-white dark:bg-slate-900 border-[2.5px] border-black dark:border-white shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_#fff] text-center">
                <p className="text-[10px] uppercase font-black text-indigo-500">MISTRAL</p>
                <p className="text-xl font-black">{battleResult.judge_recommendation?.solution_1_score}/10</p>
              </div>
              <div className="px-4 py-2 bg-white dark:bg-slate-900 border-[2.5px] border-black dark:border-white shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_#fff] text-center">
                <p className="text-[10px] uppercase font-black text-pink-500">COHERE</p>
                <p className="text-xl font-black">{battleResult.judge_recommendation?.solution_2_score}/10</p>
              </div>
            </div>
          </div>

          {/* Grid comparing Code Solutions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Solution 1: Mistral */}
            <div className={`p-5 border-[3px] border-black dark:border-white bg-white dark:bg-slate-900 flex flex-col justify-between shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff] ${
              (battleResult.judge_recommendation?.solution_1_score >= battleResult.judge_recommendation?.solution_2_score)
                ? 'border-[#5CA1E6] shadow-[6px_6px_0px_0px_#5CA1E6]' 
                : ''
            }`}>
              <div>
                <div className="flex items-center justify-between mb-4 border-b-2 border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 border-2 border-black bg-indigo-500/10 text-indigo-500">
                    MISTRAL ENGINE
                  </span>
                  {battleResult.judge_recommendation?.solution_1_score >= battleResult.judge_recommendation?.solution_2_score && (
                    <span className="text-[10px] font-black text-black bg-[#5CA1E6] border-2 border-black px-2 py-0.5">
                      🏆 WINNER
                    </span>
                  )}
                </div>
                <pre className="p-3 bg-slate-950 text-slate-100 text-xs overflow-x-auto max-h-[300px] border-2 border-black font-mono leading-relaxed">
                  <code>{battleResult.solution_1}</code>
                </pre>
              </div>
              <div className="mt-4 text-xs font-bold uppercase tracking-wider flex justify-between items-center text-slate-700 dark:text-slate-300 pt-2 border-t-2 border-slate-100 dark:border-slate-850">
                <span>Evaluator Score:</span>
                <span className="font-extrabold text-black dark:text-white bg-[#5CA1E6]/25 border border-black dark:border-white px-2 py-0.5">
                  {battleResult.judge_recommendation?.solution_1_score} / 10
                </span>
              </div>
            </div>

            {/* Solution 2: Cohere */}
            <div className={`p-5 border-[3px] border-black dark:border-white bg-white dark:bg-slate-900 flex flex-col justify-between shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff] ${
              (battleResult.judge_recommendation?.solution_2_score >= battleResult.judge_recommendation?.solution_1_score)
                ? 'border-[#5CA1E6] shadow-[6px_6px_0px_0px_#5CA1E6]' 
                : ''
            }`}>
              <div>
                <div className="flex items-center justify-between mb-4 border-b-2 border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 border-2 border-black bg-pink-500/10 text-pink-500">
                    COHERE ENGINE
                  </span>
                  {battleResult.judge_recommendation?.solution_2_score >= battleResult.judge_recommendation?.solution_1_score && (
                    <span className="text-[10px] font-black text-black bg-[#5CA1E6] border-2 border-black px-2 py-0.5">
                      🏆 WINNER
                    </span>
                  )}
                </div>
                <pre className="p-3 bg-slate-950 text-slate-100 text-xs overflow-x-auto max-h-[300px] border-2 border-black font-mono leading-relaxed">
                  <code>{battleResult.solution_2}</code>
                </pre>
              </div>
              <div className="mt-4 text-xs font-bold uppercase tracking-wider flex justify-between items-center text-slate-700 dark:text-slate-300 pt-2 border-t-2 border-slate-100 dark:border-slate-850">
                <span>Evaluator Score:</span>
                <span className="font-extrabold text-black dark:text-white bg-[#5CA1E6]/25 border border-black dark:border-white px-2 py-0.5">
                  {battleResult.judge_recommendation?.solution_2_score} / 10
                </span>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
