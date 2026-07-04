'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ArrowLeft, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

interface GalleryItem {
  id: number;
  title: string;
  image: string;
}

export default function GaleriPage() {
  const [photos, setPhotos] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('/api/galeri', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setPhotos(data);
        }
      } catch (error) {
        console.error('Failed to fetch gallery:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const nextPhoto = () =>
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
  const prevPhoto = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + photos.length) % photos.length : null
    );

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0A1F1A 0%, #0D2E25 100%)' }}>
        <div className="absolute inset-0 islamic-pattern opacity-10" />
        <div className="max-w-7xl mx-auto relative text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-[#D4A843] hover:text-white transition-colors mb-6 font-semibold">
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Beranda
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">
            Galeri Kegiatan
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Semua dokumentasi momen-momen berharga dan kegiatan santri TPQ Al Manshurin.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-[#0D7C66] animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Memuat Galeri...</p>
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Belum ada foto di galeri.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {photos.map((photo, i) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative cursor-pointer rounded-2xl overflow-hidden aspect-[4/3] shadow-lg shadow-gray-200/50"
                onClick={() => openLightbox(i)}
              >
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-semibold text-lg mb-1 font-[family-name:var(--font-heading)] leading-tight">{photo.title}</p>
                    <span className="text-sm text-gray-300">Lihat Foto</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 sm:top-6 right-4 sm:right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm transition-all z-[110]"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            <button
              className="absolute left-2 sm:left-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 sm:p-4 rounded-full backdrop-blur-sm transition-all z-[110]"
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            <button
              className="absolute right-2 sm:right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 sm:p-4 rounded-full backdrop-blur-sm transition-all z-[110]"
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl px-12 sm:px-20 max-h-screen flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-[4/3] sm:aspect-video rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={photos[lightboxIndex].image}
                  alt={photos[lightboxIndex].title}
                  fill
                  className="object-contain bg-black/50"
                />
              </div>
              <div className="mt-6 text-center max-w-2xl px-4">
                <h3 className="text-white text-xl sm:text-2xl font-semibold font-[family-name:var(--font-heading)] mb-2">
                  {photos[lightboxIndex].title}
                </h3>
                <p className="text-white/70 text-sm">
                  Foto {lightboxIndex + 1} dari {photos.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
