import { NextRequest, NextResponse } from 'next/server';
import { getPackages, createPackage } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.toLowerCase() || '';
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    let packages = await getPackages();

    if (q) {
      packages = packages.filter(
        p => p.title.toLowerCase().includes(q) ||
             p.subtitle.toLowerCase().includes(q) ||
             p.departureCity.toLowerCase().includes(q) ||
             p.destinationCities.some(c => c.toLowerCase().includes(q))
      );
    }

    if (category && category !== 'all') {
      packages = packages.filter(p => p.category === category);
    }

    if (minPrice) {
      const min = parseInt(minPrice, 10);
      if (!isNaN(min)) {
        packages = packages.filter(p => p.startingPrice >= min);
      }
    }

    if (maxPrice) {
      const max = parseInt(maxPrice, 10);
      if (!isNaN(max)) {
        packages = packages.filter(p => p.startingPrice <= max);
      }
    }

    return NextResponse.json({ success: true, count: packages.length, packages });
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json({ success: false, error: 'تعذر جلب البرامج' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.title || !body.startingPrice) {
      return NextResponse.json({ success: false, error: 'بيانات البرنامج غير مكتملة' }, { status: 400 });
    }

    const newPackage = await createPackage(body);
    return NextResponse.json({ success: true, package: newPackage }, { status: 201 });
  } catch (error) {
    console.error('Error creating package:', error);
    return NextResponse.json({ success: false, error: 'تعذر إنشاء البرنامج' }, { status: 500 });
  }
}
