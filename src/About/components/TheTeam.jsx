const TheTeam = () => {
    const team = [
        {
            role: 'Founder & CEO',
            icon: '👨‍💼',
            description: 'Building the future of job matching',
        },
        {
            role: 'Product Lead',
            icon: '🎯',
            description: 'Designing user-first experiences',
        },
        {
            role: 'Engineering Team',
            icon: '💻',
            description: 'Making the magic happen',
        },
        {
            role: 'Support Team',
            icon: '🤝',
            description: 'Always here to help you succeed',
        },
    ];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl sm:text-5xl font-display font-bold text-center mb-4">
                    Meet the People Behind <span className="gradient-text">ApplyWizz</span>
                </h2>
                <p className="text-xl text-text-secondary text-center mb-16 max-w-3xl mx-auto">
                    We're a team of passionate builders dedicated to making job searching better for everyone
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-bright-blue/5 to-neon-green/5 rounded-xl p-8 text-center hover:scale-105 transition-all duration-300 border-2 border-gray-200"
                        >
                            <div className="text-6xl mb-4">{member.icon}</div>
                            <h3 className="text-xl font-bold mb-3">{member.role}</h3>
                            <p className="text-text-secondary text-sm">{member.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center bg-blue-50 rounded-2xl p-8 max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold mb-4">Join Our Team</h3>
                    <p className="text-text-secondary mb-6">
                        We're always looking for talented individuals who share our mission.
                        If you're passionate about making a difference in people's careers, we'd love to hear from you.
                    </p>
                    <button className="btn-secondary">
                        View Open Positions
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TheTeam;
