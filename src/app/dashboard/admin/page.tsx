'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [hospitalsRes, jobsRes, appsRes] = await Promise.all([
        fetch('/api/hospitals'),
        fetch('/api/jobs'),
        fetch('/api/applications')
      ]);

      if (hospitalsRes.ok) {
        const data = await hospitalsRes.json();
        setHospitals(data.hospitals || []);
      }

      if (jobsRes.ok) {
        const data = await jobsRes.json();
        setJobs(data.jobs || []);
      }

      if (appsRes.ok) {
        const data = await appsRes.json();
        setApplications(data.applications || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-light-grey">
      {/* Header */}
      <nav className="bg-pure-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-dark-charcoal">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="text-dark-charcoal hover:text-accent-blue font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-pure-white rounded-lg shadow-sm p-6">
            <h3 className="text-gray-600 text-sm font-medium">Total Hospitals</h3>
            <p className="text-3xl font-bold text-dark-charcoal mt-2">{hospitals.length}</p>
          </div>
          <div className="bg-pure-white rounded-lg shadow-sm p-6">
            <h3 className="text-gray-600 text-sm font-medium">Total Jobs</h3>
            <p className="text-3xl font-bold text-dark-charcoal mt-2">{jobs.length}</p>
          </div>
          <div className="bg-pure-white rounded-lg shadow-sm p-6">
            <h3 className="text-gray-600 text-sm font-medium">Total Applications</h3>
            <p className="text-3xl font-bold text-dark-charcoal mt-2">{applications.length}</p>
          </div>
          <div className="bg-pure-white rounded-lg shadow-sm p-6">
            <h3 className="text-gray-600 text-sm font-medium">Active Jobs</h3>
            <p className="text-3xl font-bold text-dark-charcoal mt-2">
              {jobs.filter(j => j.isActive).length}
            </p>
          </div>
        </div>

        {/* Hospitals */}
        <div className="bg-pure-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-dark-charcoal mb-6">Hospitals</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Phone</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Registered</th>
                </tr>
              </thead>
              <tbody>
                {hospitals.map(hospital => (
                  <tr key={hospital._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{hospital.name}</td>
                    <td className="py-3 px-4">{hospital.email}</td>
                    <td className="py-3 px-4">{hospital.phone}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-sm ${
                        hospital.verified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {hospital.verified ? 'Verified' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(hospital.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Jobs */}
        <div className="bg-pure-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-dark-charcoal mb-6">All Jobs</h2>
          <div className="space-y-4">
            {jobs.slice(0, 10).map(job => (
              <div key={job._id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <p className="text-gray-600 text-sm">
                      {job.hospitalId?.name} • {job.location}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded text-sm ${
                    job.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {job.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-pure-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-dark-charcoal mb-6">Recent Applications</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Applicant</th>
                  <th className="text-left py-3 px-4">Job</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Applied</th>
                </tr>
              </thead>
              <tbody>
                {applications.slice(0, 10).map(app => (
                  <tr key={app._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{app.applicantName}</td>
                    <td className="py-3 px-4">{app.jobId?.title || 'N/A'}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-sm ${
                        app.status === 'hired' ? 'bg-green-100 text-green-700' :
                        app.status === 'shortlisted' ? 'bg-blue-100 text-blue-700' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}