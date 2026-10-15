'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandLogo } from './BrandLogo';
import { 
  Phone, 
  MessageCircle, 
  Clock, 
  ShieldCheck, 
  Menu, 
  X, 
  Compass, 
  Search,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'الرئيسية', href: '/' },
    { name: 'عروض العمرة', href: '/packages' },
    { name: 'شعبان ورمضان', href: '/packages/omra-chaban-ramadan' },
    { name: 'عمرة تركيا', href: '/packages/omra-via-turquie-istanbul' },
    { name: 'دليل المعتمر', href: '/blog' },
    { name: 'تتبع الحجز', href: '/track' },
    { name: 'فضاء المعتمر', href: '/my-account' },
    { name: 'اتصل بنا', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gold-200/40">
      {/* Top Banner Bar */}
      <div className="bg-primary-950 text-white text-xs py-2 px-4 sm:px-8 border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Right side in RTL (Agency info) */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <div className="flex items-center gap-1.5 text-gold-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              <span>وكالة أسفار مرخصة ومعتمدة لتنظيم رحلات العمرة بالمغرب</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-emerald-200/80">
              <Clock className="w-3.5 h-3.5" />
              <span>خدمة المعتمرين على مدار 24 ساعة</span>
            </div>
          </div>

          {/* Left side in RTL (Contact numbers & Admin shortcut) */}
          <div className="flex items-center gap-3 sm:gap-5">
            <a 
              href="tel:0662574740" 
              className="flex items-center gap-1.5 text-white hover:text-gold-300 transition-colors font-bold tracking-wide"
            >
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <span dir="ltr">0662 57 47 40</span>
            </a>
            <span className="text-emerald-800">|</span>
            <a 
              href="https://wa.me/212662574740?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%B9%D8%B1%D9%88%D8%B6%20%D8%A7%D9%84%D8%B9%D9%85%D8%B1%D8%A9"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 transition-colors font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>واتساب الوكالة</span>
            </a>
            <span className="text-emerald-800">|</span>
            <Link 
              href="/admin" 
              className="flex items-center gap-1 text-slate-300 hover:text-gold-300 transition-colors text-[11px]"
            >
              <Lock className="w-3 h-3 text-gold-400/80" />
              <span>لوحة الإدارة</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <BrandLogo variant="dark" size="md" />

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  active
                    ? 'text-primary-900 bg-primary-50 font-bold border-b-2 border-gold-500'
                    : 'text-slate-700 hover:text-primary-900 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Search */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/packages"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-gradient text-slate-900 font-bold text-sm shadow-gold hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Compass className="w-4 h-4 text-slate-950" />
            <span>استكشف الرحلات</span>
          </Link>
        </div>

        {/* Mobile menu hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="القائمة الرئيسية"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-5 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200 shadow-xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-base font-semibold transition-colors ${
                  isActive(link.href)
                    ? 'bg-primary-900 text-white'
                    : 'text-slate-800 hover:bg-slate-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <Link
              href="/packages"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl bg-gold-gradient text-slate-950 font-bold text-base shadow-gold"
            >
              استكشف كافة عروض العمرة
            </Link>
            <a
              href="tel:0662574740"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 text-slate-800 font-semibold text-sm"
            >
              <Phone className="w-4 h-4 text-primary-800" />
              <span>اتصل بنا: 0662574740</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
