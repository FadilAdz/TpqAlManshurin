import { NextResponse } from 'next/server';
import { getAllGallery, addGalleryItem } from '@/lib/db';
import { getAuthStatus } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getAllGallery();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to get gallery:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const isAuth = await getAuthStatus();
    
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    if (!body.title || !body.image) {
      return NextResponse.json({ error: 'Title and image are required' }, { status: 400 });
    }

    const newGallery = await addGalleryItem({
      title: body.title,
      image: body.image,
    });

    return NextResponse.json({ success: true, id: newGallery.id });
  } catch (error: any) {
    console.error('Failed to add gallery:', error);
    return NextResponse.json({ error: 'Internal Server Error: ' + error.message, stack: error.stack }, { status: 500 });
  }
}
