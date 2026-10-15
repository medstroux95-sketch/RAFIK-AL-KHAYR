import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileText, ChevronLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="bg-[#fcfbf7] min-h-screen py-12 font-cairo">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header */}
        <div className="bg-primary-950 text-white p-8 rounded-3xl space-y-2 border border-emerald-900">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-gold-400 bg-emerald-900/80 px-3 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4" />
            <span>الشروط والأحكام الرسمية</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            عقد وشروط تنظيم رحلات العمرة
          </h1>
          <p className="text-emerald-100/80 text-xs sm:text-sm">
            وكالة رفيق الخير للسفر والسياحة - ترخيص وزارة السياحة بالمغرب: LIC-MOR-2024-8841
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          <div className="space-y-2">
            <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
              1. أحكام الحجز وتأكيد المقاعد
            </h3>
            <p>
              يعتبر طلب الحجز عبر الموقع الإلكتروني أو بمقر الوكالة سارياً، وتثبت المقاعد نهائياً بدفع العربون القانوني المتفق عليه (30% من قيمة الرحلة) أو سداد المبلغ الإجمالي.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
              2. التزامات الوكالة تجاه المعتمر
            </h3>
            <p>
              تلتزم وكالة رفيق الخير بتوفير كافة الخدمات المنصوص عليها في البرنامج المختار، بما في ذلك: استخراج التأشيرة الإلكترونية مع التأمين الصحي، تذاكر الطيران على الخطوط المعتمدة، الإقامة بالفنادق المحددة، التنقلات الداخلية في باصات مكيفة، وتوفير مرشد ومؤطر ديني ذي خبرة.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
              3. وثائق السفر وشروطه
            </h3>
            <p>
              يتحمل المعتمر مسؤولية صحة وثائقه وصلاحية جواز سفره (صلاحية لا تقل عن 6 أشهر من تاريخ الرحلة)، وتقديم المستندات المطلوبة في الآجال المحددة من طرف الوكالة لإتمام إجراءات منصة نسك والتأشيرة.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
              4. سياسة الإلغاء والاسترجاع
            </h3>
            <p>
              في حال رغبة المعتمر في إلغاء الحجز، تطبق الشروط التالية:
            </p>
            <ul className="list-disc pr-5 space-y-1 text-slate-600">
              <li>الإلغاء قبل 30 يوماً من موعد الرحلة: استرجاع كامل المبلغ مع خصم الرسوم الإدارية الفعلية.</li>
              <li>الإلغاء بين 15 إلى 29 يوماً: استرجاع 50% من قيمة الرحلة بعد خصم رسوم التأشيرة والتذاكر غير المستردة.</li>
              <li>الإلغاء قبل أقل من 15 يوماً: يخضع لسياسة شركات الطيران والفنادق المحجوزة مسبقاً.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
              5. القانون الواجب التطبيق
            </h3>
            <p>
              تخضع هذه الشروط والأحكام والعقود المنبثقة عنها للقوانين والأنظمة المعمول بها في المملكة المغربية في قطاع الأسفار والسياحة.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
