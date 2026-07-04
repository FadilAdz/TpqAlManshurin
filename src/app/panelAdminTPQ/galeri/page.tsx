'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  GripVertical,
  Trash2,
  Image as ImageIcon,
  Type,
  Upload,
  X,
  Loader2,
  CheckCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

interface GalleryItem {
  id: number;
  title: string;
  image: string;
  order_index: number;
}

function SortableItem({ item, onDelete }: { item: GalleryItem; onDelete: (id: number) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 group hover:border-[#0D7C66]/30 transition-colors"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-2 text-gray-400 hover:text-[#0D7C66]"
      >
        <GripVertical className="w-5 h-5" />
      </div>
      
      <div className="w-20 h-16 relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
        <Image src={item.image} alt={item.title} fill className="object-cover" />
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[#1A2E28] truncate">{item.title}</p>
      </div>

      <button
        onClick={() => onDelete(item.id)}
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}

export default function AdminGallery() {
  const router = useRouter();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({ title: '', image: '' });
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setMounted(true);
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/galeri', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (error) {
      console.error('Failed to fetch gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      
      const newItems = arrayMove(items, oldIndex, newIndex);
      
      // Update order_index for all items based on new array order
      const updatedItems = newItems.map((item, index) => ({
        ...item,
        order_index: index,
      }));
      
      setItems(updatedItems);
      
      // Save new order to DB
      try {
        await fetch('/api/galeri/reorder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: updatedItems.map(item => ({ id: item.id, order_index: item.order_index }))
          }),
        });
      } catch (error) {
        console.error('Failed to reorder:', error);
      }
    }
  };

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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image || !form.title) {
      setError('Judul dan Gambar wajib diisi');
      return;
    }
    
    setError('');
    try {
      const res = await fetch('/api/galeri', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm({ title: '', image: '' });
        setImagePreview('');
        setShowSuccess(true);
        fetchGallery();
        setTimeout(() => setShowSuccess(false), 2000);
      } else {
        const data = await res.json();
        setError(data.error || 'Gagal menambahkan gambar');
      }
    } catch {
      setError('Terjadi kesalahan koneksi');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus gambar ini?')) return;
    
    // Optimistic deletion for better UX (immediate animation)
    const previousItems = [...items];
    setItems(items.filter(item => item.id !== id));

    try {
      const res = await fetch(`/api/galeri/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        // Revert if API fails
        setItems(previousItems);
        alert('Gagal menghapus gambar dari server');
      }
    } catch (error) {
      console.error('Failed to delete:', error);
      setItems(previousItems);
      alert('Terjadi kesalahan saat menghapus gambar');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1A2E28] font-[family-name:var(--font-heading)]">
          Manajemen Galeri
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Kelola foto kegiatan TPQ (Upload, Urutkan, Hapus)
        </p>
      </div>

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
                Gambar telah berhasil ditambahkan ke Galeri.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Upload Form */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-lg font-bold text-[#1A2E28] mb-4">Upload Gambar Baru</h2>
            
            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleAddGallery} className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-[#1A2E28] mb-2">
                  <Type className="w-4 h-4 text-[#0D7C66]" />
                  Judul/Keterangan Acara
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Contoh: Kegiatan Persami 2026"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7C66] focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-[#1A2E28] mb-2">
                  <ImageIcon className="w-4 h-4 text-[#0D7C66]" />
                  File Gambar
                </label>
                
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
                    className="w-full border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#0D7C66]/40 hover:bg-emerald-50/30 transition-all"
                  >
                    {uploading ? (
                      <Loader2 className="w-6 h-6 text-[#0D7C66] animate-spin" />
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-gray-400" />
                        <p className="text-xs text-gray-500 text-center">Klik atau seret gambar</p>
                      </>
                    )}
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                  accept="image/jpeg, image/png, image/webp"
                  className="hidden"
                />
              </div>

              <button
                type="submit"
                disabled={uploading || !form.image || !form.title}
                className="w-full py-3 rounded-xl text-white font-semibold shadow-lg shadow-emerald-500/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #0D7C66, #0A251C)' }}
              >
                Tambahkan ke Galeri
              </button>
            </form>
          </div>
        </div>

        {/* Gallery List (Drag and Drop) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-[#1A2E28]">Daftar Urutan Galeri</h2>
            <p className="text-xs text-gray-500">Drag & Drop untuk mengurutkan</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-[#0D7C66] animate-spin" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 border-dashed">
              <p className="text-gray-500">Belum ada gambar di galeri.</p>
            </div>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={items} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
                        layout
                      >
                        <SortableItem item={item} onDelete={handleDelete} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
    </div>
  );
}
