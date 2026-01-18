const AboutHero = () => {
    return (
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-6">
                        About <span className="gradient-text">ApplyWizz</span>
                    </h1>
                    <p className="text-2xl sm:text-3xl text-text-secondary font-semibold mb-8 max-w-4xl mx-auto">
                        Smart Job Matching — Because You Deserve Better Than One-Size-Fits-All Job Boards
                    </p>
                    <p className="text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
                        ApplyWizz matches job seekers to relevant opportunities using resume-based matching.
                        Unlike traditional job boards that show random listings, we analyze your skills and
                        experience to surface only the jobs that truly match your profile.
                    </p>
                </div>

                {/* Visual Mockup */}
                <div className="max-w-4xl mx-auto mt-16">
                    <div className="glass-effect rounded-3xl p-8 border-2 border-neon-green/20">
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center p-6 bg-white rounded-xl">
                                <div className="text-5xl mb-4">📄</div>
                                <p className="font-bold">Your Resume</p>
                                <p className="text-sm text-text-muted mt-2">Skills & Experience</p>
                            </div>
                            <div className="text-center p-6 bg-gradient-to-br from-bright-blue to-neon-green rounded-xl text-white">
                                <div className="text-5xl mb-4">🤖</div>
                                <p className="font-bold">AI Matching</p>
                                <p className="text-sm mt-2 opacity-90">Smart Algorithm</p>
                            </div>
                            <div className="text-center p-6 bg-white rounded-xl">
                                <div className="text-5xl mb-4">✨</div>
                                <p className="font-bold">Perfect Matches</p>
                                <p className="text-sm text-text-muted mt-2">Relevant Jobs Only</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutHero;
