import { NextRequest, NextResponse } from 'next/server';
import { recordBookingPayment } from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const body = await request.json();
    const amount = Number(body.amount);

    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json({ success: false, error: 'المبلغ المحدد غير صالح' }, { status: 400 });
    }

    const payment = await recordBookingPayment(
      params.code,
      amount,
      body.method || 'cash',
      body.reference || `REF-${Date.now().toString().slice(-6)}`,
      body.notes || 'تسجيل دفعة يدوية'
    );

    if (!payment) {
      return NextResponse.json({ success: false, error: 'تعذر تسجيل الدفعة للحجز المحدد' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'تم تسجيل الدفعة بنجاح', payment }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'خطأ أثناء تسجيل العملية المالية' }, { status: 500 });
  }
}
