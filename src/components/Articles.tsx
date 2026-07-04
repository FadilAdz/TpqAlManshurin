'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Share2 } from 'lucide-react';

import Link from 'next/link';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image?: string;
  author: string;
}

function shareWhatsApp(title: string) {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const text = `${title}\n\nBaca selengkapnya di: ${url}`;
  window.open(
    `https://wa.me/?text=${encodeURIComponent(text)}`,
    '_blank'
  );
}

function shareFacebook() {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    '_blank'
  );
}

export default function Articles() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch('/api/nasehat')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setArticles(data);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <section
      id="nasehat"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: '#F8FBF9' }}
    >
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              'linear-gradient(to right, transparent, rgba(13,124,102,0.15), transparent)',
          }}
        />
        <div
          className="absolute -top-32 right-1/3 w-80 h-80 rounded-full opacity-[0.04]"
          style={{ backgroundColor: '#D4A843' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14 md:mb-18"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            className="inline-block text-sm font-semibold tracking-widest uppercase mb-3 px-4 py-1.5 rounded-full"
            style={{
              color: '#0D7C66',
              backgroundColor: 'rgba(13, 124, 102, 0.08)',
            }}
          >
            Renungan & Hikmah
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-[family-name:var(--font-heading)]"
            style={{ color: '#1A2E28' }}
          >
            Nasehat
          </h2>
          <p
            className="text-base sm:text-lg max-w-2xl mx-auto"
            style={{ color: '#5A7A70' }}
          >
            Berbagi ilmu dan nasihat keislaman untuk menambah wawasan dan
            keimanan
          </p>
        </motion.div>

        {/* Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
              whileHover={{
                y: -6,
                boxShadow:
                  '0 20px 40px -8px rgba(13,124,102,0.12)',
              }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col cursor-pointer"
            >
              <Link href={`/nasehat/${article.id}`} className="flex flex-col flex-1">
                {/* Header with emoji & category */}
                <div
                  className="p-6 pb-4"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(13,124,102,0.05) 0%, rgba(212,168,67,0.05) 100%)',
                  }}
                >
                  <h3
                    className="text-lg font-bold leading-snug transition-colors duration-300 group-hover:text-[#0D7C66] font-[family-name:var(--font-heading)]"
                    style={{ color: '#1A2E28' }}
                  >
                    {article.title}
                  </h3>
                  {article.author && (
                    <p className="text-xs text-gray-500 mt-2 font-medium">
                      By {article.author}
                    </p>
                  )}
                </div>

                {/* Content */}
                <div className="px-6 pt-4 pb-4 flex-1">
                  <p
                    className="text-sm leading-relaxed line-clamp-4"
                    style={{ color: '#5A7A70' }}
                  >
                    {article.excerpt}
                  </p>
                </div>
              </Link>

              {/* Footer */}
              <div className="px-6 pb-5 flex items-center justify-between pt-3 border-t border-gray-50">
                <span className="text-xs" style={{ color: '#5A7A70' }}>
                  {article.date}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-xs mr-1" style={{ color: '#5A7A70' }}>
                    <Share2 className="w-3 h-3 inline mr-1" />
                    Share
                  </span>
                  {/* WhatsApp Share */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      shareWhatsApp(article.title);
                    }}
                    className="p-2 rounded-full hover:bg-emerald-50 transition-colors"
                    title="Share via WhatsApp"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="#25D366"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </button>
                  {/* Facebook Share */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      shareFacebook();
                    }}
                    className="p-2 rounded-full hover:bg-blue-50 transition-colors"
                    title="Share via Facebook"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="#1877F2"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
