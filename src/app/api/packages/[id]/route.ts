import { NextRequest, NextResponse } from 'next/server';
import { getPackageById, updatePackage, deletePackage } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pkg = await getPackageById(params.id);
    if (!pkg) {
      return NextResponse.json({ success: false, error: 'البرنامج غير موجود' }, { status: 404 });
    }
    return NextResponse.json({ success: true, package: pkg });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'خطأ في جلب تفاصيل البرنامج' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = await updatePackage(params.id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'تعذر العثور على البرنامج لتحديثه' }, { status: 404 });
    }
    return NextResponse.json({ success: true, package: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'خطأ أثناء تحديث البرنامج' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await deletePackage(params.id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'البرنامج غير موجود أو تعذر حذفه' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'تم حذف البرنامج بنجاح' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'خطأ أثناء حذف البرنامج' }, { status: 500 });
  }
}
