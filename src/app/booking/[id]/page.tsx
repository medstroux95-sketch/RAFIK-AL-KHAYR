import React from 'react';
import { notFound } from 'next/navigation';
import { getPackageById, getSettings } from '@/lib/db';
import BookingWizardClient from './BookingWizardClient';

export const revalidate = 0;

export default async function BookingPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { room?: string; count?: string };
}) {
  const pkg = await getPackageById(params.id);
  if (!pkg) {
    notFound();
  }

  const settings = await getSettings();

  return (
    <div className="bg-[#fcfbf7] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <BookingWizardClient 
          pkg={pkg} 
          settings={settings}
          initialRoom={searchParams.room}
          initialCount={searchParams.count}
        />
      </div>
    </div>
  );
}
