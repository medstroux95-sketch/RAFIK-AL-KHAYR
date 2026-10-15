import { NextRequest, NextResponse } from 'next/server';
import { getInquiries, createInquiry } from '@/lib/db';

export async function GET() {
  try {
    const inquiries = await getInquiries();
    return NextResponse.json({ success: true, count: inquiries.length, inquiries });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'تعذر جلب الاستفسارات' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.fullName || !body.phone || !body.message) {
      return NextResponse.json({ success: false, error: 'يرجى كتابة الاسم ورقم الهاتف والرسالة' }, { status: 400 });
    }

    const inquiry = await createInquiry({
      fullName: body.fullName,
      phone: body.phone,
      email: body.email,
      subject: body.subject || 'طلب استشارة عمرة',
      packageInterest: body.packageInterest,
      message: body.message
    });

    return NextResponse.json({ success: true, message: 'شكراً لك، تم استلام استفسارك وسيتواصل معك مستشارنا قريباً', inquiry }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'خطأ أثناء إرسال الرسالة' }, { status: 500 });
  }
}
