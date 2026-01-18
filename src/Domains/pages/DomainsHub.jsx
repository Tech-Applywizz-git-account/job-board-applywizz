import { Link } from 'react-router-dom';
import { allDomains } from '../data/domainsData';

const DomainsHub = () => {
    return (
        <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
                        Explore Jobs by <span className="gradient-text">Domain</span>
                    </h1>
                    <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
                        Browse opportunities across 73+ domains. From software engineering to healthcare,
                        find jobs perfectly matched to your expertise.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-16">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search domains (e.g., Software Engineering, Marketing, Finance...)"
                            className="w-full px-6 py-4 border-2 border-gray-300 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-bright-blue focus:border-bright-blue"
                        />
                        <button className="absolute right-2 top-2 bg-bright-blue text-white px-8 py-2 rounded-full hover:shadow-glow-blue transition-all">
                            Search
                        </button>
                    </div>
                </div>

                {/* Domain Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {allDomains.map((domain) => (
                        <Link
                            key={domain.id}
                            to={`/jobs/${domain.slug}`}
                            className="bg-white rounded-xl p-6 hover:scale-105 transition-all duration-300 hover:border-bright-blue border-2 border-gray-200 shadow-md group"
                        >
                            {/* Icon */}
                            <div className="w-16 h-16 mb-4 flex items-center justify-center">
                                {domain.icon.startsWith('/') ? (
                                    <img
                                        src={domain.icon}
                                        alt={`${domain.name} icon`}
                                        className="w-14 h-14 object-contain"
                                    />
                                ) : (
                                    <span className="text-5xl">{domain.icon}</span>
                                )}
                            </div>

                            {/* Domain Name */}
                            <h3 className="text-xl font-bold mb-2 group-hover:text-bright-blue transition-colors">
                                {domain.name}
                            </h3>

                            {/* Job Count */}
                            <p className="text-neon-green font-bold text-lg mb-3">
                                {domain.totalJobs?.toLocaleString() || '500+'}+ jobs
                            </p>

                            {/* CTA */}
                            <p className="text-bright-blue font-semibold text-sm group-hover:underline">
                                Explore Jobs →
                            </p>
                        </Link>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-16 bg-gradient-to-r from-bright-blue/10 via-neon-green/10 to-bright-blue/10 rounded-3xl p-12 text-center">
                    <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
                        Can't Find Your Domain?
                    </h2>
                    <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
                        We're constantly adding new domains. Search all jobs or set up alerts to get notified when we add your specialty.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/jobs" className="btn-primary text-lg px-10">
                            Browse All Job Categories
                        </Link>
                        <button className="btn-secondary text-lg px-10">
                            Set Up Job Alerts
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DomainsHub;
