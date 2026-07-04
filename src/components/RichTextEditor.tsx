'use client';

import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css'; // Import Quill styles

// Dynamically import ReactQuill to prevent SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false, 
  loading: () => <p className="text-gray-400 p-4">Memuat editor...</p> 
});

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder = 'Tulis konten di sini...' }: RichTextEditorProps) {
  // Modules configuration for ReactQuill
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link'],
      ['clean']
    ],
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <ReactQuill 
        theme="snow" 
        value={value || ''} 
        onChange={onChange} 
        modules={modules}
        placeholder={placeholder}
        className="min-h-[300px]"
      />
    </div>
  );
}
