import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getArticleById, updateArticle, deleteArticle } from '@/lib/db';
import { getAuthStatus } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const article = await getArticleById(parseInt(resolvedParams.id));
    if (!article) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(article);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await getAuthStatus();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const data = await request.json();
    const article = await updateArticle(parseInt(resolvedParams.id), data);
    if (!article) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    
    // Invalidate Next.js cache so the frontend updates immediately
    revalidatePath('/');
    revalidatePath('/panelAdminTPQ');
    revalidatePath(`/nasehat/${resolvedParams.id}`);
    
    return NextResponse.json(article);
  } catch {
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await getAuthStatus();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    await deleteArticle(parseInt(resolvedParams.id));
    
    // Invalidate Next.js cache so the frontend updates immediately
    revalidatePath('/');
    revalidatePath('/panelAdminTPQ');
    revalidatePath(`/nasehat/${resolvedParams.id}`);
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}
