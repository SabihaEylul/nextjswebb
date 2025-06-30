import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: 'Kullanıcı adı ve şifre gereklidir.' }, { status: 400 });
    }

    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      return NextResponse.json({ error: 'Geçersiz kullanıcı adı veya şifre.' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Geçersiz kullanıcı adı veya şifre.' }, { status: 401 });
    }

    // Don't send the password back
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...adminWithoutPassword } = admin;

    return NextResponse.json(adminWithoutPassword, { status: 200 });
  } catch (error) {
    console.error('Giriş hatası:', error);
    return NextResponse.json({ error: 'Dahili sunucu hatası.' }, { status: 500 });
  }
} 