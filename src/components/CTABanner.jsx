import { useNavigate } from 'react-router-dom';

const CTABanner = () => {
    const navigate = useNavigate();
    return (
        <section id="cta-banner" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-bright-blue/10 via-neon-green/10 to-bright-blue/10">
            <div className="max-w-5xl mx-auto text-center">
                <div className="bg-white rounded-3xl p-12 sm:p-16 border-2 border-neon-green/20 shadow-xl">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
                        Ready to Find Your <span className="gradient-text">Perfect Job?</span>
                    </h2>

                    <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
                        Join 50,000+ job seekers who are already using ApplyWizz to land their dream roles
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            className="btn-primary text-lg w-full sm:w-auto px-10"
                            onClick={() => navigate('/signup')}
                            aria-label="Sign up for free"
                        >
                            Sign Up Free
                        </button>
                        <button
                            className="btn-secondary text-lg w-full sm:w-auto px-10"
                            onClick={() => navigate('/jobs')}
                            aria-label="Browse jobs first"
                        >
                            Browse Jobs First
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

export default CTABanner;
