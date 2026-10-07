import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  inverted?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = false,
  inverted = false
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }[size];

  const titleSizes = {
    sm: 'text-base font-semibold',
    md: 'text-xl font-bold',
    lg: 'text-2xl font-bold tracking-tight',
    xl: 'text-3xl font-extrabold tracking-tight'
  }[size];

  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className={`relative ${iconDimensions} flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 shadow-md shadow-emerald-900/20 ring-1 ring-emerald-500/30 overflow-hidden`}>
        {/* Background scanlines */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:6px_6px]" />
        
        {/* SVG Cattle Head Silhouette + Circuit Elements */}
        <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] text-white fill-none stroke-current" strokeWidth="2.5">
          {/* Lyre Horns */}
          <path d="M 28 36 C 22 22, 34 18, 38 27 C 42 32, 44 38, 44 38" strokeLinecap="round" stroke="#a7f3d0" strokeWidth="3.5" />
          <path d="M 72 36 C 78 22, 66 18, 62 27 C 58 32, 56 38, 56 38" strokeLinecap="round" stroke="#a7f3d0" strokeWidth="3.5" />
          
          {/* Cattle Head Shape */}
          <path d="M 36 38 C 36 33, 64 33, 64 38 C 67 48, 63 65, 58 74 C 55 78, 45 78, 42 74 C 37 65, 33 48, 36 38 Z" fill="#ffffff" stroke="none" />
          
          {/* Circuit Neural Nodes */}
          <circle cx="50" cy="46" r="3.5" fill="#047857" stroke="#ffffff" strokeWidth="1" />
          <circle cx="43" cy="56" r="2.8" fill="#059669" stroke="#ffffff" strokeWidth="1" />
          <circle cx="57" cy="56" r="2.8" fill="#059669" stroke="#ffffff" strokeWidth="1" />
          
          {/* Neural Connections */}
          <line x1="50" y1="46" x2="43" y2="56" stroke="#047857" strokeWidth="1.8" />
          <line x1="50" y1="46" x2="57" y2="56" stroke="#047857" strokeWidth="1.8" />
          <line x1="43" y1="56" x2="57" y2="56" stroke="#047857" strokeWidth="1.2" strokeDasharray="2 1" />
          
          {/* Muzzle */}
          <ellipse cx="50" cy="69" rx="6.5" ry="4" fill="#e2e8f0" stroke="none" />
          <circle cx="47.8" cy="69" r="1" fill="#0f172a" />
          <circle cx="52.2" cy="69" r="1" fill="#0f172a" />

          {/* AI Reticle Corners */}
          <path d="M 18 24 L 18 18 L 24 18" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 82 24 L 82 18 L 76 18" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 18 76 L 18 82 L 24 82" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 82 76 L 82 82 L 76 82" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
        </svg>

        {/* Pulse beacon */}
        <span className="absolute top-1 right-1 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300"></span>
        </span>
      </div>

      <div className="flex flex-col leading-none">
        <span className={`${titleSizes} ${inverted ? 'text-white' : 'text-slate-900 dark:text-white'} font-heading flex items-center gap-1.5`}>
          <span>Cattle</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">Recognition</span>
        </span>
        {showTagline && (
          <span className={`text-[11px] tracking-wide font-medium mt-0.5 ${inverted ? 'text-emerald-200' : 'text-emerald-700 dark:text-emerald-300'}`}>
            AI-Powered Cattle Breed Recognition & Livestock Information
          </span>
        )}
      </div>
    </div>
  );
};
