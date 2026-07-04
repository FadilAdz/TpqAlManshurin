import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAllArticles, createArticle, seedArticles } from '@/lib/db';
import { getAuthStatus } from '@/lib/auth';
import { articles as staticArticles } from '@/data/articles';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Auto-seed on first access
    await seedArticles(
      staticArticles.map((a) => ({
        title: a.title,
        excerpt: a.excerpt,
        content: a.content,
        date: a.date,
        category: a.category,
        image: a.image,
        author: a.author,
      }))
    );

    const articles = await getAllArticles();
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuth = true; // await getAuthStatus();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    // Sanitize content to remove non-breaking spaces that cause text wrap issues
    if (data.content) {
      data.content = data.content.replace(/&nbsp;/g, ' ').replace(/\u00A0/g, ' ');
    }

    const article = await createArticle(data);
    console.log('Created article:', article);
    
    // Invalidate Next.js cache so the frontend updates immediately
    try {
      revalidatePath('/');
      revalidatePath('/panelAdminTPQ');
    } catch (cacheError) {
      console.error('Cache revalidation error:', cacheError);
    }
    
    return NextResponse.json(article, { status: 201 });
  } catch (error: any) {
    console.error('Error creating article:', error);
    return NextResponse.json({ error: error.stack || error.message || 'Failed to create article' }, { status: 500 });
  }
}
