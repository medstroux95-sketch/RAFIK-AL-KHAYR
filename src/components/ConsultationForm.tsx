'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Phone, User, MapPin, HelpCircle, MessageSquare } from 'lucide-react';

export const ConsultationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: 'الدار البيضاء',
    packageInterest: 'عمرة شعبان ورمضان المباركة 1446',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setFormData({
          fullName: '',
          phone: '',
          city: 'الدار البيضاء',
          packageInterest: 'عمرة شعبان ورمضان المباركة 1446',
          message: ''
        });
      } else {
        setError(data.error || 'تعذر إرسال الطلب، يرجى المحاولة مرة أخرى');
      }
    } catch (err) {
      setError('حدث خطأ في الاتصال، يرجى المحاولة لاحقاً');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-100 ring-1 ring-gold-200/50">
      {success ? (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-gold-500/20 text-gold-500 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black text-primary-950 font-cairo">
            تقبّل الله منا ومنكم، تم استلام طلبكم بنجاح!
          </h3>
          <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
            سيقوم مستشار السفر المعتمد بوكالة رفيق الخير بالتواصل معكم هاتفياً أو عبر واتساب في أقرب وقت لتزويدكم بكافة التفاصيل وترتيب إجراءات السفر.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
          >
            إرسال طلب استشارة آخر
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1 mb-4">
            <h3 className="text-xl font-extrabold text-primary-950 font-cairo">
              طلب استشارة وتواصل مخصص
            </h3>
            <p className="text-xs text-slate-500">
              اترك بياناتك وسيتصل بك أحد خبرائنا لتقديم أفضل برنامج يناسب رغباتك وميزانيتك
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-gold-500" />
                <span>الاسم الكامل *</span>
              </label>
              <input
                type="text"
                required
                placeholder="مثال: محمد بنجلون"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-slate-50 focus:bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-gold-500" />
                <span>رقم الهاتف (واتساب) *</span>
              </label>
              <input
                type="tel"
                required
                placeholder="0661234567"
                dir="ltr"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-slate-50 focus:bg-white text-right"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gold-500" />
                <span>المدينة في المغرب</span>
              </label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-slate-50 focus:bg-white"
              >
                <option value="الدار البيضاء">الدار البيضاء</option>
                <option value="الرباط">الرباط</option>
                <option value="مراكش">مراكش</option>
                <option value="فاس">فاس</option>
                <option value="طنجة">طنجة</option>
                <option value="أكادير">أكادير</option>
                <option value="وجدة">وجدة</option>
                <option value="مكناس">مكناس</option>
                <option value="مدينة أخرى">مدينة أخرى</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-gold-500" />
                <span>البرنامج المطلوب</span>
              </label>
              <select
                value={formData.packageInterest}
                onChange={(e) => setFormData({ ...formData, packageInterest: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-slate-50 focus:bg-white"
              >
                <option value="عمرة شعبان ورمضان المباركة 1446">عمرة شعبان ورمضان المباركة 1446</option>
                <option value="عمرة عبر تركيا - إسطنبول والحرمين">عمرة عبر تركيا - إسطنبول والحرمين</option>
                <option value="البرنامج الاقتصادي المتميز">البرنامج الاقتصادي المتميز</option>
                <option value="عمرة مخصصة للعائلات وكبار السن">عمرة مخصصة للعائلات وكبار السن</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-gold-500" />
              <span>استفساراتك أو طلباتك الخاصة</span>
            </label>
            <textarea
              rows={3}
              placeholder="اكتب هنا أي تفاصيل تود السؤال عنها (عدد أفراد العائلة، احتياج كراسي متحركة، تفضيلات الغرف...)"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-slate-50 focus:bg-white resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-gold-gradient text-slate-950 font-black text-sm shadow-gold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>جاري الإرسال...</span>
            ) : (
              <>
                <Send className="w-4 h-4 text-slate-950" />
                <span>إرسال طلب الاستشارة المجانية</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
