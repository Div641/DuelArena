import React from 'react';
import { Award } from 'lucide-react';

export default function ArenaMainSpace({
  isLoading,
  battleResult,
  errorMessage
}) {
  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 border-[3px] border-black dark:border-white shadow-[6px_6px_0px_0px_#5CA1E6] text-black dark:text-white transition-colors duration-300">
        <div className="relative w-20 h-20 flex items-center justify-center border-[3px] border-black dark:border-white bg-white dark:bg-black p-4 mb-4">
          <div className="text-4xl animate-bounce">⚔️</div>
        </div>
        <p className="font-sans font-black uppercase text-sm tracking-wider">DUELING ENGINE RUNNING...</p>
        <p className="font-serif italic text-xs text-slate-600 dark:text-slate-400 mt-1">
          Mistral and Cohere are compiling code. Gemini is evaluating logic.
        </p>
      </div>
    );
  }

  // Determine winners
  const solution1Score = battleResult?.judge_recommendation?.solution_1_score || 0;
  const solution2Score = battleResult?.judge_recommendation?.solution_2_score || 0;
  const isMistralWinner = battleResult && solution1Score >= solution2Score;
  const isCohereWinner = battleResult && solution2Score >= solution1Score;

  // CSS builder for solution card containers
  const getCardStyle = (isWinner) => {
    const base = "p-6 border-[3px] border-black dark:border-white rounded-none flex flex-col justify-between transition-all duration-300 text-black dark:text-white";
    if (isWinner) {
      return `${base} border-[#5CA1E6] dark:border-[#5CA1E6] shadow-[8px_8px_0px_0px_#5CA1E6] bg-white dark:bg-slate-900`;
    }
    return `${base} shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#fff] bg-white dark:bg-slate-900`;
  };

  return (
    <div className="flex-1 flex flex-col gap-6">
      
      {/* Top Row: Mistral vs Cohere cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Mistral Card */}
        <div className={getCardStyle(isMistralWinner)}>
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
              <span className="text-xs font-sans font-black uppercase tracking-wider px-2 py-0.5 bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 border border-indigo-500/30">
                Mistral Engine
              </span>
              {isMistralWinner && (
                <span className="text-[10px] font-sans font-black text-black bg-[#5CA1E6] px-2 py-0.5 border border-black uppercase tracking-wider">
                  🏆 WINNER
                </span>
              )}
            </div>
            <pre className="p-4 bg-slate-50 dark:bg-black text-slate-800 dark:text-slate-300 text-xs overflow-x-auto max-h-[340px] font-mono leading-relaxed border border-slate-200 dark:border-slate-850">
              <code>{battleResult ? battleResult.solution_1 : '// Waiting for coding question...'}</code>
            </pre>
          </div>
          <div className="mt-4 font-mono text-xs uppercase tracking-wider flex justify-between items-center text-slate-600 dark:text-slate-400 pt-3 border-t border-slate-200 dark:border-slate-800">
            <span>Score:</span>
            <span className="font-extrabold text-[#5CA1E6] bg-white dark:bg-black px-2 py-0.5 border border-slate-200 dark:border-slate-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)]">
              {battleResult ? `${solution1Score} / 10` : '0 / 10'}
            </span>
          </div>
        </div>

        {/* Cohere Card */}
        <div className={getCardStyle(isCohereWinner)}>
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
              <span className="text-xs font-sans font-black uppercase tracking-wider px-2 py-0.5 bg-pink-500/10 text-pink-650 dark:text-pink-400 border border-pink-500/30">
                Cohere Engine
              </span>
              {isCohereWinner && (
                <span className="text-[10px] font-sans font-black text-black bg-[#5CA1E6] px-2 py-0.5 border border-black uppercase tracking-wider">
                  🏆 WINNER
                </span>
              )}
            </div>
            <pre className="p-4 bg-slate-50 dark:bg-black text-slate-800 dark:text-slate-300 text-xs overflow-x-auto max-h-[340px] font-mono leading-relaxed border border-slate-200 dark:border-slate-850">
              <code>{battleResult ? battleResult.solution_2 : '// Waiting for coding question...'}</code>
            </pre>
          </div>
          <div className="mt-4 font-mono text-xs uppercase tracking-wider flex justify-between items-center text-slate-600 dark:text-slate-400 pt-3 border-t border-slate-200 dark:border-slate-800">
            <span>Score:</span>
            <span className="font-extrabold text-[#5CA1E6] bg-white dark:bg-black px-2 py-0.5 border border-slate-200 dark:border-slate-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)]">
              {battleResult ? `${solution2Score} / 10` : '0 / 10'}
            </span>
          </div>
        </div>

      </div>

      {/* Bottom Row: Landscape Gemini Arbitrator Card */}
      <div className="p-6 bg-white dark:bg-slate-900 border-[3px] border-black dark:border-white shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#fff] w-full flex flex-col justify-between text-black dark:text-white transition-colors duration-300">
        <div>
          <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
            <span className="text-xs font-sans font-black uppercase tracking-wider px-2 py-0.5 bg-purple-500/10 text-purple-750 dark:text-purple-400 border border-purple-500/30 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              Gemini Arbitrator Verdict
            </span>
            <span className="font-mono text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase">
              Evaluation Matrix
            </span>
          </div>

          {battleResult ? (
            <div className="space-y-4 font-mono text-xs leading-relaxed">
              <div className="p-3 bg-slate-50 dark:bg-black border border-slate-200 dark:border-slate-800 rounded text-slate-800 dark:text-slate-300">
                <p className="font-sans font-black text-black dark:text-white text-sm uppercase mb-2">🏆 Grading Analysis:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Mistral Score: <strong className="text-[#5CA1E6]">{solution1Score} / 10</strong>.
                  </li>
                  <li>
                    Cohere Score: <strong className="text-[#5CA1E6]">{solution2Score} / 10</strong>.
                  </li>
                  <li className="mt-2 text-black dark:text-white font-semibold font-sans">
                    Winner:{' '}
                    {solution1Score > solution2Score
                      ? 'Mistral'
                      : solution2Score > solution1Score
                      ? 'Cohere'
                      : 'Draw Match'}{' '}
                    (evaluated by structured Gemini judge criteria).
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-xs font-serif italic text-slate-500 dark:text-slate-400">
              Submit a question below to trigger the judge's dynamic code comparison review.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
