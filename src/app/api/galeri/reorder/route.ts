import { NextResponse } from 'next/server';
import { updateGalleryOrder } from '@/lib/db';
import { getAuthStatus } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const isAuth = await getAuthStatus();
    
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    if (!body.items || !Array.isArray(body.items)) {
      return NextResponse.json({ error: 'Items array is required' }, { status: 400 });
    }

    await updateGalleryOrder(body.items);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to reorder gallery:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
