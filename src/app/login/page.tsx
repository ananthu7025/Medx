'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Redirect based on role
      if (data.user.role === 'medxAdmin') {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/hospital');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <section className="py-16 bg-light-grey min-h-screen flex items-center">
        <div className="max-w-md mx-auto px-4 w-full">
          <div className="bg-pure-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-dark-charcoal">Sign In</h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-dark-charcoal mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-charcoal mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                  placeholder="Your password"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent-blue text-white px-8 py-3 rounded-lg hover:bg-accent-blue-hover transition font-semibold disabled:opacity-50"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
                <p className="text-sm text-gray-600 mt-4">
                  Don't have an account?{' '}
                  <a href="/join" className="text-accent-blue hover:underline">
                    Register hospital
                  </a>
                </p>
              </div>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded text-sm">
              <p className="font-semibold mb-2">Test Accounts:</p>
              <p className="text-gray-700">Admin: admin@medx.test / Admin123!</p>
              <p className="text-gray-700">Hospital: hospital1@medx.test / Hospital123!</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}