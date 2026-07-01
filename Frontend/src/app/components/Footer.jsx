import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-8 text-center text-xs font-black uppercase tracking-wider text-black dark:text-white border-t-3 border-black dark:border-white mt-12 relative z-10 bg-transparent">
      <p>© {new Date().getFullYear()} DuelArena. All rights reserved. Created without the sweat and blood of a DUEL.</p>
    </footer>
  );
}
