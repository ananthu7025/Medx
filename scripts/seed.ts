import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { hashPassword } from '../src/lib/auth';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/medx';

// Define schemas inline for seed script
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  passwordHash: String,
  role: String,
  hospitalId: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now }
});

const HospitalSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  phone: String,
  website: String,
  createdByUserId: mongoose.Schema.Types.ObjectId,
  verified: Boolean,
  createdAt: { type: Date, default: Date.now }
});

const JobSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: String,
  location: String,
  salaryRange: String,
  hospitalId: mongoose.Schema.Types.ObjectId,
  createdByUserId: mongoose.Schema.Types.ObjectId,
  isActive: Boolean,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Hospital = mongoose.models.Hospital || mongoose.model('Hospital', HospitalSchema);
const Job = mongoose.models.Job || mongoose.model('Job', JobSchema);

async function seed() {
  try {
    console.log('🌱 Starting seed...');
    console.log('Connecting to MongoDB:', MONGODB_URI);

    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Hospital.deleteMany({});
    await Job.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create medxAdmin user
    const adminPassword = await hashPassword('Admin123!');
    const admin = await User.create({
      name: 'MedX Admin',
      email: 'admin@medx.test',
      passwordHash: adminPassword,
      role: 'medxAdmin'
    });
    console.log('✅ Created medxAdmin:', admin.email);

    // Create sample hospital user
    const hospitalPassword = await hashPassword('Hospital123!');
    const hospitalUser = await User.create({
      name: 'City General Admin',
      email: 'hospital1@medx.test',
      passwordHash: hospitalPassword,
      role: 'hospital'
    });
    console.log('✅ Created hospital user:', hospitalUser.email);

    // Create sample hospital
    const hospital = await Hospital.create({
      name: 'City General Hospital',
      email: 'hospital1@medx.test',
      address: '123 Medical Center Dr, New York, NY 10001',
      phone: '(555) 123-4567',
      website: 'https://citygeneralhospital.example.com',
      createdByUserId: hospitalUser._id,
      verified: true
    });
    console.log('✅ Created hospital:', hospital.name);

    // Update hospital user with hospitalId
    hospitalUser.hospitalId = hospital._id;
    await hospitalUser.save();

    // Create sample jobs
    const jobs = await Job.create([
      {
        title: 'Senior ICU Nurse',
        description: 'Seeking experienced ICU nurse for our critical care unit. 5+ years of ICU experience required. Must be certified in ACLS and PALS. Competitive salary and benefits package.\n\nResponsibilities:\n- Provide direct patient care in ICU setting\n- Monitor and assess patient conditions\n- Administer medications and treatments\n- Collaborate with multidisciplinary team',
        type: 'Full-time',
        location: 'New York, NY',
        salaryRange: '$75,000 - $95,000',
        hospitalId: hospital._id,
        createdByUserId: hospitalUser._id,
        isActive: true
      },
      {
        title: 'Physical Therapist',
        description: 'Join our rehabilitation team as a Physical Therapist. Work with patients recovering from injuries, surgeries, and chronic conditions. State license required.\n\nRequirements:\n- Doctor of Physical Therapy degree\n- State PT license\n- 2+ years experience preferred\n- Excellent communication skills',
        type: 'Full-time',
        location: 'New York, NY',
        salaryRange: '$70,000 - $85,000',
        hospitalId: hospital._id,
        createdByUserId: hospitalUser._id,
        isActive: true
      }
    ]);
    console.log(`✅ Created ${jobs.length} sample jobs`);

    console.log('\n🎉 Seed completed successfully!\n');
    console.log('=== Test Accounts ===');
    console.log('Admin:');
    console.log('  Email: admin@medx.test');
    console.log('  Password: Admin123!');
    console.log('\nHospital:');
    console.log('  Email: hospital1@medx.test');
    console.log('  Password: Hospital123!');
    console.log('====================\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

seed();