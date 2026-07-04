'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, Sun, Sunset, Calendar } from 'lucide-react';

const scheduleData = [
  {
    session: 'Kelas Pagi',
    icon: Sun,
    masuk: '08:30 WIB',
    pulang: '09:30 WIB',
    gradient: 'linear-gradient(135deg, #D4A843 0%, #E8C06A 100%)',
    bgAccent: 'rgba(212,168,67,0.08)',
    borderAccent: 'rgba(212,168,67,0.15)',
    colorAccent: '#D4A843',
  },
  {
    session: 'Kelas Sore',
    icon: Sunset,
    masuk: '15:30 WIB',
    pulang: '16:30 WIB',
    gradient: 'linear-gradient(135deg, #0D7C66 0%, #12A888 100%)',
    bgAccent: 'rgba(13,124,102,0.08)',
    borderAccent: 'rgba(13,124,102,0.15)',
    colorAccent: '#0D7C66',
  },
];

export default function Schedule() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="jadwal"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: '#EFF7F3' }}
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
            Jadwal Pengajian
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-[family-name:var(--font-heading)]"
            style={{ color: '#1A2E28' }}
          >
            Waktu Belajar
          </h2>
          <p
            className="text-base sm:text-lg max-w-2xl mx-auto"
            style={{ color: '#5A7A70' }}
          >
            Pengajian dilaksanakan setiap hari Senin sampai Jumat dengan dua
            pilihan sesi kelas
          </p>
        </motion.div>

        {/* Day info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
            style={{
              backgroundColor: 'rgba(13,124,102,0.1)',
              color: '#0D7C66',
            }}
          >
            <Calendar className="w-4 h-4" />
            Senin — Jumat
          </div>
        </motion.div>

        {/* Schedule Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
          {scheduleData.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.session}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.3 + index * 0.15 }}
                whileHover={{
                  y: -6,
                  boxShadow:
                    '0 20px 40px -8px rgba(0,0,0,0.1)',
                }}
                className="group relative bg-white rounded-2xl p-6 md:p-8 shadow-md border border-gray-100 cursor-default overflow-hidden"
              >
                {/* Top gradient border */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: item.gradient }}
                />

                {/* Icon + Title */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: item.gradient,
                      boxShadow: `0 8px 20px -4px ${item.colorAccent}40`,
                    }}
                  >
                    <Icon className="w-7 h-7 text-white" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3
                      className="text-xl font-bold font-[family-name:var(--font-heading)]"
                      style={{ color: '#1A2E28' }}
                    >
                      {item.session}
                    </h3>
                    <p className="text-xs" style={{ color: '#5A7A70' }}>
                      Durasi 1 Jam
                    </p>
                  </div>
                </div>

                {/* Time Details */}
                <div className="space-y-3">
                  <div
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{ backgroundColor: item.bgAccent }}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" style={{ color: item.colorAccent }} />
                      <span className="text-sm font-medium" style={{ color: '#1A2E28' }}>
                        Masuk
                      </span>
                    </div>
                    <span
                      className="text-sm font-bold font-[family-name:var(--font-heading)]"
                      style={{ color: item.colorAccent }}
                    >
                      {item.masuk}
                    </span>
                  </div>

                  <div
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{ backgroundColor: item.bgAccent }}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" style={{ color: item.colorAccent }} />
                      <span className="text-sm font-medium" style={{ color: '#1A2E28' }}>
                        Pulang
                      </span>
                    </div>
                    <span
                      className="text-sm font-bold font-[family-name:var(--font-heading)]"
                      style={{ color: item.colorAccent }}
                    >
                      {item.pulang}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center text-sm mt-8"
          style={{ color: '#5A7A70' }}
        >
          * Jadwal dapat berubah sewaktu-waktu sesuai kebijakan TPQ
        </motion.p>
      </div>
    </section>
  );
}
