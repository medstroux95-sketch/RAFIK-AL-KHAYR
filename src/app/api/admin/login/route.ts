import { NextRequest, NextResponse } from 'next/server';

const ADMIN_EMAIL = 'rafikelkhayer@gmail.com';

function isValidAdminAuth(email: string, password: string): boolean {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPwd = (password || '').trim().replace(/\s+/g, '');

  if (cleanEmail !== ADMIN_EMAIL) {
    return false;
  }

  return (
    cleanPwd === 'RafikELKHayer2026' ||
    cleanPwd.toLowerCase() === 'rafikelkhayer2026' ||
    cleanPwd === 'RafikELKHayer2026P' ||
    cleanPwd.toLowerCase() === 'rafikelkhayer2026p'
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (isValidAdminAuth(email, password)) {
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
