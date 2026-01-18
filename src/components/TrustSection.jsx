import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TrustSection = () => {
    const statsRef = useRef([]);
    const testimonialContainerRef = useRef(null);
    const scrollAnimationRef = useRef(null);

    const stats = [
        {
            id: 1,
            value: '70,000+',
            label: 'Jobs Matched',
            numericValue: 70000,
        },
        {
            id: 2,
            value: '50,000+',
            label: 'Active Seekers',
            numericValue: 50000,
        },
        {
            id: 3,
            value: '85%+',
            label: 'Matching Accuracy',
            numericValue: 85,
        },
        {
            id: 4,
            value: '73+',
            label: 'Domains',
            numericValue: 73,
        },
    ];

    const testimonials = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'Software Engineer',
            text: 'ApplyWizz helped me find my dream job in just 2 weeks! The match scores were incredibly accurate and I only applied to relevant positions.',
            avatar: '/testimonial-person/women-1.jpg',
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'Data Analyst',
            text: 'The ability to see jobs from all sources in one place saved me hours of searching. The fresh jobs filter is a game-changer!',
            avatar: '/testimonial-person/men-1.jpg',
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            role: 'Product Manager',
            text: 'I love that ApplyWizz only shows fresh jobs. No more wasting time on outdated listings. Found my role in under a month!',
            avatar: '/testimonial-person/women-2.jpg',
        },
        {
            id: 4,
            name: 'David Kumar',
            role: 'DevOps Engineer',
            text: 'The domain-specific filtering made it so easy to find exactly what I was looking for. Highly recommend to any job seeker!',
            avatar: '/testimonial-person/men-2.jpg',
        },
    ];

    // Duplicate testimonials for infinite scroll effect
    const duplicatedTestimonials = [...testimonials, ...testimonials];

    useEffect(() => {
        // Counter animation for stats
        statsRef.current.forEach((stat, index) => {
            if (!stat) return;

            const statData = stats[index];
            const counterElement = stat.querySelector('.counter');

            gsap.fromTo(
                counterElement,
                { textContent: 0 },
                {
                    textContent: statData.numericValue,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { textContent: 1 },
                    scrollTrigger: {
                        trigger: stat,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                    onUpdate: function () {
                        const value = Math.ceil(this.targets()[0].textContent);
                        if (index === 0 || index === 1) {
                            // For large numbers, add comma separator
                            counterElement.textContent = value.toLocaleString() + '+';
                        } else if (index === 2) {
                            // For percentage
                            counterElement.textContent = value + '%+';
                        } else {
                            counterElement.textContent = value + '+';
                        }
                    },
                }
            );
        });

        // Horizontal scroll animation for testimonials
        const testimonialContainer = testimonialContainerRef.current;
        if (testimonialContainer) {
            const scrollWidth = testimonialContainer.scrollWidth / 2; // Half because we duplicated

            scrollAnimationRef.current = gsap.to(testimonialContainer, {
                x: -scrollWidth,
                duration: 20,
                ease: 'none',
                repeat: -1,
            });

            // Add hover pause functionality
            const handleMouseEnter = () => {
                if (scrollAnimationRef.current) {
                    scrollAnimationRef.current.pause();
                }
            };

            const handleMouseLeave = () => {
                if (scrollAnimationRef.current) {
                    scrollAnimationRef.current.resume();
                }
            };

            testimonialContainer.addEventListener('mouseenter', handleMouseEnter);
            testimonialContainer.addEventListener('mouseleave', handleMouseLeave);

            // Cleanup
            return () => {
                testimonialContainer.removeEventListener('mouseenter', handleMouseEnter);
                testimonialContainer.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, []);

    return (
        <section id="user" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl sm:text-5xl font-display font-bold text-center mb-4">
                    Trusted by Job Seekers <span className="gradient-text">Across America</span>
                </h2>
                <p className="text-xl text-text-secondary text-center mb-16 max-w-2xl mx-auto">
                    Join thousands of professionals who found their dream jobs through ApplyWizz
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {stats.map((stat, index) => (
                        <div
                            key={stat.id}
                            ref={(el) => (statsRef.current[index] = el)}
                            className="bg-white rounded-xl p-8 text-center hover:scale-105 transition-all duration-300 hover:border-neon-green border-2 border-gray-200 shadow-md"
                        >
                            <div className="counter text-5xl font-bold text-neon-green mb-3 text-glow-green">
                                0
                            </div>
                            <p className="text-text-secondary text-sm sm:text-base">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Testimonials - Horizontal Scrolling */}
                <div className="overflow-hidden">
                    <div
                        ref={testimonialContainerRef}
                        className="flex gap-6"
                        style={{ width: 'fit-content' }}
                    >
                        {duplicatedTestimonials.map((testimonial, index) => (
                            <div
                                key={`${testimonial.id}-${index}`}
                                className="bg-white rounded-tr-3xl rounded-br-3xl rounded-bl-3xl p-6 border-2 border-gray-300 shadow-md flex-shrink-0"
                                style={{ width: '300px' }}
                            >
                                {/* Quote Icon */}
                                <div className="text-bright-blue text-4xl mb-3 opacity-50">"</div>

                                {/* Testimonial Text */}
                                <p className="text-text-secondary mb-6 leading-relaxed italic text-sm">
                                    {testimonial.text}
                                </p>

                                {/* Author Info */}
                                <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-sm">{testimonial.name}</p>
                                        <p className="text-xs text-text-muted">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
