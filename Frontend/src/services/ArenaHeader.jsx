import React from 'react';
import { Terminal } from 'lucide-react';

export default function ArenaHeader({ user, activeQuestion }) {
  return (
    <div className="space-y-6">
      {/* Connection Status Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-[3px] border-black dark:border-white bg-white dark:bg-slate-900 p-4 shadow-[4px_4px_0px_0px_#5CA1E6] text-black dark:text-white transition-colors duration-300">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-[#5CA1E6]" />
          <h2 className="font-sans font-black text-lg uppercase tracking-wider">
            Duel Arena Colosseum
          </h2>
        </div>
        <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
          LOGGED IN AS: <span className="text-[#5CA1E6] font-black">{user?.username || 'GUEST'}</span>
        </div>
      </div>

      {/* Active Question Display Card */}
      {activeQuestion && (
        <div className="p-4 border-[3px] border-black dark:border-white bg-white dark:bg-slate-900 text-black dark:text-white shadow-[4px_4px_0px_0px_#5CA1E6] flex flex-col gap-1.5 animate-fade-in transition-colors duration-300">
          <span className="text-[10px] font-black uppercase text-[#5CA1E6] tracking-widest font-sans">
            Active Duel Prompt
          </span>
          <span className="text-sm font-semibold font-mono">
            "{activeQuestion}"
          </span>
        </div>
      )}
    </div>
  );
}
