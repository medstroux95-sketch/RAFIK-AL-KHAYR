import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPackages, getReviews, getFaqs, getSettings } from '@/lib/db';
import { PackageCard } from '@/components/PackageCard';
import { UmrahSearchBox } from '@/components/UmrahSearchBox';
import { FaqSection } from '@/components/FaqSection';
import { ConsultationForm } from '@/components/ConsultationForm';
import { 
  Sparkles, 
  ShieldCheck, 
  HeartHandshake, 
  MapPin, 
  CheckCircle2, 
  PhoneCall, 
  MessageCircle, 
  Plane, 
  Hotel, 
  Award, 
  Clock, 
  ChevronLeft, 
  Star,
  Compass,
  ArrowRight
} from 'lucide-react';

export const revalidate = 0; // Ensure fresh data from db

export default async function HomePage() {
  const [packages, reviews, faqs, settings] = await Promise.all([
    getPackages(),
    getReviews(),
    getFaqs(),
    getSettings()
  ]);

  const featuredPackages = packages.filter(p => p.isFeatured && p.status === 'active');

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section id="hero" className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center overflow-hidden transition-colors duration-500">
        {/* Background Image of Holy Kaaba with Spiritual Lighting */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.png"
            alt="الكعبة المشرفة - بيت الله الحرام"
            fill
            className="object-cover object-center scale-105 transition-all duration-700"
            priority
          />
          {/* Dynamic Theme Overlay (Daylight morning white in light mode, Sacred Navy in dark mode) */}
          <div className="hero-overlay absolute inset-0 transition-all duration-500" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 pt-36 pb-20 sm:pt-44 sm:pb-24 text-center space-y-8">
          
          {/* Trust Badge */}
          <div className="hero-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full border backdrop-blur-md shadow-lg transition-all duration-300">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping"></span>
            <span className="text-xs sm:text-sm font-bold">
              وكالة رفيق الخير للسفر والسياحة - ترخيص معتمد بالمغرب
            </span>
            <ShieldCheck className="w-4 h-4 text-gold-400" />
          </div>

          {/* Master Slogan & Headline */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="hero-title text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-cairo leading-tight sm:leading-tight transition-colors duration-300">
              {settings.heroTitle}
            </h1>
            <p className="hero-subtitle text-base sm:text-xl max-w-3xl mx-auto font-light leading-relaxed transition-colors duration-300">
              {settings.heroSubtitle}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            <Link
              href="/packages"
              className="px-8 py-4 rounded-2xl bg-gold-gradient text-slate-950 font-black text-sm sm:text-base shadow-gold hover:shadow-2xl transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center gap-2"
            >
              <span>اكتشف عروض العمرة</span>
              <ChevronLeft className="w-5 h-5 text-slate-950" />
            </Link>

            <Link
              href="/packages/omra-chaban-ramadan"
              className="px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-gold-400/50 font-bold text-sm sm:text-base backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>عمرة شعبان ورمضان</span>
            </Link>

            <a
              href="https://wa.me/212662574740?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%B9%D8%B1%D9%88%D8%B6%20%D8%B1%D8%AD%D9%84%D8%A7%D8%AA%20%D8%A7%D9%84%D8%B9%D9%85%D8%B1%D8%A9"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-gold-300 font-bold text-sm sm:text-base border border-gold-500/40 backdrop-blur-md transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5 text-gold-400" />
              <span>تواصل عبر واتساب</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="hero-metrics pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 text-center transition-colors duration-300">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-gold-400 font-cairo">100%</div>
              <div className="text-xs text-slate-300">تأطير ديني وإداري معتمد</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-gold-400 font-cairo">150 - 450 م</div>
              <div className="text-xs text-slate-300">مسافة الفنادق عن الحرمين</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-gold-400 font-cairo">مباشر</div>
              <div className="text-xs text-slate-300">طيران منتظم من الدار البيضاء</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-gold-400 font-cairo">24 / 7</div>
              <div className="text-xs text-slate-300">متابعة ميدانية في مكة والمدينة</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. SMART SEARCH BOX */}
      <UmrahSearchBox />

      {/* 3. ANNOUNCEMENT TICKER */}
      {settings.isAnnouncementActive && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-10">
          <div className="bg-gradient-to-r from-primary-900 via-primary-950 to-primary-900 p-4 rounded-2xl text-white flex flex-wrap items-center justify-between gap-4 border border-gold-400/30 shadow-md">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-gold-500 text-slate-950 font-bold text-xs shrink-0">
                إعلان هام
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-200">
                {settings.announcementText}
              </p>
            </div>
            <Link
              href="/packages"
              className="text-xs font-bold text-gold-400 hover:text-gold-300 underline flex items-center gap-1"
            >
              <span>مشاهدة المقاعد المتاحة</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* 4. FEATURED PACKAGES SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-gold-700 bg-gold-100 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>عروض حصرية وموثقة</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-primary-950 font-cairo">
              عروض العمرة المميزة لعام 1446 / 2026
            </h2>
            <p className="text-slate-600 text-sm max-w-2xl">
              اختر البرنامج الأنسب لك ولعائلتك من برامج وكالة رفيق الخير المنظمة بأعلى درجات العناية والراحة
            </p>
          </div>

          <Link
            href="/packages"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary-900 text-primary-950 hover:bg-primary-900 hover:text-white font-bold text-xs sm:text-sm transition-all"
          >
            <span>عرض كافة البرامج ({packages.length})</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} featured={pkg.category === 'ramadan'} />
          ))}
        </div>
      </section>

      {/* 5. UPCOMING TRIPS SCHEDULE (الرحلات القادمة) */}
      <section className="py-16 bg-primary-950 text-white relative overflow-hidden theme-adaptive-section transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">
              مواعيد الإقلاع المؤكدة
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-cairo">
              جدول الرحلات القادمة من مطار محمد الخامس
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
              إمكانية تأكيد الحجز فورياً مع إمكانية دفع عربون 30% فقط وتثبيت سعر الصرف بالدرهم المغربي
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {packages.map((pkg) => (
              <div 
                key={pkg.id}
                className="p-5 rounded-2xl bg-primary-900/60 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-gold-400/50 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-gold-400 mb-2">
                    <span className="font-bold">{pkg.categoryLabel}</span>
                    <span>{pkg.durationDays} يوماً</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{pkg.title}</h4>
                  <div className="text-xs text-slate-300 space-y-1">
                    <p>📅 المغادرة: <span className="font-semibold text-white">{pkg.departureDate}</span></p>
                    <p>✈ الطيران: <span className="font-semibold text-white">{pkg.airline}</span></p>
                    <p>🏨 الإقامة: <span className="font-semibold text-white">{pkg.hotels.map(h => h.name).join(' + ')}</span></p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">ابتداءً من</span>
                    <span className="text-lg font-black text-gold-400 font-cairo">
                      {pkg.startingPrice.toLocaleString('ar-MA')} د.م
                    </span>
                  </div>
                  <Link
                    href={`/booking/${pkg.id}`}
                    className="px-4 py-2 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs hover:shadow-gold transition-shadow"
                  >
                    حجز مقعد
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE RAFIQ AL KHAIR (لماذا تختار وكالتنا؟) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-gold-500 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/30">
            فخامة، أمانة، وروحانية
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-primary-950 font-cairo">
            لماذا تختار وكالة رفيق الخير لرحلة عمرتك؟
          </h2>
          <p className="text-slate-600 text-sm">
            نضع خبرتنا الطويلة وعلاقاتنا المباشرة في خدمة ضيوف الرحمن لتقديم تجربة إيمانية متكاملة ومريحة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-gold-300 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center group-hover:bg-primary-900 group-hover:text-gold-400 transition-colors">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">تأطير ديني متواصل ومرشدين خبراء</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              يرافقكم في رحلتكم أساتذة ومرشدون دينيون لشرح مناسك العمرة خطوة بخطوة، مع إقامة دروس دينية وإرشادية في مكة والمدينة والروضة الشريفة.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-gold-300 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center group-hover:bg-primary-900 group-hover:text-gold-400 transition-colors">
              <Hotel className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">فنادق مختارة بعناية قريبة من الحرم</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              نضمن لكم السكن في فنادق 4 و5 نجوم موثقة ونظيفة على مسافة قريبة من ساحات الحرمين الشريفين، لتوفير راحة تامة لكبار السن والعائلات.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-gold-300 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center group-hover:bg-primary-900 group-hover:text-gold-400 transition-colors">
              <Plane className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">طيران منتظم وأوزان أمتعة مريحة</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              رحلات مريحة مع الخطوط الملكية المغربية، الخطوط السعودية، والخطوط التركية، مع وزن أمتعة كافٍ لنقل الهدايا وماء زمزم المبارك.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-gold-300 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center group-hover:bg-primary-900 group-hover:text-gold-400 transition-colors">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">حجز إلكتروني رسمي وشفافية مطلقة</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              عقد رسمي، وصل إلكتروني فوري، وتفصيل دقيق لجميع الخدمات والأسعار دون أي مصاريف خفية أو مفاجآت عند السفر.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-gold-300 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center group-hover:bg-primary-900 group-hover:text-gold-400 transition-colors">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">مرونة في الدفع ونظام العربون (30%)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              يمكنك تأكيد مقعدك بدفع 30% عربون فقط، وسداد المبلغ المتبقي على دفعات ميسرة قبل موعد انطلاق الرحلة.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-gold-300 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center group-hover:bg-primary-900 group-hover:text-gold-400 transition-colors">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">فريق خدمة ودعم على مدار الساعة</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              طاقم وكالة رفيق الخير رهن إشارتكم في المغرب وفي الأراضي المقدسة لتقديم المساعدة الطبية، الإرشادية، وحل أي استفسار فوراً.
            </p>
          </div>

        </div>
      </section>

      {/* 7. HOW TO BOOK IN 4 SIMPLE STEPS (طريقة الحجز) */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-primary-950 font-cairo">
              خطوات حجز رحلة العمرة بكل يسر وسهولة
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              أربع خطوات بسيطة تفصلك عن زيارة بيت الله الحرام مع وكالة رفيق الخير
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-gold-500 text-slate-950 font-black text-base flex items-center justify-center mx-auto shadow-md">
                1
              </div>
              <h4 className="font-bold text-sm text-slate-900">اختر البرنامج المناسب</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                تصفح عروض شعبان ورمضان، عمرة تركيا أو البرامج الاقتصادية وحدد موعد سفرك.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-primary-900 text-gold-400 font-black text-base flex items-center justify-center mx-auto shadow-md">
                2
              </div>
              <h4 className="font-bold text-sm text-slate-900">حدد الغرفة والمسافرين</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                اختر نوع الغرفة (ثنائية، ثلاثية، رباعية أو خماسية) وعدد أفراد الأسرة.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-primary-900 text-gold-400 font-black text-base flex items-center justify-center mx-auto shadow-md">
                3
              </div>
              <h4 className="font-bold text-sm text-slate-900">أدخل بياناتك وسدد العربون</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                املأ أسماء المسافرين واختر وسيلة الدفع (تحويل بنكي، في مقر الوكالة، أو بطاقة بنكية).
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-gold-500 text-slate-950 font-black text-base flex items-center justify-center mx-auto shadow-md">
                4
              </div>
              <h4 className="font-bold text-sm text-slate-900">استلم ملف وتأشيرة الرحلة</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                يصلك وصل الحجز والتأشيرة الإلكترونية مع برنامج السفر التفصيلي وحقيبة المعتمر.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 8. HOTELS SHOWCASE (فنادق الإقامة في مكة والمدينة وإسطنبول) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-gold-700 bg-gold-100 px-3 py-1 rounded-full">
            إقامة فندقية فاخرة
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-primary-950 font-cairo">
            فنادقنا المختارة في الحرمين الشريفين وإسطنبول
          </h2>
          <p className="text-slate-600 text-sm">
            إقامة تجمع بين الراحة، النظافة، والقرب الشديد من بوابات الحرمين الشريفين
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm group">
            <div className="relative h-48 w-full bg-slate-900">
              <Image
                src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80"
                alt="فندق تاج بارك مكة"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-primary-950/80 text-gold-400 text-xs px-3 py-1 rounded-full font-bold backdrop-blur-md">
                مكة المكرمة ★★★★
              </div>
            </div>
            <div className="p-6 space-y-2">
              <h3 className="font-bold text-base text-slate-900">فندق تاج بارك / فندق أسكن</h3>
              <p className="text-xs text-gold-600 font-semibold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>يبعد 450 متر عن الحرم المكي الشريف</span>
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                غرف مكيفة وفاخرة، بوفيه إفطار متنوع، وسرعة وصول عالية لساحات الطواف ومصليات الحرم.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm group">
            <div className="relative h-48 w-full bg-slate-900">
              <Image
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
                alt="فندق الحياة الماسي المدينة"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-primary-950/80 text-gold-400 text-xs px-3 py-1 rounded-full font-bold backdrop-blur-md">
                المدينة المنورة ★★★★
              </div>
            </div>
            <div className="p-6 space-y-2">
              <h3 className="font-bold text-base text-slate-900">فندق الحياة الماسي</h3>
              <p className="text-xs text-gold-600 font-semibold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>يبعد 250 متر عن المسجد النبوي وباب السلام</span>
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                موقع استراتيجي في المنطقة المركزية الشمالية، هدوء تام وخدمات غرف فندقية متواصلة.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm group">
            <div className="relative h-48 w-full bg-slate-900">
              <Image
                src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80"
                alt="فندق رويال إسطنبول"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-primary-950/80 text-gold-400 text-xs px-3 py-1 rounded-full font-bold backdrop-blur-md">
                إسطنبول - تركيا ★★★★
              </div>
            </div>
            <div className="p-6 space-y-2">
              <h3 className="font-bold text-base text-slate-900">فندق رويال إسطنبول (Royal Istanbul)</h3>
              <p className="text-xs text-gold-600 font-semibold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>بالقرب من السلطان أحمد والبوسفور</span>
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                إقامة ممتعة مع إفطار تركي شامل، وجولات سياحية منظمة للمعالم التاريخية الإسلامية.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 9. REVIEWS SECTION (آراء المعتمرين) */}
      <section id="reviews" className="py-20 bg-primary-950 text-white relative theme-adaptive-section transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold text-gold-400">شهادات نعتز بها</span>
            <h2 className="text-2xl sm:text-3xl font-black font-cairo">
              ماذا يقول المعتمرون عن وكالة رفيق الخير؟
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              آراء حقيقية وموثقة من معتمرين شرفنا بخدمتهم في مواسم العمرة السابقة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-3xl bg-primary-900/60 border border-slate-800 space-y-4 hover:border-gold-400/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex text-gold-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-gold-400 font-medium">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  &ldquo;{rev.comment}&rdquo;
                </p>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-white">{rev.name}</h4>
                    <span className="text-[11px] text-slate-400">{rev.city} - {rev.packageName}</span>
                  </div>
                  {rev.verified && (
                    <span className="text-[10px] bg-gold-500/20 text-gold-300 border border-gold-500/30 px-2.5 py-1 rounded-full font-bold">
                      معتمر موثق ✓
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQS & CONSULTATION FORM (الأسئلة الشائعة ونموذج الاستشارة) */}
      <section id="contact" className="py-20 max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* FAQ Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-gold-500 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/30">
                إجابات على تساؤلاتك
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-primary-950 font-cairo">
                الأسئلة الأكثر شيوعاً حول العمرة
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                إليك أهم التوضيحات المتعلقة بإجراءات السفر، التأشيرات، والإقامة
              </p>
            </div>

            <FaqSection faqs={faqs} />
          </div>

          {/* Consultation Form Column */}
          <div className="lg:col-span-5">
            <ConsultationForm />
          </div>

        </div>
      </section>

      {/* 11. FINAL LUXURY CALL TO ACTION */}
      <section className="py-16 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-950 text-white text-center border-t-2 border-gold-400 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 text-gold-400 text-xs sm:text-sm font-bold bg-black/40 px-4 py-1.5 rounded-full border border-gold-500/20">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>نسعى لراحتكم لتكون رفيقكم في الخير</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black font-cairo leading-snug">
            هل أنت مستعد لأداء مناسك العمرة في أجواء إيمانية راقية؟
          </h2>

          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            المقاعد محدودة لبرامج شعبان ورمضان وعمرة تركيا المباركة. اتصل بنا الآن أو قم بالحجز مباشرة عبر الموقع الإلكتروني.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/packages"
              className="px-8 py-3.5 rounded-2xl bg-gold-gradient text-slate-950 font-black text-sm shadow-gold hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              احجز برنامج عمرتك الآن
            </Link>
            <a
              href="tel:0662574740"
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-gold-400" />
              <span dir="ltr">0662 57 47 40</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
