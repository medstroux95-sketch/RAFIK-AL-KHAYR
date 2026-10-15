import React from 'react';
import { getSettings } from '@/lib/db';
import { ConsultationForm } from '@/components/ConsultationForm';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Building2, 
  ShieldCheck 
} from 'lucide-react';

export const revalidate = 0;

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <div className="bg-[#fcfbf7] min-h-screen py-12 font-cairo">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Header */}
        <div className="bg-primary-950 text-white p-8 sm:p-12 rounded-3xl border border-emerald-900 shadow-xl space-y-3 text-center">
          <span className="text-xs font-bold text-gold-400 bg-emerald-900/80 px-3 py-1 rounded-full border border-gold-400/30">
            فريق خدمة ضيوف الرحمن رهن إشارتكم
          </span>
          <h1 className="text-3xl sm:text-5xl font-black">
            تواصل مع وكالة رفيق الخير للسفر والسياحة
          </h1>
          <p className="text-emerald-100/80 text-xs sm:text-base max-w-xl mx-auto">
            يسعدنا استقبالكم في مقرنا بالدار البيضاء أو الرد على كافة استفساراتكم عبر الهاتف والواتساب طيلة أيام الأسبوع
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">الاتصال الهاتفي المباشر</h3>
            <p className="text-xs text-slate-500">متاح لخدمتكم والإجابة الفورية:</p>
            <a 
              href={`tel:${settings.phone}`} 
              className="font-black text-lg text-primary-950 block hover:text-gold-700"
              dir="ltr"
            >
              {settings.phone}
            </a>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-bold text-base text-slate-900">محادثة واتساب الرسمية</h3>
            <p className="text-xs text-slate-500">إرسال تفاصيل الرحلات والأسئلة:</p>
            <a 
              href={`https://wa.me/${settings.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer" 
              className="font-black text-lg text-emerald-700 block hover:underline"
              dir="ltr"
            >
              +{settings.whatsapp}
            </a>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-gold-600" />
            </div>
            <h3 className="font-bold text-base text-slate-900">المقر الرئيسي للوكالة</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              {settings.address}
            </p>
            <p className="text-[11px] text-slate-400">الدار البيضاء، المملكة المغربية</p>
          </div>

        </div>

        {/* Bank & Working Hours */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-primary-900 text-white p-6 sm:p-8 rounded-3xl space-y-3 border border-gold-400/30">
            <div className="flex items-center gap-2 text-gold-400 font-bold text-sm">
              <Clock className="w-4 h-4" />
              <span>أوقات العمل واستقبال الزوار</span>
            </div>
            <div className="text-xs space-y-1.5 text-emerald-100">
              <p>• من الإثنين إلى الجمعة: 09:00 صباحاً - 07:00 مساءً</p>
              <p>• السبت: 09:30 صباحاً - 04:00 عصراً</p>
              <p>• الأحد: خدمة هاتفية وواتساب مخصصة للحالات الطارئة 24/7</p>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl space-y-3 border border-slate-800">
            <div className="flex items-center gap-2 text-gold-400 font-bold text-sm">
              <Building2 className="w-4 h-4" />
              <span>الحساب البنكي الرسمي (RIB)</span>
            </div>
            <p className="text-xs text-slate-300">
              {settings.bankName} - رقم الحساب (24 رقماً):
            </p>
            <p className="font-mono text-sm font-bold text-gold-300 bg-black/40 p-2.5 rounded-xl text-center tracking-wider" dir="ltr">
              {settings.bankRib}
            </p>
          </div>
        </div>

        {/* Interactive Consultation Form */}
        <div className="max-w-2xl mx-auto pt-4">
          <ConsultationForm />
        </div>

      </div>
    </div>
  );
}
