import { NextRequest, NextResponse } from 'next/server';
import { getBookings, createBooking } from '@/lib/db';

export async function GET() {
  try {
    const bookings = await getBookings();
    return NextResponse.json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'تعذر جلب الحجوزات' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.packageId || !body.roomType || !body.travelersCount || !body.primaryContact?.fullName || !body.primaryContact?.phone) {
      return NextResponse.json({ 
        success: false, 
        error: 'بيانات الحجز غير مكتملة، يرجى ملء كافة الحقول الأساسية' 
      }, { status: 400 });
    }

    const booking = await createBooking({
      packageId: body.packageId,
      roomType: body.roomType,
      travelersCount: Number(body.travelersCount),
      travelers: body.travelers || [],
      primaryContact: body.primaryContact,
      paymentMethod: body.paymentMethod || 'cash_agency',
      couponCode: body.couponCode,
      isDepositOnly: Boolean(body.isDepositOnly)
    });

    return NextResponse.json({ 
      success: true, 
      message: 'تم تسجيل طلب الحجز بنجاح', 
      booking 
    }, { status: 201 });
  } catch (error: any) {
    console.error('Booking creation error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'حدث خطأ أثناء معالجة الحجز' 
    }, { status: 400 });
  }
}
