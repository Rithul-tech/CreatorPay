import React from 'react';

interface CreatorPayLogoProps {
  theme?: 'dark' | 'light';
  className?: string;
  iconOnly?: boolean;
}

export default function CreatorPayLogo({ theme = 'dark', className = '', iconOnly = false }: CreatorPayLogoProps) {
  const isDark = theme === 'dark';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Precision SVG Brand Logo Icon */}
      <svg
        width="34"
        height="34"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Bar 1 (Short) */}
        <rect
          x="4"
          y="26"
          width="6"
          height="14"
          rx="1"
          fill="#10B981"
          className="transition-colors duration-100"
        />
        
        {/* Bar 2 (Medium) */}
        <rect
          x="13"
          y="17"
          width="6"
          height="23"
          rx="1"
          fill="#10B981"
          className="transition-colors duration-100"
        />
        
        {/* Bar 3 (Tall Stem) */}
        <rect
          x="22"
          y="17"
          width="6"
          height="23"
          rx="1"
          fill="#10B981"
          className="transition-colors duration-100"
        />

        {/* Upward Trend Arrow coming out of Bar 3 */}
        <path
          d="M25 21L36 10"
          stroke="#10B981"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M30 10H36V16"
          stroke="#10B981"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {!iconOnly && (
        <span
          className={`text-xl font-bold tracking-tight font-sans transition-colors duration-100 ${
            isDark ? 'text-white' : 'text-zinc-900'
          }`}
        >
          Creator<span className={isDark ? 'text-white' : 'text-zinc-900'}>Pay</span>
        </span>
      )}
    </div>
  );
}
