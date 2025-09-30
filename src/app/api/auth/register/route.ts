import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Hospital from '@/models/Hospital';
import { hashPassword } from '@/lib/auth';
import { z } from 'zod';

const registerSchema = z.object({
  hospitalName: z.string().min(2),
  contactPersonName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  address: z.string().min(5),
  phone: z.string().min(10),
  website: z.string().url().optional().or(z.literal(''))
});

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const validated = registerSchema.parse(body);

    // Check if user exists
    const existingUser = await User.findOne({ email: validated.email });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }

    // Hash password
    const passwordHash = await hashPassword(validated.password);

    // Create user
    const user = await User.create({
      name: validated.contactPersonName,
      email: validated.email,
      passwordHash,
      role: 'hospital'
    });

    // Create hospital
    await Hospital.create({
      name: validated.hospitalName,
      email: validated.email,
      address: validated.address,
      phone: validated.phone,
      website: validated.website || undefined,
      createdByUserId: user._id,
      verified: false
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error.message || 'Registration failed' },
      { status: 400 }
    );
  }
}