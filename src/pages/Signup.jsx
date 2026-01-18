const Signup = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="grid lg:grid-cols-2 min-h-[600px]">
                    {/* Left Panel - Marketing Content */}
                    <div className="bg-gradient-to-br from-neon-green/10 via-neon-green/5 to-bright-blue/10 p-12 lg:p-16 flex flex-col justify-between">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <img
                                src="/landing_page_images/apply_wizz_logo.jpg"
                                alt="ApplyWizz Logo"
                                className="w-12 h-12 object-contain rounded-lg"
                            />
                            <h1 className="text-2xl font-display font-bold">
                                <span className="text-neon-green">APPLY</span>
                                <span className="text-text-primary"> WIZZ</span>
                            </h1>
                        </div>

                        {/* Main Content */}
                        <div className="space-y-8">
                            <h2 className="text-4xl lg:text-5xl font-display font-bold text-text-primary leading-tight">
                                Ensure a Fast and Successful Journey{' '}
                                <span className="text-bright-blue">to Your Next Career Move</span>
                            </h2>

                            {/* Value Propositions */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4 bg-white/60 rounded-xl p-4 backdrop-blur-sm">
                                    <div className="w-10 h-10 bg-neon-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-text-primary font-semibold">
                                        <span className="font-bold">2X</span> More Qualified Job Matches
                                    </p>
                                </div>

                                <div className="flex items-center space-x-4 bg-white/60 rounded-xl p-4 backdrop-blur-sm">
                                    <div className="w-10 h-10 bg-bright-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-bright-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-text-primary font-semibold">
                                        <span className="font-bold">60%</span> Time Savings in Job Searches
                                    </p>
                                </div>

                                <div className="flex items-center space-x-4 bg-white/60 rounded-xl p-4 backdrop-blur-sm">
                                    <div className="w-10 h-10 bg-neon-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                        </svg>
                                    </div>
                                    <p className="text-text-primary font-semibold">
                                        <span className="font-bold">50%</span> More Interview Invites
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Empty div for spacing */}
                        <div></div>
                    </div>

                    {/* Right Panel - Embedded Login */}
                    <div className="p-0 flex flex-col justify-center bg-white">
                        <iframe
                            src="https://www.apply-wizz.me/login"
                            className="w-full h-full min-h-[600px]"
                            title="ApplyWizz Login"
                            frameBorder="0"
                            style={{ border: 'none' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
