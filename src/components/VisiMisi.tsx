'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function VisiMisi() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="visi-misi"
      ref={sectionRef}
      className="relative py-24 bg-[#0A251C]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Visi & Misi
          </h2>
          <div className="w-16 h-1 bg-white/20 mx-auto mb-6" />
          <p className="text-base sm:text-lg max-w-2xl mx-auto text-white/70">
            Membangun generasi Qur&apos;ani yang berilmu, berakhlak, dan bermanfaat bagi umat
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

          {/* Visi Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 border border-white/10 p-10 md:p-12 transition-colors hover:bg-white/10"
          >
            <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">
              Visi
            </h3>
            <p className="text-lg leading-relaxed text-white/80">
              Terwujudnya generasi Qur’ani yang alim-faqih, berakhlakul karimah, dan mandiri, guna membangun manusia yang profesional religius, bertaqwa kepada Allah SWT, serta siap menghadapi tantangan zaman.
            </p>
          </motion.div>

          {/* Misi Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/5 border border-white/10 p-10 md:p-12 transition-colors hover:bg-white/10"
          >
            <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">
              Misi
            </h3>
            <ul className="space-y-4">
              {[
                'Alim dan Faqih: Mendidik santri agar mampu membaca, menulis, dan memahami Al-Quran serta Al-Hadits secara benar demi memperkuat dasar keimanan.',
                'Berakhlakul Karimah: Membiasakan perilaku Islami, menanamkan nilai-nilai karakter luhur, budi pekerti, serta tata krama di dalam kehidupan sehari-hari.',
                'Mandiri: Melatih kemandirian, keterampilan praktis, jiwa kewirausahaan, dan ketangguhan santri sejak dini agar siap menghadapi tantangan zaman.',
                'Peningkatan Mutu Pengajar: Meningkatkan kompetensi para ustadz dan ustadzah secara berkala melalui pelatihan manajemen kelas dan pengajaran metode Al-Quran yang efektif',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-lg text-white/80">
                  <span className="font-bold text-white/40 mt-0.5">
                    0{i + 1}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
