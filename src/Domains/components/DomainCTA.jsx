const DomainCTA = ({ domain }) => {
    return (
        <div className="bg-white rounded-3xl p-12 shadow-xl border-2 border-neon-green/20 text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
                Ready to Start Your {domain.name} Career?
            </h2>
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
                Join thousands of professionals finding their dream {domain.name.toLowerCase()} roles through ApplyWizz
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary text-lg px-10">
                    Browse All {domain.name} Jobs
                </button>
                <button className="btn-secondary text-lg px-10">
                    Set Up Job Alerts
                </button>
            </div>
        </div>
    );
};

export default DomainCTA;
