import React from 'react';
import { 
  getPackages, 
  getBookings, 
  getSettings, 
  getDashboardStats, 
  getAuditLogs, 
  getInquiries 
} from '@/lib/db';
import AdminDashboardClient from './AdminDashboardClient';

export const revalidate = 0;

export default async function AdminPage() {
  const [packages, bookings, settings, stats, auditLogs, inquiries] = await Promise.all([
    getPackages(),
    getBookings(),
    getSettings(),
    getDashboardStats(),
    getAuditLogs(),
    getInquiries()
  ]);

  return (
    <div className="bg-slate-100 min-h-screen py-8 font-cairo">
      <AdminDashboardClient
        initialPackages={packages}
        initialBookings={bookings}
        initialSettings={settings}
        initialStats={stats}
        initialAuditLogs={auditLogs}
        initialInquiries={inquiries}
      />
    </div>
  );
}
