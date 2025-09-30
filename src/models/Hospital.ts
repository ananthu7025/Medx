import mongoose, { Schema, Model } from 'mongoose';
import { IHospital } from '@/types';

const HospitalSchema = new Schema<IHospital>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  website: { type: String },
  createdByUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Hospital: Model<IHospital> = mongoose.models.Hospital || mongoose.model<IHospital>('Hospital', HospitalSchema);

export default Hospital;