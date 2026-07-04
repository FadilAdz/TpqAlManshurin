'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  BookOpen,
  BookMarked,
  Languages,
  Heart,
  Users,
  Star,
} from 'lucide-react';

const programs = [
  {
    icon: BookOpen,
    title: 'Tahsin Al-Qur\'an',
    description:
      'Pembelajaran membaca Al-Qur\'an dengan tajwid yang benar, dibimbing langsung oleh guru yang berpengalaman.',
  },
  {
    icon: BookMarked,
    title: 'Tahfidz Al-Qur\'an',
    description:
      'Program menghafal Al-Qur\'an dengan metode talaqqi, memastikan hafalan yang kuat dan lancar.',
  },
  {
    icon: Languages,
    title: 'Ilmu Tajwid',
    description:
      'Memahami hukum-hukum bacaan Al-Qur\'an secara mendalam agar bacaan semakin fasih dan benar.',
  },
  {
    icon: Heart,
    title: 'Fiqih Ibadah',
    description:
      'Pembelajaran tata cara ibadah sehari-hari sesuai tuntunan Rasulullah shallallahu \'alaihi wasallam.',
  },
  {
    icon: Users,
    title: 'Akhlaqul Karimah',
    description:
      'Pembinaan akhlak dan budi pekerti mulia untuk membentuk karakter Islami sejak dini.',
  },
  {
    icon: Star,
    title: 'Doa & Hadits',
    description:
      'Hafalan doa harian dan hadits pilihan yang diamalkan dalam kehidupan sehari-hari.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export default function Programs() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="program"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: '#F8FBF9' }}
    >
      {/* Subtle decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-[0.04]"
          style={{ backgroundColor: '#0D7C66' }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full opacity-[0.03]"
          style={{ backgroundColor: '#D4A843' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14 md:mb-18"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.span
            variants={titleVariants}
            className="inline-block text-sm font-semibold tracking-widest uppercase mb-3 px-4 py-1.5 rounded-full"
            style={{
              color: '#0D7C66',
              backgroundColor: 'rgba(13, 124, 102, 0.08)',
            }}
          >
            Kurikulum Kami
          </motion.span>
          <motion.h2
            variants={titleVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: '#1A2E28' }}
          >
            Program Pembelajaran
          </motion.h2>
          <motion.p
            variants={titleVariants}
            className="text-base sm:text-lg max-w-2xl mx-auto"
            style={{ color: '#5A7A70' }}
          >
            Metode Manqul, manqul, musnad, dan muttashil — Belajar langsung dari guru secara
            berhadapan
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={program.title}
                variants={cardVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    '0 20px 40px -8px rgba(13, 124, 102, 0.15), 0 8px 16px -4px rgba(0,0,0,0.06)',
                }}
                className="group relative bg-white rounded-2xl p-6 md:p-7 border border-gray-100 shadow-sm cursor-default transition-colors duration-300"
                style={{
                  borderLeftWidth: '4px',
                  borderLeftColor: 'transparent',
                }}
              >
                {/* Hover green left border via overlay */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                  style={{ backgroundColor: '#0D7C66' }}
                />

                <div className="flex items-start gap-4">
                  {/* Icon Circle */}
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: 'rgba(13, 124, 102, 0.1)' }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: '#0D7C66' }}
                      strokeWidth={2}
                    />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-lg font-bold mb-1.5 transition-colors duration-300 group-hover:text-[#0D7C66]"
                      style={{ color: '#1A2E28' }}
                    >
                      {program.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: '#5A7A70' }}
                    >
                      {program.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
