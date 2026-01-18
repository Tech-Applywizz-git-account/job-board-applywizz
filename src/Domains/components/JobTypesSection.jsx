const JobTypesSection = ({ domain }) => {
    return (
        <div className="mb-16 bg-white rounded-2xl p-8 shadow-md border border-gray-200">
            <h2 className="text-3xl font-bold mb-8">Popular {domain.name} Roles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {domain.jobTypes.map((jobType, index) => (
                    <div
                        key={index}
                        className="bg-secondary-bg p-6 rounded-xl hover:scale-105 transition-all duration-300 hover:border-bright-blue border-2 border-transparent"
                    >
                        <h3 className="font-bold text-lg mb-2">{jobType.title}</h3>
                        <p className="text-neon-green font-bold text-2xl">{jobType.count}+ jobs</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobTypesSection;
