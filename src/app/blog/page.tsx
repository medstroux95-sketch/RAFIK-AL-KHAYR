import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blogData';
import { BookOpen, Clock, Calendar, ChevronLeft, Sparkles } from 'lucide-react';

export default function BlogIndexPage() {
  return (
    <div className="bg-[#fcfbf7] min-h-screen py-12 font-cairo">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        
        {/* Header */}
        <div className="bg-primary-950 text-white p-8 sm:p-12 rounded-3xl border border-emerald-900 shadow-xl space-y-3 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-gold-400 bg-emerald-900/80 px-3 py-1 rounded-full border border-gold-400/30">
            <BookOpen className="w-3.5 h-3.5" />
            <span>مدونة وإرشادات العمرة</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black">
            دليل المعتمر ومقالات السفر الإيماني
          </h1>
          <p className="text-emerald-100/80 text-xs sm:text-base max-w-xl mx-auto">
            مقالات وإرشادات شرعية وعملية تهم كل معتمر مغربي يستعد لزيارة بيت الله الحرام ومسجد رسوله ﷺ
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article 
              key={post.slug}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-gold-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-primary-950/80 text-gold-400 text-xs px-3 py-1 rounded-full font-bold backdrop-blur-md">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-slate-400 text-xs">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h2 className="font-bold text-base text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100">
                <Link
                  href={`/blog/${post.slug}`}
                  className="pt-4 text-xs font-black text-emerald-800 hover:text-gold-700 flex items-center justify-between group-hover:underline"
                >
                  <span>قراءة المقال كاملاً</span>
                  <ChevronLeft className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
