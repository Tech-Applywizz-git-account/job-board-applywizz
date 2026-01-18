const WhoWeServe = () => {
    const audiences = [
        {
            icon: '💼',
            title: 'Job Seekers',
            description: 'Full-time, contract, & freelance opportunities',
        },
        {
            icon: '🎓',
            title: 'Students & Fresh Graduates',
            description: 'Entry-level positions and internships',
        },
        {
            icon: '⭐',
            title: 'Experienced Professionals',
            description: 'Senior and leadership roles',
        },
        {
            icon: '🏠',
            title: 'Remote-First Job Seekers',
            description: 'Work from anywhere opportunities',
        },
        {
            icon: '📋',
            title: 'Contractors (W2 & C2C)',
            description: 'Contract and consulting positions',
        },
    ];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary-bg">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl sm:text-5xl font-display font-bold text-center mb-4">
                    Who ApplyWizz is Built For
                </h2>
                <p className="text-xl text-text-secondary text-center mb-16 max-w-3xl mx-auto">
                    Whether you're just starting out or leading teams, we have opportunities for everyone
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {audiences.map((audience, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-8 hover:scale-105 transition-all duration-300 shadow-md border border-gray-200"
                        >
                            <div className="text-5xl mb-4">{audience.icon}</div>
                            <h3 className="text-xl font-bold mb-3">{audience.title}</h3>
                            <p className="text-text-secondary">{audience.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhoWeServe;
