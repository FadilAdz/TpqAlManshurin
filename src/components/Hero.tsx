'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A251C]"
    >
      {/* Background image with simple solid overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/16.jpg"
          alt="Kegiatan TPQ Al Manshurin"
          fill
          className="object-cover"
          priority
          quality={85}
        />
        {/* Solid dark green overlay, no gradients */}
        <div className="absolute inset-0 bg-[#0A251C]/85" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-32">
        {/* Logos without white background box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex items-center justify-center mb-10"
        >
          <Image
            src="/images/Logo/logoSK4.png"
            alt="Logo TPQ Al Manshurin"
            width={75}
            height={75}
            className="rounded-full drop-shadow-md"
          />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight"
        >
          TPQ Al Manshurin
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-6 text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light"
        >
          Mencetak Generasi <span className="font-medium text-white">Alim Faqih</span>,{' '}
          <span className="font-medium text-white">Berakhlaqul Karimah</span>{' '}
          dan <span className="font-medium text-white">Mandiri</span>
        </motion.p>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-6 flex items-center justify-center gap-2 text-sm md:text-base text-white/70"
        >
          <MapPin className="w-4 h-4" />
          <span>Grand Cikarang City, Cikarang Utara, Bekasi</span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://wa.me/6282148059527"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-none bg-white text-[#0A251C] font-semibold text-sm tracking-wider uppercase transition-all hover:bg-gray-100"
          >
            Hubungi Kami
          </a>
          <a
            href="#program"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('program')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-none border border-white/30 text-white font-semibold text-sm tracking-wider uppercase transition-all hover:bg-white/10"
          >
            Lihat Program
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <a
          href="#tentang"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('tentang')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors cursor-pointer group"
        >
          <span className="text-xs tracking-[0.2em] font-medium uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
