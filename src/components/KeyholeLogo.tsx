import React from 'react';

export const KeyholeLogo: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="silverRing" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e2e8f0" />
        <stop offset="25%" stopColor="#f8fafc" />
        <stop offset="60%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
      <radialGradient id="innerGlow" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="80%" stopColor="#f1f5f9" />
        <stop offset="100%" stopColor="#e2e8f0" />
      </radialGradient>
      <linearGradient id="keyholeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0f172a" />
        <stop offset="50%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#020617" />
      </linearGradient>
      <linearGradient id="innerBevel" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#64748b" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    
    {/* Outer 3D metallic circular ring */}
    <circle cx="50" cy="50" r="46" stroke="url(#silverRing)" strokeWidth="7" fill="url(#innerGlow)" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.15))" />
    <circle cx="50" cy="50" r="41.5" stroke="url(#innerBevel)" strokeWidth="1.5" />

    {/* Center Keyhole Shape */}
    <g fill="url(#keyholeGrad)">
      {/* Upper Keyhole Circle */}
      <circle cx="50" cy="38" r="13" />
      {/* Lower Keyhole Stem */}
      <path d="M43 42 L36 71 C35.5 73.5 37 75.5 39.5 75.5 L60.5 75.5 C63 75.5 64.5 73.5 64 71 L57 42 Z" />
    </g>

    {/* Subtle highlight gleam */}
    <ellipse cx="44" cy="34" rx="4" ry="2.5" fill="#ffffff" fillOpacity="0.15" transform="rotate(-30 44 34)" />
  </svg>
);
