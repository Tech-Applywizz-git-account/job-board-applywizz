const WhyDifferent = () => {
    const benefits = [
        {
            icon: '🧠',
            title: 'Resume-Based Matching',
            description: 'Jobs ranked by relevance to your profile',
        },
        {
            icon: '⏰',
            title: 'Fresh Jobs Only',
            description: 'Posted within the last 24 hours',
        },
        {
            icon: '📚',
            title: 'Multiple Sources — One Platform',
            description: 'LinkedIn Easy Apply, Indeed, Staffing, Careers',
        },
        {
            icon: '🎯',
            title: 'Jobs Across 73+ Domains',
            description: 'From Software & Data to Finance & Marketing',
        },
    ];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary-bg">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl sm:text-5xl font-display font-bold text-center mb-4">
                    Why <span className="text-neon-green">ApplyWizz</span> is Different
                </h2>
                <p className="text-xl text-text-secondary text-center mb-16 max-w-3xl mx-auto">
                    We're not just another job board. We're your intelligent job-matching assistant.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-xl shadow-md group border border-gray-100"
                        >
                            <div className="w-16 h-16 bg-neon-green/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-neon-green/20 group-hover:shadow-glow-green transition-all duration-300">
                                <span className="text-4xl">{benefit.icon}</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 group-hover:text-neon-green transition-colors duration-300">
                                {benefit.title}
                            </h3>
                            <p className="text-text-secondary leading-relaxed text-lg">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyDifferent;
