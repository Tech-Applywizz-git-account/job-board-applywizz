import { featuredJobs } from '../data/mockData';
import { useState, useEffect } from 'react';

const FeaturedJobs = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showPrompts, setShowPrompts] = useState(false);
    const [placeholderText, setPlaceholderText] = useState('Software Engineer');

    // Quick search data
    const quickSearches = [
        { icon: '📊', text: 'Data analyst jobs posted today' },
        { icon: '💻', text: 'Software engineer jobs in the US' },
        { icon: '🌐', text: 'Business Analyst Jobs' },
        { icon: '🎓', text: 'Entry-level jobs (0-2 years)' },
        { icon: '📦', text: 'Jobs at Amazon' },
        { icon: '⚡', text: 'Product Manager jobs with H1B' },
    ];

    // Animated placeholder effect
    useEffect(() => {
        const placeholders = [
            'Software Engineer',
            'Data Analyst jobs',
            'Product Manager at Google',
            'Remote Developer',
        ];
        let index = 0;

        const interval = setInterval(() => {
            index = (index + 1) % placeholders.length;
            setPlaceholderText(placeholders[index]);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Fill search when pill clicked
    const fillSearch = (text) => {
        setSearchQuery(text);
        setShowPrompts(false);
    };

    // Handle search
    const handleSearch = () => {
        if (searchQuery.trim()) {
            console.log('Searching for:', searchQuery);
            alert(`Searching for: ${searchQuery}`);
        }
    };

    const filters = [
        { id: 'all', label: 'All Jobs' },
        { id: 'easy-apply', label: 'Easy Apply' },
        { id: 'remote', label: 'Remote' },
        { id: 'last-24h', label: 'Last 24 Hours' },
    ];

    // Filter jobs based on selected tab
    const getFilteredJobs = () => {
        switch (selectedFilter) {
            case 'easy-apply':
                return featuredJobs.filter(job => job.isEasyApply);
            case 'remote':
                return featuredJobs.filter(job => job.isRemote);
            case 'last-24h':
                return featuredJobs.filter(job => job.postedHoursAgo <= 24);
            case 'all':
            default:
                return featuredJobs;
        }
    };

    const filteredJobs = getFilteredJobs();

    return (
        <section id="featured-jobs" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary-bg">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl sm:text-5xl font-display font-bold text-center mb-4">
                    Browse Jobs from Top Companies
                </h2>
                <p className="text-xl text-text-secondary text-center mb-12 max-w-2xl mx-auto">
                    Explore opportunities from industry-leading organizations
                </p>

                {/* Search Bar Section */}
                <div className="max-w-4xl mx-auto mb-16">
                    {/* Search Input */}
                    <div className="relative mb-4">
                        <div className="relative flex items-center rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 transition-all duration-300 focus-within:border-neon-green focus-within:shadow-lg shadow-md">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && searchQuery.trim()) {
                                        handleSearch();
                                    }
                                }}
                                placeholder={placeholderText}
                                className="flex-1 text-lg outline-none bg-transparent placeholder:text-gray-400"
                            />
                            <button
                                onClick={handleSearch}
                                className="ml-4 bg-neon-green text-white p-3 sm:p-4 rounded-xl hover:bg-neon-green/90 transition-all duration-300 hover:scale-110 shadow-lg flex items-center justify-center"
                                aria-label="Search jobs"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                            </button>
                        </div>

                        {/* Browse Prompts Button */}
                        <button
                            onClick={() => setShowPrompts(!showPrompts)}
                            className="absolute right-20 sm:right-24 top-1/2 -translate-y-1/2 text-sm text-text-secondary hover:text-neon-green transition-colors flex items-center gap-1"
                        >
                            <span className="text-lg">💡</span>
                            <span className="hidden sm:inline">Browse prompts</span>
                        </button>

                        {/* Prompts Dropdown */}
                        {showPrompts && (
                            <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-20">
                                <h3 className="text-sm font-bold text-text-primary mb-3">Popular Searches</h3>
                                <div className="space-y-2">
                                    {quickSearches.map((search, index) => (
                                        <button
                                            key={index}
                                            onClick={() => fillSearch(search.text)}
                                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-sm text-text-secondary hover:text-neon-green transition-colors flex items-center gap-2"
                                        >
                                            <span>{search.icon}</span>
                                            <span>{search.text}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <p className="text-sm text-text-secondary mb-6">No signup needed to search</p>

                    {/* Quick Search Pills */}
                    <div className="flex flex-wrap gap-3 justify-center">
                        {quickSearches.map((search, index) => (
                            <button
                                key={index}
                                onClick={() => fillSearch(search.text)}
                                className="px-4 py-2 bg-white border-2 border-gray-200 rounded-full text-sm font-medium text-text-secondary hover:border-neon-green hover:text-neon-green hover:shadow-md transition-all duration-300 flex items-center gap-2 hover:scale-105"
                            >
                                <span>{search.icon}</span>
                                <span>{search.text}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => setSelectedFilter(filter.id)}
                            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${selectedFilter === filter.id
                                ? 'bg-bright-blue text-white shadow-glow-blue'
                                : 'bg-white text-text-secondary hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredJobs.map((job) => (
                        <div
                            key={job.id}
                            className="bg-white rounded-xl p-6 hover:scale-105 transition-all duration-300 hover:border-neon-green border-2 border-gray-200 group shadow-md"
                        >
                            {/* Company Logo */}
                            <div className="w-16 h-16 bg-secondary-bg rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                                {job.logo.startsWith('/') ? (
                                    <img
                                        src={job.logo}
                                        alt={`${job.company} logo`}
                                        className="w-12 h-12 object-contain"
                                    />
                                ) : (
                                    <span className="text-4xl">{job.logo}</span>
                                )}
                            </div>

                            {/* Job Title */}
                            <h3 className="text-lg font-bold mb-2 group-hover:text-neon-green transition-colors">
                                {job.title}
                            </h3>

                            {/* Company */}
                            <p className="text-text-secondary mb-2">{job.company}</p>

                            {/* Location */}
                            <p className="text-sm text-text-muted mb-4 flex items-center">
                                <span className="mr-2">📍</span>
                                {job.location}
                            </p>

                            {/* Match Score or Login Prompt */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                {job.matchScore !== null ? (
                                    <div className="bg-neon-green/20 text-neon-green px-3 py-1 rounded-full text-sm font-bold shadow-glow-green">
                                        {job.matchScore}% Match
                                    </div>
                                ) : (
                                    <p className="text-sm text-text-muted italic">
                                        Login to see match
                                    </p>
                                )}

                                {/* Category Tag */}
                                <span className="bg-bright-blue/10 text-bright-blue px-3 py-1 rounded-full text-xs font-semibold">
                                    {job.category}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View More CTA */}
                <div className="text-center mt-12">
                    <button className="btn-secondary text-lg" aria-label="View all jobs">
                        View All Jobs →
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedJobs;
