import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef([]);

    useEffect(() => {
        const content = contentRef.current;

        gsap.fromTo(
            content,
            { opacity: 0, x: -50 },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                stagger: 1.0,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    }, []);

    // Card 1: Resume Upload Design
    const ResumeCard = () => (
        <div className="relative bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100">
            {/* Score Badge */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full flex flex-col items-center justify-center text-white shadow-lg"
                style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #10b981 50%, #06b6d4 100%)' }}>
                <span className="text-3xl font-bold">9.0</span>
                <span className="text-xs font-semibold">EXCELLENT</span>
            </div>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="text-4xl">✨</div>
                <h4 className="text-xl font-bold text-gray-900">Jamie Parker</h4>
            </div>

            {/* Professional Summary Section */}
            <div className="mb-6">
                <h5 className="text-sm font-bold text-gray-900 mb-2">PROFESSIONAL SUMMARY</h5>
                <p className="text-xs text-gray-600 leading-relaxed">
                    Senior Software Engineer with over five years of experience specializing in backend development and distributed systems. Successfully led the development of HA messaging system with 10,000/s throughput. Eager to utilize expertise in handling large-scale applications at AI startups.
                </p>
            </div>

            {/* Skills Section */}
            <div className="mb-6">
                <h5 className="text-sm font-bold text-gray-900 mb-2">SKILL</h5>
                <p className="text-xs text-gray-600">
                    Java, Python, Go, Apache Kafka, RabbitMQ, Kubernetes, CI/CD with Jenkins, Prometheus, Node.js, Typescript, Multimedia System, HLS
                </p>
            </div>

            {/* Experience Section */}
            <div className="mb-6">
                <h5 className="text-sm font-bold text-gray-900 mb-2">EXPERIENCE</h5>
                <div className="flex justify-between items-start mb-2">
                    <p className="text-xs font-semibold text-gray-700">Distributed System Engineer, XYZ Comp</p>
                    <p className="text-xs text-gray-500">January 2020 - Present</p>
                </div>
                <p className="text-xs text-gray-600">
                    • Designed and implemented microservices architecture using Java and Kubernetes, which improved system scalability and facilitated the seamless integration of video streaming services
                </p>
            </div>

            {/* Enhancement Badges */}
            <div className="flex flex-col gap-2">
                <div className="bg-green-600 text-white px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2">
                    <span>✨</span>
                    <span>Summary Enhanced</span>
                </div>
                <div className="bg-green-600 text-white px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2">
                    <span>✨</span>
                    <span>Relevant Skills Highlighted</span>
                </div>
                <div className="bg-green-600 text-white px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2">
                    <span>✨</span>
                    <span>Recent Work Experience Enhanced</span>
                </div>
            </div>
        </div>
    );

    // Card 2: Profile Setup Design
    const ProfileCard = () => (
        <div className="relative bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100">
            {/* Progress Badge */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex flex-col items-center justify-center text-white shadow-lg">
                <span className="text-2xl font-bold">70%</span>
                <span className="text-xs font-semibold">Complete</span>
            </div>

            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl">⚙️</span>
                    <h4 className="text-xl font-bold text-gray-900">Customize Your Profile</h4>
                </div>
                <p className="text-xs text-gray-500">Set your preferences to get better matches</p>
            </div>

            {/* Location Preference */}
            <div className="mb-5">
                <label className="text-xs font-bold text-gray-700 mb-2 block">📍 PREFERRED LOCATION</label>
                <div className="flex gap-2">
                    <div className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-semibold text-center">
                        Remote
                    </div>
                    <div className="flex-1 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-xs font-semibold text-center">
                        On-site
                    </div>
                    <div className="flex-1 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-xs font-semibold text-center">
                        Hybrid
                    </div>
                </div>
            </div>

            {/* Salary Range */}
            <div className="mb-5">
                <label className="text-xs font-bold text-gray-700 mb-2 block">💰 SALARY EXPECTATION</label>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-600">Min</span>
                        <span className="text-sm font-bold text-green-600">$80,000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Max</span>
                        <span className="text-sm font-bold text-green-600">$150,000</span>
                    </div>
                </div>
            </div>

            {/* Job Type */}
            <div className="mb-5">
                <label className="text-xs font-bold text-gray-700 mb-2 block">💼 JOB TYPE</label>
                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-green-600 text-white px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1">
                        <span>✓</span>
                        <span>Full-time</span>
                    </div>
                    <div className="border-2 border-gray-300 text-gray-600 px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1">
                        <span>○</span>
                        <span>Contract</span>
                    </div>
                </div>
            </div>

            {/* Preferred Domains */}
            <div className="mb-4">
                <label className="text-xs font-bold text-gray-700 mb-2 block">🎯 PREFERRED DOMAINS</label>
                <div className="flex flex-wrap gap-2">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Software Engineering
                    </span>
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Cloud Computing
                    </span>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                        + Add More
                    </span>
                </div>
            </div>

            {/* Decorative Blue Bar */}
            <div className="absolute bottom-0 right-0 w-3/4 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-bl-3xl rounded-tr-3xl"></div>
        </div>
    );

    // Card 3: Job Match Design
    const JobMatchCard = () => (
        <div className="relative bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100">
            {/* Overall Score Badge */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex flex-col items-center justify-center text-white shadow-lg">
                <span className="text-3xl font-bold">95%</span>
                <span className="text-xs font-semibold">Overall</span>
            </div>

            {/* Job Header */}
            <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-xl">UR</span>
                </div>
                <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-1">1 hour ago</div>
                    <h4 className="text-xl font-bold text-gray-900">Senior Data Analyst</h4>
                    <p className="text-sm text-gray-600">Runway</p>
                </div>
            </div>

            {/* Metrics */}
            <div className="flex justify-between mb-8">
                <div className="flex flex-col items-center">
                    <div className="relative w-20 h-20 mb-2">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="40" cy="40" r="36" stroke="#e5e7eb" strokeWidth="6" fill="none" />
                            <circle
                                cx="40" cy="40" r="36" stroke="#10b981" strokeWidth="6" fill="none"
                                strokeDasharray={`${2 * Math.PI * 36}`}
                                strokeDashoffset={`${2 * Math.PI * 36 * (1 - 0.95)}`}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-bold text-gray-900">95%</span>
                        </div>
                    </div>
                    <span className="text-xs text-gray-600 font-medium">Exp. Level</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="relative w-20 h-20 mb-2">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="40" cy="40" r="36" stroke="#e5e7eb" strokeWidth="6" fill="none" />
                            <circle
                                cx="40" cy="40" r="36" stroke="#10b981" strokeWidth="6" fill="none"
                                strokeDasharray={`${2 * Math.PI * 36}`}
                                strokeDashoffset={`${2 * Math.PI * 36 * (1 - 0.93)}`}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-bold text-gray-900">93%</span>
                        </div>
                    </div>
                    <span className="text-xs text-gray-600 font-medium">Skill</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="relative w-20 h-20 mb-2">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="40" cy="40" r="36" stroke="#e5e7eb" strokeWidth="6" fill="none" />
                            <circle
                                cx="40" cy="40" r="36" stroke="#10b981" strokeWidth="6" fill="none"
                                strokeDasharray={`${2 * Math.PI * 36}`}
                                strokeDashoffset={`${2 * Math.PI * 36 * (1 - 0.96)}`}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-bold text-gray-900">96%</span>
                        </div>
                    </div>
                    <span className="text-xs text-gray-600 font-medium">Industry Exp.</span>
                </div>
            </div>

            {/* Why You Are A Good Fit */}
            <div className="pt-6 border-t border-gray-100">
                <h5 className="text-sm font-bold text-gray-900 mb-4">Why You Are A Good Fit</h5>
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="bg-green-600 text-white px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2">
                            <span>✓</span>
                            <span>Experience Level</span>
                        </div>
                        <div className="flex-1 h-8 bg-green-50 rounded-lg"></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="border-2 border-green-600 text-green-700 bg-white px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2">
                            <span>✗</span>
                            <span>Education</span>
                        </div>
                        <div className="flex-1 h-8 bg-gray-100 rounded-lg"></div>
                    </div>
                </div>
            </div>

            {/* Decorative Green Bar */}
            <div className="absolute bottom-0 right-0 w-3/4 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-bl-3xl rounded-tr-3xl"></div>
        </div>
    );

    const steps = [
        {
            id: 1,
            title: 'Upload Resume',
            description: 'Simply upload your resume and let our AI analyze your skills, experience, and qualifications instantly.',
            card: <ResumeCard />,
        },
        {
            id: 2,
            title: 'Create Profile',
            description: 'Customize your job search with filters for location, salary range, job type, and preferred domains.',
            card: <ProfileCard />,
        },
        {
            id: 3,
            title: 'Browse Matched Jobs',
            description: 'Get personalized job recommendations ranked by relevance. Focus only on the best opportunities for you.',
            card: <JobMatchCard />,
        },
    ];

    return (
        <section
            id="how-it-works"
            ref={sectionRef}
            className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50"
        >
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl sm:text-5xl font-display font-bold text-center mb-4">
                    Find Your Best Job Match in{' '}
                    <span className="gradient-text">3 Simple Steps</span>
                </h2>
                <p className="text-xl text-text-secondary text-center mb-16 max-w-2xl mx-auto">
                    Getting started with ApplyWizz is quick and easy
                </p>

                <div className="flex flex-col gap-20">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
                        >
                            {/* Left Content */}
                            <div ref={(el) => (contentRef.current[index] = el)} className="lg:pr-8">
                                <h3 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900 leading-tight">
                                    {step.title}
                                </h3>
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    {step.description}
                                </p>
                                <button
                                    className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                                    onClick={() => document.getElementById('cta-banner')?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    Get Started Now
                                </button>
                            </div>

                            {/* Right Card */}
                            <div className="relative transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
                                {/* Background decorative element */}
                                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-50 rounded-3xl transform rotate-3 opacity-50"></div>

                                {/* Render specific card for each step */}
                                <div className="relative">
                                    {step.card}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
