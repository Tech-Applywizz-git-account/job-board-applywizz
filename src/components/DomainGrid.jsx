import { domains } from '../data/mockData';

const DomainGrid = () => {
    return (
        <section id="domains" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary-bg">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl sm:text-5xl font-display font-bold text-center mb-4">
                    Jobs Across <span className="text-neon-green">73+ Domains</span>
                </h2>
                <p className="text-xl text-text-secondary text-center mb-16 max-w-2xl mx-auto">
                    Whatever your expertise, we have opportunities waiting for you
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {domains.map((domain, index) => (
                        <button
                            key={index}
                            className="bg-white rounded-lg p-4 text-center hover:scale-105 hover:border-neon-green border-2 border-gray-200 transition-all duration-300 group shadow-sm"
                            aria-label={`Browse ${domain.name} jobs`}
                        >
                            <p className="font-semibold text-sm sm:text-base group-hover:text-neon-green transition-colors">
                                {domain.name}
                            </p>
                        </button>
                    ))}

                    {/* "And More" Card */}
                    <button
                        className="bg-white rounded-lg p-4 text-center border-2 border-bright-blue hover:scale-105 transition-all duration-300 group shadow-sm"
                        aria-label="View all domains"
                    >
                        <p className="font-bold text-bright-blue text-sm sm:text-base">
                            + 50 More Domains
                        </p>
                    </button>
                </div>

                {/* Mobile Scroll Hint */}
                <div className="md:hidden text-center mt-8 text-text-muted text-sm">
                    <p>← Scroll to see more →</p>
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <button className="btn-primary text-lg" aria-label="Explore all domains">
                        Explore All Domains
                    </button>
                </div>
            </div>
        </section>
    );
};

export default DomainGrid;
