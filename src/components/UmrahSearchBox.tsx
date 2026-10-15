'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Building2, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

export const UmrahSearchBox: React.FC = () => {
  const router = useRouter();
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('all');
  const [travelers, setTravelers] = useState('2');
  const [season, setSeason] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (category !== 'all') params.set('category', category);
    if (travelers) params.set('travelers', travelers);
    router.push(`/packages?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto -mt-14 relative z-30 px-4 sm:px-6">
      <div className="bg-white/95 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-gold-200/60 ring-1 ring-gold-400/20">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-2">
            <div className="flex items-center gap-2 text-primary-950 font-bold text-sm sm:text-base">
              <Sparkles className="w-4 h-4 text-gold-500" />
              <span>محرك البحث عن برامج العمرة المعتمدة</span>
            </div>
            <span className="text-xs text-slate-500 hidden sm:inline">
              أسعار محدثة وشاملة بالدرهم المغربي
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Field 1: Departure City */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                <span>مدينة الانطلاق</span>
              </label>
              <div className="relative">
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs font-semibold p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 appearance-none"
                >
                  <option value="">كافة المدن (الدار البيضاء أساسي)</option>
                  <option value="الدار البيضاء">الدار البيضاء (مطار محمد الخامس)</option>
                  <option value="الرباط">الرباط</option>
                  <option value="مراكش">مراكش</option>
                  <option value="فاس">فاس</option>
                  <option value="طنجة">طنجة</option>
                  <option value="أكادير">أكادير</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Field 2: Program Category / Season */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                <span>فئة وموسم الرحلة</span>
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs font-semibold p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 appearance-none"
                >
                  <option value="all">كافة البرامج والمواسم</option>
                  <option value="ramadan">عمرة شعبان ورمضان 1446</option>
                  <option value="turkey">عمرة عبر تركيا (إسطنبول والحرمين)</option>
                  <option value="economic">البرنامج الاقتصادي الميسر</option>
                  <option value="medium">البرنامج المتوسط المريح</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Field 3: Number of Travelers */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-700" />
                <span>عدد المسافرين</span>
              </label>
              <div className="relative">
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  className="w-full text-xs font-semibold p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 appearance-none"
                >
                  <option value="1">معتمر واحد (فردي)</option>
                  <option value="2">معتمران (شخصين - ثنائي)</option>
                  <option value="3">3 معتمرين (ثلاثي)</option>
                  <option value="4">4 معتمرين (عائلة / رباعي)</option>
                  <option value="5">5 معتمرين أو أكثر</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Field 4: Submit Button */}
            <div className="space-y-1.5 flex flex-col justify-end">
              <label className="text-xs font-bold text-transparent hidden lg:block select-none">
                زر البحث
              </label>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gold-gradient hover:opacity-95 text-slate-950 font-extrabold text-sm shadow-gold transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Search className="w-4 h-4 text-slate-950" />
                <span>بحث عن العروض</span>
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};
