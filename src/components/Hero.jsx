import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section
            id="hero"
            className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-[600px] md:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50"
            style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #ecfeff 50%, #e0f2fe 100%)',
            }}
        >
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 overflow-hidden opacity-30">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute -bottom-8 left-40 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column - Visual */}
                    <div className="order-2 lg:order-1 fade-in delay-200">
                        <img
                            src="ai-robo-2.jpeg"
                            alt="AI-Powered Job Search Platform"
                            className="w-full h-auto max-w-2xl mx-auto"
                        />
                    </div>

                    {/* Right Column - Content */}
                    <div className="order-1 lg:order-2 space-y-6">
                        {/* Pre-headline */}
                        <p className="text-text-secondary text-sm sm:text-base font-medium fade-in-up delay-100">
                            Stop Endless Job Searching
                        </p>

                        {/* Main Headline */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight fade-in-up delay-200">
                            AI-Matched Jobs,{' '}
                            <span className="gradient-text">Not Endless Browsing</span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg sm:text-xl text-text-secondary leading-relaxed fade-in-up delay-300">
                            Get matched jobs from{' '}
                            <span className="text-neon-green font-semibold">50+ sources</span>, tailored to your resume across{' '}
                            <span className="text-bright-blue font-semibold">all major categories</span>.{' '}
                            All posted in the last{' '}
                            <span className="text-neon-green font-semibold">24 hours</span>.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4 fade-in-up delay-400">
                            <button
                                className="btn-pill-primary"
                                onClick={() => navigate('/jobs')}
                                aria-label="Search jobs now"
                            >
                                Search Jobs Now
                            </button>
                            <button
                                className="btn-pill-secondary"
                                onClick={() => navigate('/signup')}
                                aria-label="Sign up for free"
                            >
                                Sign Up Free
                            </button>
                        </div>

                        {/* How It Works Link */}
                        <div className="fade-in-up delay-400">
                            <button
                                className="btn-tertiary text-lg underline"
                                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                                aria-label="Learn how ApplyWizz works"
                            >
                                How It Works →
                            </button>
                        </div>

                        {/* Trust Signals */}
                        <div className="pt-6 fade-in delay-400">
                            {/* User Count */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex -space-x-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-green to-bright-blue border-2 border-white"></div>
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-bright-blue to-accent-purple border-2 border-white"></div>
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-orange to-accent-pink border-2 border-white"></div>
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-green to-accent-cyan border-2 border-white"></div>
                                </div>
                                <p className="text-sm font-semibold text-text-secondary">
                                    Trusted by <span className="text-text-primary">10,000+</span> job seekers
                                </p>
                            </div>

                            {/* Trust Indicators */}
                            <div className="flex flex-wrap gap-6 text-text-secondary">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">✨</span>
                                    <span className="text-sm font-semibold">AI-Powered Matching</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">⚡</span>
                                    <span className="text-sm font-semibold">Fresh Jobs Daily</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">🎯</span>
                                    <span className="text-sm font-semibold">70,000+ Jobs Daily</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Section */}
                <div className="mt-20 pt-16 border-t border-gray-200">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        {/* Left Side - Heading & Badges */}
                        <div className="fade-in-up delay-100">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight mb-6">
                                Real Results,{' '}
                                <span className="gradient-text">Not Just Promises</span>
                            </h2>

                            {/* Achievement Badges */}
                            <div className="flex flex-wrap gap-4">
                                <div className="px-4 py-2 bg-white border-2 border-text-primary rounded-lg">
                                    <p className="text-xs font-semibold text-text-secondary">Most Loved Tool</p>
                                    <p className="text-sm font-bold text-text-primary">Job Seekers' #1</p>
                                </div>
                                <div className="px-4 py-2 bg-white border-2 border-neon-green rounded-lg">
                                    <p className="text-xs font-semibold text-text-secondary">AI-Powered</p>
                                    <p className="text-sm font-bold text-neon-green">Smart Matching</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Statistics */}
                        <div className="space-y-6 fade-in-up delay-300">
                            {/* Stat 1 */}
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-neon-green flex items-center justify-center">
                                    <img src="/hero_section_img/users.png" alt="Users" className="w-6 h-6" />
                                </div>
                                <div className="flex-1 border-b-2 border-dotted border-gray-300"></div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-text-primary">10,000+</p>
                                    <p className="text-sm text-text-secondary">trusted users</p>
                                </div>
                            </div>

                            {/* Stat 2 */}
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-neon-green flex items-center justify-center">
                                    <img src="/hero_section_img/analystics.png" alt="Analytics" className="w-6 h-6" />
                                </div>
                                <div className="flex-1 border-b-2 border-dotted border-gray-300"></div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-text-primary">3x</p>
                                    <p className="text-sm text-text-secondary">more interviews landed</p>
                                </div>
                            </div>

                            {/* Stat 3 */}
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-neon-green flex items-center justify-center">
                                    <img src="/hero_section_img/clock.png" alt="Clock" className="w-6 h-6" />
                                </div>
                                <div className="flex-1 border-b-2 border-dotted border-gray-300"></div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-text-primary">80%</p>
                                    <p className="text-sm text-text-secondary">time saved on job search</p>
                                </div>
                            </div>

                            {/* Stat 4 */}
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-neon-green flex items-center justify-center">
                                    <img src="/hero_section_img/checked.png" alt="Verified" className="w-6 h-6" />
                                </div>
                                <div className="flex-1 border-b-2 border-dotted border-gray-300"></div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-text-primary">No.1 Choice</p>
                                    <p className="text-sm text-text-secondary">for 85% after first use</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
