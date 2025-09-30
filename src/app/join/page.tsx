'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';

export default function JoinPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    hospitalName: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    website: '',
    contactPersonName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      alert('Registration successful! Please login.');
      router.push('/login');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <section className="py-16 bg-light-grey min-h-screen">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-pure-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-dark-charcoal">
              Register Your Hospital
            </h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-dark-charcoal mb-2">
                  Hospital Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.hospitalName}
                  onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                  placeholder="e.g. City General Hospital"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-charcoal mb-2">
                  Contact Person Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.contactPersonName}
                  onChange={(e) => setFormData({ ...formData, contactPersonName: e.target.value })}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-dark-charcoal mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                    placeholder="hospital@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-charcoal mb-2">Password</label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                    placeholder="Min 8 characters"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-charcoal mb-2">Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                  placeholder="Full hospital address"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-dark-charcoal mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-charcoal mb-2">
                    Website (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                    placeholder="https://hospital.com"
                  />
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-accent-blue text-white px-8 py-3 rounded-lg hover:bg-accent-blue-hover transition font-semibold disabled:opacity-50"
                >
                  {loading ? 'Registering...' : 'Register Hospital'}
                </button>
                <p className="text-sm text-gray-600 mt-4">
                  Already have an account?{' '}
                  <a href="/login" className="text-accent-blue hover:underline">
                    Sign in
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}