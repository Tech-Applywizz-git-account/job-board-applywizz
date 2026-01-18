const ExperienceLevelsSection = ({ domain }) => {
    return (
        <div className="mb-16 bg-white rounded-2xl p-8 shadow-md border border-gray-200">
            <h2 className="text-3xl font-bold mb-8">All Experience Levels Welcome</h2>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-secondary-bg rounded-lg">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">📚</div>
                        <div>
                            <p className="font-bold text-lg">Entry Level</p>
                            <p className="text-sm text-text-muted">0-2 years experience</p>
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-bright-blue">{domain.experienceLevels.entry}+ jobs</p>
                </div>

                <div className="flex items-center justify-between p-4 bg-secondary-bg rounded-lg">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">🚀</div>
                        <div>
                            <p className="font-bold text-lg">Mid Level</p>
                            <p className="text-sm text-text-muted">3-5 years experience</p>
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-neon-green">{domain.experienceLevels.mid}+ jobs</p>
                </div>

                <div className="flex items-center justify-between p-4 bg-secondary-bg rounded-lg">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">⭐</div>
                        <div>
                            <p className="font-bold text-lg">Senior</p>
                            <p className="text-sm text-text-muted">5-10 years experience</p>
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-purple-600">{domain.experienceLevels.senior}+ jobs</p>
                </div>

                <div className="flex items-center justify-between p-4 bg-secondary-bg rounded-lg">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl">👑</div>
                        <div>
                            <p className="font-bold text-lg">Lead / Executive</p>
                            <p className="text-sm text-text-muted">10+ years experience</p>
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-orange-600">{domain.experienceLevels.lead + domain.experienceLevels.executive}+ jobs</p>
                </div>
            </div>
        </div>
    );
};

export default ExperienceLevelsSection;
