import { NextResponse } from 'next/server';
import { recordPageHit, getDailyTraffic } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    await recordPageHit();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to record traffic:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const data = await getDailyTraffic();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to get traffic:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
