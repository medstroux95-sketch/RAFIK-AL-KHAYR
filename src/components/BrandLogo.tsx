import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  size = 'md',
  showSubtitle = true
}) => {
  const isLight = variant === 'light';
  
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <Link href="/" className="inline-flex items-center gap-3 group select-none">
      {/* Monogram Emblem */}
      <div className={`relative flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 shadow-md ${iconSizes[size]} ${
        isLight 
          ? 'bg-gradient-to-br from-gold-500 via-gold-400 to-gold-600 text-slate-900 ring-2 ring-gold-300/40' 
          : 'bg-gradient-to-br from-primary-900 to-primary-950 text-gold-400 ring-2 ring-primary-700/50'
      }`}>
        {/* Stylized RA Monogram with Airplane */}
        <svg viewBox="0 0 100 100" className="w-4/5 h-4/5 fill-current" xmlns="http://www.w3.org/2000/svg">
          {/* RA Monogram */}
          <text x="18" y="72" fontFamily="'Amiri', 'Cairo', serif" fontWeight="bold" fontSize="60" fill="currentColor">
            RA
          </text>
          {/* Airplane Swoosh */}
          <path d="M25 80 Q 55 50 82 25" stroke={isLight ? '#064e3b' : '#d4af37'} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M78 22 L 86 23 L 83 31 Z" fill={isLight ? '#064e3b' : '#d4af37'} />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col text-right">
        <div className="flex items-center gap-1.5">
          <span className={`font-extrabold tracking-tight font-cairo ${textSizes[size]} ${
            isLight ? 'text-white' : 'text-primary-950'
          }`}>
            رفـيـق الـخـيـر
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
        </div>
        {showSubtitle && (
          <div className="flex items-center justify-between gap-1 text-[10px] tracking-wider font-medium">
            <span className={isLight ? 'text-gold-300' : 'text-gold-700 font-semibold'}>
              RAFIQ AL KHAIR
            </span>
            <span className={isLight ? 'text-emerald-200/80' : 'text-slate-500'}>
              للسفر والسياحة
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};
