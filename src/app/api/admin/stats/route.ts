import { NextResponse } from 'next/server';
import { getDashboardStats, getAuditLogs } from '@/lib/db';

export async function GET() {
  try {
    const stats = await getDashboardStats();
    const auditLogs = await getAuditLogs();
    return NextResponse.json({ success: true, stats, auditLogs });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'تعذر جلب إحصائيات الإدارة' }, { status: 500 });
  }
}
