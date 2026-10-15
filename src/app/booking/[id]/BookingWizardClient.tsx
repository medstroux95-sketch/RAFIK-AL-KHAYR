'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { UmrahPackage, SiteSettings, RoomType, Booking } from '@/types';
import { 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  CreditCard, 
  Building2, 
  Banknote, 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  Users, 
  ShieldCheck, 
  Printer, 
  MessageCircle, 
  Tag, 
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';

interface BookingWizardClientProps {
  pkg: UmrahPackage;
  settings: SiteSettings;
  initialRoom?: string;
  initialCount?: string;
}

export default function BookingWizardClient({
  pkg,
  settings,
  initialRoom,
  initialCount,
}: BookingWizardClientProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  // Step 1: Room & Travelers
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType>(
    (initialRoom as RoomType) || pkg.roomOptions[0]?.type || 'quad'
  );
  const [travelersCount, setTravelersCount] = useState<number>(
    initialCount ? Math.max(1, parseInt(initialCount, 10)) : 2
  );

  // Step 2: Travelers Information
  const [primaryContact, setPrimaryContact] = useState({
    fullName: '',
    phone: '',
    whatsapp: '',
    email: '',
    city: 'الدار البيضاء',
    notes: '',
  });

  const [additionalTravelers, setAdditionalTravelers] = useState<Array<{ fullName: string; gender: 'ذكر' | 'أنثى' }>>([]);

  // Step 3: Payment preferences & Coupon
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [paymentChoice, setPaymentChoice] = useState<'deposit' | 'full'>('deposit');
  const [paymentMethod, setPaymentMethod] = useState<'cash_agency' | 'bank_transfer' | 'card_online'>('bank_transfer');

  // Card Simulator state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Processing state
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Price Calculation
  const selectedRoom = pkg.roomOptions.find(r => r.type === selectedRoomType) || pkg.roomOptions[0];
  const pricePerPerson = selectedRoom ? selectedRoom.price : pkg.startingPrice;
  const subtotal = pricePerPerson * travelersCount;
  const grandTotal = Math.max(0, subtotal - discountAmount);
  const depositAmount = Math.round(grandTotal * (settings.depositPercentage / 100));
  const payableNow = paymentChoice === 'deposit' ? depositAmount : grandTotal;
  const remainingLater = grandTotal - payableNow;

  // Sync additional travelers when count changes
  const updateTravelersCount = (count: number) => {
    setTravelersCount(count);
    const needed = Math.max(0, count - 1);
    const updated = [...additionalTravelers];
    while (updated.length < needed) {
      updated.push({ fullName: '', gender: 'ذكر' });
    }
    setAdditionalTravelers(updated.slice(0, needed));
  };

  const handleApplyCoupon = () => {
    setCouponError('');
    if (couponCode.trim().toUpperCase() === 'RAMADANMUBARAK') {
      setDiscountAmount(1000);
      setCouponApplied(true);
    } else {
      setCouponError('رمز الخصم غير صالح أو منتهي الصلاحية');
      setDiscountAmount(0);
      setCouponApplied(false);
    }
  };

  const handleStep1Next = () => {
    // initialize additional travelers if not yet done
    const needed = Math.max(0, travelersCount - 1);
    if (additionalTravelers.length !== needed) {
      const arr = [];
      for (let i = 0; i < needed; i++) {
        arr.push(additionalTravelers[i] || { fullName: '', gender: 'ذكر' as const });
      }
      setAdditionalTravelers(arr);
    }
    setCurrentStep(2);
  };

  const handleStep2Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!primaryContact.fullName.trim() || !primaryContact.phone.trim()) {
      setErrorMessage('يرجى كتابة الاسم ورقم الهاتف للمسافر الرئيسي');
      return;
    }
    setErrorMessage('');
    setCurrentStep(3);
  };

  const handleFinalSubmit = async () => {
    setSubmitting(true);
    setErrorMessage('');

    try {
      const allTravelersList = [
        { fullName: primaryContact.fullName, gender: 'ذكر' as const, isPrimary: true },
        ...additionalTravelers.map(t => ({ fullName: t.fullName || 'مرافق', gender: t.gender, isPrimary: false }))
      ];

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: pkg.id,
          roomType: selectedRoomType,
          travelersCount,
          travelers: allTravelersList,
          primaryContact: {
            ...primaryContact,
            whatsapp: primaryContact.whatsapp || primaryContact.phone
          },
          paymentMethod,
          couponCode: couponApplied ? couponCode : undefined,
          isDepositOnly: paymentChoice === 'deposit'
        })
      });

      const data = await res.json();
      if (data.success && data.booking) {
        setConfirmedBooking(data.booking);
        setCurrentStep(4); // Success step
      } else {
        setErrorMessage(data.error || 'تعذر إتمام الحجز، يرجى المحاولة لاحقاً');
      }
    } catch (err) {
      setErrorMessage('حدث خطأ في الاتصال بالخادم، يرجى المحاولة مرة أخرى');
    } finally {
      setSubmitting(false);
    }
  };

  // ------------------ STEP 4: SUCCESS / CONFIRMATION SCREEN ------------------
  if (currentStep === 4 && confirmedBooking) {
    const isPaid = confirmedBooking.paidAmount > 0;
    const whatsappNotifyUrl = `https://wa.me/212662574740?text=${encodeURIComponent(
      `السلام عليكم ورحمة الله، قمت بحجز رحلة عبر الموقع الإلكتروني.\nرقم الحجز: ${confirmedBooking.bookingCode}\nالبرنامج: ${confirmedBooking.packageName}\nالمسافر الرئيسي: ${confirmedBooking.primaryContact.fullName}\nالهاتف: ${confirmedBooking.primaryContact.phone}\nالمبلغ الإجمالي: ${confirmedBooking.totalAmount.toLocaleString('ar-MA')} د.م\nطريقة الدفع: ${confirmedBooking.paymentMethod}`
    )}`;

    return (
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-emerald-200 space-y-8 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Celebration Header */}
        <div className="text-center space-y-3 border-b border-slate-100 pb-8">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner ring-8 ring-emerald-50">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <span className="text-xs font-black text-gold-700 bg-gold-100 px-3.5 py-1 rounded-full uppercase tracking-wider">
            تم تسجيل طلب حجزكم بنجاح
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-primary-950 font-cairo">
            تقبّل الله منا ومنكم صالح الأعمال
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            مرحباً بك يا <span className="font-bold text-slate-900">{confirmedBooking.primaryContact.fullName}</span> في رحاب وكالة رفيق الخير للسفر والسياحة. تم إنشاء ملف حجزك وحفظه بنجاح.
          </p>
        </div>

        {/* Voucher Ticket Card */}
        <div className="bg-slate-50 rounded-2xl p-6 border-2 border-dashed border-emerald-300/80 space-y-6 relative print:border-solid">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs text-slate-500 block">رقم مرجع الحجز الفريد:</span>
              <span className="text-2xl font-black text-primary-950 font-mono tracking-wider" dir="ltr">
                {confirmedBooking.bookingCode}
              </span>
            </div>
            <div className="text-left">
              <span className="text-xs text-slate-500 block">حالة الطلب:</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${
                isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {isPaid ? 'مؤكد جزئياً / تم استلام الدفعة' : 'طلب جديد في انتظار المراجعة'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <span className="text-slate-400 block text-xs">البرنامج المحجوز:</span>
              <span className="font-bold text-slate-900">{confirmedBooking.packageName}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-xs">تاريخ السفر والانطلاق:</span>
              <span className="font-bold text-slate-900">{confirmedBooking.departureDate} ({confirmedBooking.departureCity})</span>
            </div>
            <div>
              <span className="text-slate-400 block text-xs">نوع الغرفة المختار:</span>
              <span className="font-bold text-slate-900">{confirmedBooking.roomTypeLabel}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-xs">عدد المسافرين:</span>
              <span className="font-bold text-slate-900">{confirmedBooking.travelersCount} معتمرين</span>
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">المبلغ الإجمالي للرحلة:</span>
              <span className="font-bold text-slate-900">{confirmedBooking.totalAmount.toLocaleString('ar-MA')} درهم مغربي</span>
            </div>
            {confirmedBooking.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>الخصم المطبق (كوبون):</span>
                <span>-{confirmedBooking.discountAmount.toLocaleString('ar-MA')} درهم</span>
              </div>
            )}
            <div className="flex justify-between text-emerald-800 font-bold">
              <span>المبلغ المسدد الآن:</span>
              <span>{confirmedBooking.paidAmount.toLocaleString('ar-MA')} درهم مغربي</span>
            </div>
            <div className="flex justify-between text-slate-600 border-t border-slate-100 pt-1 font-semibold">
              <span>المبلغ المتبقي قبل السفر:</span>
              <span className="text-primary-950 font-bold">{confirmedBooking.remainingAmount.toLocaleString('ar-MA')} درهم مغربي</span>
            </div>
          </div>

          {/* Payment Method Details Notice */}
          {confirmedBooking.paymentMethod === 'bank_transfer' && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <p className="font-bold">تعليمات إتمام التحويل البنكي:</p>
              <p>
                يرجى تحويل مبلغ العربون ({confirmedBooking.depositAmount.toLocaleString('ar-MA')} د.م) إلى حساب الوكالة:
              </p>
              <p className="font-mono bg-white p-2 rounded text-center tracking-wider text-slate-900 font-bold" dir="ltr">
                {settings.bankRib}
              </p>
              <p className="text-[11px] text-amber-800">
                {settings.bankName} - يرجى كتابة رقم الحجز ({confirmedBooking.bookingCode}) في بيان التحويل، وإرسال صورة الوصل عبر واتساب.
              </p>
            </div>
          )}

          {confirmedBooking.paymentMethod === 'cash_agency' && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <p className="font-bold">الدفع بمقر الوكالة:</p>
              <p>
                نرحب بزيارتكم لمقر وكالتنا في: {settings.address} لدفع العربون واستلام إيصالكم الرسمي وتأكيد ملف السفر.
              </p>
            </div>
          )}

        </div>

        {/* Buttons Action Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <a
            href={whatsappNotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            <span>إشعار الوكالة برقم الحجز عبر واتساب</span>
          </a>

          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>طباعة وصل الحجز</span>
          </button>

          <Link
            href={`/track?code=${confirmedBooking.bookingCode}&phone=${confirmedBooking.primaryContact.phone}`}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-primary-900 hover:bg-primary-950 text-gold-300 font-bold text-sm transition-all text-center"
          >
            تتبع الحجز
          </Link>
        </div>

      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 space-y-8">
      
      {/* Step Indicators Header */}
      <div className="border-b border-slate-100 pb-6">
        <div className="flex items-center justify-between max-w-xl mx-auto relative">
          
          {/* Connector Line */}
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />

          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center gap-1.5">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black transition-colors ${
              currentStep >= 1 ? 'bg-primary-900 text-gold-300 ring-4 ring-gold-100' : 'bg-slate-200 text-slate-500'
            }`}>
              1
            </div>
            <span className="text-[11px] font-bold text-slate-700">الغرفة والمسافرون</span>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center gap-1.5">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black transition-colors ${
              currentStep >= 2 ? 'bg-primary-900 text-gold-300 ring-4 ring-gold-100' : 'bg-slate-200 text-slate-500'
            }`}>
              2
            </div>
            <span className="text-[11px] font-bold text-slate-700">بيانات المسافرين</span>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center gap-1.5">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black transition-colors ${
              currentStep >= 3 ? 'bg-primary-900 text-gold-300 ring-4 ring-gold-100' : 'bg-slate-200 text-slate-500'
            }`}>
              3
            </div>
            <span className="text-[11px] font-bold text-slate-700">الدفع والتأكيد</span>
          </div>

        </div>
      </div>

      {/* Program Summary Pill */}
      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-emerald-800 font-bold block">{pkg.title}</span>
          <span className="text-slate-600">انطلاق: {pkg.departureDate} ({pkg.departureCity}) • {pkg.durationDays} يوماً</span>
        </div>
        <div className="text-left font-bold text-primary-950 font-cairo text-sm">
          {pricePerPerson.toLocaleString('ar-MA')} د.م / للمعتمر
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* ---------------- STEP 1: ROOM & TRAVELERS COUNT ---------------- */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="space-y-1">
            <h3 className="text-lg font-black text-primary-950 font-cairo">
              الخطوة 1: تحديد نوع الغرفة وعدد المعتمرين
            </h3>
            <p className="text-xs text-slate-500">
              اختر نوع الإقامة المناسب لميزانيتك واحتياجاتك
            </p>
          </div>

          {/* Room options */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              نوع الغرفة:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pkg.roomOptions.map((room) => {
                const isSelected = selectedRoomType === room.type;
                return (
                  <button
                    key={room.type + room.label}
                    type="button"
                    onClick={() => setSelectedRoomType(room.type)}
                    className={`p-4 rounded-2xl text-right border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-primary-900 bg-primary-900 text-white shadow-md ring-2 ring-gold-400'
                        : 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm">{room.label}</div>
                      {room.notes && (
                        <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-emerald-200' : 'text-slate-500'}`}>
                          {room.notes}
                        </div>
                      )}
                    </div>
                    <div className="text-left">
                      <div className={`text-base font-black ${isSelected ? 'text-gold-300' : 'text-primary-950'}`}>
                        {room.price.toLocaleString('ar-MA')} د.م
                      </div>
                      <div className={`text-[10px] ${isSelected ? 'text-emerald-200' : 'text-slate-400'}`}>
                        للمعتمر
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Travelers Count */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              عدد المعتمرين الإجمالي:
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => updateTravelersCount(num)}
                  className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${
                    travelersCount === num
                      ? 'bg-gold-500 text-slate-950 shadow-md ring-2 ring-gold-600'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Price Preview */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">المجموع التقديري المبدئي:</span>
            <div className="text-right">
              <span className="text-2xl font-black text-primary-950 font-cairo">
                {subtotal.toLocaleString('ar-MA')}
              </span>
              <span className="text-xs font-bold text-gold-700 mr-1">درهم</span>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={handleStep1Next}
              className="px-8 py-3.5 rounded-2xl bg-gold-gradient text-slate-950 font-black text-sm shadow-gold hover:shadow-lg transition-all flex items-center gap-2"
            >
              <span>متابعة لبيانات المسافرين</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ---------------- STEP 2: TRAVELERS INFORMATION ---------------- */}
      {currentStep === 2 && (
        <form onSubmit={handleStep2Next} className="space-y-6 animate-in fade-in duration-200">
          <div className="space-y-1">
            <h3 className="text-lg font-black text-primary-950 font-cairo">
              الخطوة 2: معلومات المسافرين وجهة الاتصال
            </h3>
            <p className="text-xs text-slate-500">
              بيانات ضرورية لإصدار تذاكر الطيران وتأشيرة العمرة
            </p>
          </div>

          {/* Primary Traveler */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="text-xs font-bold text-emerald-800 flex items-center gap-2 border-b border-slate-200 pb-2">
              <User className="w-4 h-4" />
              <span>المسافر الرئيسي (صاحب الحجز والتواصل)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  الاسم الكامل (كما في جواز السفر) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: عبد الرحيم التازي"
                  value={primaryContact.fullName}
                  onChange={(e) => setPrimaryContact({ ...primaryContact, fullName: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  رقم الهاتف (واتساب) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0661234567"
                  dir="ltr"
                  value={primaryContact.phone}
                  onChange={(e) => setPrimaryContact({ ...primaryContact, phone: e.target.value, whatsapp: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white text-right"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  المدينة بالمغرب *
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: الدار البيضاء"
                  value={primaryContact.city}
                  onChange={(e) => setPrimaryContact({ ...primaryContact, city: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  البريد الإلكتروني (اختياري)
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  dir="ltr"
                  value={primaryContact.email}
                  onChange={(e) => setPrimaryContact({ ...primaryContact, email: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white text-right"
                />
              </div>
            </div>
          </div>

          {/* Additional Travelers List if count > 1 */}
          {additionalTravelers.length > 0 && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 block">
                أسماء باقي المعتمرين المرافقين:
              </label>
              {additionalTravelers.map((traveler, index) => (
                <div key={index} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row gap-3 items-center">
                  <span className="text-xs font-bold text-slate-500 whitespace-nowrap">
                    المعتمر #{index + 2}:
                  </span>
                  <input
                    type="text"
                    required
                    placeholder={`اسم المعتمر الكامل ${index + 2}`}
                    value={traveler.fullName}
                    onChange={(e) => {
                      const updated = [...additionalTravelers];
                      updated[index].fullName = e.target.value;
                      setAdditionalTravelers(updated);
                    }}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  <select
                    value={traveler.gender}
                    onChange={(e) => {
                      const updated = [...additionalTravelers];
                      updated[index].gender = e.target.value as any;
                      setAdditionalTravelers(updated);
                    }}
                    className="text-xs p-2.5 rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="ذكر">ذكر</option>
                    <option value="أنثى">أنثى</option>
                  </select>
                </div>
              ))}
            </div>
          )}

          {/* Special Notes */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">
              ملاحظات خاصة للوكالة (اختياري)
            </label>
            <textarea
              rows={2}
              placeholder="مثال: نطلب مقاعد متجاورة بالطائرة، أو مساعدة لكبار السن..."
              value={primaryContact.notes}
              onChange={(e) => setPrimaryContact({ ...primaryContact, notes: e.target.value })}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-50 focus:bg-white resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <ChevronRight className="w-4 h-4" />
              <span>الرجوع</span>
            </button>

            <button
              type="submit"
              className="px-8 py-3.5 rounded-2xl bg-gold-gradient text-slate-950 font-black text-sm shadow-gold hover:shadow-lg transition-all flex items-center gap-2"
            >
              <span>متابعة لخيارات الدفع</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* ---------------- STEP 3: PAYMENT METHOD & REVIEW ---------------- */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="space-y-1">
            <h3 className="text-lg font-black text-primary-950 font-cairo">
              الخطوة 3: مراجعة الحساب واختيار وسيلة الدفع
            </h3>
            <p className="text-xs text-slate-500">
              شفافية مطلقة بدون أي رسوم خفية مع مرونة دفع العربون
            </p>
          </div>

          {/* Coupon Code Section */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 shrink-0">
              <Tag className="w-4 h-4 text-gold-600" />
              <span>كود الخصم (إن وجد):</span>
            </div>
            <div className="flex-1 flex gap-2 w-full">
              <input
                type="text"
                placeholder="أدخل كود الخصم (جرب: RAMADANMUBARAK)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                disabled={couponApplied}
                className="w-full text-xs font-mono p-2.5 rounded-xl border border-slate-300 uppercase tracking-wider bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                disabled={couponApplied}
                className="px-5 py-2.5 rounded-xl bg-primary-900 text-gold-300 font-bold text-xs whitespace-nowrap hover:bg-primary-950 transition-colors disabled:opacity-50"
              >
                {couponApplied ? 'تم التفعيل ✓' : 'تطبيق'}
              </button>
            </div>
          </div>
          {couponError && <p className="text-xs text-rose-600">{couponError}</p>}
          {couponApplied && (
            <p className="text-xs text-emerald-700 font-bold">
              ✓ تم تطبيق خصم بقيمة 1,000 درهم مغربي على إجمالي الحجز!
            </p>
          )}

          {/* Deposit vs Full Payment Toggle */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              خطة الأداء:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentChoice('deposit')}
                className={`p-4 rounded-2xl text-right border transition-all ${
                  paymentChoice === 'deposit'
                    ? 'border-emerald-700 bg-emerald-50/70 ring-2 ring-emerald-600'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">دفع عربون الحجز (30%)</span>
                  <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    مستحسن
                  </span>
                </div>
                <div className="text-base font-black text-primary-950 mt-1 font-cairo">
                  {depositAmount.toLocaleString('ar-MA')} درهم
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  تثبيت المقعد الآن، وسداد الباقي ({remainingLater.toLocaleString('ar-MA')} د.م) قبل السفر بـ 15 يوماً.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setPaymentChoice('full')}
                className={`p-4 rounded-2xl text-right border transition-all ${
                  paymentChoice === 'full'
                    ? 'border-emerald-700 bg-emerald-50/70 ring-2 ring-emerald-600'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">سداد المبلغ الإجمالي بالكامل</span>
                  <span className="text-xs font-bold text-slate-500">
                    100%
                  </span>
                </div>
                <div className="text-base font-black text-primary-950 mt-1 font-cairo">
                  {grandTotal.toLocaleString('ar-MA')} درهم
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  إبراء الذمة واستلام تذاكر وتأشيرة الرحلة دون أي دفعات لاحقة.
                </p>
              </button>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 block">
              اختر وسيلة الدفع:
            </label>

            {/* Option 1: Bank Transfer */}
            <div 
              onClick={() => setPaymentMethod('bank_transfer')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                paymentMethod === 'bank_transfer'
                  ? 'border-primary-900 bg-primary-900/5 ring-2 ring-gold-400'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gold-100 text-gold-800">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">تحويل بنكي رسمي (Virement Bancaire)</h4>
                    <p className="text-xs text-slate-500">حساب وكالة رفيق الخير بالتجاري وفا بنك</p>
                  </div>
                </div>
                <input 
                  type="radio" 
                  checked={paymentMethod === 'bank_transfer'} 
                  readOnly 
                  className="w-4 h-4 text-emerald-600" 
                />
              </div>

              {paymentMethod === 'bank_transfer' && (
                <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-700 space-y-1.5 bg-white p-3 rounded-xl">
                  <p className="text-slate-500">رقم الحساب البنكي الرسمي (RIB):</p>
                  <p className="font-mono font-bold text-slate-950 text-sm tracking-wider" dir="ltr">
                    {settings.bankRib}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    بنك: {settings.bankName} • باسم: {settings.agencyName}
                  </p>
                </div>
              )}
            </div>

            {/* Option 2: Pay in Agency */}
            <div 
              onClick={() => setPaymentMethod('cash_agency')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                paymentMethod === 'cash_agency'
                  ? 'border-primary-900 bg-primary-900/5 ring-2 ring-gold-400'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">الدفع في مقر الوكالة (كاش أو شيك)</h4>
                    <p className="text-xs text-slate-500">بمكتبنا في الدار البيضاء مع تسليم الوصل فوراً</p>
                  </div>
                </div>
                <input 
                  type="radio" 
                  checked={paymentMethod === 'cash_agency'} 
                  readOnly 
                  className="w-4 h-4 text-emerald-600" 
                />
              </div>
            </div>

            {/* Option 3: Online Bank Card (CMI / Visa / Mastercard) */}
            <div 
              onClick={() => setPaymentMethod('card_online')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                paymentMethod === 'card_online'
                  ? 'border-primary-900 bg-primary-900/5 ring-2 ring-gold-400'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-sky-100 text-sky-800">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">الدفع الإلكتروني الآمن بالبطاقة البنكية</h4>
                    <p className="text-xs text-slate-500">بوابة الدفع المغربية CMI مع التحقق الآمن 3D-Secure</p>
                  </div>
                </div>
                <input 
                  type="radio" 
                  checked={paymentMethod === 'card_online'} 
                  readOnly 
                  className="w-4 h-4 text-emerald-600" 
                />
              </div>

              {paymentMethod === 'card_online' && (
                <div className="mt-4 pt-3 border-t border-slate-200 text-xs space-y-3 bg-white p-3 rounded-xl">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>محاكي دفع آمن مشفر 256-bit (جاهز للتجربة الحية)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="رقم البطاقة (16 رقم)"
                      dir="ltr"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="text-xs p-2.5 rounded-lg border border-slate-200 font-mono text-center sm:col-span-2"
                    />
                    <div className="grid grid-cols-2 gap-1.5">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        dir="ltr"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="text-xs p-2.5 rounded-lg border border-slate-200 font-mono text-center"
                      />
                      <input
                        type="password"
                        placeholder="CVV"
                        dir="ltr"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="text-xs p-2.5 rounded-lg border border-slate-200 font-mono text-center"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Final Summary Card */}
          <div className="p-5 rounded-2xl bg-primary-950 text-white space-y-3">
            <div className="flex justify-between text-xs text-emerald-200">
              <span>المبلغ الإجمالي للحجز:</span>
              <span>{grandTotal.toLocaleString('ar-MA')} درهم</span>
            </div>
            <div className="flex justify-between text-base font-black text-gold-400 border-t border-emerald-900 pt-2 font-cairo">
              <span>المبلغ المطلوب تسديده الآن:</span>
              <span>{payableNow.toLocaleString('ar-MA')} درهم مغربي</span>
            </div>
            {paymentChoice === 'deposit' && (
              <div className="text-[11px] text-slate-400">
                المتبقي ({remainingLater.toLocaleString('ar-MA')} د.م) يُسدد قبل موعد الرحلة.
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <ChevronRight className="w-4 h-4" />
              <span>الرجوع</span>
            </button>

            <button
              type="button"
              disabled={submitting}
              onClick={handleFinalSubmit}
              className="px-10 py-4 rounded-2xl bg-gold-gradient text-slate-950 font-black text-base shadow-gold hover:shadow-xl transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {submitting ? (
                <span>جاري معالجة الحجز...</span>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5 text-slate-950" />
                  <span>تأكيد الحجز النهائي واستلام الوصل</span>
                </>
              )}
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
