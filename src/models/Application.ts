import mongoose, { Schema, Model } from 'mongoose';
import { IApplication } from '@/types';

const ApplicationSchema = new Schema<IApplication>({
  jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  applicantName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  resumePath: { type: String, required: true },
  coverLetter: { type: String },
  appliedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['applied', 'shortlisted', 'rejected', 'hired'], default: 'applied' }
});

const Application: Model<IApplication> = mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema);

export default Application;