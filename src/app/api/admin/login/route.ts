import { NextRequest, NextResponse } from 'next/server';

const ADMIN_EMAIL = 'rafikelkhayer@gmail.com';
const ADMIN_PASSWORD = 'RafikELKHayer2026';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = password || '';

    if (cleanEmail === ADMIN_EMAIL && cleanPassword === ADMIN_PASSWORD) {
      const response = NextResponse.json({
        success: true,
        message: 'تم تسجيل الدخول بنجاح',
        admin: {
          email: ADMIN_EMAIL,
          role: 'admin',
          name: 'المشرف العام - رفيق الخير'
        }
      });

      // Set cookie for authentication persistence
      response.cookies.set({
        name: 'rafik_admin_token',
        value: 'authenticated_rafik_admin_2026',
        httpOnly: false,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: 'lax',
      });

      return response;
    }

    return NextResponse.json(
      {
        success: false,
        error: 'بيانات الدخول غير صحيحة. يرجى التحقق من البريد الإلكتروني وكلمة المرور الخاصة بالإدارة.'
      },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'حدث خطأ أثناء معالجة تسجيل الدخول' },
      { status: 500 }
    );
  }
}
