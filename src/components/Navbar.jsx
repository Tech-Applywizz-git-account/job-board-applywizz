import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const scrollToSection = (sectionId) => {
        // If not on homepage, navigate there first
        if (window.location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setIsMenuOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4">
            <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-lg rounded-full shadow-lg border border-gray-200 px-6 sm:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo - Links to Homepage */}
                    <Link
                        to="/"
                        className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                        aria-label="Go to homepage"
                    >
                        <img
                            src="/landing_page_images/apply_wizz_logo.jpg"
                            alt="ApplyWizz Logo"
                            className="w-8 h-8 sm:w-12 sm:h-12 object-contain rounded-lg"
                        />
                        <h1 className="text-xl font-display font-bold hidden sm:block">
                            <span className="text-text-primary"> APPLYWIZZ</span>
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <Link
                            to="/about"
                            className="text-text-secondary hover:text-bright-blue transition-colors duration-300 font-medium"
                            aria-label="Navigate to About"
                        >
                            About
                        </Link>
                        <Link
                            to="/jobs"
                            className="text-text-secondary hover:text-bright-blue transition-colors duration-300 font-medium"
                            aria-label="Navigate to Job Listing"
                        >
                            Job Listing
                        </Link>
                        <Link
                            to="/domains"
                            className="text-text-secondary hover:text-bright-blue transition-colors duration-300 font-medium"
                            aria-label="Navigate to Domain-Specific"
                        >
                            Domain-Specific
                        </Link>
                        <Link
                            to="/pricing"
                            className="text-text-secondary hover:text-bright-blue transition-colors duration-300 font-medium"
                            aria-label="Navigate to Pricing"
                        >
                            Pricing
                        </Link>
                    </div>

                    {/* Desktop Action Buttons */}
                    <div className="hidden lg:flex items-center space-x-3">
                        <button
                            className="text-text-primary font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition-all duration-300"
                            onClick={() => window.open('https://www.apply-wizz.me/login', '_blank')}
                            aria-label="Sign in to ApplyWizz"
                        >
                            Sign In
                        </button>
                        <button
                            className="bg-neon-green text-white font-semibold px-6 py-2 rounded-full hover:shadow-glow-green transition-all duration-300 hover:scale-105 flex items-center space-x-2"
                            onClick={() => navigate('/signup')}
                            aria-label="Join ApplyWizz now"
                        >
                            <span>Join Now</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="lg:hidden text-text-primary"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-gray-200 mt-2">
                        <div className="space-y-3">
                            <Link
                                to="/about"
                                onClick={() => setIsMenuOpen(false)}
                                className="block w-full text-left px-4 py-2 text-text-secondary hover:text-bright-blue hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                About
                            </Link>
                            <Link
                                to="/jobs"
                                onClick={() => setIsMenuOpen(false)}
                                className="block w-full text-left px-4 py-2 text-text-secondary hover:text-bright-blue hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                Job Listing
                            </Link>
                            <Link
                                to="/domains"
                                onClick={() => setIsMenuOpen(false)}
                                className="block w-full text-left px-4 py-2 text-text-secondary hover:text-bright-blue hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                Domain-Specific
                            </Link>
                            <Link
                                to="/pricing"
                                onClick={() => setIsMenuOpen(false)}
                                className="block w-full text-left px-4 py-2 text-text-secondary hover:text-bright-blue hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                Pricing
                            </Link>

                            {/* Mobile Action Buttons */}
                            <div className="space-y-2 pt-3">
                                <button
                                    className="w-full text-text-primary font-semibold px-6 py-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-all"
                                    onClick={() => window.open('https://www.apply-wizz.me/login', '_blank')}
                                >
                                    Sign In
                                </button>
                                <button
                                    className="w-full bg-neon-green text-white font-semibold px-6 py-2 rounded-full hover:shadow-glow-green transition-all flex items-center justify-center space-x-2"
                                    onClick={() => navigate('/signup')}
                                >
                                    <span>Join Now</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
