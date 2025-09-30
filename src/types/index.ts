import { Types } from 'mongoose';

export type UserRole = 'medxAdmin' | 'hospital';
export type JobType = 'Full-time' | 'Part-time' | 'Contract';
export type ApplicationStatus = 'applied' | 'shortlisted' | 'rejected' | 'hired';

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  hospitalId?: Types.ObjectId;
  createdAt: Date;
}

export interface IHospital {
  _id: Types.ObjectId;
  name: string;
  email: string;
  address: string;
  phone: string;
  website?: string;
  createdByUserId: Types.ObjectId;
  verified: boolean;
  createdAt: Date;
}

export interface IJob {
  _id: Types.ObjectId;
  title: string;
  description: string;
  type: JobType;
  location: string;
  salaryRange: string;
  hospitalId: Types.ObjectId;
  createdByUserId: Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
}

export interface IApplication {
  _id: Types.ObjectId;
  jobId: Types.ObjectId;
  applicantName: string;
  email: string;
  phone: string;
  resumePath: string;
  coverLetter?: string;
  appliedAt: Date;
  status: ApplicationStatus;
}

export interface AuthUser {
  userId: string;
  email: string;
  role: UserRole;
  hospitalId?: string;
}