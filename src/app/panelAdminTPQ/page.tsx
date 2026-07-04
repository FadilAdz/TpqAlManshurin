'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  PlusCircle,
  Trash2,
  Pencil,
  Search,
  Calendar,
  User,
  AlertTriangle,
  Activity,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  created_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id: number | null; title: string }>({
    open: false,
    id: null,
    title: '',
  });
  const [deleting, setDeleting] = useState(false);
  const [trafficData, setTrafficData] = useState<{date: string, views: number}[]>([]);

  const fetchTraffic = async () => {
    try {
      const res = await fetch('/api/traffic');
      if (res.ok) {
        setTrafficData(await res.json());
      }
    } catch (error) {
      console.error('Failed to fetch traffic:', error);
    }
  };

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/nasehat');
      if (res.ok) {
        const data = await res.json();
        setArticles(data);
      }
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchTraffic();
  }, []);

  const handleDelete = async () => {
    if (!deleteModal.id) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/nasehat/${deleteModal.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setArticles((prev) => prev.filter((a) => a.id !== deleteModal.id));
        setDeleteModal({ open: false, id: null, title: '' });
      }
    } catch (error) {
      console.error('Failed to delete:', error);
    } finally {
      setDeleting(false);
    }
  };

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#1A2E28] font-[family-name:var(--font-heading)]">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Kelola semua nasehat yang ditampilkan di website
          </p>
        </div>
        <Link
          href="/panelAdminTPQ/tambah"
          className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-105 w-full sm:w-auto"
          style={{ background: 'linear-gradient(135deg, #0D7C66, #0A251C)' }}
        >
          <PlusCircle className="w-4 h-4" />
          Tambah Nasehat
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-gray-100 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-3 text-center sm:text-left">
            <div
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'rgba(13, 124, 102, 0.1)' }}
            >
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#0D7C66' }} />
            </div>
            <div className="min-w-0">
              <p className="text-lg sm:text-2xl font-bold text-[#1A2E28]">{articles.length}</p>
              <p className="text-[10px] sm:text-xs text-gray-500">Total Nasehat</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-gray-100 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-3 text-center sm:text-left">
            <div
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
            >
              <Activity className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#3B82F6' }} />
            </div>
            <div className="min-w-0">
              <p className="text-lg sm:text-2xl font-bold text-[#1A2E28]">
                {trafficData.reduce((acc, curr) => acc + curr.views, 0)}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-500">Total Pengunjung</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-gray-100 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-3 text-center sm:text-left">
            <div
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'rgba(13, 124, 102, 0.05)' }}
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#0D7C66' }} />
            </div>
            <div className="min-w-0">
              <p className="text-lg sm:text-2xl font-bold text-[#1A2E28]">
                {new Set(articles.map((a) => a.author)).size}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-500">Penulis</p>
            </div>
          </div>
        </div>
      </div>

      {/* Traffic Chart */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(13, 124, 102, 0.1)' }}>
            <Activity className="w-5 h-5" style={{ color: '#0D7C66' }} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#1A2E28]">Statistik Pengunjung</h3>
            <p className="text-xs text-gray-500">Jumlah halaman dilihat dalam 30 hari terakhir</p>
          </div>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dx={-10} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                labelStyle={{ fontWeight: 'bold', color: '#1A2E28', marginBottom: '4px' }}
              />
              <Line 
                type="monotone" 
                dataKey="views" 
                name="Pengunjung"
                stroke="#0D7C66" 
                strokeWidth={3} 
                dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} 
                activeDot={{ r: 6, fill: '#0D7C66' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Search & Articles List */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Search Bar */}
        <div className="p-3 sm:p-4 border-b border-gray-100">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nasehat atau penulis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7C66] focus:border-transparent transition-all bg-gray-50 focus:bg-white"
            />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div
              className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"
              style={{ borderColor: '#0D7C66', borderTopColor: 'transparent' }}
            />
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <FileText className="w-12 h-12 mb-3 opacity-30" />
            <p className="text-sm">
              {searchQuery ? 'Tidak ada hasil pencarian' : 'Belum ada nasehat'}
            </p>
          </div>
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="sm:hidden divide-y divide-gray-50">
              {filteredArticles.map((article) => (
                <div key={article.id} className="p-4 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#1A2E28] line-clamp-2">
                        {article.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                        {article.author}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{article.date}</p>
                    </div>
                    <div className="flex items-center gap-0.5 flex-shrink-0">
                      <button
                        onClick={() => router.push(`/panelAdminTPQ/edit/${article.id}`)}
                        className="p-2 rounded-lg text-gray-400 hover:text-[#0D7C66] hover:bg-emerald-50 transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          setDeleteModal({
                            open: true,
                            id: article.id,
                            title: article.title,
                          })
                        }
                        className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Nasehat
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">
                      Penulis
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredArticles.map((article) => (
                    <tr
                      key={article.id}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-[#1A2E28] truncate max-w-[200px] lg:max-w-[350px]">
                              {article.title}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[200px] lg:max-w-[350px]">
                              {article.excerpt}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span className="text-sm text-gray-600">{article.author}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm text-gray-500 whitespace-nowrap">{article.date}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => router.push(`/panelAdminTPQ/edit/${article.id}`)}
                            className="p-2 rounded-lg text-gray-400 hover:text-[#0D7C66] hover:bg-emerald-50 transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              setDeleteModal({
                                open: true,
                                id: article.id,
                                title: article.title,
                              })
                            }
                            className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 max-w-sm mx-4 w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-[#1A2E28] font-[family-name:var(--font-heading)]">
                Hapus Nasehat?
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-1">
              Anda yakin ingin menghapus nasehat:
            </p>
            <p className="text-sm font-semibold text-[#1A2E28] mb-6 line-clamp-2">
              &ldquo;{deleteModal.title}&rdquo;
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal({ open: false, id: null, title: '' })}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-60"
              >
                {deleting ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
