import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ error: 'Not implemented. Database connection removed.' }, { status: 501 });
}

export async function PUT() {
  return NextResponse.json({ error: 'Not implemented. Database connection removed.' }, { status: 501 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Not implemented. Database connection removed.' }, { status: 501 });
} 