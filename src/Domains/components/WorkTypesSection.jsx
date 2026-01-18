const WorkTypesSection = ({ domain }) => {
    return (
        <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Remote, On-Site, and Hybrid Options</h2>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-md border-2 border-bright-blue">
                    <div className="text-5xl mb-4">🏠</div>
                    <h3 className="text-2xl font-bold mb-2">Remote</h3>
                    <p className="text-4xl font-bold text-bright-blue mb-2">{domain.workTypes.remote}</p>
                    <p className="text-text-secondary">Work from anywhere</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-md border-2 border-neon-green">
                    <div className="text-5xl mb-4">🏢</div>
                    <h3 className="text-2xl font-bold mb-2">Hybrid</h3>
                    <p className="text-4xl font-bold text-neon-green mb-2">{domain.workTypes.hybrid}</p>
                    <p className="text-text-secondary">Best of both worlds</p>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-md border-2 border-gray-400">
                    <div className="text-5xl mb-4">🏙️</div>
                    <h3 className="text-2xl font-bold mb-2">On-Site</h3>
                    <p className="text-4xl font-bold text-gray-600 mb-2">{domain.workTypes.onsite}</p>
                    <p className="text-text-secondary">Office-based roles</p>
                </div>
            </div>
        </div>
    );
};

export default WorkTypesSection;
