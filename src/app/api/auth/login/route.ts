import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Hospital from '@/models/Hospital';
import { verifyPassword, generateToken } from '@/lib/auth';
import { serialize } from 'cookie';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, password } = loginSchema.parse(body);

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Verify password
    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Get hospital if user is hospital role
    let hospitalId = undefined;
    if (user.role === 'hospital') {
      const hospital = await Hospital.findOne({ createdByUserId: user._id });
      hospitalId = hospital?._id.toString();
    }

    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      hospitalId
    });

    // Set cookie
    const cookie = serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

    response.headers.set('Set-Cookie', cookie);
    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 400 });
  }
}