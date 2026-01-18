const DomainIntro = ({ domain }) => {
    return (
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-md border border-gray-200">
                <h2 className="text-3xl font-bold mb-4">
                    Find Your Next Role in {domain.name}
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                    {domain.description}
                </p>
                <p className="text-text-secondary leading-relaxed mb-4">
                    <strong className="text-bright-blue">Market Trend:</strong> {domain.growthTrend}
                </p>
                <p className="text-text-secondary leading-relaxed">
                    <strong className="text-neon-green">Why ApplyWizz?</strong> {domain.whyApplyWizz}
                </p>
            </div>

            {/* Quick Stats */}
            <div className="bg-secondary-bg rounded-2xl p-6 shadow-md">
                <h3 className="text-lg font-bold mb-6">At a Glance</h3>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-text-muted mb-1">Total Jobs</p>
                        <p className="text-3xl font-bold text-neon-green">{domain.totalJobs.toLocaleString()}+</p>
                    </div>
                    <div>
                        <p className="text-sm text-text-muted mb-1">Remote Jobs</p>
                        <p className="text-2xl font-bold text-bright-blue">{domain.workTypes.remote.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-sm text-text-muted mb-1">Companies Hiring</p>
                        <p className="text-2xl font-bold">500+</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DomainIntro;
