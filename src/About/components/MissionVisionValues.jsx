import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MissionVisionValues = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const cards = cardsRef.current;

        // Split scroll animation - cards slide in from different directions
        cards.forEach((card, index) => {
            gsap.fromTo(
                card,
                {
                    opacity: 0,
                    x: index === 0 ? -100 : index === 1 ? 0 : 100,
                    y: index === 1 ? -100 : 0,
                },
                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        end: 'top 50%',
                        scrub: 1,
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        });
    }, []);

    return (
        <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary-bg">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
                        Who We Are
                    </h2>
                    <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                        Our mission, vision, and values guide everything we do at ApplyWizz
                    </p>
                </div>

                {/* Three Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Mission Card */}
                    <div
                        ref={(el) => (cardsRef.current[0] = el)}
                        className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-xl border border-green-100 hover:shadow-2xl transition-shadow duration-300"
                    >
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md">
                            <span className="text-4xl">🎯</span>
                        </div>
                        <h3 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Job seekers waste hours scrolling through irrelevant jobs on traditional platforms.
                            ApplyWizz was built to fix that.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Using resume-based job matching, we ensure every job you see is actually relevant to
                            your skills, experience, and career goals. No more endless scrolling. Just opportunities that matter to{' '}
                            <span className="font-semibold text-green-600">you</span>.
                        </p>
                    </div>

                    {/* Vision Card */}
                    <div
                        ref={(el) => (cardsRef.current[1] = el)}
                        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-xl border border-blue-100 hover:shadow-2xl transition-shadow duration-300"
                    >
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md">
                            <span className="text-4xl">🔮</span>
                        </div>
                        <h3 className="text-3xl font-bold mb-6 text-gray-900">Our Vision</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We envision a world where finding the right job is effortless. Where technology works
                            for job seekers, not against them.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Where every professional has access to opportunities that truly match their skills and aspirations.
                            ApplyWizz is building the world's most relevant job-matching platform — one opportunity at a time.
                        </p>
                    </div>

                    {/* Values Card */}
                    <div
                        ref={(el) => (cardsRef.current[2] = el)}
                        className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-xl border border-purple-100 hover:shadow-2xl transition-shadow duration-300"
                    >
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md">
                            <span className="text-4xl">💎</span>
                        </div>
                        <h3 className="text-3xl font-bold mb-6 text-gray-900">Our Values</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <span className="text-xl mt-1">🔐</span>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Trust & Transparency</h4>
                                    <p className="text-sm text-gray-700">Honest job matching with no hidden algorithms</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-xl mt-1">⚖️</span>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Fair Access</h4>
                                    <p className="text-sm text-gray-700">Equal opportunities for all job seekers</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-xl mt-1">🎨</span>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">User-First Design</h4>
                                    <p className="text-sm text-gray-700">Solving real problems for job seekers</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-xl mt-1">🚀</span>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Continuous Innovation</h4>
                                    <p className="text-sm text-gray-700">Always improving to serve you better</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MissionVisionValues;
