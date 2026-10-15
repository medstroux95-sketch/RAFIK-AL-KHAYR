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
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  MessageCircle, 
  ChevronLeft, 
  Share2,
  FileText,
  BadgeCheck,
  Check
} from 'lucide-react';

interface PackageDetailsClientProps {
  pkg: UmrahPackage;
  similarPackages: UmrahPackage[];
}

export const PackageDetailsClient: React.FC<PackageDetailsClientProps> = ({
  pkg,
  similarPackages,
}) => {
  const [activeImage, setActiveImage] = useState(pkg.gallery[0] || pkg.image);
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType>(
    pkg.roomOptions[0]?.type || 'quad'
  );
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [copied, setCopied] = useState(false);

  const selectedRoom = pkg.roomOptions.find(r => r.type === selectedRoomType) || pkg.roomOptions[0];
  const pricePerPerson = selectedRoom ? selectedRoom.price : pkg.startingPrice;
  const totalPrice = pricePerPerson * travelersCount;

  const seatsRemaining = Math.max(0, pkg.seatsTotal - pkg.seatsBooked);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `السلام عليكم ورحمة الله، أرغب في الاستفسار عن ${pkg.title}\nتاريخ السفر: ${pkg.departureDate}\nنوع الغرفة: ${selectedRoom?.label}\nعدد المسافرين: ${travelersCount}\nالسعر المقدر: ${totalPrice.toLocaleString('ar-MA')} درهم مغربي.`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-emerald-800 transition-colors">الرئيسية</Link>
        <span>/</span>
        <Link href="/packages" className="hover:text-emerald-800 transition-colors">عروض العمرة</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold truncate">{pkg.title}</span>
      </nav>

      {/* Main Header & Image Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Gallery & Highlights (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Active Image View */}
          <div className="relative h-80 sm:h-[450px] w-full rounded-3xl overflow-hidden bg-slate-950 shadow-xl border border-slate-200">
            <Image
              src={activeImage}
              alt={pkg.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <span className="px-4 py-1.5 rounded-full text-xs font-black bg-gold-gradient text-slate-950 shadow-md">
                {pkg.categoryLabel}
              </span>
              {pkg.rawadaAvailable && (
                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-900/90 text-emerald-200 border border-emerald-400/30 backdrop-blur-md">
                  الروضة الشريفة متاحة ✓
                </span>
              )}
            </div>

            <div className="absolute bottom-4 right-4 left-4 z-10 text-white">
              <span className="text-xs text-gold-400 font-bold block mb-1">
                وكالة رفيق الخير للسفر والسياحة
              </span>
              <h1 className="text-2xl sm:text-3xl font-black font-cairo">
                {pkg.title}
              </h1>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {pkg.gallery.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {pkg.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImage === img ? 'border-gold-500 scale-105 shadow-md' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`صورة ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Key Facts Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 block">مدة الرحلة</span>
              <span className="text-sm font-black text-slate-900">{pkg.durationDays} يوماً</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 block">ليالي مكة</span>
              <span className="text-sm font-black text-slate-900">{pkg.nightsMakkah} ليالٍ</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 block">ليالي المدينة</span>
              <span className="text-sm font-black text-slate-900">{pkg.nightsMadinah} ليالٍ</span>
            </div>
            {pkg.nightsIstanbul ? (
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 block">ليالي إسطنبول</span>
                <span className="text-sm font-black text-slate-900">{pkg.nightsIstanbul} ليالٍ</span>
              </div>
            ) : (
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 block">الانطلاق</span>
                <span className="text-sm font-black text-slate-900">الدار البيضاء</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Pricing & Instant Booking Card (5 cols) */}
        <div className="lg:col-span-5 sticky top-24 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gold-300/60 ring-1 ring-gold-200 space-y-6">
            
            {/* Price Header */}
            <div className="border-b border-slate-100 pb-5">
              <span className="text-xs text-slate-500 font-semibold block mb-1">
                سعر البرنامج المختار
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-primary-950 font-cairo">
                  {totalPrice.toLocaleString('ar-MA')}
                </span>
                <span className="text-sm font-bold text-gold-700">درهم مغربي (MAD)</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
                <span>{pricePerPerson.toLocaleString('ar-MA')} د.م للمعتمر الواحد</span>
                <span className="text-emerald-700 font-bold">شامل كافة الضرائب</span>
              </div>
            </div>

            {/* Room Type Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                اختر نوع الغرفة:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {pkg.roomOptions.map((room) => {
                  const isSelected = selectedRoomType === room.type;
                  return (
                    <button
                      key={room.type + room.label}
                      type="button"
                      onClick={() => setSelectedRoomType(room.type)}
                      className={`p-3 rounded-2xl text-right border transition-all ${
                        isSelected
                          ? 'border-primary-900 bg-primary-900 text-white shadow-md'
                          : 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <div className="font-bold text-xs">{room.label}</div>
                      <div className={`text-xs font-black mt-1 ${isSelected ? 'text-gold-300' : 'text-primary-950'}`}>
                        {room.price.toLocaleString('ar-MA')} د.م
                      </div>
                      {room.notes && (
                        <div className={`text-[10px] mt-1 line-clamp-1 ${isSelected ? 'text-emerald-200' : 'text-slate-500'}`}>
                          {room.notes}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Travelers Count Counter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">
                  عدد المعتمرين:
                </label>
                <span className="text-xs text-slate-500">
                  (بالغين وأطفال)
                </span>
              </div>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setTravelersCount(num)}
                    className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all ${
                      travelersCount === num
                        ? 'bg-gold-500 text-slate-950 shadow-sm ring-1 ring-gold-600'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Deposit terms highlight */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-primary-950">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>ميزة دفع العربون متاحة (30%)</span>
              </div>
              <p className="text-[11px] text-slate-600">
                يمكنك تثبيت حجزك الآن بدفع عربون بقيمة {Math.round(totalPrice * 0.3).toLocaleString('ar-MA')} درهم فقط، وسداد المتبقي قبل السفر.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <Link
                href={`/booking/${pkg.id}?room=${selectedRoomType}&count=${travelersCount}`}
                className="w-full py-4 rounded-2xl bg-gold-gradient text-slate-950 font-black text-base shadow-gold hover:shadow-xl transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>متابعة الحجز الإلكتروني</span>
                <ChevronLeft className="w-5 h-5 text-slate-950" />
              </Link>

              <a
                href={`https://wa.me/212662574740?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>استفسار فوري عبر واتساب (0662574740)</span>
              </a>

              <button
                type="button"
                onClick={handleShare}
                className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'تم نسخ رابط البرنامج بنجاح ✓' : 'مشاركة هذا العرض مع العائلة'}</span>
              </button>
            </div>

            {/* Seat capacity badge */}
            <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
              {seatsRemaining > 0 ? (
                <span className="text-emerald-700 font-semibold">
                  متبقي {seatsRemaining} مقاعد متاحة في هذه الرحلة
                </span>
              ) : (
                <span className="text-rose-600 font-bold">
                  اكتملت المقاعد المتاحة
                </span>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* Program Details Tabs & Information Sections */}
      <div className="space-y-12 pt-6">

        {/* 1. HOTELS & ACCOMMODATIONS */}
        <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-800">
              <Hotel className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-primary-950 font-cairo">
                فنادق الإقامة والمسافات عن الحرمين
              </h3>
              <p className="text-xs text-slate-500">
                فنادق موثقة ومجربة تضمن النظافة التامة والراحة
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pkg.hotels.map((hotel, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gold-700 bg-gold-100 px-2.5 py-1 rounded-full">
                    {hotel.city}
                  </span>
                  <span className="text-xs font-extrabold text-slate-700">
                    {'★'.repeat(hotel.stars)}
                  </span>
                </div>
                <h4 className="font-bold text-base text-slate-900">{hotel.name}</h4>
                {hotel.distanceToHaram && (
                  <p className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{hotel.distanceToHaram}</span>
                  </p>
                )}
                {hotel.mealPlan && (
                  <p className="text-xs text-slate-600 bg-white p-2 rounded-xl border border-slate-200/80">
                    🍽 {hotel.mealPlan}
                  </p>
                )}
                {hotel.description && (
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {hotel.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 2. FLIGHT DETAILS */}
        <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-800">
              <Plane className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-primary-950 font-cairo">
                تفاصيل الطيران والأمتعة
              </h3>
              <p className="text-xs text-slate-500">
                رحلات مريحة مع كبريات شركات الطيران المعتمدة
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs text-slate-400 block">شركة الطيران:</span>
              <span className="text-base font-bold text-slate-900">{pkg.airline}</span>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-400 block">خط الرحلة والأمتعة:</span>
              <span className="text-sm font-semibold text-slate-800 leading-relaxed">{pkg.flightDetails}</span>
            </div>
          </div>
        </section>

        {/* 3. DAY BY DAY ITINERARY */}
        <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-800">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-primary-950 font-cairo">
                البرنامج والمسار اليومي للرحلة
              </h3>
              <p className="text-xs text-slate-500">
                خطة منظمة تضمن قضاء أوقات إيمانية ملؤها السكينة والخشوع
              </p>
            </div>
          </div>

          <div className="space-y-4 relative before:absolute before:top-4 before:bottom-4 before:right-6 before:w-0.5 before:bg-slate-200">
            {pkg.itinerary.map((day, idx) => (
              <div key={idx} className="relative flex items-start gap-4 pr-1">
                <div className="w-10 h-10 rounded-full bg-primary-900 text-gold-400 font-black text-xs flex items-center justify-center shrink-0 shadow z-10">
                  {day.dayNumber}
                </div>
                <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 flex-1 space-y-1.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h4 className="font-bold text-sm sm:text-base text-slate-900">{day.title}</h4>
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      {day.location}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {day.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. INCLUDED & EXCLUDED SERVICES */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Included */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-emerald-200 space-y-4">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-base border-b border-emerald-100 pb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>الخدمات المشمولة في البرنامج (سعر شامل)</span>
            </div>
            <ul className="space-y-2.5">
              {pkg.includedServices.map((service, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <div className="p-0.5 rounded-full bg-emerald-100 text-emerald-700 mt-0.5 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-base border-b border-slate-100 pb-3">
              <XCircle className="w-5 h-5 text-slate-400" />
              <span>الخدمات غير المشمولة</span>
            </div>
            <ul className="space-y-2.5">
              {pkg.excludedServices.map((service, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-500">
                  <div className="p-0.5 rounded-full bg-slate-100 text-slate-400 mt-0.5 shrink-0">
                    <XCircle className="w-3.5 h-3.5" />
                  </div>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

        </section>

        {/* 5. VISA & TRAVEL DOCUMENTS GUIDE */}
        <section className="bg-emerald-950 text-white p-6 sm:p-10 rounded-3xl shadow-xl border border-gold-400/30 space-y-4">
          <div className="flex items-center gap-2 text-gold-400 font-bold text-lg">
            <FileText className="w-5 h-5" />
            <span>الوثائق والإجراءات المطلوبة للمعتمرين المغاربة</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-emerald-100/90 pt-2">
            <div className="p-4 rounded-2xl bg-emerald-900/60 border border-emerald-800">
              <h5 className="font-bold text-white mb-1">1. جواز السفر</h5>
              <p>جواز سفر بيومتري صالح لأكثر من 6 أشهر من تاريخ موعد السفر.</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-900/60 border border-emerald-800">
              <h5 className="font-bold text-white mb-1">2. الصور وبطاقة التعريف</h5>
              <p>صورة شخصية حديثة بخلفية بيضاء ونسخة من بطاقة التعريف الوطنية.</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-900/60 border border-emerald-800">
              <h5 className="font-bold text-white mb-1">3. التأشيرة والتأمين</h5>
              <p>وكالة رفيق الخير تتكفل بكافة إجراءات التأشيرة والتأمين الصحي الرسمي المعتمد.</p>
            </div>
          </div>
        </section>

        {/* 6. SIMILAR TRIPS */}
        {similarPackages.length > 0 && (
          <section className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-primary-950 font-cairo">
                برامج أخرى قد تناسبك
              </h3>
              <Link href="/packages" className="text-xs font-bold text-emerald-800 hover:underline">
                عرض كافة البرامج
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {similarPackages.map((p) => (
                <div key={p.id} className="p-5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-gold-700 bg-gold-100 px-2 py-0.5 rounded-full">
                      {p.categoryLabel}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 mt-1">{p.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">انطلاق: {p.departureDate} ({p.durationDays} يوم)</p>
                  </div>
                  <div className="text-left shrink-0">
                    <div className="text-base font-black text-primary-950 font-cairo">{p.startingPrice.toLocaleString('ar-MA')} د.م</div>
                    <Link
                      href={`/packages/${p.slug}`}
                      className="text-xs font-bold text-emerald-800 hover:underline inline-flex items-center gap-1 mt-1"
                    >
                      <span>عرض</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
