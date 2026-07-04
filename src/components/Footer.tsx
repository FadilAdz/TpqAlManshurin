'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';

const quickLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Tentang Kami', href: '#tentang' },
  { label: 'Program', href: '#program' },
  { label: 'Jadwal', href: '#jadwal' },
  { label: 'Galeri', href: '#galeri' },
  { label: 'Artikel', href: '#artikel' },
  { label: 'Kontak', href: '#kontak' },
];

export default function Footer() {
  const handleClick = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #0A1F1A 0%, #071512 100%)',
      }}
    >
      {/* Islamic pattern */}
      <div className="absolute inset-0 islamic-pattern opacity-10" />

      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background:
            'linear-gradient(to right, #0D7C66, #D4A843, #0D7C66)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/Logo/logoSK4.png"
                alt="Logo TPQ Al Manshurin"
                width={48}
                height={48}
                className="rounded-full ring-2 ring-white/10"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-heading)]">
              TPQ Al Manshurin
            </h3>
            <p
              className="text-sm leading-relaxed max-w-sm mb-4"
              style={{ color: 'rgba(232,245,240,0.5)' }}
            >
              Taman Pendidikan Qur&apos;an yang berkomitmen mencetak generasi
              Alim Faqih, Berakhlaqul Karimah, dan Mandiri melalui metode
              Manqul & Talaqqi.
            </p>
            <div className="flex items-start gap-2 text-sm" style={{ color: 'rgba(232,245,240,0.4)' }}>
              <svg
                className="w-4 h-4 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <span>
                Blok D12 No.1 & 2, Karangraharja, Kec. Cikarang Utara,
                Kabupaten Bekasi, Jawa Barat 17530
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-sm font-semibold uppercase tracking-widest mb-5"
              style={{ color: '#D4A843' }}
            >
              Navigasi
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(link.href);
                    }}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: 'rgba(232,245,240,0.5)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              className="text-sm font-semibold uppercase tracking-widest mb-5"
              style={{ color: '#D4A843' }}
            >
              Kontak
            </h4>
            <ul className="space-y-3 text-sm" style={{ color: 'rgba(232,245,240,0.5)' }}>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <a
                  href="https://wa.me/6282148059527"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  0896-1234-567
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  style={{ color: '#0D7C66' }}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  Senin - Jumat
                  <br />
                  Pagi 08:30 & Sore 15:30
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-6"
          style={{
            background:
              'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)',
          }}
        />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: 'rgba(232,245,240,0.35)' }}>
            © {new Date().getFullYear()} TPQ Al Manshurin. Hak cipta dilindungi.
          </p>
          <p
            className="text-xs flex items-center gap-1"
            style={{ color: 'rgba(232,245,240,0.35)' }}
          >
            Dibuat dengan <Heart className="w-3 h-3 text-red-400 fill-red-400" /> untuk Qur&apos;an Hadis&apos;t Jama&apos;ah
          </p>
        </div>
      </div>
    </footer>
  );
}
