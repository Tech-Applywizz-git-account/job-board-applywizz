const Footer = () => {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <h3 className="text-2xl font-display font-bold mb-4">
                            <span className="text-neon-green">Apply</span>
                            <span className="text-white">Wizz</span>
                        </h3>
                        <p className="text-gray-400 mb-6 max-w-sm">
                            Find jobs matched to your resume across all industries
                        </p>
                        {/* Social Links */}
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-neon-green hover:text-black transition-all duration-300"
                                aria-label="Follow us on Twitter"
                            >
                                <span className="text-xl">𝕏</span>
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-neon-green hover:text-black transition-all duration-300"
                                aria-label="Follow us on LinkedIn"
                            >
                                <span className="text-xl">in</span>
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-neon-green hover:text-black transition-all duration-300"
                                aria-label="Follow us on Facebook"
                            >
                                <span className="text-xl">f</span>
                            </a>
                        </div>
                    </div>

                    {/* Product Column */}
                    <div>
                        <h4 className="font-bold text-white mb-4">Product</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
                                    Job Search
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
                                    Resume Match
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
                                    Job Alerts
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
                                    Career Resources
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* For Employers Column */}
                    <div>
                        <h4 className="font-bold text-white mb-4">For Employers</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
                                    Post a Job
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
                                    Talent Solutions
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
                                    Advertise
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h4 className="font-bold text-white mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-gray-500 text-sm">
                        © 2026 ApplyWizz. All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-sm">
                        <a href="#" className="text-gray-500 hover:text-neon-green transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-gray-500 hover:text-neon-green transition-colors">
                            Terms of Service
                        </a>
                        <a href="#" className="text-gray-500 hover:text-neon-green transition-colors">
                            Cookie Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
