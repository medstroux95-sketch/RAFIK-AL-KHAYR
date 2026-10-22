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
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-emerald-500/30 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-[#128C7E] to-[#25D366] p-4 text-white flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#25D366] shadow">
                  <MessageCircle className="w-6 h-6 fill-current" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-300 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">مستشار العمرة - رفيق الخير</h4>
                <p className="text-[11px] text-emerald-100">متصل الآن للإجابة على استفساراتكم</p>
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
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-400 text-slate-800 text-xs transition-all text-right group"
                  >
                    <div className="p-1.5 rounded-lg bg-emerald-100 text-[#128C7E] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
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
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white resize-none text-slate-900"
              />
              <button
                onClick={() => handleSend(message)}
                className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold shadow-md transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>إرسال المحادثة إلى واتساب الوكالة</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button (Official WhatsApp Green #25D366) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl shadow-[#25D366]/40 transition-all duration-300 transform hover:scale-105 group border-2 border-white"
        aria-label="تواصل عبر واتساب"
      >
        <div className="relative">
          <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
        </div>
        <div className="text-right hidden sm:block">
          <div className="text-[11px] text-white/90 font-medium leading-none">مستشار العمرة</div>
          <div className="text-sm font-bold leading-tight text-white">تواصل فوري عبر واتساب</div>
        </div>
      </button>
    </div>
  );
};
