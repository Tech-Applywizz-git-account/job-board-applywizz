const VisionValues = () => {
    const values = [
        {
            icon: '🔐',
            title: 'Trust & Transparency',
            description: 'We believe in honest job matching with no hidden algorithms or paid promotions affecting your results.',
        },
        {
            icon: '⚖️',
            title: 'Fair Access to Opportunities',
            description: 'Every job seeker deserves access to relevant opportunities, regardless of background or network.',
        },
        {
            icon: '🎨',
            title: 'User-First Design',
            description: 'We build features that solve real problems for job seekers, not just what looks good on paper.',
        },
        {
            icon: '🚀',
            title: 'Continuous Innovation',
            description: 'We are constantly improving our matching algorithm and adding new job sources to serve you better.',
        },
    ];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Vision */}
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <h2 className="text-4xl sm:text-5xl font-display font-bold mb-8">
                        Our Vision
                    </h2>
                    <p className="text-xl text-text-secondary leading-relaxed">
                        We envision a world where finding the right job is effortless. Where technology works
                        for job seekers, not against them. Where every professional has access to opportunities
                        that truly match their skills and aspirations.
                    </p>
                    <p className="text-xl text-text-secondary leading-relaxed mt-6">
                        ApplyWizz is building the world's most relevant job-matching platform — one opportunity at a time.
                    </p>
                </div>

                {/* Values */}
                <div>
                    <h2 className="text-4xl sm:text-5xl font-display font-bold text-center mb-16">
                        Our Values
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-8 shadow-md border border-gray-200 hover:border-bright-blue transition-all duration-300"
                            >
                                <div className="w-16 h-16 bg-bright-blue/10 rounded-xl flex items-center justify-center mb-6 text-4xl">
                                    {value.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                                <p className="text-text-secondary leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VisionValues;