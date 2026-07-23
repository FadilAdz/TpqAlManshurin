import { NextResponse } from 'next/server';
import { deleteGalleryItem, getGalleryById } from '@/lib/db';
import { getAuthStatus } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await getAuthStatus();
    
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    // Get the item to find its image path
    const item = await getGalleryById(id);
    
    // Delete from Database
    await deleteGalleryItem(id);

    // Delete the actual file from the public directory
    if (item && item.image) {
      // The image path is stored as '/images/...', we need to map it to the actual file path
      const filePath = path.join(process.cwd(), 'public', item.image);
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (err) {
        console.error('Failed to delete physical file:', err);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete gallery item:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
