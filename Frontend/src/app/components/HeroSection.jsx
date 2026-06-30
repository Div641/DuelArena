import React from 'react';
import DoodleStar from './DoodleStar';

export default function HeroSection() {
  return (
    <>
      
      <div className="text-center max-w-3xl mx-auto mb-6">
        {/* <p className="font-serif italic text-xl md:text-2xl text-slate-800 dark:text-slate-200 mb-2">
          made with no assets
        </p> */}
        <h1 className="font-display text-5xl sm:text-7xl font-extrabold tracking-tighter leading-none mb-4 text-black dark:text-white uppercase">
          DUEL ARENA
        </h1>
        <p className="font-serif text-lg md:text-xl text-slate-700 dark:text-slate-300 italic">
          Clash of Parallel Dimensions / Mistral & Cohere / Judged by Gemini
        </p>
      </div>

      {/* Hero Section Container (Grid Layout Mimicking reference) */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 px-4 items-center relative">
        
        {/* Decorative Star elements */}
        <DoodleStar className="absolute top-[-20px] left-[5%] w-12 h-12 text-[#5CA1E6] hidden lg:block animate-doodle-float" />
        <DoodleStar className="absolute bottom-[30px] right-[4%] w-16 h-16 text-black dark:text-white hidden lg:block" />

        {/* Left Column Accent Text ("Graphic Design / Illustration" in image) */}
        <div className="lg:col-span-3 text-left hidden lg:block">
          {/* <h4 className="font-serif text-3xl font-normal leading-tight text-black dark:text-white">
            Dual Models
          </h4>
          <h4 className="font-serif text-3xl italic font-normal text-slate-600 dark:text-slate-400">
            Evaluation
          </h4> */}
          <div className="w-16 h-1 bg-[#5CA1E6] mt-4 border border-black dark:border-white" />
        </div>

        {/* Center Card (Fighters Sketch - matching reference portfolio mockup) */}
        <div className="lg:col-span-6 flex flex-col justify-center items-center">
          
          {/* The Solid Black backing block of the reference image */}
          <div className="relative p-2 bg-black dark:bg-white border-[3px] border-black dark:border-white shadow-[10px_10px_0px_0px_#5CA1E6]">
            
            {/* Star decal overlapping the frame */}
            <DoodleStar className="absolute bottom-[-15px] right-[-15px] w-10 h-10 text-white dark:text-black border-2 border-black dark:border-white bg-white dark:bg-black p-1 rounded-full z-20 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]" />
            
            {/* Frame Container */}
            <div className="bg-[#FAF9F5] dark:bg-slate-900 border-2 border-black dark:border-white p-2">
              <img 
                src="/hero.png" 
                alt="Duel Arena Pencil Sketch" 
                className="max-h-[320px] w-full object-contain block select-none border-2 border-black dark:border-white bg-white"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80";
                }}
              />
            </div>
          </div>

          {/* Sub-label under card */}
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-slate-500">
            / GRAPHMODE STATEFUL
          </p>
        </div>

        {/* Right Column Accent Text ("Photo Graph / Video Edit" in image) */}
        <div className="lg:col-span-3 text-right hidden lg:block">
          <h4 className="font-serif text-3xl font-normal leading-tight text-black dark:text-white">
            State Graph
          </h4>
          <h4 className="font-serif text-3xl italic font-normal text-slate-600 dark:text-slate-400">
            Workflow
          </h4>
          <div className="w-16 h-1 bg-[#5CA1E6] mt-4 ml-auto border border-black dark:border-white" />
        </div>

      </div>

      {/* Bottom Corner Accent ("2022 until 2024 / GAMEMODE CREATIVE" styled label) */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row justify-between items-center mt-4 mb-16 gap-6 px-4">
        <div className="flex gap-2">
          
          
          <p className="font-mono text-xs text-slate-600 dark:text-slate-400 uppercase tracking-widest">
            COMPETITIVE / ARENA RUNTIME
          </p>
        </div>
        
        <div className="text-center sm:text-right">
          <p className="font-display text-3xl font-black tracking-tighter text-black dark:text-white leading-none">
            D1.0
          </p>
          <p className="font-mono text-xs uppercase tracking-widest text-[#5CA1E6] font-bold mt-1">
            / GAMEMODE COMPETITIVE
          </p>
        </div>
      </div>
    </>
  );
}
