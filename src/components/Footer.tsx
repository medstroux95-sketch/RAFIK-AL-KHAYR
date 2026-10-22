import React from 'react';
import Link from 'next/link';
import { BrandLogo } from './BrandLogo';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  CreditCard, 
  Building2, 
  MessageCircle, 
  CheckCircle,
  ExternalLink
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-950 text-slate-300 pt-16 pb-12 border-t-4 border-gold-500 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-slate-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <BrandLogo variant="light" size="lg" />
            <p className="text-sm text-slate-300 leading-relaxed pt-2">
              وكالة أسفار مغربية معتمدة متخصصة في تنظيم وتسويق رحلات العمرة إلى مكة المكرمة والمدينة المنورة، وتقديم برامج استثنائية تضمن الراحة التامة والسكينة الإيمانية.
            </p>
            <div className="flex items-center gap-2 text-xs text-gold-400 font-semibold bg-primary-900/80 border border-gold-500/20 px-3 py-2 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>ترخيص وزارة السياحة: LIC-MOR-2024-8841</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white text-base font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-400"></span>
              <span>روابط سريعة</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <span>الرئيسية</span>
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <span>كافة عروض العمرة المتوفرة</span>
                </Link>
              </li>
              <li>
                <Link href="/packages/omra-chaban-ramadan" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <span>عمرة شعبان ورمضان 1446</span>
                </Link>
              </li>
              <li>
                <Link href="/packages/omra-via-turquie-istanbul" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <span>عمرة عبر تركيا (إسطنبول والحرمين)</span>
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <span>تتبع حالة الحجز الإلكتروني</span>
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-gold-300 transition-colors flex items-center gap-1.5 text-slate-400">
                  <span>بوابة الموظفين والإدارة</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Payment & Bank Details */}
          <div className="space-y-4">
            <h4 className="text-white text-base font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-400"></span>
              <span>طرق الدفع والحساب البنكي</span>
            </h4>
            <div className="bg-primary-900/50 p-3.5 rounded-xl border border-slate-800 text-xs space-y-2">
              <div className="flex items-center gap-2 text-gold-300 font-bold">
                <Building2 className="w-4 h-4 text-gold-400" />
                <span>الحساب البنكي الرسمي (RIB):</span>
              </div>
              <p className="font-mono text-white text-xs bg-black/40 px-2.5 py-1.5 rounded text-center tracking-wider" dir="ltr">
                007 780 0001234567890123 45
              </p>
              <p className="text-[11px] text-slate-400">
                التجاري وفا بنك - Attijariwafa Bank (باسم: وكالة رفيق الخير)
              </p>
            </div>

            <div className="space-y-1 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-gold-400" />
                <span>إمكانية دفع عربون 30% لتثبيت المقعد</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-gold-400" />
                <span>الدفع بمقر الوكالة (كاش أو شيك)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-gold-400" />
                <span>أداء إلكتروني آمن عبر البطاقة البنكية</span>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Support */}
          <div className="space-y-4">
            <h4 className="text-white text-base font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-400"></span>
              <span>تواصل مع الوكالة</span>
            </h4>
            <div className="space-y-3 text-sm">
              <a 
                href="tel:0662574740" 
                className="flex items-start gap-3 hover:text-white transition-colors group"
              >
                <div className="p-2 rounded-lg bg-slate-800 group-hover:bg-gold-500 group-hover:text-slate-950 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-gold-400">الهاتف المباشر</div>
                  <div className="font-bold text-white tracking-wide" dir="ltr">0662 57 47 40</div>
                </div>
              </a>

              <a 
                href="https://wa.me/212662574740" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-white transition-colors group"
              >
                <div className="p-2 rounded-lg bg-slate-800 group-hover:bg-gold-500 group-hover:text-slate-950 transition-colors">
                  <MessageCircle className="w-4 h-4 text-gold-400 group-hover:text-slate-950" />
                </div>
                <div>
                  <div className="text-xs text-gold-400">خدمة الواتساب</div>
                  <div className="font-bold text-gold-300 tracking-wide" dir="ltr">+212 662 57 47 40</div>
                </div>
              </a>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-800">
                  <MapPin className="w-4 h-4 text-gold-400" />
                </div>
                <div>
                  <div className="text-xs text-gold-400">المقر الرئيسي</div>
                  <div className="text-xs text-slate-300">شارع الحسن الثاني، الدار البيضاء، المملكة المغربية</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} وكالة رفيق الخير للسفر والسياحة. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-6">
            <span>الأسعار بالدرهم المغربي (MAD)</span>
            <span>•</span>
            <span>تأشيرات العمرة وخدمات نسك المعتمدة</span>
            <span>•</span>
            <span className="text-gold-400">رفيقكم الموثوق في رحاب الحرمين الشريفين</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
