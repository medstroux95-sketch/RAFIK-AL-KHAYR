'use client';

import React from 'react';
import { Printer } from 'lucide-react';

export default function PrintInvoiceButton() {
  return (
    <button
      onClick={() => window.print()}
      className="px-5 py-2.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs shadow-gold hover:shadow flex items-center gap-2 transition-all"
    >
      <Printer className="w-4 h-4" />
      <span>طباعة الوصل / حفظ بصيغة PDF</span>
    </button>
  );
}
