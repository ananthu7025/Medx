import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JobCard from '@/components/JobCard';
import connectDB from '@/lib/mongodb';
import Job from '@/models/Job';

export default async function JobsPage() {
  await connectDB();

  const jobs = await Job.find({ isActive: true })
    .sort({ createdAt: -1 })
    .limit(20)
    .populate('hospitalId', 'name')
    .lean();

  const jobsWithHospital = jobs.map(job => ({
    ...job,
    _id: job._id.toString(),
    hospitalId: job.hospitalId.toString(),
    createdByUserId: job.createdByUserId.toString(),
    hospital: { name: (job.hospitalId as any).name }
  }));

  return (
    <>
      <Header />
      <section className="py-16 bg-light-grey min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-12 text-dark-charcoal">
            Browse Healthcare Jobs
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobsWithHospital.map(job => (
              <JobCard key={job._id} job={job as any} />
            ))}
          </div>
          {jobsWithHospital.length === 0 && (
            <p className="text-center text-gray-600 mt-8">No jobs available at the moment.</p>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}