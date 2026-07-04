'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface GalleryItem {
  id: number;
  title: string;
  image: string;
}

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [photos, setPhotos] = useState<GalleryItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('/api/galeri', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          // Limit to 6 items for the home page preview
          setPhotos(data.slice(0, 6));
        }
      } catch (error) {
        console.error('Failed to fetch gallery:', error);
      }
    };
    fetchGallery();
  }, []);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const nextPhoto = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % photos.length : null
    );
  const prevPhoto = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + photos.length) % photos.length : null
    );

  return (
    <>
      <section
        id="galeri"
        ref={sectionRef}
        className="relative py-20 md:py-28 overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, #0A1F1A 0%, #0D2E25 50%, #0A1F1A 100%)',
        }}
      >
        {/* Islamic pattern */}
        <div className="absolute inset-0 islamic-pattern opacity-15" />

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
                color: '#D4A843',
                backgroundColor: 'rgba(212, 168, 67, 0.12)',
                border: '1px solid rgba(212, 168, 67, 0.15)',
              }}
            >
              Dokumentasi
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-[family-name:var(--font-heading)]"
              style={{ color: '#E8F5F0' }}
            >
              Galeri Kegiatan
            </h2>
            <p
              className="text-base sm:text-lg max-w-2xl mx-auto"
              style={{ color: 'rgba(232,245,240,0.5)' }}
            >
              Momen-momen berharga kegiatan santri TPQ Al Manshurin
            </p>
          </motion.div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {photos.map((photo, i) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
                whileHover={{ scale: 1.03 }}
                className={`relative group cursor-pointer rounded-xl overflow-hidden ${i === 0
                  ? 'md:col-span-2 md:row-span-2'
                  : ''
                  }`}
                onClick={() => {
                  if (i === 5) {
                    router.push('/galeri');
                  } else {
                    openLightbox(i);
                  }
                }}
              >
                <Image
                  src={photo.image}
                  alt={photo.title}
                  width={600}
                  height={400}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${i === 0 ? 'h-48 md:h-[464px]' : 'h-48 md:h-56'
                    }`}
                />
                
                {/* Regular Hover overlay for images 1 to 5 */}
                {i < 5 && (
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{
                      background:
                        'linear-gradient(180deg, transparent 30%, rgba(10,31,26,0.8) 100%)',
                    }}
                  >
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white text-sm font-medium">
                        {photo.title}
                      </p>
                    </div>
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                        />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Permanent Overlay for the 6th image (View All) */}
                {i === 5 && (
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/60"
                    style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
                  >
                    <div className="text-center transform transition-transform duration-300 group-hover:scale-110">
                      <p className="text-white font-bold text-lg sm:text-xl font-[family-name:var(--font-heading)]">
                        + Lihat Semua
                      </p>
                      <p className="text-white/80 text-sm mt-1">
                        Galeri
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              className="absolute left-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              className="absolute right-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[lightboxIndex].image}
                alt={photos[lightboxIndex].title}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
              />
              <p className="text-white text-center mt-4 font-semibold font-[family-name:var(--font-heading)]">
                {photos[lightboxIndex].title}
              </p>
              <p className="text-center text-white/70 text-sm mt-1">
                {lightboxIndex + 1} / {photos.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
