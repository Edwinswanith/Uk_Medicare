import React from 'react';

// Laparoscopic instruments / forceps icon for Gallbladder
export const LaparoscopicIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Crossed laparoscopic graspers */}
    {/* Instrument 1 */}
    <path d="M18 52 C14 52 12 48 14 44 C16 40 20 42 22 46 L38 24 L46 22 L44 14" />
    <circle cx="16" cy="48" r="4" fill="none" />
    {/* Instrument 2 */}
    <path d="M46 52 C50 52 52 48 50 44 C48 40 44 42 42 46 L26 24 L18 22 L20 14" />
    <circle cx="48" cy="48" r="4" fill="none" />
    {/* Center pivot */}
    <circle cx="32" cy="35" r="2.5" fill="currentColor" stroke="none" />
    {/* Jaw tips */}
    <path d="M29 16 L32 10 L35 16" />
  </svg>
);

// Stomach / GI Reflux icon for Acid Reflux & Heartburn
export const StomachRefluxIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Oesophagus */}
    <path d="M30 8 L30 20 C30 22 34 22 34 20 L34 8" />
    {/* Gastro-oesophageal junction / stomach pouch */}
    <path d="M30 20 C22 21 16 28 16 38 C16 48 24 56 36 56 C47 56 50 47 48 40 C46 34 39 33 36 30 C34 27 34 22 34 20" />
    {/* Inner reflux wave */}
    <path d="M24 40 C28 37 32 44 38 41 C41 39 42 36 43 35" strokeWidth="2" strokeDasharray="1 1" />
  </svg>
);

// Hernia defect / abdominal wall icon for Hernia Repair
export const HerniaIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Abdominal wall contour left */}
    <path d="M16 12 C24 16 26 24 24 30 C22 36 24 44 16 52" />
    {/* Abdominal wall contour right */}
    <path d="M48 12 C40 16 38 24 40 30 C42 36 40 44 48 52" />
    {/* Hernial bulge in center */}
    <path d="M26 26 C26 20 38 20 38 26 C38 34 44 38 42 44 C40 48 24 48 22 44 C20 38 26 34 26 26 Z" />
    {/* Internal repair mesh / barrier */}
    <line x1="28" y1="34" x2="36" y2="34" strokeWidth="2" strokeDasharray="2 2" />
    <line x1="27" y1="38" x2="37" y2="38" strokeWidth="2" strokeDasharray="2 2" />
  </svg>
);
