const SalarySection = ({ domain }) => {
    return (
        <div className="bg-gradient-to-r from-neon-green/10 to-bright-blue/10 rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-8">Salary Expectations</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <p className="text-sm text-text-muted mb-2">Entry Level</p>
                    <p className="text-2xl font-bold text-neon-green">{domain.salaryRanges.entry}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <p className="text-sm text-text-muted mb-2">Mid Level</p>
                    <p className="text-2xl font-bold text-bright-blue">{domain.salaryRanges.mid}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <p className="text-sm text-text-muted mb-2">Senior</p>
                    <p className="text-2xl font-bold text-purple-600">{domain.salaryRanges.senior}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <p className="text-sm text-text-muted mb-2">Executive</p>
                    <p className="text-2xl font-bold text-orange-600">{domain.salaryRanges.executive}</p>
                </div>
            </div>
        </div>
    );
};

export default SalarySection;
