import React from 'react';
import { X, BookOpen, CheckCircle, Terminal, Layers, Zap } from 'lucide-react';

export default function DocModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs cursor-pointer animate-fade-in"
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-none bg-white dark:bg-slate-900 border-[3px] border-black dark:border-white p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#fff] text-black dark:text-white flex flex-col gap-6 animate-scale-up z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-3 border-black dark:border-white pb-4">
          <h2 className="font-display text-2xl font-black uppercase tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#5CA1E6]" />
            DuelArena System Architecture
          </h2>
          <button 
            onClick={onClose}
            className="p-1 border-2 border-black dark:border-white bg-white dark:bg-slate-800 text-black dark:text-white hover:bg-slate-100 cursor-pointer shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm leading-relaxed overflow-y-auto pr-1">
          
          <div>
            <h4 className="font-display font-black uppercase text-base flex items-center gap-1.5 border-b-2 border-black dark:border-white pb-1">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              Introduction
            </h4>
            <p className="mt-2 font-semibold">
              DuelArena is an LLM evaluation framework. It routes coding questions to multiple LLMs simultaneously, compiles their code, and prompts a distinct LLM judge to grade the resulting solutions.
            </p>
          </div>

          <div>
            <h4 className="font-display font-black uppercase text-base flex items-center gap-1.5 border-b-2 border-black dark:border-white pb-1">
              <Terminal className="w-5 h-5 text-[#5CA1E6]" />
              LangGraph Pipeline Nodes
            </h4>
            <div className="mt-3 p-4 bg-slate-950 text-slate-200 border-2 border-black font-mono text-xs leading-normal space-y-2">
              <p className="text-slate-500">// Node 1: solutionNode</p>
              <p>Mistral generates <span className="text-indigo-400">solution_1</span></p>
              <p>Cohere generates <span className="text-pink-400">solution_2</span></p>
              <p className="mt-4 text-slate-500">// Node 2: judgeNode</p>
              <p>Gemini evaluates and responds with structured output</p>
              <p>Score range: <span className="text-amber-400">0 - 10</span> (Zod verified)</p>
            </div>
          </div>

          <div>
            <h4 className="font-display font-black uppercase text-base flex items-center gap-1.5 border-b-2 border-black dark:border-white pb-1">
              <Layers className="w-5 h-5 text-purple-500" />
              Zod State Verification Schema
            </h4>
            <p className="mt-2 font-semibold">
              A Zod schema defines our graph state and API responses, preventing runtime format divergence.
            </p>
            <pre className="mt-3 p-4 bg-slate-950 text-slate-300 text-xs font-mono overflow-x-auto leading-relaxed border-2 border-black">
{`const StateSchema = new StateSchema({
  messages: MessagesValue,
  solution_1: new ReducedValue(z.string().default("")),
  solution_2: new ReducedValue(z.string().default("")),
  judge_recommendation: new ReducedValue(
    z.object({
      solution_1_score: z.number().min(0).max(10),
      solution_2_score: z.number().min(0).max(10),
    })
  )
});`}
            </pre>
          </div>

          <div>
            <h4 className="font-display font-black uppercase text-base flex items-center gap-1.5 border-b-2 border-black dark:border-white pb-1">
              <Zap className="w-5 h-5 text-pink-500" />
              API Integration Guide
            </h4>
            <p className="mt-2 font-semibold">
              Our frontend is configured with <strong>Axios</strong> and supports direct REST connection to the backend. Submit requests using the following endpoint:
            </p>
            <div className="mt-3 p-4 bg-slate-950 text-indigo-300 text-xs font-mono border-2 border-black space-y-1.5">
              <p><span className="text-amber-400 font-bold">POST</span> http://localhost:3000/use-graph</p>
              <p className="text-slate-500">// Request Payload</p>
              <p className="text-slate-300">{`{ "message": "Your coding prompt here" }`}</p>
              <p className="text-slate-500 mt-2">// Response JSON format</p>
              <p className="text-slate-300">{`{`}</p>
              <p className="text-slate-300">{`  "solution_1": "code content...",`}</p>
              <p className="text-slate-300">{`  "solution_2": "code content...",`}</p>
              <p className="text-slate-300">{`  "judge_recommendation": {`}</p>
              <p className="text-slate-300">{`    "solution_1_score": 8,`}</p>
              <p className="text-slate-300">{`    "solution_2_score": 6`}</p>
              <p className="text-slate-300">{`  }`}</p>
              <p className="text-slate-300">{`}`}</p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end border-t-3 border-black dark:border-white pt-4 mt-2">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 bg-[#5CA1E6] text-black border-2 border-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[3px_3px_0px_0px_#000] font-black text-xs uppercase tracking-wide transition cursor-pointer"
          >
            Close Documentation
          </button>
        </div>

      </div>
    </div>
  );
}
