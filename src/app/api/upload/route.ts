import { NextRequest, NextResponse } from 'next/server';
import { getAuthStatus } from '@/lib/auth';
import path from 'path';
import fs from 'fs';

export async function POST(request: NextRequest) {
  try {
    const isAuth = await getAuthStatus();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('image') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Format file tidak didukung. Gunakan JPG, PNG, atau WebP.' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Ukuran file terlalu besar. Maksimal 5MB.' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const ext = file.name.split('.').pop() || 'jpg';
    const timestamp = Date.now();
    const safeName = `nasehat_${timestamp}.${ext}`;

    // Save to public/images/uploads/
    const uploadsDir = path.join(process.cwd(), 'public', 'images', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, safeName);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filePath, buffer);

    // Return the public path
    const publicPath = `/images/uploads/${safeName}`;
    return NextResponse.json({ path: publicPath, filename: safeName });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Gagal mengupload gambar' }, { status: 500 });
  }
}
