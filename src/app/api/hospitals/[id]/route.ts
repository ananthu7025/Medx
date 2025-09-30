import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Hospital from '@/models/Hospital';

// GET /api/hospitals/[id] - public
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const hospital = await Hospital.findById(params.id).lean();

    if (!hospital) {
      return NextResponse.json({ error: 'Hospital not found' }, { status: 404 });
    }

    return NextResponse.json({ hospital });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}