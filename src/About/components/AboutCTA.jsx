const AboutCTA = () => {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-3xl p-12 sm:p-16 shadow-xl border-2 border-neon-green/20 text-center">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
                        Ready to Find Your <span className="gradient-text">Perfect Job Match?</span>
                    </h2>

                    <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
                        Join thousands of job seekers using ApplyWizz to discover relevant job opportunities — without the noise.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="btn-primary text-lg w-full sm:w-auto px-10">
                            Sign Up Free
                        </button>
                        <button className="btn-secondary text-lg w-full sm:w-auto px-10">
                            Browse Jobs
                        </button>
                    </div>

                    <p className="text-sm text-text-muted mt-6">
                        No credit card required • Get started in under 30 seconds
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutCTA;
