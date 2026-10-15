import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SmartWhatsAppButton } from '@/components/SmartWhatsAppButton';

export const metadata: Metadata = {
  title: 'وكالة رفيق الخير للسفر والسياحة | رحلات وعروض العمرة من المغرب',
  description: 'منصة وكالة رفيق الخير للسفر والسياحة المتخصصة في تنظيم وتسويق رحلات العمرة من المغرب إلى مكة المكرمة والمدينة المنورة. عروض عمرة شعبان ورمضان، عمرة تركيا، فنادق راقية قريبة من الحرم وطيران مباشر.',
  keywords: [
    'عمرة من المغرب',
    'وكالة رفيق الخير',
    'عمرة شعبان ورمضان 1446',
    'عمرة عبر تركيا',
    'حجز عمرة الدار البيضاء',
    'ثمن العمرة بالدرهم المغربي',
    'عمرة اقتصادية المغرب',
    'فنادق الحرم المكي'
  ],
  authors: [{ name: 'وكالة رفيق الخير للسفر والسياحة' }],
  openGraph: {
    title: 'وكالة رفيق الخير للسفر والسياحة | رحلتك الإيمانية تبدأ من هنا',
    description: 'أفضل برامج العمرة المتميزة من المغرب - إشراف ديني، فنادق قريبة، طيران مباشر وأسعار شاملة.',
    url: 'https://rafiqalkhair.ma',
    siteName: 'رفيق الخير للسفر والسياحة',
    locale: 'ar_MA',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="theme-color" content="#064e3b" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
      <body className="min-h-screen flex flex-col font-cairo bg-[#fcfbf7] text-slate-900 antialiased selection:bg-gold-500 selection:text-white">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <SmartWhatsAppButton />
      </body>
    </html>
  );
}
