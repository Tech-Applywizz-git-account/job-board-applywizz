import { useState } from 'react';

const FilterBar = () => {
    const [filters, setFilters] = useState({
        location: '',
        domain: '',
        experience: '',
        remote: '',
        last24h: false,
        sortBy: 'relevance',
    });

    return (
        <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {/* Location Filter */}
                    <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1">
                            Location
                        </label>
                        <select
                            value={filters.location}
                            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bright-blue"
                        >
                            <option value="">All Locations</option>
                            <option value="remote">Remote</option>
                            <option value="ca">California</option>
                            <option value="ny">New York</option>
                            <option value="tx">Texas</option>
                            <option value="wa">Washington</option>
                        </select>
                    </div>

                    {/* Domain Filter */}
                    <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1">
                            Domain / Industry
                        </label>
                        <select
                            value={filters.domain}
                            onChange={(e) => setFilters({ ...filters, domain: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bright-blue"
                        >
                            <option value="">All Domains</option>
                            <option value="software">Software Engineering</option>
                            <option value="data">Data Science</option>
                            <option value="product">Product Management</option>
                            <option value="design">UX/UI Design</option>
                            <option value="devops">DevOps</option>
                        </select>
                    </div>

                    {/* Experience Filter */}
                    <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1">
                            Experience Level
                        </label>
                        <select
                            value={filters.experience}
                            onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bright-blue"
                        >
                            <option value="">All Levels</option>
                            <option value="entry">Entry Level</option>
                            <option value="mid">Mid-Level</option>
                            <option value="senior">Senior</option>
                            <option value="lead">Lead / Principal</option>
                        </select>
                    </div>

                    {/* Remote Filter */}
                    <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1">
                            Work Type
                        </label>
                        <select
                            value={filters.remote}
                            onChange={(e) => setFilters({ ...filters, remote: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bright-blue"
                        >
                            <option value="">All Types</option>
                            <option value="remote">Remote</option>
                            <option value="hybrid">Hybrid</option>
                            <option value="onsite">On-site</option>
                        </select>
                    </div>

                    {/* Sort By */}
                    <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1">
                            Sort By
                        </label>
                        <select
                            value={filters.sortBy}
                            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bright-blue"
                        >
                            <option value="relevance">Relevance</option>
                            <option value="date">Most Recent</option>
                            <option value="salary">Highest Salary</option>
                        </select>
                    </div>

                    {/* Last 24 Hours Toggle */}
                    <div className="flex items-end">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters.last24h}
                                onChange={(e) => setFilters({ ...filters, last24h: e.target.checked })}
                                className="w-4 h-4 text-bright-blue border-gray-300 rounded focus:ring-bright-blue"
                            />
                            <span className="text-sm font-medium text-text-secondary">Last 24 Hours</span>
                        </label>
                    </div>
                </div>

                {/* Active Filters Count */}
                <div className="mt-3 flex items-center justify-between">
                    <p className="text-sm text-text-muted">
                        Showing <span className="font-semibold text-text-primary">1,247</span> jobs
                    </p>
                    <button className="text-sm text-bright-blue hover:underline font-medium">
                        Clear All Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
