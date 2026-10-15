import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blogData';
import { Calendar, Clock, ArrowRight, Share2, Sparkles, BookOpen } from 'lucide-react';

export default function BlogPostDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = blogPosts.find(p => p.slug === params.slug);
  if (!post) {
    notFound();
  }

  const otherPosts = blogPosts.filter(p => p.slug !== post.slug);

  return (
    <div className="bg-[#fcfbf7] min-h-screen py-12 font-cairo">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-emerald-800">الرئيسية</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-emerald-800">المدونة والإرشادات</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold truncate">{post.title}</span>
        </nav>

        {/* Article Container */}
        <article className="bg-white rounded-3xl p-6 sm:p-12 shadow-sm border border-slate-200 space-y-6">
          
          <div className="space-y-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-gold-100 text-gold-800 inline-block">
              {post.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-primary-950 font-cairo leading-snug">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-slate-400 border-b border-slate-100 pb-4">
              <span>📅 {post.date}</span>
              <span>•</span>
              <span>⏱ وقت القراءة: {post.readTime}</span>
              <span>•</span>
              <span className="text-emerald-800 font-bold">بواسطة: مرشد وكالة رفيق الخير</span>
            </div>
          </div>

          <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-md">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Body */}
          <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed pt-4 border-b border-slate-100 pb-8">
            {post.content.map((paragraph, idx) => (
              <p key={idx} className="leading-loose">
                {paragraph}
              </p>
            ))}
          </div>

          {/* CTA Box */}
          <div className="p-6 rounded-2xl bg-primary-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-right">
              <h4 className="font-bold text-base text-gold-400">هل تخطط لأداء مناسك العمرة قريباً؟</h4>
              <p className="text-xs text-emerald-100/80">اكتشف عروض شعبان ورمضان وعمرة تركيا واحجز مقعدك الآن</p>
            </div>
            <Link
              href="/packages"
              className="px-6 py-3 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs shadow-gold shrink-0"
            >
              استعراض باقات العمرة
            </Link>
          </div>

        </article>

        {/* Read More */}
        {otherPosts.length > 0 && (
          <div className="space-y-4 pt-6">
            <h3 className="font-bold text-lg text-slate-900">مقالات وإرشادات أخرى:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherPosts.map((op) => (
                <Link
                  key={op.slug}
                  href={`/blog/${op.slug}`}
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-gold-300 shadow-sm flex items-center justify-between gap-3 group transition-all"
                >
                  <div>
                    <span className="text-[10px] text-gold-700 font-bold">{op.category}</span>
                    <h5 className="font-bold text-xs text-slate-900 group-hover:text-emerald-800 line-clamp-1">{op.title}</h5>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-800 shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
