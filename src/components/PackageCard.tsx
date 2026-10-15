'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { UmrahPackage, RoomType } from '@/types';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Plane, 
  Hotel, 
  ShieldCheck, 
  Users, 
  ChevronLeft, 
  MessageCircle, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface PackageCardProps {
  pkg: UmrahPackage;
  featured?: boolean;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg, featured = false }) => {
  // Allow user to toggle room type on the card to see prices immediately!
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType>(
    pkg.roomOptions[0]?.type || 'quad'
  );

  const selectedRoom = pkg.roomOptions.find(r => r.type === selectedRoomType) || pkg.roomOptions[0];
  const price = selectedRoom ? selectedRoom.price : pkg.startingPrice;

  const seatsRemaining = Math.max(0, pkg.seatsTotal - pkg.seatsBooked);
  const percentFilled = Math.min(100, Math.round((pkg.seatsBooked / pkg.seatsTotal) * 100));

  const whatsappMessage = encodeURIComponent(
    `السلام عليكم ورحمة الله، أرغب في الاستفسار عن ${pkg.title} (${selectedRoom?.label || 'غرفة'}) بسعر ${price.toLocaleString('ar-MA')} درهم. المرجو تزويدي بكافة التفاصيل.`
  );

  return (
    <div className={`group bg-white rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-2xl flex flex-col justify-between ${
      featured 
        ? 'border-gold-300/80 ring-1 ring-gold-400/40 shadow-luxury' 
        : 'border-slate-200/90 hover:border-emerald-300'
    }`}>
      {/* Card Header & Media */}
      <div>
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={featured}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

          {/* Badges Overlay */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-gold-gradient text-slate-950 shadow-md flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>{pkg.categoryLabel}</span>
            </span>
            {pkg.rawadaAvailable && (
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-primary-900/90 text-emerald-200 border border-emerald-500/30 backdrop-blur-md">
                الروضة الشريفة متاحة ✓
              </span>
            )}
          </div>

          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gold-400" />
              <span>{pkg.durationDays} يوم</span>
            </span>
          </div>

          {/* Bottom Title on Image */}
          <div className="absolute bottom-4 right-4 left-4 z-10 text-white">
            <div className="flex items-center gap-2 text-xs text-emerald-300 font-medium mb-1">
              <MapPin className="w-3.5 h-3.5 text-gold-400" />
              <span>انطلاق من: {pkg.departureCity}</span>
            </div>
            <h3 className="text-xl font-extrabold text-white group-hover:text-gold-300 transition-colors line-clamp-1">
              {pkg.title}
            </h3>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-5">
          {/* Subtitle / Key highlights */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {pkg.subtitle}
          </p>

          {/* Travel Dates & Airlines */}
          <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-2xl text-xs border border-slate-100">
            <div className="flex items-center gap-2 text-slate-700">
              <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px]">تاريخ الذهاب</span>
                <span className="font-bold text-slate-900">{pkg.departureDate}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Plane className="w-4 h-4 text-emerald-700 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px]">الطيران</span>
                <span className="font-bold text-slate-900 truncate block">{pkg.airline.split('/')[0]}</span>
              </div>
            </div>
          </div>

          {/* Room Type Selector with Interactive Price Display */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 font-semibold">نوع الغرفة والتسعيرة:</span>
              <span className="text-[11px] text-emerald-800 font-bold">للمعتمر الواحد</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {pkg.roomOptions.map((room) => {
                const isSelected = selectedRoomType === room.type;
                return (
                  <button
                    key={room.type + room.label}
                    type="button"
                    onClick={() => setSelectedRoomType(room.type)}
                    className={`py-2 px-1.5 rounded-xl text-center transition-all ${
                      isSelected
                        ? 'bg-primary-900 text-white shadow-sm ring-2 ring-gold-400'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                    }`}
                  >
                    <div className="text-[11px] font-bold truncate">{room.label.split(' ')[1] || room.label}</div>
                    <div className={`text-[10px] font-extrabold ${isSelected ? 'text-gold-300' : 'text-slate-900'}`}>
                      {room.price.toLocaleString('ar-MA')} د.م
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Included Features Bullet Points */}
          <div className="space-y-1.5 pt-1 border-t border-slate-100">
            {pkg.includedServices.slice(0, 3).map((inc, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{inc}</span>
              </div>
            ))}
          </div>

          {/* Seats left indicator */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-[11px] mb-1 font-semibold">
              <span className="text-slate-500">حالة المقاعد المتاحة</span>
              <span className={seatsRemaining < 10 ? 'text-rose-600 font-bold' : 'text-emerald-700'}>
                {seatsRemaining > 0 ? `متبقي ${seatsRemaining} مقاعد` : 'اكتملت المقاعد'}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  percentFilled > 80 ? 'bg-amber-500' : 'bg-emerald-600'
                }`}
                style={{ width: `${percentFilled}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer: Price & Actions */}
      <div className="p-6 pt-0 space-y-3">
        <div className="flex items-baseline justify-between pt-4 border-t border-slate-100">
          <div>
            <span className="text-[11px] text-slate-500 block">السعر الإجمالي للبرنامج</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-primary-950 font-cairo">
                {price.toLocaleString('ar-MA')}
              </span>
              <span className="text-xs font-bold text-gold-700">درهم مغربي</span>
            </div>
          </div>
          <div className="text-left text-[11px] text-slate-400">
            شامل كافة الرسوم
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-5 gap-2">
          <Link
            href={`/booking/${pkg.id}?room=${selectedRoomType}`}
            className="col-span-3 flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-gold-gradient text-slate-950 font-bold text-xs sm:text-sm shadow-gold hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>احجز الآن</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>

          <Link
            href={`/packages/${pkg.slug}`}
            className="col-span-1 flex items-center justify-center py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
            title="تفاصيل البرنامج"
          >
            التفاصيل
          </Link>

          <a
            href={`https://wa.me/212662574740?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-1 flex items-center justify-center py-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
            title="استفسار عبر واتساب"
          >
            <MessageCircle className="w-4 h-4 fill-emerald-600 text-white" />
          </a>
        </div>
      </div>
    </div>
  );
};
