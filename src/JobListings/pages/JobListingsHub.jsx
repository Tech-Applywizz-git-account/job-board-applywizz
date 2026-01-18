import { Link } from 'react-router-dom';
import { jobCategories } from '../data/jobsData';

const JobListingsHub = () => {
    return (
        <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
                        Browse Jobs by <span className="gradient-text">Category</span>
                    </h1>
                    <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
                        Find jobs from career portals, Easy Apply, contract roles, staffing agencies, and more — all in one place.
                    </p>
                </div>

                {/* Intro Summary */}
                <div className="bg-secondary-bg rounded-2xl p-8 mb-16">
                    <p className="text-lg text-text-secondary leading-relaxed text-center max-w-4xl mx-auto">
                        ApplyWizz collects jobs from <span className="font-semibold text-neon-green">5+ major sources</span> and
                        groups them into simple categories so you can easily choose how you prefer to apply. Whether you want
                        one-click Easy Apply jobs or direct career portal applications, we've organized everything for your convenience.
                    </p>
                </div>

                {/* Job Category Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                    {jobCategories.map((category) => (
                        <Link
                            key={category.id}
                            to={category.url}
                            className="bg-white rounded-xl p-8 hover:scale-105 transition-all duration-300 hover:border-bright-blue border-2 border-gray-200 shadow-md group"
                        >
                            {/* Icon */}
                            <div className="w-16 h-16 bg-bright-blue/10 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-glow-blue transition-all duration-300">
                                <span className="text-4xl">{category.icon}</span>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold mb-3 group-hover:text-bright-blue transition-colors">
                                {category.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                                {category.description}
                            </p>

                            {/* Job Count */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                <span className="text-neon-green font-bold text-lg">{category.jobCount} jobs</span>
                                <span className="text-bright-blue font-semibold text-sm group-hover:underline">
                                    Browse Jobs →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center bg-gradient-to-r from-bright-blue/10 via-neon-green/10 to-bright-blue/10 rounded-3xl p-12">
                    <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
                        Ready to Find Your <span className="gradient-text">Perfect Job?</span>
                    </h2>
                    <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
                        Start browsing thousands of opportunities matched to your profile
                    </p>
                    <button className="btn-primary text-lg px-10">
                        Start Browsing Jobs Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobListingsHub;
