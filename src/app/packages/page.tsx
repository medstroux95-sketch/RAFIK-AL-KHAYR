import React from 'react';
import { getPackages } from '@/lib/db';
import { PackageCard } from '@/components/PackageCard';
import { Sparkles, Filter, Search, Compass } from 'lucide-react';
import PackagesFilterClient from './PackagesFilterClient';

export const revalidate = 0;

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const packages = await getPackages();

  return (
    <div className="bg-[#fcfbf7] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="bg-primary-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-emerald-900">
          <div className="absolute top-0 left-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-gold-400 bg-emerald-900/80 px-3 py-1 rounded-full border border-gold-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>كتالوج عروض العمرة الرسمية 1446 / 2026</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-cairo">
              عروض ورحلات العمرة من المغرب
            </h1>
            <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed">
              تصفح برامج العمرة المعتمدة لدى وكالة رفيق الخير، وقارن بين البرامج الاقتصادية، المتوسطة، والفاخرة، مع إمكانية الحجز الإلكتروني الفوري وتأكيد المقعد بدفع العربون.
            </p>
          </div>
        </div>

        {/* Interactive Filter and Packages Catalog Client Component */}
        <PackagesFilterClient initialPackages={packages} initialCategory={searchParams.category} />

      </div>
    </div>
  );
}
