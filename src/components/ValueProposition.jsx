import { useState, useEffect } from 'react';

const ValueProposition = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const features = [
        {
            id: 1,
            icon: '🧠',
            title: 'Resume-Based Job Matching',
            description: 'We analyze your resume against job requirements. Jobs appear in order of relevance to YOUR profile.',
            stat: '85%+ users find relevant jobs within 5 minutes',
        },
        {
            id: 2,
            icon: '📚',
            title: 'One Stop for 5+ Job Sources',
            description: 'LinkedIn Easy Apply, Indeed, Career Portals, Contract Jobs, Staffing Agencies — all in one platform.',
            stat: '70,000+ jobs available',
        },
        {
            id: 3,
            icon: '🎯',
            title: 'All Major Job Categories',
            description: 'We support all industries — with domain-specific filtering.',
            stat: 'All jobs posted within 24 hours',
        },
    ];

    // Auto-rotate carousel every 4 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % features.length);
        }, 4000);

        return () => clearInterval(timer);
    }, [features.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % features.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary-bg overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl sm:text-5xl font-display font-bold text-center mb-4">
                    Why <span className="text-neon-green">ApplyWizz</span> is Different
                </h2>
                <p className="text-xl text-text-secondary text-center mb-16 max-w-3xl mx-auto">
                    We're not just another job board. We're your intelligent job-matching assistant.
                </p>

                {/* Carousel Container */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Cards Container */}
                    <div className="relative h-[400px] sm:h-[380px]">
                        {features.map((feature, index) => (
                            <div
                                key={feature.id}
                                className={`absolute w-full transition-all duration-700 ease-in-out ${index === currentSlide
                                    ? 'opacity-100 translate-x-0 scale-100 z-10'
                                    : index < currentSlide
                                        ? 'opacity-0 -translate-x-full scale-95 z-0'
                                        : 'opacity-0 translate-x-full scale-95 z-0'
                                    }`}
                            >
                                {/* Modern Trendy Card */}
                                <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-100 relative overflow-hidden">
                                    {/* Neon Green Background Accent */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-neon-green opacity-5 rounded-full blur-3xl -z-10"></div>

                                    {/* Icon with Modern Design */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="w-20 h-20 bg-neon-green/20 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300 border-2 border-neon-green/30">
                                            <span className="text-5xl">{feature.icon}</span>
                                        </div>
                                        {/* Card Number Badge */}
                                        <div className="flex gap-1">
                                            <span className="text-sm font-bold text-gray-300">{String(index + 1).padStart(2, '0')}</span>
                                            <span className="text-sm font-bold text-gray-400">/</span>
                                            <span className="text-sm font-bold text-gray-400">{String(features.length).padStart(2, '0')}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-text-primary">
                                        {feature.title}
                                    </h3>
                                    <p className="text-lg text-text-secondary leading-relaxed mb-6">
                                        {feature.description}
                                    </p>

                                    {/* Stat Badge */}
                                    <div className="inline-block px-6 py-3 bg-neon-green rounded-full shadow-lg">
                                        <p className="text-white font-bold text-sm">{feature.stat}</p>
                                    </div>

                                    {/* Decorative Element */}
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-green/30 to-transparent"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 z-20"
                        aria-label="Previous slide"
                    >
                        <svg className="w-6 h-6 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 z-20"
                        aria-label="Next slide"
                    >
                        <svg className="w-6 h-6 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Dot Indicators */}
                    <div className="flex justify-center gap-3 mt-8">
                        {features.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`transition-all duration-300 rounded-full ${index === currentSlide
                                    ? 'w-12 h-3 bg-neon-green'
                                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ValueProposition;
