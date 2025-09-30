// Example job card converted from html.html markup (lines 130-145)
import Link from 'next/link';
import { IJob } from '@/types';

interface JobCardProps {
  job: IJob & { hospital?: { name: string } };
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-pure-white rounded-lg shadow-sm p-6 card-hover">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-light-grey rounded-lg flex items-center justify-center mr-4">
          <span className="text-2xl">🏥</span>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-dark-charcoal">{job.title}</h3>
          <p className="text-gray-600">{job.hospital?.name || 'Hospital'}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-dark-charcoal font-semibold">{job.salaryRange}</span>
        <Link
          href={`/jobs/${job._id}`}
          className="bg-accent-blue text-white px-4 py-2 rounded-lg hover:bg-accent-blue-hover transition"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
}