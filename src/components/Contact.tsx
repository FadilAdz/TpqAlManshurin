'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="kontak"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden bg-white"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              'linear-gradient(to right, transparent, rgba(13,124,102,0.10), transparent)',
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
              color: '#D4A843',
              backgroundColor: 'rgba(212, 168, 67, 0.1)',
            }}
          >
            Hubungi Kami
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-[family-name:var(--font-heading)]"
            style={{ color: '#1A2E28' }}
          >
            Kontak & Lokasi
          </h2>
          <p
            className="text-base sm:text-lg max-w-2xl mx-auto"
            style={{ color: '#5A7A70' }}
          >
            Silakan hubungi kami untuk informasi lebih lanjut mengenai TPQ Al
            Manshurin
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Address Card */}
            <div
              className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, #0D7C66, #12A888)',
                  }}
                >
                  <MapPin className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h3
                    className="font-bold mb-1 font-[family-name:var(--font-heading)]"
                    style={{ color: '#1A2E28' }}
                  >
                    Alamat
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#5A7A70' }}>
                    Blok D12 No.1 & 2, Karangraharja, Kec. Cikarang Utara,
                    Kabupaten Bekasi, Jawa Barat 17530
                  </p>
                  <a
                    href="https://maps.app.goo.gl/AsUzVC6cwGwkSKHD7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-sm font-medium transition-colors duration-200 hover:underline"
                    style={{ color: '#0D7C66' }}
                  >
                    Buka di Google Maps
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div
              className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  }}
                >
                  <Phone className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h3
                    className="font-bold mb-1 font-[family-name:var(--font-heading)]"
                    style={{ color: '#1A2E28' }}
                  >
                    WhatsApp
                  </h3>
                  <p className="text-sm" style={{ color: '#5A7A70' }}>
                    0896-1234-567
                  </p>
                  <a
                    href="https://wa.me/6282148059527"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #25D366, #128C7E)',
                    }}
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Chat Sekarang
                  </a>
                </div>
              </div>
            </div>

            {/* Schedule Card */}
            <div
              className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, #D4A843, #E8C06A)',
                  }}
                >
                  <Clock className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h3
                    className="font-bold mb-1 font-[family-name:var(--font-heading)]"
                    style={{ color: '#1A2E28' }}
                  >
                    Jam Operasional
                  </h3>
                  <div className="space-y-1 text-sm" style={{ color: '#5A7A70' }}>
                    <p>Senin - Jumat</p>
                    <p>Pagi: 08:30 - 09:30 WIB</p>
                    <p>Sore: 15:30 - 16:30 WIB</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Google Maps */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl p-2 shadow-md border border-gray-100 overflow-hidden h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.6851093086665!2d107.15726187573807!3d-6.310189993684401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699b0e2daadce9%3A0xe6c5a5de75be7b3e!2sGrand%20Cikarang%20City!5e0!3m2!1sid!2sid!4v1718000000000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '12px', minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi TPQ Al Manshurin"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
