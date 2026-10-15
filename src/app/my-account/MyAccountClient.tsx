'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Booking } from '@/types';
import { 
  User, 
  Phone, 
  Search, 
  Calendar, 
  CreditCard, 
  FileText, 
  CheckCircle2, 
  Clock, 
  ChevronLeft,
  Sparkles,
  Lock
} from 'lucide-react';

export default function MyAccountClient() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [customerBookings, setCustomerBookings] = useState<Booking[] | null>(null);
  const [searched, setSearched] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (data.success && data.bookings) {
        const cleanInput = phone.replace(/\D/g, '');
        const matched = data.bookings.filter((b: Booking) => {
          const stored = b.primaryContact.phone.replace(/\D/g, '');
          return stored.includes(cleanInput) || cleanInput.includes(stored);
        });
        setCustomerBookings(matched);
      } else {
        setCustomerBookings([]);
      }
    } catch (err) {
      setCustomerBookings([]);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-primary-950 text-white p-8 rounded-3xl border border-emerald-900 shadow-xl space-y-2 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-gold-400 bg-emerald-900/80 px-3 py-1 rounded-full border border-gold-400/30">
          <User className="w-3.5 h-3.5" />
          <span>فضاء المعتمر والعملاء</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black">
          متابعة ملفات وسجل حجوزاتك
        </h1>
        <p className="text-emerald-100/80 text-xs sm:text-sm max-w-lg mx-auto">
          أدخل رقم هاتفك المسجل أثناء الحجز للاطلاع على كافة حجوزاتك، إيصالات الدفع، وطباعة وصولات السفر
        </p>
      </div>

      {/* Phone Authentication Form */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm max-w-md mx-auto">
        <form onSubmit={handleLookup} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">
              رقم الهاتف المسجل في الحجز *
            </label>
            <input
              type="tel"
              required
              placeholder="0661234567"
              dir="ltr"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full text-xs font-mono font-bold p-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 text-right"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-gold-gradient text-slate-950 font-black text-xs sm:text-sm shadow-gold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>جاري التحقق...</span>
            ) : (
              <>
                <Search className="w-4 h-4 text-slate-950" />
                <span>عرض حجوزاتي وملفاتي</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Results */}
      {searched && (
        <div className="space-y-4">
          {customerBookings && customerBookings.length > 0 ? (
            <div className="space-y-4">
              <h3 className="font-bold text-base text-slate-900">
                الحجوزات المرتبطة بهذا الرقم ({customerBookings.length}):
              </h3>
              {customerBookings.map((b) => (
                <div 
                  key={b.id}
                  className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-gold-300 transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[11px] text-slate-400">رقم الحجز:</span>
                      <span className="font-mono font-bold text-slate-900 text-sm block" dir="ltr">{b.bookingCode}</span>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {b.status === 'confirmed' ? 'مؤكد ومعتمد' : 'طلب قيد المتابعة'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">البرنامج:</span>
                      <span className="font-bold text-slate-900">{b.packageName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">تاريخ السفر:</span>
                      <span className="font-bold text-slate-900">{b.departureDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">المبلغ:</span>
                      <span className="font-bold text-emerald-800">{b.paidAmount.toLocaleString('ar-MA')} / {b.totalAmount.toLocaleString('ar-MA')} د.م</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <Link
                      href={`/invoice/${b.bookingCode}`}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-600" />
                      <span>عرض وطباعة الوصل الرسمي</span>
                    </Link>

                    <Link
                      href={`/track?code=${b.bookingCode}`}
                      className="px-4 py-2 rounded-xl bg-primary-900 hover:bg-primary-950 text-gold-300 font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <span>تتبع الرحلة</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-2">
              <p className="font-bold text-slate-800 text-sm">لم يتم العثور على أي حجز مسجل بهذا الرقم</p>
              <p className="text-xs text-slate-500">يرجى التأكد من كتابة نفس رقم الهاتف المستخدم أثناء تعبئة الحجز أو تواصل مع الوكالة للمساعدة.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
