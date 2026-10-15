'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Send, HelpCircle, Calendar, CreditCard, UserCheck } from 'lucide-react';

interface SmartWhatsAppButtonProps {
  packageName?: string;
  departureDate?: string;
  roomType?: string;
}

export const SmartWhatsAppButton: React.FC<SmartWhatsAppButtonProps> = ({
  packageName,
  departureDate,
  roomType,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "212662574740";

  const defaultMsg = packageName
    ? `السلام عليكم ورحمة الله، أرغب في الاستفسار عن برنامج (${packageName})${departureDate ? ` بتاريخ ${departureDate}` : ''}${roomType ? ` - نوع الغرفة: ${roomType}` : ''}. المرجو تزويدي بكافة التفاصيل وشروط الحجز.`
    : `السلام عليكم ورحمة الله، أرغب في الاستفسار عن عروض رحلات العمرة المتاحة لديكم مع وكالة رفيق الخير.`;

  const [message, setMessage] = useState(defaultMsg);

  const quickTopics = [
    {
      title: "الاستفسار عن عروض العمرة",
      icon: Calendar,
      msg: "السلام عليكم، أود معرفة تفاصيل عروض العمرة القادمة والأسعار المتوفرة لديكم."
    },
    {
      title: "المساعدة في إتمام الحجز",
      icon: UserCheck,
      msg: "السلام عليكم، أحتاج مساعدة من مستشار الوكالة لإتمام خطوات الحجز لرحلة العمرة."
    },
    {
      title: "السؤال عن طرق الدفع وتأكيد الحجز",
      icon: CreditCard,
      msg: "السلام عليكم، أود الاستفسار عن شروط دفع العربون والحساب البنكي للوكالة."
    },
    {
      title: "متابعة طلب حجز موجود",
      icon: HelpCircle,
      msg: "السلام عليكم، لدي طلب حجز في وكالتكم وأرغب في متابعة حالته وتأكيد التذاكر."
    }
  ];

  const handleSend = (textToSend: string) => {
    const encoded = encodeURIComponent(textToSend);
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start font-cairo">
      {/* WhatsApp Popup Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-emerald-800 to-primary-950 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-emerald-800 shadow">
                  <MessageCircle className="w-6 h-6 fill-current" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h4 className="font-bold text-sm">مستشار العمرة - رفيق الخير</h4>
                <p className="text-[11px] text-emerald-200">متصل الآن للإجابة على استفساراتكم</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 text-white/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Card Body */}
          <div className="p-4 bg-slate-50 space-y-3">
            <div className="text-xs text-slate-600 font-medium">
              اختر موضوع استفسارك السريع:
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              {quickTopics.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSend(item.msg)}
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-300 text-slate-800 text-xs transition-all text-right group"
                  >
                    <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium flex-1">{item.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom Input */}
            <div className="pt-2 border-t border-slate-200">
              <label className="text-[11px] text-slate-500 block mb-1">
                أو اكتب رسالتك المباشرة:
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white resize-none"
              />
              <button
                onClick={() => handleSend(message)}
                className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>إرسال المحادثة إلى واتساب الوكالة</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 group border-2 border-white/80"
        aria-label="تواصل عبر واتساب"
      >
        <div className="relative">
          <MessageCircle className="w-7 h-7 fill-white text-emerald-600" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-gold-500"></span>
          </span>
        </div>
        <div className="text-right hidden sm:block">
          <div className="text-[11px] text-emerald-100 font-medium leading-none">تواصل فوري</div>
          <div className="text-sm font-bold leading-tight">استفسر عبر واتساب</div>
        </div>
      </button>
    </div>
  );
};
