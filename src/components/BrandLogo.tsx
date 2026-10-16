import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
      {/* Logo Image */}
      <div className={`relative transition-transform duration-300 group-hover:scale-105 rounded-xl bg-white shadow-md p-1 ${iconSizes[size]}`}>
        <Image
          src="/images/brand/Logo Rafiq Al Khair.png"
          alt="رفيق الخير"
          fill
          className="object-contain p-0.5"
          priority
        />
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
