import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  return NextResponse.json({ error: 'Not implemented. Database connection removed.' }, { status: 501 });
} 