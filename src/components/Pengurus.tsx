'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface PengurusItem {
  name: string;
  role: string;
  type: 'pengurus' | 'ustadz';
}

const pengurusData: PengurusItem[] = [
  { name: 'Bp. M.Hulaimul Fikri', role: 'Ketua TPQ', type: 'pengurus' },
  { name: 'Bp. Pandu Prameswara', role: 'Wakil Ketua 1', type: 'pengurus' },
  { name: 'Bp. Ravido Sakti Muryanto', role: 'Wakil Ketua 2', type: 'pengurus' },
  { name: 'Bp. Adis Fariedsi', role: 'Bendahara Utama', type: 'pengurus' },
  { name: 'Bp. Abdul Rojaq', role: 'Sekretaris Keuangan', type: 'pengurus' },
  { name: 'Bp. Kustian Guntolo', role: 'Pakar Pendidik', type: 'pengurus' },
  { name: 'Bp. Yuntopo Yoga', role: 'Pembina Kepengurusan', type: 'pengurus' },
  { name: 'Bp. Bangga Atmaja', role: 'Sekretaris Umum', type: 'pengurus' },
  { name: 'Ibu Evanti Andriani', role: 'Koord. Ibu-Ibu Pengajian', type: 'pengurus' },
  { name: 'Bp. Rifki Nur fadilah', role: 'Seksi Keamanan', type: 'pengurus' },
  { name: 'Bp. Fauzan', role: 'Seksi Keamanan', type: 'pengurus' },
  { name: 'Bp. Sidal', role: 'Seksi Keamanan', type: 'pengurus' },
];

const ustadzData: PengurusItem[] = [
  { name: 'Sdr. Fajar Syahri', role: 'Ustadz', type: 'ustadz' },
  { name: 'Sdr. Putra', role: 'Ustadz', type: 'ustadz' },
  { name: 'Sdr. Dwika', role: 'Ustadz', type: 'ustadz' },
  { name: 'Sdr. Ahmad Subhi Aljava', role: 'Ustadz', type: 'ustadz' },
];

function getInitials(name: string): string {
  const cleanName = name.replace(/^(Bp\.|Ibu)\s+/i, '');
  return cleanName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

const avatarGradients = [
  'linear-gradient(135deg, #0D7C66, #12A888)',
  'linear-gradient(135deg, #12A888, #34D399)',
  'linear-gradient(135deg, #064E3F, #0D7C66)',
  'linear-gradient(135deg, #0D7C66, #34D399)',
];

const goldGradients = [
  'linear-gradient(135deg, #D4A843, #E8C06A)',
  'linear-gradient(135deg, #C49A3C, #D4A843)',
  'linear-gradient(135deg, #D4A843, #F0D080)',
  'linear-gradient(135deg, #B8923A, #D4A843)',
];

export default function Pengurus() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="pengurus"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: '#F2F8F5' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-60"
          style={{ backgroundColor: '#E4EFE9' }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-60"
          style={{ backgroundColor: '#E4EFE9' }}
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
              color: '#D4A843',
              backgroundColor: 'rgba(212, 168, 67, 0.1)',
            }}
          >
            Struktur Organisasi
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-[family-name:var(--font-heading)]"
            style={{ color: '#1A2E28' }}
          >
            Pengurus & Ustadz
          </h2>
          <p
            className="text-base sm:text-lg max-w-2xl mx-auto"
            style={{ color: '#5A7A70' }}
          >
            Para pengurus dan ustadz yang berdedikasi dalam mendidik
            generasi Qur&apos;ani
          </p>
        </motion.div>

        {/* Pengurus Section */}
        <div className="mb-12">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg font-bold mb-6 flex items-center gap-2 font-[family-name:var(--font-heading)]"
            style={{ color: '#1A2E28' }}
          >
            <span
              className="w-1 h-6 rounded-full"
              style={{ background: 'linear-gradient(to bottom, #D4A843, #E8C06A)' }}
            />
            Pengurus
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pengurusData.map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                whileHover={{
                  y: -6,
                  boxShadow:
                    '0 16px 32px -8px rgba(212,168,67,0.15)',
                }}
                className="group bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 cursor-default transition-all duration-300"
              >
                {/* Avatar */}
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-lg font-bold transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: goldGradients[i % goldGradients.length],
                    boxShadow: '0 4px 14px -2px rgba(212,168,67,0.35)',
                  }}
                >
                  {getInitials(person.name)}
                </div>
                <h4
                  className="text-base font-bold mb-1 font-[family-name:var(--font-heading)]"
                  style={{ color: '#1A2E28' }}
                >
                  {person.name}
                </h4>
                <p
                  className="text-sm px-3 py-1 rounded-full inline-block"
                  style={{
                    color: '#D4A843',
                    backgroundColor: 'rgba(212,168,67,0.1)',
                  }}
                >
                  {person.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ustadz Section */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-lg font-bold mb-6 flex items-center gap-2 font-[family-name:var(--font-heading)]"
            style={{ color: '#1A2E28' }}
          >
            <span
              className="w-1 h-6 rounded-full"
              style={{ background: 'linear-gradient(to bottom, #0D7C66, #12A888)' }}
            />
            Ustadz (Tenaga Pengajar)
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ustadzData.map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                whileHover={{
                  y: -6,
                  boxShadow:
                    '0 16px 32px -8px rgba(13,124,102,0.15)',
                }}
                className="group bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 cursor-default transition-all duration-300"
              >
                {/* Avatar */}
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-lg font-bold transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: avatarGradients[i % avatarGradients.length],
                    boxShadow: '0 4px 14px -2px rgba(13,124,102,0.35)',
                  }}
                >
                  {getInitials(person.name)}
                </div>
                <h4
                  className="text-base font-bold mb-1 font-[family-name:var(--font-heading)]"
                  style={{ color: '#1A2E28' }}
                >
                  {person.name}
                </h4>
                <p
                  className="text-sm px-3 py-1 rounded-full inline-block"
                  style={{
                    color: '#0D7C66',
                    backgroundColor: 'rgba(13,124,102,0.08)',
                  }}
                >
                  {person.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
