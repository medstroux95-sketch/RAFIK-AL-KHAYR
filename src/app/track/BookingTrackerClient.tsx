'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Booking } from '@/types';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Printer, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Users, 
  CreditCard,
  Building2,
  FileCheck,
  ChevronLeft
} from 'lucide-react';

interface BookingTrackerClientProps {
  initialCode?: string;
  initialPhone?: string;
}

export default function BookingTrackerClient({
  initialCode = '',
  initialPhone = '',
}: BookingTrackerClientProps) {
  const [code, setCode] = useState(initialCode);
  const [phone, setPhone] = useState(initialPhone);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [booking, setBooking] = useState<Booking | null>(null);

  const fetchBooking = async (searchCode: string, searchPhone?: string) => {
    if (!searchCode.trim()) return;
    setLoading(true);
    setError('');

    try {
      const url = `/api/bookings/${encodeURIComponent(searchCode.trim())}${
        searchPhone ? `?phone=${encodeURIComponent(searchPhone.trim())}` : ''
      }`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.success && data.booking) {
        setBooking(data.booking);
      } else {
        setBooking(null);
        setError(data.error || 'لم يتم العثور على الحجز المطلوب، يرجى التأكد من الرمز ورقم الهاتف');
      }
    } catch (err) {
      setError('حدث خطأ أثناء البحث، يرجى المحاولة لاحقاً');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialCode) {
      fetchBooking(initialCode, initialPhone);
    }
  }, [initialCode, initialPhone]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBooking(code, phone);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">مؤكد ومعتمد ✓</span>;
      case 'new':
      case 'pending_review':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">في انتظار مراجعة الوكالة ⏳</span>;
      case 'cancelled':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">ملغى ✗</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">{status}</span>;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Search Input Box */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                رقم مرجع الحجز (Booking Code) *
              </label>
              <input
                type="text"
                required
                placeholder="مثال: RAK-2026-9041"
                dir="ltr"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full text-xs font-mono font-bold p-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 text-right uppercase tracking-wider"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                رقم هاتف المسافر الرئيسي (اختياري)
              </label>
              <input
                type="tel"
                placeholder="0661234567"
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs p-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 text-right"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-2xl bg-gold-gradient text-slate-950 font-black text-xs sm:text-sm shadow-gold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>جاري البحث...</span>
              ) : (
                <>
                  <Search className="w-4 h-4 text-slate-950" />
                  <span>البحث عن الحجز</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Booking Details Result */}
      {booking && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gold-300/60 ring-1 ring-gold-200 space-y-8 animate-in fade-in duration-300">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-slate-500">مرجع الحجز:</span>
                <span className="text-lg font-black text-primary-950 font-mono tracking-wider" dir="ltr">
                  {booking.bookingCode}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-cairo">
                {booking.packageName}
              </h2>
            </div>
            <div>{getStatusBadge(booking.status)}</div>
          </div>

          {/* Quick details grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-400 block text-xs">المسافر الرئيسي:</span>
              <span className="font-bold text-slate-900">{booking.primaryContact.fullName}</span>
              <span className="text-slate-500 block text-xs" dir="ltr">{booking.primaryContact.phone}</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-400 block text-xs">تاريخ الانطلاق والمكان:</span>
              <span className="font-bold text-slate-900">{booking.departureDate}</span>
              <span className="text-slate-500 block text-xs">{booking.departureCity}</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-400 block text-xs">الغرفة والمسافرين:</span>
              <span className="font-bold text-slate-900">{booking.roomTypeLabel}</span>
              <span className="text-slate-500 block text-xs">{booking.travelersCount} معتمرين</span>
            </div>
          </div>

          {/* Pilgrims List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-800" />
              <span>قائمة المعتمرين المسجلين في هذا الحجز:</span>
            </h4>
            <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 overflow-hidden">
              {booking.travelers.map((t, idx) => (
                <div key={idx} className="p-3 bg-white flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-slate-900">{t.fullName}</span>
                    {t.isPrimary && (
                      <span className="text-[10px] bg-gold-100 text-gold-800 font-bold px-2 py-0.5 rounded-full">
                        المسافر الرئيسي
                      </span>
                    )}
                  </div>
                  <span className="text-slate-500">{t.gender || 'معتمر'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Overview */}
          <div className="p-6 rounded-2xl bg-primary-950 text-white space-y-4">
            <h4 className="font-bold text-sm text-gold-400 border-b border-emerald-900 pb-2">
              الملخص المالي والمدفوعات المعتمدة
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <span className="text-[11px] text-emerald-200 block">المبلغ الإجمالي</span>
                <span className="text-xl font-black text-white font-cairo">
                  {booking.totalAmount.toLocaleString('ar-MA')} د.م
                </span>
              </div>
              <div>
                <span className="text-[11px] text-emerald-200 block">المبلغ المسدد</span>
                <span className="text-xl font-black text-emerald-400 font-cairo">
                  {booking.paidAmount.toLocaleString('ar-MA')} د.م
                </span>
              </div>
              <div>
                <span className="text-[11px] text-emerald-200 block">المبلغ المتبقي</span>
                <span className="text-xl font-black text-gold-300 font-cairo">
                  {booking.remainingAmount.toLocaleString('ar-MA')} د.م
                </span>
              </div>
            </div>
          </div>

          {/* Internal Notes / Updates from agency */}
          {booking.internalNotes && booking.internalNotes.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700">تحديثات وتوجيهات الوكالة:</h4>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-700">
                {booking.internalNotes.map((note, idx) => (
                  <p key={idx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{note}</span>
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>طباعة كشف الحجز</span>
            </button>

            <a
              href={`https://wa.me/212662574740?text=${encodeURIComponent(
                `السلام عليكم، أستفسر بخصوص حجزي رقم (${booking.bookingCode}) - باسم ${booking.primaryContact.fullName}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>تواصل مع الوكالة بخصوص هذا الحجز</span>
            </a>
          </div>

        </div>
      )}

    </div>
  );
}
