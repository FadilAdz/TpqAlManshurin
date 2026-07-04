'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Users, MapPin, Clock, Heart } from 'lucide-react';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="tentang"
      ref={sectionRef}
      className="relative py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text Side - Now placed first on desktop for cleaner flow or left side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-[#0A251C] leading-tight">
              Mengenal Lebih Dekat <br />
              TPQ Al Manshurin
            </h2>
            <div className="w-16 h-1 bg-[#0A251C] mb-8" />

            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                TPQ Al Manshurin adalah lembaga pendidikan Al-Qur&apos;an yang berdedikasi untuk mencetak generasi penerus bangsa yang tidak hanya cerdas secara intelektual, tetapi juga memiliki fondasi agama yang kuat.
              </p>
              <p>
                Melalui metode pembelajaran manqul, musnad, dan muttashil, kami memastikan setiap santri mendapatkan bimbingan langsung dengan sanad keilmuan yang jelas demi membentuk karakter yang Alim-Faqih, Berakhlaqul Karimah, dan Mandiri.
              </p>
            </div>

            {/* Simple Stats Grid to fix the bug */}
            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <p className="text-4xl font-bold text-[#0A251C]">50+</p>
                <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">Santri Aktif</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-[#0A251C]">4</p>
                <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">Ustadz</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-[#0A251C]">2</p>
                <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">Sesi Kelas</p>
              </div>
            </div>

            {/* Location */}
            <div className="mt-12 flex items-start gap-3 pt-8 border-t border-gray-200">
              <MapPin className="w-5 h-5 text-[#0A251C] flex-shrink-0 mt-0.5" />
              <p className="text-gray-600">
                Blok D12 No.1 & 2, Karangraharja, Kec. Cikarang Utara, Kabupaten Bekasi, Jawa Barat 17530
              </p>
            </div>
          </motion.div>

          {/* Image Side - Clean, no floating cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="relative"
          >
            {/* Simple decorative solid block moved BEFORE the image so it naturally renders behind without needing negative z-index */}
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-[#0A251C] hidden md:block" />

            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/images/masjidHD.jpg"
                alt="Kegiatan santri TPQ Al Manshurin"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
