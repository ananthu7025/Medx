import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Application from '@/models/Application';
import Job from '@/models/Job';
import { getAuthUser } from '@/lib/middleware';
import { z } from 'zod';

const applySchema = z.object({
  jobId: z.string(),
  applicantName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  resumePath: z.string(),
  coverLetter: z.string().optional()
});

// POST /api/applications - public (candidates apply)
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const validated = applySchema.parse(body);

    // Verify job exists
    const job = await Job.findById(validated.jobId);
    if (!job || !job.isActive) {
      return NextResponse.json({ error: 'Job not found or inactive' }, { status: 404 });
    }

    const application = await Application.create(validated);

    return NextResponse.json({ application }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// GET /api/applications - hospital/admin only
export async function GET(req: NextRequest) {
  try {
    const user = getAuthUser(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get('jobId');

    let query: any = {};

    // If hospital user, only show applications for their jobs
    if (user.role === 'hospital') {
      const jobs = await Job.find({ hospitalId: user.hospitalId }).select('_id');
      const jobIds = jobs.map(j => j._id);
      query.jobId = { $in: jobIds };
    }

    if (jobId) {
      // Verify authorization for this specific job
      if (user.role === 'hospital') {
        const job = await Job.findById(jobId);
        if (!job || job.hospitalId.toString() !== user.hospitalId) {
          return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }
      }
      query.jobId = jobId;
    }

    const applications = await Application.find(query)
      .sort({ appliedAt: -1 })
      .populate('jobId', 'title')
      .lean();

    return NextResponse.json({ applications });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}