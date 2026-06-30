import React from 'react';
import Navbar from '../app/components/Navbar';
import { Terminal, Send, Cpu, Award } from 'lucide-react';

export default function ArenaWorkspace({
  theme,
  onToggleTheme,
  onOpenDoc,
  onNavigate,
  onLogout,
  user,
  promptInput,
  onPromptChange,
  onDuelSubmit,
  isLoading,
  battleResult,
  errorMessage,
  activeQuestion
}) {

  return (
    <div className="min-h-screen bg-black text-slate-100 flex flex-col relative transition-colors duration-300">
      
      {/* Navbar with Home button (isAuthPage={true}) and user dropdown profile */}
      <Navbar 
        theme={theme}
        onToggleTheme={onToggleTheme}
        onOpenDoc={onOpenDoc}
        isAuthPage={true} 
        isAuthenticated={true}
        user={user}
        onLogout={onLogout}
        onNavigate={onNavigate}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col p-6 max-w-7xl w-full mx-auto space-y-6 pb-28 relative z-10">
        
        {/* Connection status header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-[3px] border-black dark:border-white bg-[#1E1E22] p-4 shadow-[4px_4px_0px_0px_#5CA1E6]">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[#5CA1E6]" />
            <h2 className="font-sans font-black text-lg uppercase tracking-wider text-white">
              Duel Arena Colosseum
            </h2>
          </div>
          <div className="text-xs font-mono font-bold text-slate-400">
            LOGGED IN AS: <span className="text-[#5CA1E6]">{user?.username || 'GUEST'}</span>
          </div>
        </div>

        {/* Active Question Display - Shows at the top as requested */}
        {activeQuestion && (
          <div className="p-4 border-[3px] border-slate-800 bg-[#121214] text-slate-350 font-mono text-sm shadow-[4px_4px_0px_0px_#5CA1E6] flex flex-col gap-1.5 animate-fade-in">
            <span className="text-[10px] font-black uppercase text-[#5CA1E6] tracking-widest font-sans">
              Active Duel Prompt
            </span>
            <span className="text-white text-sm font-semibold">
              "{activeQuestion}"
            </span>
          </div>
        )}

        {/* Error notification */}
        {errorMessage && (
          <div className="p-4 border-[3px] border-rose-500 bg-rose-500/10 text-rose-400 font-bold text-xs uppercase font-mono shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            ⚠️ CONNECTION ERROR: {errorMessage}
          </div>
        )}

        {/* Loading display */}
        {isLoading && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 bg-[#121214] border-[3px] border-black dark:border-white shadow-[6px_6px_0px_0px_#5CA1E6]">
            <div className="relative w-20 h-20 flex items-center justify-center border-[3px] border-white bg-black p-4 mb-4">
              <div className="text-4xl animate-bounce">⚔️</div>
            </div>
            <p className="font-sans font-black uppercase text-sm tracking-wider text-white">DUELING ENGINE RUNNING...</p>
            <p className="font-serif italic text-xs text-slate-400 mt-1">Mistral and Cohere are compiling code. Gemini is evaluating logic.</p>
          </div>
        )}

        {/* Main Grid: 2 Side-by-Side Model Cards (Top Row) & 1 landscape Judge Card (Bottom Row) */}
        {!isLoading && (
          <div className="flex-1 flex flex-col gap-6">
            
            {/* Top Row: Mistral vs Cohere cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Mistral Card */}
              <div className={`p-6 border-[3px] border-black dark:border-white rounded-none flex flex-col justify-between transition shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#fff] ${
                battleResult && (battleResult.judge_recommendation?.solution_1_score >= battleResult.judge_recommendation?.solution_2_score)
                  ? 'border-[#5CA1E6] shadow-[8px_8px_0px_0px_#5CA1E6] bg-[#1E1E22]' 
                  : 'bg-[#121214]'
              }`}>
                <div>
                  <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2">
                    <span className="text-xs font-sans font-black uppercase tracking-wider px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                      Mistral Engine
                    </span>
                    {battleResult && battleResult.judge_recommendation?.solution_1_score >= battleResult.judge_recommendation?.solution_2_score && (
                      <span className="text-[10px] font-sans font-black text-black bg-[#5CA1E6] px-2 py-0.5 border border-black uppercase tracking-wider">
                        🏆 WINNER
                      </span>
                    )}
                  </div>
                  <pre className="p-4 bg-black text-slate-300 text-xs overflow-x-auto max-h-[340px] font-mono leading-relaxed border border-slate-800">
                    <code>{battleResult ? battleResult.solution_1 : '// Waiting for coding question...'}</code>
                  </pre>
                </div>
                <div className="mt-4 font-mono text-xs uppercase tracking-wider flex justify-between items-center text-slate-400 pt-3 border-t border-slate-800">
                  <span>Score:</span>
                  <span className="font-extrabold text-[#5CA1E6] bg-black px-2 py-0.5 border border-slate-800">
                    {battleResult ? `${battleResult.judge_recommendation?.solution_1_score} / 10` : '0 / 10'}
                  </span>
                </div>
              </div>

              {/* Cohere Card */}
              <div className={`p-6 border-[3px] border-black dark:border-white rounded-none flex flex-col justify-between transition shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#fff] ${
                battleResult && (battleResult.judge_recommendation?.solution_2_score >= battleResult.judge_recommendation?.solution_1_score)
                  ? 'border-[#5CA1E6] shadow-[8px_8px_0px_0px_#5CA1E6] bg-[#1E1E22]' 
                  : 'bg-[#121214]'
              }`}>
                <div>
                  <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2">
                    <span className="text-xs font-sans font-black uppercase tracking-wider px-2 py-0.5 bg-pink-500/10 text-pink-400 border border-pink-500/30">
                      Cohere Engine
                    </span>
                    {battleResult && battleResult.judge_recommendation?.solution_2_score >= battleResult.judge_recommendation?.solution_1_score && (
                      <span className="text-[10px] font-sans font-black text-black bg-[#5CA1E6] px-2 py-0.5 border border-black uppercase tracking-wider">
                        🏆 WINNER
                      </span>
                    )}
                  </div>
                  <pre className="p-4 bg-black text-slate-300 text-xs overflow-x-auto max-h-[340px] font-mono leading-relaxed border border-slate-800">
                    <code>{battleResult ? battleResult.solution_2 : '// Waiting for coding question...'}</code>
                  </pre>
                </div>
                <div className="mt-4 font-mono text-xs uppercase tracking-wider flex justify-between items-center text-slate-400 pt-3 border-t border-slate-800">
                  <span>Score:</span>
                  <span className="font-extrabold text-[#5CA1E6] bg-black px-2 py-0.5 border border-slate-800">
                    {battleResult ? `${battleResult.judge_recommendation?.solution_2_score} / 10` : '0 / 10'}
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Row: Landscape Gemini Card */}
            <div className="p-6 bg-[#121214] border-[3px] border-black dark:border-white shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#fff] w-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-slate-750 pb-2">
                  <span className="text-xs font-sans font-black uppercase tracking-wider px-2 py-0.5 bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-purple-400" />
                    Gemini Arbitrator Verdict
                  </span>
                  <span className="font-mono text-[10px] font-black text-slate-400 uppercase">
                    Evaluation Matrix
                  </span>
                </div>

                {battleResult ? (
                  <div className="space-y-4 font-mono text-xs text-slate-300 leading-relaxed">
                    <div className="p-3 bg-black border border-slate-850 rounded text-slate-300">
                      <p className="font-sans font-black text-white text-sm uppercase mb-2">🏆 Grading Analysis:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          Mistral Score: <strong className="text-[#5CA1E6]">{battleResult.judge_recommendation?.solution_1_score} / 10</strong>.
                        </li>
                        <li>
                          Cohere Score: <strong className="text-[#5CA1E6]">{battleResult.judge_recommendation?.solution_2_score} / 10</strong>.
                        </li>
                        <li className="mt-2 text-white font-semibold font-sans">
                          Winner: {
                            battleResult.judge_recommendation?.solution_1_score > battleResult.judge_recommendation?.solution_2_score ? 'Mistral' :
                            battleResult.judge_recommendation?.solution_2_score > battleResult.judge_recommendation?.solution_1_score ? 'Cohere' :
                            'Draw Match'
                          } (evaluated by structured Gemini judge criteria).
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center text-xs font-serif italic text-slate-500">
                    Submit a question below to trigger the judge's dynamic code comparison review.
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Floating Bottom Chat / Question Area */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black border-t-3 border-slate-800 z-30">
        <form onSubmit={onDuelSubmit} className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={promptInput}
            onChange={(e) => onPromptChange(e.target.value)} // 2-way binding
            placeholder="Ask your coding question (e.g. Write a quicksort in Python)..."
            className="flex-1 px-4 py-3.5 bg-[#121214] text-white border-[3px] border-slate-800 focus:border-white focus:outline-none focus:bg-[#1E1E22] text-sm font-semibold rounded-none placeholder-slate-500 font-sans"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-6 bg-[#5CA1E6] text-black border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] active:translate-x-[0px] active:translate-y-[0px] cursor-pointer font-sans font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all duration-150"
            disabled={isLoading}
          >
            <Send className="w-4 h-4 text-black" />
            Duel!
          </button>
        </form>
      </div>

    </div>
  );
}
