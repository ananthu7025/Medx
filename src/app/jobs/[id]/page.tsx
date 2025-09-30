'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useParams } from 'next/navigation';

export default function JobDetailPage() {
  const params = useParams();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    phone: '',
    coverLetter: ''
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const res = await fetch(`/api/jobs/${params.id}`);
      const data = await res.json();
      setJob(data.job);
    } catch (error) {
      console.error('Error fetching job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApplying(true);
    setMessage('');

    try {
      // Upload resume first
      if (!resumeFile) {
        throw new Error('Please select a resume file');
      }

      const uploadForm = new FormData();
      uploadForm.append('file', resumeFile);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: uploadForm
      });

      if (!uploadRes.ok) {
        throw new Error('Resume upload failed');
      }

      const { path } = await uploadRes.json();

      // Submit application
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: params.id,
          ...formData,
          resumePath: path
        })
      });

      if (!res.ok) {
        throw new Error('Application submission failed');
      }

      setMessage('Application submitted successfully!');
      setShowForm(false);
      setFormData({ applicantName: '', email: '', phone: '', coverLetter: '' });
      setResumeFile(null);
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!job) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p>Job not found</p>
        </div>
        <Footer />
      </>
    );
  }

  const hospital = job.hospitalId;

  return (
    <>
      <Header />
      <section className="py-16 bg-light-grey min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-pure-white rounded-lg shadow-sm p-8 mb-6">
            <div className="flex items-start mb-6">
              <div className="w-16 h-16 bg-light-grey rounded-lg flex items-center justify-center mr-4">
                <span className="text-3xl">🏥</span>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-dark-charcoal mb-2">{job.title}</h1>
                <p className="text-xl text-gray-600">{hospital.name}</p>
                <div className="flex gap-4 mt-3 text-sm text-gray-600">
                  <span>📍 {job.location}</span>
                  <span>💼 {job.type}</span>
                  <span>💰 {job.salaryRange}</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-3">Job Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
            </div>

            <div className="border-t pt-6 mt-6">
              <h2 className="text-xl font-semibold mb-3">Hospital Information</h2>
              <p className="text-gray-700">📍 {hospital.address}</p>
              <p className="text-gray-700">📞 {hospital.phone}</p>
              {hospital.website && (
                <p className="text-gray-700">
                  🌐 <a href={hospital.website} target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline">
                    {hospital.website}
                  </a>
                </p>
              )}
            </div>

            {message && (
              <div className={`mt-6 p-4 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message}
              </div>
            )}

            {!showForm && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-accent-blue text-white px-8 py-3 rounded-lg hover:bg-accent-blue-hover transition font-semibold"
                >
                  Apply for this Position
                </button>
              </div>
            )}
          </div>

          {showForm && (
            <div className="bg-pure-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6 text-dark-charcoal">Application Form</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-charcoal mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.applicantName}
                      onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                      className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-charcoal mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-charcoal mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-charcoal mb-2">
                    Resume (PDF or DOC, max 5MB)
                  </label>
                  <input
                    type="file"
                    required
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-charcoal mb-2">
                    Cover Letter (Optional)
                  </label>
                  <textarea
                    rows={5}
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                    placeholder="Tell us why you're a great fit..."
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={applying}
                    className="flex-1 bg-accent-blue text-white px-8 py-3 rounded-lg hover:bg-accent-blue-hover transition font-semibold disabled:opacity-50"
                  >
                    {applying ? 'Submitting...' : 'Submit Application'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}