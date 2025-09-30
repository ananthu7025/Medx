import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Job from '@/models/Job';
import { requireAuth, getAuthUser } from '@/lib/middleware';
import { z } from 'zod';

const updateJobSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  type: z.enum(['Full-time', 'Part-time', 'Contract']).optional(),
  location: z.string().min(2).optional(),
  salaryRange: z.string().optional(),
  isActive: z.boolean().optional()
});

// GET /api/jobs/[id] - public
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const job = await Job.findById(params.id)
      .populate('hospitalId', 'name address phone email website')
      .lean();

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json({ job });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT /api/jobs/[id] - hospital (own jobs) or admin
export const PUT = requireAuth(async (req: NextRequest, user) => {
  try {
    await connectDB();

    const { id } = await req.json();
    const body = await req.json();
    const validated = updateJobSchema.parse(body);

    const job = await Job.findById(id);
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Check authorization
    if (user.role !== 'medxAdmin' && job.hospitalId.toString() !== user.hospitalId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    Object.assign(job, validated);
    await job.save();

    return NextResponse.json({ job });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
});

// DELETE /api/jobs/[id] - hospital (own jobs) or admin
export const DELETE = requireAuth(async (req: NextRequest, user) => {
  try {
    await connectDB();

    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    const job = await Job.findById(id);
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Check authorization
    if (user.role !== 'medxAdmin' && job.hospitalId.toString() !== user.hospitalId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await job.deleteOne();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});