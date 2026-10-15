import React from 'react';
import { Sparkles } from 'lucide-react';
import BookingTrackerClient from './BookingTrackerClient';

export default function TrackPage({
  searchParams,
}: {
  searchParams: { code?: string; phone?: string };
}) {
  return (
    <div className="bg-[#fcfbf7] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-gold-700 bg-gold-100 px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>بوابة المعتمرين الإلكترونية</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-primary-950 font-cairo">
            تتبع حالة حجز العمرة
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto">
            أدخل رقم مرجع الحجز (مثال: RAK-2026-9041) ورقم الهاتف المسجل للاطلاع على حالة ملفك والدفعات المالية المعتمدة
          </p>
        </div>

        {/* Tracker Interactive Client */}
        <BookingTrackerClient 
          initialCode={searchParams.code} 
          initialPhone={searchParams.phone} 
        />

      </div>
    </div>
  );
}
