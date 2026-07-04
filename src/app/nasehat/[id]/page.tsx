import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import 'react-quill-new/dist/quill.snow.css'; // Import for ql-editor styles
import { ChevronLeft, Calendar, User } from 'lucide-react';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getArticleById, seedArticles } from '@/lib/db';
import { articles as staticArticles } from '@/data/articles';

export const dynamic = 'force-dynamic';

export default async function NasehatDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  // Ensure articles are seeded
  await seedArticles(
    staticArticles.map((a) => ({
      title: a.title,
      excerpt: a.excerpt,
      content: a.content,
      date: a.date,
      category: a.category,
      image: a.image,
      author: a.author,
    }))
  );

  const article = await getArticleById(parseInt(resolvedParams.id));

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F8FBF9]">
      {/* Header Consistent with Main Navbar */}
      <header 
        className="sticky top-0 z-50 shadow-md transition-all duration-300"
        style={{
          backgroundColor: 'rgba(10, 31, 26, 0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-medium text-sm bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/5"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Kembali ke Beranda</span>
            <span className="sm:hidden">Kembali</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Image
                src="/images/Logo/logoSK4.png"
                alt="Logo TPQ Al Manshurin"
                width={36}
                height={36}
                className="rounded-full ring-2 ring-white/20"
              />
            </div>
            <div className="hidden sm:block text-right">
              <p className="text-white font-bold text-sm leading-tight font-[family-name:var(--font-heading)]">
                TPQ Al Manshurin
              </p>
              <p className="text-emerald-300/70 text-[10px] tracking-wide">
                Cikarang Utara, Bekasi
              </p>
            </div>
          </div>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 py-10 md:py-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#5A7A70] mb-8 font-medium">
          <Link href="/" className="hover:text-[#0D7C66]">Beranda</Link>
          <span>/</span>
          <span>Nasehat</span>
          <span>/</span>
          <span className="text-[#0D7C66] px-2 py-0.5 bg-emerald-50 rounded-full">{article.category}</span>
        </div>

        {/* Title & Meta */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A2E28] leading-tight mb-6 font-[family-name:var(--font-heading)]">
          {article.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-[#5A7A70] mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#0D7C66]" />
            {article.date}
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-[#0D7C66]" />
            {article.author}
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full aspect-[16/9] mb-10 rounded-2xl overflow-hidden shadow-sm">
          <Image 
            src={article.image} 
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div 
          className="ql-editor !p-0 max-w-none mb-12 text-[#3A534A] leading-relaxed text-[17px] md:text-lg text-justify"
          dangerouslySetInnerHTML={{ __html: article.content.replace(/&nbsp;/g, ' ').replace(/\u00A0/g, ' ') }}
        />

        {/* Share Section */}
        <div className="border-t border-gray-200 pt-8 mt-12">
          <h3 className="text-lg font-bold text-[#1A2E28] mb-4 font-[family-name:var(--font-heading)]">Bagikan Artikel Ini</h3>
          <div className="flex items-center gap-3">
            <a 
              href={`https://wa.me/?text=${encodeURIComponent(article.title + ' - Baca selengkapnya!')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white rounded-full text-sm font-semibold hover:bg-[#128C7E] transition-colors shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Bagikan ke WhatsApp
            </a>
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1877F2] text-white rounded-full text-sm font-semibold hover:bg-[#165fbe] transition-colors shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Share Facebook
            </a>
          </div>
        </div>
      </article>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
