import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold text-white mb-4">MedX</div>
            <p className="text-gray-400">Connecting healthcare professionals with opportunities nationwide.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Hospitals</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/join" className="hover:text-white">Register Hospital</Link></li>
              <li><Link href="/login" className="hover:text-white">Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Candidates</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/jobs" className="hover:text-white">Browse Jobs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#" className="hover:text-white">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 MedX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}