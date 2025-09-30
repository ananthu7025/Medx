import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Job from '@/models/Job';
import { requireRole } from '@/lib/middleware';
import { z } from 'zod';

const createJobSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  type: z.enum(['Full-time', 'Part-time', 'Contract']),
  location: z.string().min(2),
  salaryRange: z.string()
});

// GET /api/jobs - public, list all active jobs
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const jobs = await Job.find({ isActive: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('hospitalId', 'name address')
      .lean();

    const total = await Job.countDocuments({ isActive: true });

    return NextResponse.json({
      jobs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/jobs - hospital only
export const POST = requireRole(['hospital'])(async (req: NextRequest, user) => {
  try {
    await connectDB();

    const body = await req.json();
    const validated = createJobSchema.parse(body);

    const job = await Job.create({
      ...validated,
      hospitalId: user.hospitalId,
      createdByUserId: user.userId,
      isActive: true
    });

    return NextResponse.json({ job }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
});