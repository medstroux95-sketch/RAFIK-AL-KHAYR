import { NextRequest, NextResponse } from 'next/server';
import { getBookingByCode, updateBookingStatus } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone') || undefined;

    const booking = await getBookingByCode(params.code, phone);
    if (!booking) {
      return NextResponse.json({ 
        success: false, 
        error: 'لم يتم العثور على الحجز المطلوب، يرجى التأكد من رقم الحجز ورقم الهاتف' 
      }, { status: 404 });
    }

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'تعذر التحقق من الحجز' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const body = await request.json();
    const updated = await updateBookingStatus(
      params.code, 
      body.status, 
      body.paymentStatus, 
      body.note
    );

    if (!updated) {
      return NextResponse.json({ success: false, error: 'الحجز غير موجود' }, { status: 404 });
    }

    return NextResponse.json({ success: true, booking: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'تعذر تحديث الحجز' }, { status: 500 });
  }
}
