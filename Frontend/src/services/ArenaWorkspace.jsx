import React from 'react';
import Navbar from '../app/components/Navbar';
import ArenaHeader from './ArenaHeader';
import ArenaMainSpace from './ArenaMainSpace';
import ArenaChatArea from './ArenaChatArea';

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
    <div className="min-h-screen bg-grid-paper bg-[#FAF9F5] dark:bg-[#0B0B0C] flex flex-col relative overflow-hidden transition-colors duration-300">
      
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

      {/* Main Workspace Scroll Frame */}
      <div className="flex-1 flex flex-col p-6 max-w-7xl w-full mx-auto space-y-6 pb-28 relative z-10">
        
        {/* Connection status and Active prompt headers */}
        <ArenaHeader 
          user={user}
          activeQuestion={activeQuestion}
        />

        {/* Dual comparing models and arbitrator landscape cards */}
        <ArenaMainSpace 
          isLoading={isLoading}
          battleResult={battleResult}
          errorMessage={errorMessage}
        />

      </div>

      {/* Floating Bottom Chat / Question Input Area */}
      <ArenaChatArea 
        promptInput={promptInput}
        onPromptChange={onPromptChange}
        onDuelSubmit={onDuelSubmit}
        isLoading={isLoading}
      />

    </div>
  );
}
