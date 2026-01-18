import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
    return (
        <div className="bg-white rounded-xl p-6 hover:scale-105 transition-all duration-300 hover:border-neon-green border-2 border-gray-200 shadow-md group">
            {/* Company Logo */}
            <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-secondary-bg rounded-xl flex items-center justify-center text-3xl">
                    {job.logo}
                </div>
                {job.matchScore !== null ? (
                    <div className="bg-neon-green/20 text-neon-green px-3 py-1 rounded-full text-xs font-bold shadow-glow-green">
                        {job.matchScore}% Match
                    </div>
                ) : (
                    <span className="text-xs text-text-muted italic">Login to see match</span>
                )}
            </div>

            {/* Job Title */}
            <h3 className="text-lg font-bold mb-2 group-hover:text-neon-green transition-colors">
                {job.title}
            </h3>

            {/* Company */}
            <p className="text-text-secondary font-semibold mb-1">{job.company}</p>

            {/* Location */}
            <p className="text-sm text-text-muted mb-1 flex items-center">
                <span className="mr-2">📍</span>
                {job.location}
            </p>

            {/* Salary */}
            <p className="text-sm text-text-secondary mb-3 flex items-center">
                <span className="mr-2">💰</span>
                {job.salary}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-bright-blue/10 text-bright-blue px-3 py-1 rounded-full text-xs font-semibold">
                    {job.category}
                </span>
                <span className="bg-gray-100 text-text-secondary px-3 py-1 rounded-full text-xs font-semibold">
                    {job.remote}
                </span>
                <span className="bg-gray-100 text-text-secondary px-3 py-1 rounded-full text-xs font-semibold">
                    {job.experience}
                </span>
            </div>

            {/* Posted Date & CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-xs text-text-muted">{job.postedDate}</span>
                <Link
                    to={`/job/${job.id}`}
                    className="bg-bright-blue text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-glow-blue transition-all duration-300"
                >
                    View Job
                </Link>
            </div>
        </div>
    );
};

export default JobCard;
