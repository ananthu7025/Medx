import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Application from '@/models/Application';
import Job from '@/models/Job';
import { requireAuth } from '@/lib/middleware';
import { z } from 'zod';

const updateStatusSchema = z.object({
  status: z.enum(['applied', 'shortlisted', 'rejected', 'hired'])
});

// PUT /api/applications/[id] - update status (hospital/admin only)
export const PUT = requireAuth(async (req: NextRequest, user) => {
  try {
    await connectDB();

    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    const body = await req.json();
    const { status } = updateStatusSchema.parse(body);

    const application = await Application.findById(id).populate('jobId');
    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    // Check authorization
    if (user.role === 'hospital') {
      const job = await Job.findById(application.jobId);
      if (!job || job.hospitalId.toString() !== user.hospitalId) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    application.status = status;
    await application.save();

    return NextResponse.json({ application });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
});