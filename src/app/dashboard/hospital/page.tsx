'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HospitalDashboard() {
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [showJobForm, setShowJobForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Full-time' as 'Full-time' | 'Part-time' | 'Contract',
    location: '',
    salaryRange: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch jobs
      const jobsRes = await fetch('/api/jobs');
      if (jobsRes.ok) {
        const jobsData = await jobsRes.json();
        setJobs(jobsData.jobs || []);
      }

      // Fetch applications
      const appsRes = await fetch('/api/applications');
      if (appsRes.ok) {
        const appsData = await appsRes.json();
        setApplications(appsData.applications || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setShowJobForm(false);
        setFormData({ title: '', description: '', type: 'Full-time', location: '', salaryRange: '' });
        fetchData();
      }
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const updateApplicationStatus = async (appId: string, status: string) => {
    try {
      await fetch(`/api/applications/${appId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchData();
    } catch (error) {
      console.error('Error updating application:', error);
    }
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
            <h1 className="text-2xl font-bold text-dark-charcoal">Hospital Dashboard</h1>
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
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-pure-white rounded-lg shadow-sm p-6">
            <h3 className="text-gray-600 text-sm font-medium">Total Jobs</h3>
            <p className="text-3xl font-bold text-dark-charcoal mt-2">{jobs.length}</p>
          </div>
          <div className="bg-pure-white rounded-lg shadow-sm p-6">
            <h3 className="text-gray-600 text-sm font-medium">Total Applications</h3>
            <p className="text-3xl font-bold text-dark-charcoal mt-2">{applications.length}</p>
          </div>
          <div className="bg-pure-white rounded-lg shadow-sm p-6">
            <h3 className="text-gray-600 text-sm font-medium">New Applications</h3>
            <p className="text-3xl font-bold text-dark-charcoal mt-2">
              {applications.filter(a => a.status === 'applied').length}
            </p>
          </div>
        </div>

        {/* Jobs Section */}
        <div className="bg-pure-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-dark-charcoal">Your Job Postings</h2>
            <button
              onClick={() => setShowJobForm(!showJobForm)}
              className="bg-accent-blue text-white px-4 py-2 rounded-lg hover:bg-accent-blue-hover transition"
            >
              {showJobForm ? 'Cancel' : '+ Add New Job'}
            </button>
          </div>

          {showJobForm && (
            <form onSubmit={handleCreateJob} className="mb-6 p-6 bg-light-grey rounded-lg space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-charcoal mb-2">Job Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-charcoal mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                  </select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-charcoal mb-2">Location</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-charcoal mb-2">Salary Range</label>
                  <input
                    type="text"
                    required
                    value={formData.salaryRange}
                    onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="$60,000 - $80,000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-charcoal mb-2">Description</label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="bg-accent-blue text-white px-6 py-2 rounded-lg hover:bg-accent-blue-hover transition"
              >
                Create Job
              </button>
            </form>
          )}

          <div className="space-y-4">
            {jobs.map(job => (
              <div key={job._id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <p className="text-gray-600 text-sm">{job.location} • {job.type}</p>
                    <p className="text-gray-700 mt-2">{job.description.substring(0, 100)}...</p>
                  </div>
                  <span className={`px-3 py-1 rounded text-sm ${job.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {job.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            ))}
            {jobs.length === 0 && <p className="text-gray-600">No jobs posted yet.</p>}
          </div>
        </div>

        {/* Applications Section */}
        <div className="bg-pure-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-dark-charcoal mb-6">Applications</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Applicant</th>
                  <th className="text-left py-3 px-4">Job</th>
                  <th className="text-left py-3 px-4">Contact</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(app => (
                  <tr key={app._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{app.applicantName}</td>
                    <td className="py-3 px-4">{app.jobId?.title || 'N/A'}</td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <div>{app.email}</div>
                        <div className="text-gray-600">{app.phone}</div>
                      </div>
                    </td>
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
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateApplicationStatus(app._id, 'shortlisted')}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Shortlist
                        </button>
                        <button
                          onClick={() => updateApplicationStatus(app._id, 'rejected')}
                          className="text-red-600 hover:underline text-sm"
                        >
                          Reject
                        </button>
                        <a
                          href={app.resumePath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent-blue hover:underline text-sm"
                        >
                          Resume
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {applications.length === 0 && (
              <p className="text-gray-600 text-center py-8">No applications yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}