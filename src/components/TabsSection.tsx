'use client';

import { useState } from 'react';
import JobCard from './JobCard';
import Link from 'next/link';

interface TabsSectionProps {
  jobs: any[];
}

export default function TabsSection({ jobs }: TabsSectionProps) {
  const [activeTab, setActiveTab] = useState<'jobs' | 'profiles'>('jobs');

  return (
    <section className="py-16 bg-light-grey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-pure-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-6 py-3 rounded-md font-semibold transition ${
                activeTab === 'jobs'
                  ? 'bg-accent-blue text-white'
                  : 'text-dark-charcoal hover:text-accent-blue'
              }`}
            >
              Browse Jobs
            </button>
            <button
              onClick={() => setActiveTab('profiles')}
              className={`px-6 py-3 rounded-md font-semibold transition ${
                activeTab === 'profiles'
                  ? 'bg-accent-blue text-white'
                  : 'text-dark-charcoal hover:text-accent-blue'
              }`}
            >
              Professional Profiles
            </button>
          </div>
        </div>

        {/* Jobs Content */}
        {activeTab === 'jobs' && (
          <div className="tab-content">
            {jobs.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {jobs.map(job => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Link href="/jobs" className="bg-accent-blue text-white px-8 py-3 rounded-lg hover:bg-accent-blue-hover transition font-semibold">
                    View All Jobs
                  </Link>
                </div>
              </>
            ) : (
              <div className="bg-pure-white rounded-lg shadow-sm p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-light-grey rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-5xl">💼</span>
                  </div>
                  <h3 className="text-2xl font-bold text-dark-charcoal mb-3">No Jobs Available</h3>
                  <p className="text-gray-600 mb-6">
                    There are currently no job postings available. Check back soon for new opportunities!
                  </p>
                  <Link
                    href="/join"
                    className="inline-block bg-accent-blue text-white px-6 py-3 rounded-lg hover:bg-accent-blue-hover transition font-semibold"
                  >
                    Register Your Hospital
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Profiles Content */}
        {activeTab === 'profiles' && (
          <div className="tab-content">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample Professional Profile 1 */}
              <div className="professional-card rounded-lg shadow-sm p-6 card-hover">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">DR</div>
                  <h3 className="font-semibold text-lg text-dark-charcoal">Dr. Sarah Johnson</h3>
                  <p className="text-gray-600">Cardiologist</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <span className="text-gray-500 w-24">Experience:</span>
                    <span className="text-dark-charcoal">12 years</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 w-24">Location:</span>
                    <span className="text-dark-charcoal">New York, NY</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 w-24">Specialty:</span>
                    <span className="text-dark-charcoal">Interventional Cardiology</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-accent-blue text-white py-2 rounded-lg hover:bg-accent-blue-hover transition">View Profile</button>
              </div>

              {/* Sample Professional Profile 2 */}
              <div className="professional-card rounded-lg shadow-sm p-6 card-hover">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">MR</div>
                  <h3 className="font-semibold text-lg text-dark-charcoal">Maria Rodriguez, RN</h3>
                  <p className="text-gray-600">Registered Nurse</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <span className="text-gray-500 w-24">Experience:</span>
                    <span className="text-dark-charcoal">8 years</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 w-24">Location:</span>
                    <span className="text-dark-charcoal">Los Angeles, CA</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 w-24">Specialty:</span>
                    <span className="text-dark-charcoal">Emergency Medicine</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-accent-blue text-white py-2 rounded-lg hover:bg-accent-blue-hover transition">View Profile</button>
              </div>

              {/* Sample Professional Profile 3 */}
              <div className="professional-card rounded-lg shadow-sm p-6 card-hover">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-accent-blue rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">JC</div>
                  <h3 className="font-semibold text-lg text-dark-charcoal">James Chen, PT</h3>
                  <p className="text-gray-600">Physical Therapist</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <span className="text-gray-500 w-24">Experience:</span>
                    <span className="text-dark-charcoal">6 years</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 w-24">Location:</span>
                    <span className="text-dark-charcoal">Chicago, IL</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 w-24">Specialty:</span>
                    <span className="text-dark-charcoal">Sports Rehabilitation</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-accent-blue text-white py-2 rounded-lg hover:bg-accent-blue-hover transition">View Profile</button>
              </div>
            </div>
            <div className="text-center mt-8">
              <button className="bg-accent-blue text-white px-8 py-3 rounded-lg hover:bg-accent-blue-hover transition font-semibold">Browse All Professionals</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}