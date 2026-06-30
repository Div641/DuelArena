import React from 'react';
import { Send } from 'lucide-react';

export default function ArenaChatArea({
  promptInput,
  onPromptChange,
  onDuelSubmit,
  isLoading
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-slate-950 border-t-[3.5px] border-black dark:border-white z-30 transition-colors duration-300">
      <form onSubmit={onDuelSubmit} className="max-w-4xl mx-auto flex gap-3">
        <input
          type="text"
          value={promptInput}
          onChange={(e) => onPromptChange(e.target.value)} // 2-way data binding
          placeholder="Ask your coding question (e.g. Write a quicksort in Python)..."
          className="flex-1 px-4 py-3.5 bg-slate-50 dark:bg-slate-900 text-black dark:text-white border-[3px] border-black dark:border-white focus:border-[#5CA1E6] dark:focus:border-[#5CA1E6] focus:outline-none text-sm font-semibold rounded-none placeholder-slate-400 dark:placeholder-slate-500 font-sans transition-colors duration-300"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="px-6 bg-[#5CA1E6] text-black border-[3px] border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] active:translate-x-[0px] active:translate-y-[0px] cursor-pointer font-sans font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all duration-150"
          disabled={isLoading}
        >
          <Send className="w-4 h-4 text-black" />
          Duel!
        </button>
      </form>
    </div>
  );
}
