'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Image as ImageIcon,
} from 'lucide-react';

const sidebarLinks = [
  { label: 'Dashboard', href: '/panelAdminTPQ', icon: LayoutDashboard },
  { label: 'Tambah Nasehat', href: '/panelAdminTPQ/tambah', icon: PlusCircle },
  { label: 'Manajemen Galeri', href: '/panelAdminTPQ/galeri', icon: ImageIcon },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Skip auth check for login page
  const isLoginPage = pathname === '/panelAdminTPQ/login';

  useEffect(() => {
    if (isLoginPage) {
      setIsCheckingAuth(false);
      return;
    }

    // Check auth by trying to fetch protected data
    fetch('/api/auth/check')
      .then((res) => {
        if (!res.ok) {
          router.push('/panelAdminTPQ/login');
        } else {
          setIsCheckingAuth(false);
        }
      })
      .catch(() => {
        router.push('/panelAdminTPQ/login');
      });
  }, [isLoginPage, router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/panelAdminTPQ/login');
  };

  // Login page gets rendered without sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Show loading while checking auth
  if (isCheckingAuth) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: '#F0F5F2' }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: '#0D7C66', borderTopColor: 'transparent' }}
          />
          <p className="text-sm text-gray-500">Memverifikasi akses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#F0F5F2' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-[260px] flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: '#0A1F1A' }}
      >
        {/* Sidebar Header */}
        <div className="p-5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <Image
              src="/images/Logo/logoSK4.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full ring-2 ring-white/20"
            />
            <div>
              <p className="text-white text-sm font-bold font-[family-name:var(--font-heading)]">
                Admin Panel
              </p>
              <p className="text-emerald-400/60 text-[10px] tracking-wide">
                TPQ Al Manshurin
              </p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-1">
          <p className="text-[10px] text-white/30 uppercase tracking-widest font-semibold px-3 mb-3">
            Menu
          </p>
          {sidebarLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/panelAdminTPQ' &&
                pathname.startsWith(link.href));
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 transition-colors ${
                    isActive ? 'text-emerald-400' : 'text-white/40 group-hover:text-white/70'
                  }`}
                />
                <span className="whitespace-nowrap truncate">{link.label}</span>
                {isActive && (
                  <ChevronRight className="w-4 h-4 ml-auto text-emerald-400/60 flex-shrink-0" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-400/80 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header
          className="sticky top-0 z-30 h-14 sm:h-16 flex items-center justify-between px-3 sm:px-4 lg:px-8 border-b"
          style={{
            backgroundColor: 'rgba(240, 245, 242, 0.8)',
            backdropFilter: 'blur(12px)',
            borderColor: 'rgba(0,0,0,0.06)',
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl hover:bg-white/80 text-gray-600 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {(() => {
            const activeLink = sidebarLinks.find(link => 
              pathname === link.href || (link.href !== '/panelAdminTPQ' && pathname.startsWith(link.href))
            ) || { label: 'Admin Panel', icon: FileText };
            const ActiveIcon = activeLink.icon;
            
            return (
              <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500">
                <ActiveIcon className="w-4 h-4" />
                <span>{activeLink.label}</span>
              </div>
            );
          })()}

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-[10px] sm:text-xs text-gray-500 hover:text-[#0D7C66] transition-colors px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-gray-200 hover:border-[#0D7C66]/30 whitespace-nowrap"
            >
              <span className="hidden sm:inline">Lihat Website →</span>
              <span className="sm:hidden">Website →</span>
            </Link>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: '#0D7C66' }}>
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-3 sm:p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
