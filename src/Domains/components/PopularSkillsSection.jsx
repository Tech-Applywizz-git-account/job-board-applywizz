const PopularSkillsSection = ({ domain }) => {
    return (
        <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-200">
            <h2 className="text-3xl font-bold mb-6">Popular Skills for {domain.name}</h2>
            <div className="flex flex-wrap gap-3">
                {domain.popularSkills.map((skill, index) => (
                    <button
                        key={index}
                        className="bg-bright-blue/10 text-bright-blue px-4 py-2 rounded-full font-semibold hover:bg-bright-blue hover:text-white transition-all duration-300"
                    >
                        {skill}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PopularSkillsSection;
