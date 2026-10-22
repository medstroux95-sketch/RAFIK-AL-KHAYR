'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Phone,
  MessageCircle,
  Menu,
  X,
  Compass,
  Lock,
  ChevronDown,
  MapPin,
  BookOpen,
  UserCircle,
  PackageSearch,
  Headphones,
} from 'lucide-react';

/* ──────────────────────────────────────────────
   Nav Data
────────────────────────────────────────────── */
const mainLinks = [
  { name: 'الرئيسية', href: '/' },
  { name: 'دليل المعتمر', href: '/blog', icon: BookOpen },
  { name: 'تتبع الحجز', href: '/track', icon: PackageSearch },
  { name: 'فضاء المعتمر', href: '/my-account', icon: UserCircle },
  { name: 'اتصل بنا', href: '/contact', icon: Headphones },
];

const packageLinks = [
  { name: 'جميع العروض', href: '/packages', icon: Compass },
  { name: 'شعبان ورمضان', href: '/packages/omra-chaban-ramadan', icon: MapPin },
  { name: 'عمرة تركيا', href: '/packages/omra-via-turquie-istanbul', icon: MapPin },
];

/* ──────────────────────────────────────────────
   Dropdown Component
────────────────────────────────────────────── */
function PackagesDropdown({
  isActive,
  isTransparent,
}: {
  isActive: boolean;
  isTransparent: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
          isActive
            ? 'text-gold-500 font-bold border-b-2 border-gold-400 bg-gold-500/10 shadow-sm'
            : isTransparent
            ? 'text-white hover:text-gold-400 drop-shadow-sm'
            : 'text-primary-950 dark:text-slate-200 hover:text-gold-600 dark:hover:text-gold-400 hover:bg-gold-500/10'
        }`}
      >
        عروض العمرة
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute top-full mt-2 right-0 w-56 bg-primary-950/98 backdrop-blur-xl border border-gold-500/30 rounded-xl shadow-2xl overflow-hidden z-50 animate-in slide-in-from-top-2 duration-150">
          {packageLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-slate-200 hover:bg-white/10 hover:text-gold-400 transition-colors border-b border-white/5 last:border-0"
              >
                <Icon className="w-4 h-4 text-gold-400/70 shrink-0" />
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Main Navbar
────────────────────────────────────────────── */
export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobilePackagesOpen, setMobilePackagesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Ensure clean default light theme without dark mode
    document.documentElement.classList.remove('dark');
    try {
      localStorage.removeItem('rak_theme');
    } catch {}
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const isPackageActive = packageLinks.some((l) => pathname.startsWith(l.href));
  const isHome = pathname === '/';
  const isTransparent = isHome && !isScrolled;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/98 backdrop-blur-md shadow-md border-b border-slate-200"
      >
        {/* ── Top Banner ── */}
        <div className="text-white text-xs py-1.5 px-4 transition-all duration-300 bg-primary-950 border-b border-gold-500/30">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 flex-wrap">
            {/* Right — badge */}
            <span className="text-gold-400 font-semibold text-[11px] hidden sm:block">
              ✦ وكالة أسفار مرخصة ومعتمدة لتنظيم رحلات العمرة بالمغرب
            </span>
            <span className="text-gold-400 font-semibold text-[11px] sm:hidden">
              ✦ وكالة أسفار معتمدة
            </span>

            {/* Left — contacts */}
            <div className="flex items-center gap-3">
              <a
                href="tel:0662574740"
                className="flex items-center gap-1.5 text-white hover:text-gold-300 transition-colors font-bold"
                dir="ltr"
              >
                <Phone className="w-3 h-3 text-gold-400" />
                0662 57 47 40
              </a>
              <span className="text-white/20">|</span>
              <a
                href="https://wa.me/212662574740?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%2C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%B9%D8%B1%D9%88%D8%B6%20%D8%A7%D9%84%D8%B9%D9%85%D8%B1%D8%A9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-gold-300 hover:text-gold-200 transition-colors"
              >
                <MessageCircle className="w-3 h-3" />
                <span className="hidden sm:inline">واتساب</span>
              </a>
              <span className="text-white/20">|</span>
              <Link
                href="/admin"
                className="flex items-center gap-1 text-slate-300 hover:text-gold-300 transition-colors text-[10px]"
              >
                <Lock className="w-3 h-3 text-gold-400/70" />
                <span className="hidden sm:inline">الإدارة</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Main Nav Bar ── */}
        <div className="w-full transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2.5 group shrink-0 select-none">
              <div className="relative w-10 h-10 rounded-xl bg-white shadow-md p-0.5 transition-transform duration-300 group-hover:scale-105 shrink-0 border border-slate-200/50">
                <Image
                  src="/images/brand/Logo Rafiq Al Khair.png"
                  alt="رفيق الخير"
                  fill
                  className="object-contain p-0.5"
                  priority
                />
              </div>
              <div className="flex flex-col text-right leading-tight">
                <span className="font-extrabold text-xl tracking-tight font-cairo text-primary-950">
                  رفيق الخير
                </span>
                <span className="text-[10px] font-medium tracking-widest text-gold-700">
                  للسفر والسياحة
                </span>
              </div>
            </Link>

            {/* Desktop Links */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {/* عروض العمرة dropdown */}
              <PackagesDropdown
                isActive={isPackageActive}
                isTransparent={false}
              />

              {/* Other links */}
              {mainLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                      active
                        ? 'text-gold-700 bg-gold-500/10 font-bold border-b-2 border-gold-500 shadow-sm'
                        : 'text-primary-950 hover:text-gold-600 hover:bg-gold-500/10'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* CTA Button */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden sm:flex items-center">
                <Link
                  href="/packages"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-gradient text-slate-950 font-extrabold text-sm shadow-gold hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
                >
                  <Compass className="w-4 h-4 shrink-0" />
                  <span>استكشف الرحلات</span>
                </Link>
              </div>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors shrink-0"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-primary-950/98 backdrop-blur-xl border-t border-gold-500/20 shadow-2xl">
            <div className="max-w-7xl mx-auto px-5 py-5 space-y-1">
              {/* Packages accordion */}
              <button
                onClick={() => setMobilePackagesOpen(!mobilePackagesOpen)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-semibold transition-colors ${
                  isPackageActive
                    ? 'bg-gold-500 text-slate-950'
                    : 'text-slate-200 hover:bg-white/10 hover:text-gold-400'
                }`}
              >
                <span>عروض العمرة</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    mobilePackagesOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {mobilePackagesOpen && (
                <div className="mr-4 border-r border-gold-500/30 pr-4 space-y-1 pb-1">
                  {packageLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isActive(link.href)
                            ? 'text-gold-400 font-bold'
                            : 'text-slate-300 hover:text-gold-400'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-gold-400/60 shrink-0" />
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Main links */}
              {mainLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-semibold transition-colors ${
                      isActive(link.href)
                        ? 'bg-gold-500 text-slate-950 font-bold'
                        : 'text-slate-200 hover:bg-white/10 hover:text-gold-400'
                    }`}
                  >
                    {Icon && <Icon className="w-5 h-5 shrink-0 opacity-70" />}
                    {link.name}
                  </Link>
                );
              })}

              {/* Bottom actions */}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <Link
                  href="/packages"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-base shadow-gold"
                >
                  استكشف كافة عروض العمرة
                </Link>

                <a
                  href="tel:0662574740"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold-400" />
                  <span dir="ltr">0662 57 47 40</span>
                </a>
                <a
                  href="https://wa.me/212662574740"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-gold-300 border border-gold-500/20 font-semibold text-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  تواصل عبر واتساب
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer for non-home pages */}
      {!isHome && (
        <div className="h-[108px] w-full shrink-0" aria-hidden="true" />
      )}
    </>
  );
};
