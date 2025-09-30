import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Hospital from '@/models/Hospital';
import { requireRole } from '@/lib/middleware';

// GET /api/hospitals - admin only
export const GET = requireRole(['medxAdmin'])(async (req: NextRequest) => {
  try {
    await connectDB();

    const hospitals = await Hospital.find()
      .sort({ createdAt: -1 })
      .populate('createdByUserId', 'name email')
      .lean();

    return NextResponse.json({ hospitals });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});