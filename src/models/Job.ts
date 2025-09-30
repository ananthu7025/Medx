import mongoose, { Schema, Model } from 'mongoose';
import { IJob } from '@/types';

const JobSchema = new Schema<IJob>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['Full-time', 'Part-time', 'Contract'], required: true },
  location: { type: String, required: true },
  salaryRange: { type: String, required: true },
  hospitalId: { type: Schema.Types.ObjectId, ref: 'Hospital', required: true },
  createdByUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Job: Model<IJob> = mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);

export default Job;