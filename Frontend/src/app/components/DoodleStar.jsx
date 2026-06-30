import React from 'react';

export default function DoodleStar({ className }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
      <path d="M50 0 C53 35, 65 47, 100 50 C65 53, 53 65, 50 100 C47 65, 35 53, 0 50 C35 47, 47 35, 50 0 Z" />
    </svg>
  );
}
