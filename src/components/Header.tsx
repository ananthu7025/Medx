import Link from 'next/link';

export default function Header() {
  return (
    <nav className="bg-pure-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-3xl font-bold text-dark-charcoal">
              MedX
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="/#talent" className="text-dark-charcoal hover:text-accent-blue font-medium">
              Find Talent
            </Link>
            <Link href="/jobs" className="text-dark-charcoal hover:text-accent-blue font-medium">
              Browse Jobs
            </Link>
            <Link href="/#professionals" className="text-dark-charcoal hover:text-accent-blue font-medium">
              Professionals
            </Link>
            <Link href="/#about" className="text-dark-charcoal hover:text-accent-blue font-medium">
              About
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link href="/login" className="text-dark-charcoal hover:text-accent-blue px-4 py-2 font-medium transition">
              Sign In
            </Link>
            <Link href="/join" className="bg-accent-blue text-white px-4 py-2 rounded-lg hover:bg-accent-blue-hover transition">
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}