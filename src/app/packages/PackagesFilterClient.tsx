'use client';

import React, { useState, useMemo } from 'react';
import { UmrahPackage } from '@/types';
import { PackageCard } from '@/components/PackageCard';
import { Search, Filter, SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';

interface PackagesFilterClientProps {
  initialPackages: UmrahPackage[];
  initialCategory?: string;
}

export default function PackagesFilterClient({
  initialPackages,
  initialCategory = 'all',
}: PackagesFilterClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'duration'>('price_asc');
  const [maxPrice, setMaxPrice] = useState<number>(30000);

  const categories = [
    { id: 'all', label: 'كافة العروض' },
    { id: 'ramadan', label: 'عمرة شعبان ورمضان' },
    { id: 'turkey', label: 'عمرة عبر تركيا' },
    { id: 'economic', label: 'البرنامج الاقتصادي' },
    { id: 'medium', label: 'البرنامج المتوسط' },
  ];

  const filteredPackages = useMemo(() => {
    return initialPackages.filter((pkg) => {
      // Status
      if (pkg.status !== 'active') return false;

      // Category
      if (selectedCategory !== 'all' && pkg.category !== selectedCategory) {
        return false;
      }

      // Max price
      if (pkg.startingPrice > maxPrice) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = pkg.title.toLowerCase().includes(query);
        const matchesSubtitle = pkg.subtitle.toLowerCase().includes(query);
        const matchesCity = pkg.departureCity.toLowerCase().includes(query) ||
                            pkg.destinationCities.some(c => c.toLowerCase().includes(query));
        const matchesHotel = pkg.hotels.some(h => h.name.toLowerCase().includes(query));
        if (!matchesTitle && !matchesSubtitle && !matchesCity && !matchesHotel) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.startingPrice - b.startingPrice;
      if (sortBy === 'price_desc') return b.startingPrice - a.startingPrice;
      if (sortBy === 'duration') return b.durationDays - a.durationDays;
      return 0;
    });
  }, [initialPackages, selectedCategory, maxPrice, searchQuery, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setMaxPrice(30000);
    setSortBy('price_asc');
  };

  return (
    <div className="space-y-8">
      {/* Filter Controls Bar */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/90 space-y-6">
        
        {/* Top search & Sort */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="ابحث بالاسم، الفندق، أو مدينة الانطلاق..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs font-medium p-3.5 pr-10 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-4" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-3.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                مسح
              </button>
            )}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <label className="text-xs font-bold text-slate-600 whitespace-nowrap flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-800" />
              <span>ترتيب حسب:</span>
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-semibold p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
            >
              <option value="price_asc">السعر: من الأقل إلى الأعلى</option>
              <option value="price_desc">السعر: من الأعلى إلى الأقل</option>
              <option value="duration">مدة الرحلة (الأطول)</option>
            </select>
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-slate-100 pt-4">
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap pl-2">الفئات:</span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-primary-900 text-gold-300 shadow-sm ring-1 ring-gold-400'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

      </div>

      {/* Results Count & Reset indicator */}
      <div className="flex items-center justify-between text-xs text-slate-600 px-2">
        <div>
          تم العثور على <span className="font-extrabold text-primary-950 text-sm">{filteredPackages.length}</span> عروض مطابقة
        </div>
        {(selectedCategory !== 'all' || searchQuery) && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-emerald-800 font-bold hover:underline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة ضبط التصفية</span>
          </button>
        )}
      </div>

      {/* Grid of Results */}
      {filteredPackages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">
            لم نتمكن من العثور على برامج تطابق خيارات البحث
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            يرجى تجربة البحث بكلمات أخرى أو إعادة ضبط التصفية للاطلاع على كافة رحلات العمرة المتاحة
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 rounded-xl bg-gold-gradient text-slate-950 text-xs font-bold shadow-gold"
          >
            عرض كافة العروض
          </button>
        </div>
      )}
    </div>
  );
}
