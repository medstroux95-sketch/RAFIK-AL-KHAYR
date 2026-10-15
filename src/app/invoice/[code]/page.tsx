import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBookingByCode, getSettings } from '@/lib/db';
import { BrandLogo } from '@/components/BrandLogo';
import { 
  Printer, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Calendar, 
  Building2 
} from 'lucide-react';
import PrintInvoiceButton from './PrintInvoiceButton';

export const revalidate = 0;

export default async function InvoicePage({
  params,
}: {
  params: { code: string };
}) {
  const booking = await getBookingByCode(params.code);
  if (!booking) {
    notFound();
  }

  const settings = await getSettings();

  return (
    <div className="bg-slate-100 min-h-screen py-10 font-cairo print:bg-white print:py-0">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Navigation Bar (hidden when printing) */}
        <div className="mb-6 flex items-center justify-between print:hidden">
          <Link
            href={`/track?code=${booking.bookingCode}`}
            className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-emerald-800"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لصفحة التتبع</span>
          </Link>

          <PrintInvoiceButton />
        </div>

        {/* The Printable Official Document */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-200 print:shadow-none print:border-none print:p-0 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b-2 border-primary-950 pb-6">
            <div className="space-y-1">
              <BrandLogo variant="dark" size="lg" />
              <p className="text-xs text-slate-500 pt-1 font-medium">
                {settings.agencyName} • {settings.address}
              </p>
              <p className="text-xs text-slate-500" dir="ltr">
                الهاتف: {settings.phone} • {settings.email}
              </p>
            </div>

            <div className="text-left space-y-1">
              <div className="inline-block px-3.5 py-1 rounded-full bg-primary-900 text-gold-300 font-bold text-xs">
                وصل وتأكيد حجز العمرة الرسمي
              </div>
              <div className="text-xs text-slate-400">
                رقم الحجز: <span className="font-mono font-bold text-slate-900 text-sm" dir="ltr">{booking.bookingCode}</span>
              </div>
              <div className="text-xs text-slate-400">
                تاريخ الإصدار: {new Date(booking.createdAt).toLocaleDateString('ar-MA')}
              </div>
              <div className="text-[11px] text-emerald-800 font-bold">
                ترخيص: {settings.licenseNumber}
              </div>
            </div>
          </div>

          {/* Pilgrim / Contact Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200 text-xs">
            <div className="space-y-1.5">
              <span className="font-bold text-slate-400 block text-[11px]">بيانات المعتمر الرئيسي:</span>
              <p className="text-sm font-bold text-slate-900">{booking.primaryContact.fullName}</p>
              <p className="text-slate-600">الهاتف: <span dir="ltr">{booking.primaryContact.phone}</span></p>
              <p className="text-slate-600">المدينة: {booking.primaryContact.city}</p>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-slate-400 block text-[11px]">بيانات الرحلة:</span>
              <p className="text-sm font-bold text-slate-900">{booking.packageName}</p>
              <p className="text-slate-600">تاريخ الانطلاق: <span className="font-bold">{booking.departureDate}</span></p>
              <p className="text-slate-600">مدينة المغادرة: {booking.departureCity}</p>
              <p className="text-slate-600">نوع الغرفة: <span className="font-bold text-primary-950">{booking.roomTypeLabel}</span></p>
            </div>
          </div>

          {/* Pilgrims List */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs text-slate-700">قائمة المسافرين المعتمدين ({booking.travelersCount}):</h4>
            <table className="w-full text-right text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="p-2.5 font-bold">#</th>
                  <th className="p-2.5 font-bold">الاسم الكامل للمعتمر</th>
                  <th className="p-2.5 font-bold">الجنس</th>
                  <th className="p-2.5 font-bold">الصفة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {booking.travelers.map((t, i) => (
                  <tr key={i}>
                    <td className="p-2.5">{i + 1}</td>
                    <td className="p-2.5 font-bold">{t.fullName}</td>
                    <td className="p-2.5 text-slate-600">{t.gender || 'معتمر'}</td>
                    <td className="p-2.5 text-emerald-800">{t.isPrimary ? 'المسافر الرئيسي' : 'مرافق'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Breakdown Table */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs text-slate-700">البيان المالي والمدفوعات:</h4>
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th className="p-3 font-bold">البيان</th>
                    <th className="p-3 font-bold">العدد</th>
                    <th className="p-3 font-bold">سعر الوحدة</th>
                    <th className="p-3 font-bold text-left">المجموع</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3">
                      <span className="font-bold text-slate-900 block">{booking.packageName}</span>
                      <span className="text-[11px] text-slate-500">{booking.roomTypeLabel}</span>
                    </td>
                    <td className="p-3 font-bold">{booking.travelersCount}</td>
                    <td className="p-3">{booking.roomPricePerPerson.toLocaleString('ar-MA')} د.م</td>
                    <td className="p-3 font-bold text-left">{(booking.roomPricePerPerson * booking.travelersCount).toLocaleString('ar-MA')} د.م</td>
                  </tr>
                  {booking.discountAmount > 0 && (
                    <tr className="text-emerald-700 font-bold bg-emerald-50/50">
                      <td colSpan={3} className="p-3">خصم ترويجي معتمد (كوبون)</td>
                      <td className="p-3 text-left">-{booking.discountAmount.toLocaleString('ar-MA')} د.م</td>
                    </tr>
                  )}
                </tbody>
                <tfoot className="bg-slate-50 font-bold text-xs border-t border-slate-200">
                  <tr>
                    <td colSpan={3} className="p-3 text-slate-800">المبلغ الإجمالي المستحق:</td>
                    <td className="p-3 text-left text-primary-950 font-black text-sm">{booking.totalAmount.toLocaleString('ar-MA')} درهم مغربي</td>
                  </tr>
                  <tr className="text-emerald-800">
                    <td colSpan={3} className="p-3">المبلغ المسدد حتى تاريخه:</td>
                    <td className="p-3 text-left font-black">{booking.paidAmount.toLocaleString('ar-MA')} درهم مغربي</td>
                  </tr>
                  <tr className="text-amber-800">
                    <td colSpan={3} className="p-3">المبلغ المتبقي للتحصيل:</td>
                    <td className="p-3 text-left font-black">{booking.remainingAmount.toLocaleString('ar-MA')} درهم مغربي</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Payment Method Notice */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <p className="font-bold text-slate-800">شروط وأحكام العقد:</p>
            <p>1. يعتبر هذا الوصل مستنداً رسمياً يثبت تسجيل المعتمر في رحلة العمرة المحددة أعلاه.</p>
            <p>2. يتوجب تسديد المبلغ المتبقي (إن وجد) قبل 15 يوماً من موعد انطلاق الرحلة.</p>
            <p>3. الحساب البنكي المعتمد للوكالة: {settings.bankName} - RIB: <span className="font-mono font-bold" dir="ltr">{settings.bankRib}</span>.</p>
          </div>

          {/* Signatures & Seal */}
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-200 text-center text-xs">
            <div className="space-y-12">
              <span className="font-bold text-slate-700 block">توقيع المعتمر الرئيسي</span>
              <div className="border-b border-dashed border-slate-300 w-48 mx-auto" />
            </div>

            <div className="space-y-12">
              <span className="font-bold text-slate-700 block">خاتم وتوقيع وكالة رفيق الخير</span>
              <div className="w-24 h-24 rounded-full border-2 border-gold-600/60 mx-auto flex items-center justify-center text-[10px] text-gold-700 font-bold rotate-12">
                رفيق الخير<br />معتمد
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
