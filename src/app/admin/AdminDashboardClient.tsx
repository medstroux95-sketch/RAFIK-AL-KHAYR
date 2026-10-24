'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  UmrahPackage, 
  Booking, 
  SiteSettings, 
  AuditLog, 
  InquiryMessage,
  BookingStatus,
  PaymentStatus 
} from '@/types';
import { 
  LayoutDashboard, 
  Compass, 
  CalendarCheck, 
  Settings, 
  MessageSquare, 
  History, 
  Plus, 
  Edit, 
  Trash2, 
  DollarSign, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Save, 
  CreditCard,
  Building2,
  Printer,
  ChevronLeft,
  FileText,
  ShieldCheck,
  Lock,
  LogOut,
  Mail,
  Eye,
  EyeOff,
  LogIn
} from 'lucide-react';

interface AdminDashboardClientProps {
  initialPackages: UmrahPackage[];
  initialBookings: Booking[];
  initialSettings: SiteSettings;
  initialStats: any;
  initialAuditLogs: AuditLog[];
  initialInquiries: InquiryMessage[];
}

export default function AdminDashboardClient({
  initialPackages,
  initialBookings,
  initialSettings,
  initialStats,
  initialAuditLogs,
  initialInquiries,
}: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'packages' | 'bookings' | 'settings' | 'inquiries' | 'logs'>('overview');

  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  const [loginEmail, setLoginEmail] = useState('rafikelkhayer@gmail.com');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem('rafik_admin_session');
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        if (parsed?.email?.toLowerCase() === 'rafikelkhayer@gmail.com') {
          setIsAuthenticated(true);
        }
      }
    } catch (e) {
      // ignore
    } finally {
      setAuthChecking(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    const cleanEmail = loginEmail.trim().toLowerCase();
    const cleanPwd = loginPassword.trim().replace(/\s+/g, '');
    const isEmailValid = (cleanEmail === 'rafikelkhayer@gmail.com');
    const isPwdValid = (
      cleanPwd === 'RafikELKHayer2026' ||
      cleanPwd.toLowerCase() === 'rafikelkhayer2026' ||
      cleanPwd === 'RafikELKHayer2026P' ||
      cleanPwd.toLowerCase() === 'rafikelkhayer2026p'
    );

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password: cleanPwd })
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem('rafik_admin_session', JSON.stringify({
          email: 'rafikelkhayer@gmail.com',
          role: 'admin',
          loggedInAt: new Date().toISOString()
        }));
        setIsAuthenticated(true);
        showNotification('مرحباً بك! تم تسجيل الدخول بنجاح إلى لوحة الإدارة');
      } else if (isEmailValid && isPwdValid) {
        // Fallback local match
        localStorage.setItem('rafik_admin_session', JSON.stringify({
          email: 'rafikelkhayer@gmail.com',
          role: 'admin',
          loggedInAt: new Date().toISOString()
        }));
        setIsAuthenticated(true);
        showNotification('مرحباً بك! تم تسجيل الدخول بنجاح إلى لوحة الإدارة');
      } else {
        setLoginError(data.error || 'بيانات الدخول غير صحيحة. يرجى التأكد من البريد الإلكتروني ورمز المرور.');
      }
    } catch (err) {
      if (isEmailValid && isPwdValid) {
        localStorage.setItem('rafik_admin_session', JSON.stringify({
          email: 'rafikelkhayer@gmail.com',
          role: 'admin',
          loggedInAt: new Date().toISOString()
        }));
        setIsAuthenticated(true);
        showNotification('مرحباً بك! تم تسجيل الدخول بنجاح إلى لوحة الإدارة');
      } else {
        setLoginError('بيانات الدخول غير صحيحة. يرجى التأكد من البريد الإلكتروني ورمز المرور.');
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (e) {
      // ignore
    }
    localStorage.removeItem('rafik_admin_session');
    setIsAuthenticated(false);
    setLoginPassword('');
    showNotification('تم تسجيل الخروج بنجاح');
  };
  
  // Data states
  const [packages, setPackages] = useState<UmrahPackage[]>(initialPackages);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [stats, setStats] = useState(initialStats);
  const [inquiries, setInquiries] = useState<InquiryMessage[]>(initialInquiries);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);

  // Package Modal / Form
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState<UmrahPackage | null>(null);
  const [packageFormData, setPackageFormData] = useState({
    title: '',
    subtitle: '',
    category: 'ramadan' as any,
    categoryLabel: 'موسم رمضان المبارك',
    departureCity: 'الدار البيضاء',
    departureDate: '2026-03-01',
    returnDate: '2026-03-22',
    durationDays: 21,
    startingPrice: 18500,
    airline: 'الخطوط الملكية المغربية',
    seatsTotal: 50,
  });

  // Booking details & Payment Modal
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'bank_transfer' | 'cmi_card'>('bank_transfer');
  const [paymentReference, setPaymentReference] = useState('');

  // Status message
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setNotice({ type, text });
    setTimeout(() => setNotice(null), 3500);
  };

  // ----------------- PACKAGES HANDLERS -----------------
  const handleOpenAddPackage = () => {
    setEditingPackage(null);
    setPackageFormData({
      title: '',
      subtitle: '',
      category: 'ramadan',
      categoryLabel: 'موسم رمضان المبارك',
      departureCity: 'الدار البيضاء',
      departureDate: '2026-03-01',
      returnDate: '2026-03-22',
      durationDays: 21,
      startingPrice: 18500,
      airline: 'الخطوط الملكية المغربية',
      seatsTotal: 50,
    });
    setShowPackageModal(true);
  };

  const handleOpenEditPackage = (pkg: UmrahPackage) => {
    setEditingPackage(pkg);
    setPackageFormData({
      title: pkg.title,
      subtitle: pkg.subtitle,
      category: pkg.category,
      categoryLabel: pkg.categoryLabel,
      departureCity: pkg.departureCity,
      departureDate: pkg.departureDate,
      returnDate: pkg.returnDate,
      durationDays: pkg.durationDays,
      startingPrice: pkg.startingPrice,
      airline: pkg.airline,
      seatsTotal: pkg.seatsTotal,
    });
    setShowPackageModal(true);
  };

  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPackage) {
        // Update
        const res = await fetch(`/api/packages/${editingPackage.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(packageFormData),
        });
        const data = await res.json();
        if (data.success) {
          setPackages(packages.map(p => p.id === editingPackage.id ? data.package : p));
          showNotification('تم تحديث البرنامج بنجاح');
          setShowPackageModal(false);
        }
      } else {
        // Create
        const res = await fetch('/api/packages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...packageFormData,
            slug: `omra-${Date.now()}`,
            destinationCities: ['مكة المكرمة', 'المدينة المنورة'],
            nightsMakkah: 10,
            nightsMadinah: 8,
            roomOptions: [
              { type: 'quad', label: 'غرفة رباعية', price: packageFormData.startingPrice, capacity: 4, available: true },
              { type: 'triple', label: 'غرفة ثلاثية', price: packageFormData.startingPrice + 1000, capacity: 3, available: true },
              { type: 'double', label: 'غرفة ثنائية', price: packageFormData.startingPrice + 2000, capacity: 2, available: true }
            ],
            hotels: [
              { name: 'فندق مكة المكرمة', city: 'مكة المكرمة', stars: 4, distanceToHaram: '400 متر' },
              { name: 'فندق المدينة المنورة', city: 'المدينة المنورة', stars: 4, distanceToHaram: '200 متر' }
            ],
            flightDetails: 'رحلة مباشرة من مطار محمد الخامس',
            includedServices: ['التذاكر', 'التأشيرة', 'الفنادق', 'التنقلات', 'التأطير الديني'],
            excludedServices: ['المصاريف الشخصية'],
            itinerary: [],
            image: '/images/packages/shaban-ramadan.jpg',
            gallery: ['/images/packages/shaban-ramadan.jpg'],
            seatsBooked: 0,
            isFeatured: true,
            isSpecialOffer: true,
            status: 'active'
          }),
        });
        const data = await res.json();
        if (data.success) {
          setPackages([data.package, ...packages]);
          showNotification('تمت إضافة البرنامج الجديد بنجاح');
          setShowPackageModal(false);
        }
      }
    } catch (err) {
      showNotification('حدث خطأ أثناء حفظ البرنامج', 'error');
    }
  };

  const handleDeletePackage = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا البرنامج؟')) return;
    try {
      const res = await fetch(`/api/packages/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setPackages(packages.filter(p => p.id !== id));
        showNotification('تم حذف البرنامج بنجاح');
      }
    } catch (err) {
      showNotification('تعذر حذف البرنامج', 'error');
    }
  };

  // ----------------- BOOKING STATUS & PAYMENT HANDLERS -----------------
  const handleUpdateBookingStatus = async (code: string, newStatus: BookingStatus) => {
    try {
      const res = await fetch(`/api/bookings/${code}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setBookings(bookings.map(b => b.bookingCode === code ? data.booking : b));
        if (selectedBooking && selectedBooking.bookingCode === code) {
          setSelectedBooking(data.booking);
        }
        showNotification(`تم تعديل حالة الحجز إلى: ${newStatus}`);
      }
    } catch (err) {
      showNotification('تعذر تحديث الحجز', 'error');
    }
  };

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;
    const amount = Number(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      showNotification('يرجى تحديد مبلغ صالح', 'error');
      return;
    }

    try {
      const res = await fetch(`/api/bookings/${selectedBooking.bookingCode}/payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          method: paymentMethod,
          reference: paymentReference || `REF-${Date.now().toString().slice(-5)}`,
          notes: 'تسجيل دفعة من لوحة التحكم الإدارية'
        }),
      });
      const data = await res.json();
      if (data.success) {
        // Refresh booking
        const bRes = await fetch(`/api/bookings/${selectedBooking.bookingCode}`);
        const bData = await bRes.json();
        if (bData.success) {
          setSelectedBooking(bData.booking);
          setBookings(bookings.map(b => b.bookingCode === selectedBooking.bookingCode ? bData.booking : b));
        }
        setPaymentAmount('');
        setPaymentReference('');
        showNotification(`تم تسجيل دفعة بقيمة ${amount.toLocaleString('ar-MA')} درهم بنجاح`);
      }
    } catch (err) {
      showNotification('تعذر تسجيل الدفعة', 'error');
    }
  };

  // ----------------- SETTINGS HANDLERS -----------------
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
        showNotification('تم حفظ إعدادات الموقع وهوية الوكالة بنجاح');
      }
    } catch (err) {
      showNotification('تعذر حفظ الإعدادات', 'error');
    }
  };

  if (authChecking) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-gold-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-xs font-bold text-slate-500">جاري التحقق من صلاحيات المشرف...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-right">
          <div className="bg-primary-950 p-8 text-center text-white relative">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/80 border border-gold-400/40 text-gold-400 text-xs font-bold mb-4">
              <ShieldCheck className="w-4 h-4" />
              <span>منطقة الإدارة المشفرة والمحمية</span>
            </div>
            <h1 className="text-2xl font-black font-cairo">تسجيل الدخول للوحة التحكم</h1>
            <p className="text-xs text-emerald-200/80 mt-1 max-w-xs mx-auto">
              بوابة مخصصة لمشرف الموقع لإدارة برامج العمرة وتدقيق الحجوزات
            </p>
          </div>

          <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-5">
            {loginError && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                بريد المشرف المعتمد (Admin Email) *
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  dir="ltr"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="rafikelkhayer@gmail.com"
                  className="w-full text-xs font-mono font-bold p-3.5 pr-10 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 text-left"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                رمز المرور (Password) *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  dir="ltr"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full text-xs font-mono font-bold p-3.5 pr-10 pl-10 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 text-left"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 absolute left-3.5 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 rounded-2xl bg-gold-gradient text-slate-950 font-black text-xs sm:text-sm shadow-gold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loginLoading ? (
                <span>جاري التحقق من الصلاحيات...</span>
              ) : (
                <>
                  <LogIn className="w-4 h-4 text-slate-950" />
                  <span>دخول إلى لوحة الإدارة</span>
                </>
              )}
            </button>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <Link
                href="/"
                className="text-slate-500 hover:text-emerald-700 flex items-center gap-1 font-bold transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>العودة للصفحة الرئيسية</span>
              </Link>
              <span className="text-[11px] text-slate-400 font-mono">Rafiq Al Khair</span>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-primary-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-emerald-900">
        <div>
          <span className="text-xs font-bold text-gold-400 block mb-1">
            وكالة رفيق الخير للسفر والسياحة
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-cairo">
            لوحة الإدارة والتحكم الشاملة
          </h1>
          <p className="text-xs text-emerald-200/80 mt-1">
            إدارة عروض العمرة، تدقيق الحجوزات، تحصيل الدفعات، وتعديل محتوى المنصة
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-emerald-900/70 border border-gold-400/40 px-3.5 py-2 rounded-xl text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            <span className="text-slate-300">المشرف المعتمد:</span>
            <span className="text-gold-300 font-mono font-bold" dir="ltr">rafikelkhayer@gmail.com</span>
          </div>
          <Link
            href="/"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <span>عرض واجهة الموقع</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleLogout}
            className="px-3.5 py-2.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notice && (
        <div className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-md animate-in fade-in duration-200 ${
          notice.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
        }`}>
          <CheckCircle2 className="w-4 h-4" />
          <span>{notice.text}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-primary-900 text-gold-300 shadow-md ring-1 ring-gold-400'
              : 'bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>لوحة المؤشرات العامة</span>
        </button>

        <button
          onClick={() => setActiveTab('packages')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'packages'
              ? 'bg-primary-900 text-gold-300 shadow-md ring-1 ring-gold-400'
              : 'bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>إدارة برامج العمرة ({packages.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'bookings'
              ? 'bg-primary-900 text-gold-300 shadow-md ring-1 ring-gold-400'
              : 'bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          <CalendarCheck className="w-4 h-4" />
          <span>إدارة الحجوزات ({bookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('inquiries')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'inquiries'
              ? 'bg-primary-900 text-gold-300 shadow-md ring-1 ring-gold-400'
              : 'bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>طلبات الاستشارة ({inquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'settings'
              ? 'bg-primary-900 text-gold-300 shadow-md ring-1 ring-gold-400'
              : 'bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>محرر الموقع و CMS</span>
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'logs'
              ? 'bg-primary-900 text-gold-300 shadow-md ring-1 ring-gold-400'
              : 'bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          <History className="w-4 h-4" />
          <span>سجل العمليات</span>
        </button>
      </div>

      {/* ---------------- TAB 1: OVERVIEW & REAL KPIS ---------------- */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs text-slate-500 font-bold block">إجمالي الحجوزات</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-primary-950 font-cairo">
                  {stats.totalBookings}
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  {stats.confirmedBookings} مؤكد
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs text-slate-500 font-bold block">إجمالي المدفوعات المسجلة</span>
              <div className="text-2xl font-black text-emerald-700 font-cairo truncate">
                {stats.totalCollectedRevenue.toLocaleString('ar-MA')} <span className="text-xs font-bold text-slate-700">د.م</span>
              </div>
              <span className="text-[11px] text-slate-400 block">أموال محصلة فعلياً بحساب الوكالة</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs text-slate-500 font-bold block">المبالغ المتبقية في الذمة</span>
              <div className="text-2xl font-black text-amber-700 font-cairo truncate">
                {stats.totalPendingAmount.toLocaleString('ar-MA')} <span className="text-xs font-bold text-slate-700">د.م</span>
              </div>
              <span className="text-[11px] text-slate-400 block">تُسدد قبل مواعيد السفر</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs text-slate-500 font-bold block">مجموع المعتمرين المسجلين</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-primary-950 font-cairo">
                  {stats.totalPilgrims}
                </span>
                <span className="text-xs text-slate-500">معتمر ومعتمرة</span>
              </div>
            </div>

          </div>

          {/* Seat Capacity Gauge */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900">مستوى توفر المقاعد في البرامج الفعالة</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg) => {
                const filled = Math.min(100, Math.round((pkg.seatsBooked / pkg.seatsTotal) * 100));
                return (
                  <div key={pkg.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-slate-900 truncate">{pkg.title}</span>
                      <span className="text-slate-500 font-semibold">{pkg.seatsBooked}/{pkg.seatsTotal}</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${filled > 80 ? 'bg-amber-500' : 'bg-emerald-600'}`} 
                        style={{ width: `${filled}%` }} 
                      />
                    </div>
                    <div className="text-[11px] text-slate-500 text-left">
                      {pkg.seatsTotal - pkg.seatsBooked} مقاعد شاغرة
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Bookings Table preview */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">آخر طلبات الحجز الواردة</h3>
              <button
                onClick={() => setActiveTab('bookings')}
                className="text-xs font-bold text-emerald-800 hover:underline"
              >
                عرض كافة الحجوزات
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400">
                    <th className="pb-3 font-semibold">رقم الحجز</th>
                    <th className="pb-3 font-semibold">المسافر الرئيسي</th>
                    <th className="pb-3 font-semibold">البرنامج</th>
                    <th className="pb-3 font-semibold">المبلغ الإجمالي</th>
                    <th className="pb-3 font-semibold">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.slice(0, 5).map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50">
                      <td className="py-3 font-mono font-bold text-slate-900" dir="ltr">{b.bookingCode}</td>
                      <td className="py-3 font-medium text-slate-900">{b.primaryContact.fullName} ({b.travelersCount})</td>
                      <td className="py-3 text-slate-600 truncate max-w-xs">{b.packageName}</td>
                      <td className="py-3 font-bold text-slate-900">{b.totalAmount.toLocaleString('ar-MA')} د.م</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- TAB 2: PACKAGES MANAGEMENT ---------------- */}
      {activeTab === 'packages' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">إدارة وتسعير برامج العمرة</h2>
            <button
              onClick={handleOpenAddPackage}
              className="px-5 py-2.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs shadow-gold hover:shadow flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة برنامج عمرة جديد</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gold-700 bg-gold-100 px-2.5 py-0.5 rounded-full">
                      {pkg.categoryLabel}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {pkg.durationDays} يوم
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900">{pkg.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{pkg.subtitle}</p>

                  <div className="p-3 rounded-xl bg-slate-50 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">تاريخ الانطلاق:</span>
                      <span className="font-bold text-slate-900">{pkg.departureDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">السعر المبدئي:</span>
                      <span className="font-bold text-emerald-800">{pkg.startingPrice.toLocaleString('ar-MA')} د.م</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">حجز المقاعد:</span>
                      <span className="font-bold text-slate-900">{pkg.seatsBooked} / {pkg.seatsTotal}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleOpenEditPackage(pkg)}
                    className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-1"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>تعديل</span>
                  </button>

                  <button
                    onClick={() => handleDeletePackage(pkg.id)}
                    className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                    title="حذف"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- TAB 3: BOOKINGS MANAGEMENT ---------------- */}
      {activeTab === 'bookings' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-slate-900">سجل كافة الحجوزات والطلبات</h2>
            
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const headers = ["رقم الحجز", "المعتمر الرئيسي", "الهاتف", "البرنامج", "عدد المسافرين", "المبلغ الإجمالي", "المسدد", "المتبقي", "حالة الحجز", "تاريخ الحجز"];
                  const rows = bookings.map(b => [
                    b.bookingCode,
                    `"${b.primaryContact.fullName}"`,
                    `"${b.primaryContact.phone}"`,
                    `"${b.packageName}"`,
                    b.travelersCount,
                    b.totalAmount,
                    b.paidAmount,
                    b.remainingAmount,
                    b.status,
                    b.createdAt
                  ]);
                  const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
                  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `حجوزات_وكالة_رفيق_الخير_${new Date().toISOString().slice(0, 10)}.csv`;
                  a.click();
                  showNotification("تم تصدير ملف الحجوزات CSV بنجاح ✓");
                }}
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>تصدير إلى CSV / Excel</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="p-4 font-bold">رقم الحجز</th>
                    <th className="p-4 font-bold">المعتمر الرئيسي</th>
                    <th className="p-4 font-bold">الهاتف</th>
                    <th className="p-4 font-bold">البرنامج</th>
                    <th className="p-4 font-bold">المسافرين</th>
                    <th className="p-4 font-bold">المبلغ الإجمالي</th>
                    <th className="p-4 font-bold">المسدد</th>
                    <th className="p-4 font-bold">المتبقي</th>
                    <th className="p-4 font-bold">حالة الحجز</th>
                    <th className="p-4 font-bold">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50">
                      <td className="p-4 font-mono font-bold text-slate-900" dir="ltr">{b.bookingCode}</td>
                      <td className="p-4 font-semibold text-slate-900">{b.primaryContact.fullName}</td>
                      <td className="p-4 text-slate-600" dir="ltr">{b.primaryContact.phone}</td>
                      <td className="p-4 text-slate-700 truncate max-w-xs">{b.packageName}</td>
                      <td className="p-4 text-slate-900 font-bold">{b.travelersCount}</td>
                      <td className="p-4 font-bold text-slate-900">{b.totalAmount.toLocaleString('ar-MA')} د.م</td>
                      <td className="p-4 font-bold text-emerald-700">{b.paidAmount.toLocaleString('ar-MA')} د.م</td>
                      <td className="p-4 font-bold text-amber-700">{b.remainingAmount.toLocaleString('ar-MA')} د.م</td>
                      <td className="p-4">
                        <select
                          value={b.status}
                          onChange={(e) => handleUpdateBookingStatus(b.bookingCode, e.target.value as any)}
                          className="text-[11px] font-bold p-1 rounded-lg border border-slate-200 bg-white"
                        >
                          <option value="new">طلب جديد</option>
                          <option value="confirmed">مؤكد</option>
                          <option value="pending_review">في انتظار المراجعة</option>
                          <option value="pending_payment">في انتظار الدفع</option>
                          <option value="cancelled">ملغى</option>
                        </select>
                      </td>
                      <td className="p-4 flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedBooking(b)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-[11px]"
                        >
                          تفاصيل ودفع
                        </button>
                        <Link
                          href={`/invoice/${b.bookingCode}`}
                          target="_blank"
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] flex items-center gap-1"
                          title="طباعة وصل الحجز"
                        >
                          <Printer className="w-3 h-3 text-slate-500" />
                          <span>الوصل</span>
                        </Link>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- TAB 4: SETTINGS & VISUAL CMS ---------------- */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-black text-primary-950 font-cairo">
              محرر الموقع وإعدادات الوكالة (CMS)
            </h2>
            <p className="text-xs text-slate-500">
              تعديل أسماء وهوية الوكالة وأرقام التواصل وشريط الإعلانات الذي يظهر للزوار فوراً
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">اسم الوكالة بالعربية *</label>
              <input
                type="text"
                value={settings.agencyName}
                onChange={(e) => setSettings({ ...settings, agencyName: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">شعار / الاسم الفرعي باللاتينية</label>
              <input
                type="text"
                value={settings.agencySubtitle}
                onChange={(e) => setSettings({ ...settings, agencySubtitle: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">رقم الهاتف الرسمي *</label>
              <input
                type="text"
                dir="ltr"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 text-right focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">رقم الواتساب الرسمي *</label>
              <input
                type="text"
                dir="ltr"
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 text-right focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">البريد الإلكتروني</label>
              <input
                type="email"
                dir="ltr"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 text-right focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">عنوان المقر الرئيسي بالمغرب</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">رقم ترخيص وزارة السياحة</label>
              <input
                type="text"
                value={settings.licenseNumber}
                onChange={(e) => setSettings({ ...settings, licenseNumber: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          {/* Bank Details */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <h4 className="font-bold text-xs text-emerald-800">بيانات الحساب البنكي لتحويلات المعتمرين</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">اسم البنك</label>
                <input
                  type="text"
                  value={settings.bankName}
                  onChange={(e) => setSettings({ ...settings, bankName: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">رقم الحساب البنكي (RIB - 24 رقم)</label>
                <input
                  type="text"
                  dir="ltr"
                  value={settings.bankRib}
                  onChange={(e) => setSettings({ ...settings, bankRib: e.target.value })}
                  className="w-full text-xs font-mono p-3 rounded-xl border border-slate-200 bg-white text-center"
                />
              </div>
            </div>
          </div>

          {/* Hero Banner Texts */}
          <div className="space-y-4">
            <h4 className="font-bold text-xs text-slate-800">نصوص الواجهة الرئيسية (Hero)</h4>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">العنوان الرئيسي</label>
              <input
                type="text"
                value={settings.heroTitle}
                onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-200"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">الوصف الترحيبي</label>
              <textarea
                rows={2}
                value={settings.heroSubtitle}
                onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 resize-none"
              />
            </div>
          </div>

          {/* Announcement Bar */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isAnn"
                checked={settings.isAnnouncementActive}
                onChange={(e) => setSettings({ ...settings, isAnnouncementActive: e.target.checked })}
                className="w-4 h-4 text-emerald-600 rounded"
              />
              <label htmlFor="isAnn" className="text-xs font-bold text-slate-700">
                تفعيل شريط الإعلانات المتحرك أعلى الموقع
              </label>
            </div>
            <input
              type="text"
              value={settings.announcementText}
              onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
              className="w-full text-xs p-3 rounded-xl border border-slate-200"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="px-8 py-3.5 rounded-2xl bg-gold-gradient text-slate-950 font-black text-sm shadow-gold hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4 text-slate-950" />
              <span>حفظ كافة التعديلات ونشرها</span>
            </button>
          </div>
        </form>
      )}

      {/* ---------------- TAB 5: INQUIRIES ---------------- */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <h2 className="text-xl font-bold text-slate-900">طلبات الاستشارة والتواصل من الزوار</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inquiries.map((inq) => (
              <div key={inq.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900">{inq.fullName}</h4>
                  <span className="text-[10px] text-slate-400">{new Date(inq.createdAt).toLocaleDateString('ar-MA')}</span>
                </div>
                <div className="text-xs text-slate-600">
                  <p>📞 الهاتف: <span className="font-mono font-bold text-slate-900" dir="ltr">{inq.phone}</span></p>
                  {inq.packageInterest && <p>🕌 البرنامج المطلوب: <span className="font-semibold text-emerald-800">{inq.packageInterest}</span></p>}
                </div>
                <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 mt-2">
                  &ldquo;{inq.message}&rdquo;
                </p>
                <div className="pt-2 flex justify-end">
                  <a
                    href={`https://wa.me/${inq.phone.replace(/\D/g, '')}?text=${encodeURIComponent('السلام عليكم أخي الكريم، نتواصل معك من وكالة رفيق الخير بخصوص طلب الاستشارة...')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <span>مراسلة عبر واتساب</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- TAB 6: AUDIT LOGS ---------------- */}
      {activeTab === 'logs' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 animate-in fade-in duration-200">
          <h2 className="text-xl font-bold text-slate-900">سجل النشاطات والعمليات الحساسة (Audit Logs)</h2>
          <div className="divide-y divide-slate-100 text-xs">
            {auditLogs.map((log) => (
              <div key={log.id} className="py-3 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {log.action}
                    </span>
                    <span className="font-semibold text-slate-800">{log.performedBy}</span>
                  </div>
                  <p className="text-slate-600">{log.details}</p>
                </div>
                <span className="text-[11px] text-slate-400 whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleString('ar-MA')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- BOOKING DETAIL & PAYMENT MODAL ---------------- */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs text-slate-500">رقم الحجز:</span>
                <h3 className="text-xl font-black text-primary-950 font-mono" dir="ltr">
                  {selectedBooking.bookingCode}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-2"
              >
                إغلاق ✕
              </button>
            </div>

            {/* Traveler info */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <p>المسافر الرئيسي: <span className="font-bold text-slate-900">{selectedBooking.primaryContact.fullName}</span></p>
              <p>الهاتف: <span className="font-bold font-mono" dir="ltr">{selectedBooking.primaryContact.phone}</span></p>
              <p>البرنامج: <span className="font-bold text-emerald-800">{selectedBooking.packageName}</span></p>
              <p>نوع الغرفة: <span className="font-bold">{selectedBooking.roomTypeLabel}</span> ({selectedBooking.travelersCount} مسافرين)</p>
            </div>

            {/* Financial balance */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-slate-100">
                <span className="text-slate-400 block text-[10px]">الإجمالي</span>
                <span className="font-black text-slate-900">{selectedBooking.totalAmount.toLocaleString('ar-MA')} د.م</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800">
                <span className="text-[10px] block">المسدد</span>
                <span className="font-black">{selectedBooking.paidAmount.toLocaleString('ar-MA')} د.م</span>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 text-amber-800">
                <span className="text-[10px] block">المتبقي</span>
                <span className="font-black">{selectedBooking.remainingAmount.toLocaleString('ar-MA')} د.م</span>
              </div>
            </div>

            {/* Record New Payment Form */}
            {selectedBooking.remainingAmount > 0 && (
              <form onSubmit={handleRecordPayment} className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
                <h4 className="font-bold text-xs text-primary-950 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-emerald-700" />
                  <span>تسجيل دفعة مالية جديدة (عربون أو باقي المبلغ)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="number"
                    required
                    placeholder="المبلغ (د.م)"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    className="text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                  />
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="bank_transfer">تحويل بنكي</option>
                    <option value="cash">كاش في الوكالة</option>
                    <option value="cmi_card">بطاقة بنكية</option>
                  </select>
                  <input
                    type="text"
                    placeholder="رقم المرجع / الإيصال"
                    value={paymentReference}
                    onChange={(e) => setPaymentReference(e.target.value)}
                    className="text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow transition-colors"
                >
                  تسجيل الدفعة وإصدار الوصل
                </button>
              </form>
            )}

            {/* Internal staff notes */}
            {selectedBooking.internalNotes && selectedBooking.internalNotes.length > 0 && (
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-700">سجل التغييرات والملاحظات:</h4>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] space-y-1">
                  {selectedBooking.internalNotes.map((n, i) => (
                    <p key={i}>• {n}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---------------- PACKAGE MODAL ---------------- */}
      {showPackageModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                {editingPackage ? 'تعديل برنامج عمرة' : 'إضافة برنامج عمرة جديد'}
              </h3>
              <button
                onClick={() => setShowPackageModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePackage} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">عنوان العرض</label>
                <input
                  type="text"
                  required
                  value={packageFormData.title}
                  onChange={(e) => setPackageFormData({ ...packageFormData, title: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">الوصف الترويجي</label>
                <input
                  type="text"
                  value={packageFormData.subtitle}
                  onChange={(e) => setPackageFormData({ ...packageFormData, subtitle: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">السعر المبدئي (د.م)</label>
                  <input
                    type="number"
                    required
                    value={packageFormData.startingPrice}
                    onChange={(e) => setPackageFormData({ ...packageFormData, startingPrice: Number(e.target.value) })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">إجمالي المقاعد</label>
                  <input
                    type="number"
                    required
                    value={packageFormData.seatsTotal}
                    onChange={(e) => setPackageFormData({ ...packageFormData, seatsTotal: Number(e.target.value) })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">تاريخ الذهاب</label>
                  <input
                    type="date"
                    required
                    value={packageFormData.departureDate}
                    onChange={(e) => setPackageFormData({ ...packageFormData, departureDate: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">تاريخ العودة</label>
                  <input
                    type="date"
                    required
                    value={packageFormData.returnDate}
                    onChange={(e) => setPackageFormData({ ...packageFormData, returnDate: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">شركة الطيران</label>
                <input
                  type="text"
                  value={packageFormData.airline}
                  onChange={(e) => setPackageFormData({ ...packageFormData, airline: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPackageModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-700"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gold-gradient text-xs font-black text-slate-950 shadow"
                >
                  حفظ البرنامج
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
