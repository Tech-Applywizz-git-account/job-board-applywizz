const HowItWorks = () => {
    const steps = [
        {
            number: '1',
            title: 'Upload Resume',
            description: 'We parse skills & experience',
            icon: '📄',
        },
        {
            number: '2',
            title: 'Create Profile',
            description: 'Select preferences',
            icon: '⚙️',
        },
        {
            number: '3',
            title: 'Get Matched Jobs',
            description: 'Ranked by relevance score',
            icon: '✨',
        },
    ];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl sm:text-5xl font-display font-bold text-center mb-16">
                    How It Works
                </h2>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            <div className="bg-white rounded-2xl p-8 shadow-md border-2 border-gray-200 hover:border-bright-blue transition-all duration-300 text-center">
                                <div className="w-16 h-16 bg-bright-blue rounded-full flex items-center justify-center text-3xl font-bold text-white mx-auto mb-6">
                                    {step.number}
                                </div>
                                <div className="text-5xl mb-4">{step.icon}</div>
                                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                                <p className="text-text-secondary">{step.description}</p>
                            </div>

                            {/* Arrow for desktop */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                    <div className="text-bright-blue text-4xl">→</div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <button className="btn-primary text-lg px-10">
                        Get Started Free
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
