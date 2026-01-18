import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const JobTypeCategories = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    const jobTypes = [
        {
            id: 1,
            title: 'Career Portal Jobs',
            description: 'Direct applications to company career pages with full job details',
            logo: '/job-type/careerportal.png',
            gradient: 'from-blue-400 to-blue-600',
        },
        {
            id: 2,
            title: 'Easy Apply Jobs',
            description: 'One-click applications on LinkedIn & Indeed for faster process',
            logo: '/job-type/easyapply.png',
            gradient: 'from-green-400 to-green-600',
        },
        {
            id: 3,
            title: 'Contract Jobs',
            description: 'W2 and C2C contract opportunities with competitive rates',
            logo: '/job-type/contract.png',
            gradient: 'from-purple-400 to-purple-600',
        },
        {
            id: 4,
            title: 'Staffing Agency Jobs',
            description: 'Positions through top recruitment agencies nationwide',
            logo: '/job-type/staffing.png',
            gradient: 'from-orange-400 to-orange-600',
        },
        {
            id: 5,
            title: 'Sponsored Jobs',
            description: 'Featured opportunities from premium employers',
            logo: '/job-type/sponsored.png',
            gradient: 'from-pink-400 to-pink-600',
        },
    ];

    useEffect(() => {
        const cards = cardsRef.current;

        // Animate cards on scroll with stagger effect
        gsap.fromTo(
            cards,
            {
                opacity: 0,
                y: 50,
                scale: 0.9,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.15,
                ease: 'back.out(1.2)',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    }, []);

    return (
        <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <h2 className="text-4xl sm:text-5xl font-display font-bold text-center mb-4">
                    All Job Types in <span className="gradient-text">One Place</span>
                </h2>
                <p className="text-xl text-text-secondary text-center mb-16 max-w-3xl mx-auto">
                    From traditional career portals to modern easy-apply platforms, we've got you covered
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {jobTypes.map((type, index) => (
                        <div
                            key={type.id}
                            ref={(el) => (cardsRef.current[index] = el)}
                            className="bg-white rounded-xl p-6 transition-all duration-300 border-2 border-gray-200 group shadow-md hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden"
                        >
                            {/* Gradient border effect on hover */}
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br ${type.gradient} rounded-xl -z-10 blur-sm`}></div>

                            {/* Shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>

                            {/* Logo with glow effect */}
                            <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 relative">
                                <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 group-hover:opacity-20 blur-md rounded-lg transition-opacity duration-300`}></div>
                                <img src={type.logo} alt={type.title} className="w-full h-full object-contain relative z-10" />
                            </div>

                            {/* Title with gradient on hover */}
                            <h3 className="text-lg font-bold mb-3 min-h-[56px] transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-bright-blue group-hover:to-neon-green group-hover:bg-clip-text group-hover:text-transparent">
                                {type.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                                {type.description}
                            </p>

                            {/* CTA Button with enhanced hover */}
                            <button
                                className={`w-full bg-gradient-to-r ${type.gradient} text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 opacity-90 hover:opacity-100`}
                                aria-label={`Browse ${type.title}`}
                            >
                                Browse →
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default JobTypeCategories;
