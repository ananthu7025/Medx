import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TabsSection from '@/components/TabsSection';
import connectDB from '@/lib/mongodb';
import Job from '@/models/Job';
import Link from 'next/link';

export default async function HomePage() {
  await connectDB();

  // Fetch latest 3 jobs for homepage
  const jobs = await Job.find({ isActive: true })
    .sort({ createdAt: -1 })
    .limit(3)
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

      {/* Hero Section - from html.html lines 63-72 */}
      <section className="gradient-bg text-dark-charcoal py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Connect Healthcare Professionals with Opportunities</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-600">
            The premier platform for healthcare recruitment, professional portfolios, and career advancement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/jobs" className="bg-accent-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-blue-hover transition">
              Browse Jobs
            </Link>
            <Link href="/join" className="border-2 border-accent-blue text-accent-blue px-8 py-3 rounded-lg font-semibold hover:bg-accent-blue hover:text-white transition">
              Register Hospital
            </Link>
          </div>
        </div>
      </section>

      {/* Professional Categories - from html.html lines 75-113 */}
      <section className="py-16 bg-pure-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-dark-charcoal">Healthcare Professionals We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {[
              { emoji: '👨‍⚕️', label: 'Doctors' },
              { emoji: '👩‍⚕️', label: 'Nurses' },
              { emoji: '🧑‍⚕️', label: 'Caregivers' },
              { emoji: '💊', label: 'Pharmacists' },
              { emoji: '🏃‍♂️', label: 'Physiotherapists' },
              { emoji: '🔬', label: 'Lab Assistants' },
              { emoji: '🏥', label: 'Hospital Staff' },
              { emoji: '➕', label: 'More' }
            ].map((cat, idx) => (
              <div key={idx} className="text-center p-4 rounded-lg hover:bg-light-grey transition cursor-pointer">
                <div className="text-4xl mb-2">{cat.emoji}</div>
                <div className="font-semibold text-sm text-dark-charcoal">{cat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Tabs - from html.html lines 116-261 */}
      <TabsSection jobs={jobsWithHospital} />

      {/* Areas & Institutions We Serve - from html.html lines 314-419 */}
      <section className="py-16 bg-pure-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-dark-charcoal">
            Areas &amp; Institutions We Serve
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-light-grey rounded-lg shadow-sm p-6 hover:shadow-md transition">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pure-white rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🏥</span>
                </div>
                <h3 className="text-xl font-semibold text-dark-charcoal">Hospitals</h3>
              </div>
              <ul className="text-gray-600 space-y-2">
                <li>• General Hospitals</li>
                <li>• Specialty Hospitals</li>
                <li>• Teaching Hospitals</li>
                <li>• Children's Hospitals</li>
                <li>• Emergency Centers</li>
              </ul>
            </div>
            <div className="bg-light-grey rounded-lg shadow-sm p-6 hover:shadow-md transition">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pure-white rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🏢</span>
                </div>
                <h3 className="text-xl font-semibold text-dark-charcoal">Clinics</h3>
              </div>
              <ul className="text-gray-600 space-y-2">
                <li>• Primary Care Clinics</li>
                <li>• Urgent Care Centers</li>
                <li>• Specialty Clinics</li>
                <li>• Walk-in Clinics</li>
                <li>• Community Health Centers</li>
              </ul>
            </div>
            <div className="bg-light-grey rounded-lg shadow-sm p-6 hover:shadow-md transition">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pure-white rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🦷</span>
                </div>
                <h3 className="text-xl font-semibold text-dark-charcoal">Dental Clinics</h3>
              </div>
              <ul className="text-gray-600 space-y-2">
                <li>• General Dentistry</li>
                <li>• Orthodontic Practices</li>
                <li>• Oral Surgery Centers</li>
                <li>• Pediatric Dental Clinics</li>
                <li>• Cosmetic Dentistry</li>
              </ul>
            </div>
            <div className="bg-light-grey rounded-lg shadow-sm p-6 hover:shadow-md transition">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pure-white rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">💊</span>
                </div>
                <h3 className="text-xl font-semibold text-dark-charcoal">Pharmacies</h3>
              </div>
              <ul className="text-gray-600 space-y-2">
                <li>• Retail Pharmacies</li>
                <li>• Hospital Pharmacies</li>
                <li>• Clinical Pharmacies</li>
                <li>• Specialty Pharmacies</li>
                <li>• Compounding Pharmacies</li>
              </ul>
            </div>
            <div className="bg-light-grey rounded-lg shadow-sm p-6 hover:shadow-md transition">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pure-white rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🏃‍♂️</span>
                </div>
                <h3 className="text-xl font-semibold text-dark-charcoal">Rehabilitation Centers</h3>
              </div>
              <ul className="text-gray-600 space-y-2">
                <li>• Physical Therapy Centers</li>
                <li>• Occupational Therapy</li>
                <li>• Speech Therapy Clinics</li>
                <li>• Sports Medicine Centers</li>
                <li>• Addiction Recovery Centers</li>
              </ul>
            </div>
            <div className="bg-light-grey rounded-lg shadow-sm p-6 hover:shadow-md transition">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pure-white rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🧪</span>
                </div>
                <h3 className="text-xl font-semibold text-dark-charcoal">Pharmaceutical Industry</h3>
              </div>
              <ul className="text-gray-600 space-y-2">
                <li>• Drug Manufacturing</li>
                <li>• Research &amp; Development</li>
                <li>• Clinical Research Organizations</li>
                <li>• Regulatory Affairs</li>
                <li>• Medical Device Companies</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 mb-6">
              And many more healthcare institutions across the country
            </p>
            <button className="bg-accent-blue text-white px-8 py-3 rounded-lg hover:bg-accent-blue-hover transition font-semibold">
              Explore All Opportunities
            </button>
          </div>
        </div>
      </section>

      {/* Features - from html.html lines 422-449 */}
      <section className="py-16 bg-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-dark-charcoal">Why Choose MedX?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-light-grey rounded-full mx-auto mb-4 flex items-center justify-center shadow-sm">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-dark-charcoal">Specialized Matching</h3>
              <p className="text-gray-600">Connect healthcare professionals with the right opportunities.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-light-grey rounded-full mx-auto mb-4 flex items-center justify-center shadow-sm">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-dark-charcoal">Verified Hospitals</h3>
              <p className="text-gray-600">All hospitals undergo verification to ensure quality.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-light-grey rounded-full mx-auto mb-4 flex items-center justify-center shadow-sm">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-dark-charcoal">Career Growth</h3>
              <p className="text-gray-600">Access career opportunities across all specialties.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}