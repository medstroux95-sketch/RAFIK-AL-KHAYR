import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="bg-[#fcfbf7] min-h-screen py-12 font-cairo">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header */}
        <div className="bg-primary-950 text-white p-8 rounded-3xl space-y-2 border border-emerald-900">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-gold-400 bg-emerald-900/80 px-3 py-1 rounded-full">
            <Lock className="w-4 h-4" />
            <span>حماية البيانات الشخصية</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            سياسة الخصوصية وسرية المعطيات
          </h1>
          <p className="text-emerald-100/80 text-xs sm:text-sm">
            وكالة رفيق الخير للسفر والسياحة - التزام صارم بخصوصية ضيوف الرحمن
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          <div className="space-y-2">
            <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
              1. جمع واستخدام المعلومات الشخصية
            </h3>
            <p>
              تجمع وكالة رفيق الخير للسفر والسياحة فقط المعلومات الضرورية لمعالجة طلبات العمرة، وتشمل: الاسم الكامل، رقم الهاتف، مدينة الإقامة بالمغرب، ومعلومات جواز السفر المطلوبة حصرياً لاستخراج تأشيرات العمرة وإصدار تذاكر الطيران.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
              2. سرية وأمان المعطيات
            </h3>
            <p>
              نطبق أعلى معايير الحماية التقنية والبرمجية لمنع الوصول غير المصرح به لمعلوماتكم. لا نقوم إطلاقاً ببيع أو تأجير أو مشاركة بيانات المعتمرين مع أي جهة خارجية لأغراض تسويقية.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
              3. أمان المعاملات المالية والبطاقات المصرفية
            </h3>
            <p>
              تتم جميع عمليات الأداء الإلكتروني عبر بروتوكولات آمنة ومشفرة 256-bit بالتعاون مع بوابات الدفع المعتمدة، ولا يتم تخزين أي أرقام بطاقات بنكية أو رموز سرية داخل قواعد بيانات موقعنا.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
              4. حقوق المعتمر في تعديل وحذف البيانات
            </h3>
            <p>
              يحق لكل عميل أو معتمر مسجل في أي وقت طلب مراجعة بياناته الشخصية، تعديلها، أو حذفها وفقاً لأحكام القانون رقم 09-08 المتعلق بحماية الأشخاص الذاتيين تجاه معالجة المعطيات ذات الطابع الشخصي بالمغرب.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
