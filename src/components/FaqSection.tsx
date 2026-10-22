'use client';

import React, { useState } from 'react';
import { FaqItem } from '@/types';
import { ChevronDown, HelpCircle, CheckCircle2 } from 'lucide-react';

interface FaqSectionProps {
  faqs: FaqItem[];
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div
            key={faq.id}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'bg-white border-gold-300 shadow-md ring-1 ring-gold-200'
                : 'bg-white/80 border-slate-200/90 hover:border-slate-300'
            }`}
          >
            <button
              onClick={() => toggle(faq.id)}
              className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-right transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl transition-colors ${
                  isOpen ? 'bg-primary-900 text-gold-400' : 'bg-slate-100 text-slate-600'
                }`}>
                  <HelpCircle className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm sm:text-base text-slate-900">
                  {faq.question}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                  isOpen ? 'transform rotate-180 text-gold-500' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-50 bg-slate-50/50">
                <div className="flex items-start gap-2 pt-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                  <span>{faq.answer}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
