const ProblemSolution = () => {
    const problems = [
        { icon: '❌', text: 'Too many irrelevant jobs' },
        { icon: '❌', text: 'Same posting on 10 platforms' },
        { icon: '❌', text: 'Manual searching and filtering' },
        { icon: '❌', text: 'Outdated or expired listings' },
    ];

    const solutions = [
        { icon: '✅', text: 'Resume-based job matching', highlight: true },
        { icon: '✅', text: 'Jobs from 5+ sources', highlight: true },
        { icon: '✅', text: 'Updated hourly', highlight: true },
        { icon: '✅', text: 'Meaningful match scoring', highlight: true },
    ];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl sm:text-5xl font-display font-bold text-center mb-16">
                    The Problem with Traditional Job Searching
                </h2>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Problems */}
                    <div className="bg-red-50 rounded-2xl p-8 border-2 border-red-200">
                        <h3 className="text-2xl font-bold mb-6 text-red-700">❌ Traditional Job Boards</h3>
                        <div className="space-y-4">
                            {problems.map((problem, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <span className="text-2xl">{problem.icon}</span>
                                    <p className="text-lg text-text-secondary">{problem.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Solutions */}
                    <div className="bg-green-50 rounded-2xl p-8 border-2 border-neon-green">
                        <h3 className="text-2xl font-bold mb-6 text-neon-green">✅ ApplyWizz Solution</h3>
                        <div className="space-y-4">
                            {solutions.map((solution, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <span className="text-2xl">{solution.icon}</span>
                                    <p className="text-lg font-semibold text-text-primary">{solution.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProblemSolution;
