import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPackageById, getPackages } from '@/lib/db';
import { PackageDetailsClient } from './PackageDetailsClient';

export const revalidate = 0;

export default async function PackageDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const pkg = await getPackageById(params.id);
  if (!pkg) {
    notFound();
  }

  const allPackages = await getPackages();
  const similarPackages = allPackages.filter(p => p.id !== pkg.id && p.status === 'active').slice(0, 2);

  return (
    <div className="bg-[#fcfbf7] min-h-screen py-8">
      <PackageDetailsClient pkg={pkg} similarPackages={similarPackages} />
    </div>
  );
}
