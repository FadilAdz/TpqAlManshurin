'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Save,
  Loader2,
  Type,
  User,
  Calendar,
  ImageIcon,
  FileText,
  AlignLeft,
  Upload,
  X,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import RichTextEditor from '@/components/RichTextEditor';
import { motion, AnimatePresence } from 'framer-motion';

export default function TambahNasehat() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    date: '',
    category: 'Nasehat',
    image: '',
    author: '',
  });

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (res.ok) {
        const data = await res.json();
        setForm((prev) => ({ ...prev, image: data.path }));
        setImagePreview(data.path);
      } else {
        const data = await res.json();
        setError(data.error || 'Gagal mengupload gambar');
      }
    } catch {
      setError('Gagal mengupload gambar');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/nasehat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          router.push('/panelAdminTPQ');
        }, 2500);
      } else {
        const data = await res.json();
        setError(data.error || 'Gagal menambahkan nasehat');
      }
    } catch {
      setError('Terjadi kesalahan koneksi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/panelAdminTPQ"
          className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:text-[#0D7C66] hover:border-[#0D7C66]/30 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#1A2E28] font-[family-name:var(--font-heading)]">
            Tambah Nasehat
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Buat nasehat baru untuk ditampilkan di website
          </p>
        </div>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 shadow-sm relative overflow-hidden"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
            <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-red-800 mb-0.5">Gagal Menyimpan</h4>
              <p className="text-red-600 text-sm leading-relaxed">{error}</p>
            </div>
            <button 
              type="button"
              onClick={() => setError('')} 
              className="p-1 hover:bg-red-100 rounded-lg text-red-400 hover:text-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            key="success-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed -inset-y-32 -inset-x-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 to-teal-500" />
              
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6"
              >
                <CheckCircle className="w-10 h-10 text-[#0D7C66]" />
              </motion.div>

              <h3 className="text-2xl font-bold text-[#1A2E28] mb-2 font-[family-name:var(--font-heading)]">
                Berhasil!
              </h3>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Nasehat <span className="font-semibold text-gray-700">{form.title || 'baru'}</span> telah berhasil ditambahkan dan sudah tayang.
              </p>

              {/* Progress bar timer */}
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.5, ease: 'linear' }}
                  className="h-full bg-[#0D7C66]"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <label className="flex items-center gap-2 text-sm font-semibold text-[#1A2E28] mb-3">
            <Type className="w-4 h-4 text-[#0D7C66]" />
            Judul Nasehat
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Contoh: Keutamaan Sholat Berjamaah"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7C66] focus:border-transparent bg-gray-50 focus:bg-white transition-all"
          />
        </div>

        {/* Author & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <label className="flex items-center gap-2 text-sm font-semibold text-[#1A2E28] mb-3">
              <User className="w-4 h-4 text-[#0D7C66]" />
              Penulis
            </label>
            <input
              type="text"
              name="author"
              value={form.author}
              onChange={handleChange}
              required
              placeholder="Nama penulis"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7C66] focus:border-transparent bg-gray-50 focus:bg-white transition-all"
            />
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <label className="flex items-center gap-2 text-sm font-semibold text-[#1A2E28] mb-3">
              <Calendar className="w-4 h-4 text-[#0D7C66]" />
              Tanggal
            </label>
            <input
              type="text"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              placeholder="Contoh: 27 Juni 2026"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7C66] focus:border-transparent bg-gray-50 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Image */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <label className="flex items-center gap-2 text-sm font-semibold text-[#1A2E28] mb-3">
              <ImageIcon className="w-4 h-4 text-[#0D7C66]" />
              Gambar Nasehat
            </label>

            {/* Preview */}
            {imagePreview ? (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-3 bg-gray-100">
                <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview('');
                    setForm((prev) => ({ ...prev, image: '' }));
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="w-full border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#0D7C66]/40 hover:bg-emerald-50/30 transition-all mb-3"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-8 h-8 text-[#0D7C66] animate-spin" />
                    <p className="text-sm text-gray-500">Mengupload...</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-300" />
                    <p className="text-sm text-gray-500 text-center">
                      Klik atau seret gambar ke sini
                    </p>
                    <p className="text-xs text-gray-400">JPG, PNG, WebP • Maks 5MB</p>
                  </>
                )}
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

        {/* Excerpt */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <label className="flex items-center gap-2 text-sm font-semibold text-[#1A2E28] mb-3">
            <AlignLeft className="w-4 h-4 text-[#0D7C66]" />
            Ringkasan (Excerpt)
          </label>
          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Tulis ringkasan singkat yang akan tampil di kartu nasehat..."
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7C66] focus:border-transparent bg-gray-50 focus:bg-white transition-all resize-none"
          />
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 pb-16">
          <label className="flex items-center gap-2 text-sm font-semibold text-[#1A2E28] mb-3">
            <FileText className="w-4 h-4 text-[#0D7C66]" />
            Isi Nasehat
          </label>
          <RichTextEditor
            value={form.content}
            onChange={(content) => setForm({ ...form, content })}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <Link
            href="/panelAdminTPQ"
            className="px-6 py-3 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #0D7C66, #0A251C)' }}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Simpan Nasehat
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
