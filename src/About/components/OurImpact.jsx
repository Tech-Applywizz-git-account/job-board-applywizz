const OurImpact = () => {
    const metrics = [
        { value: '70,000+', label: 'Jobs Matched' },
        { value: '50,000+', label: 'Active Users' },
        { value: '85%+', label: 'Relevance Satisfaction' },
        { value: '73+', label: 'Domains Covered' },
    ];

    const testimonials = [
        {
            quote: 'ApplyWizz helped me find my dream job in just 2 weeks! The match scores were incredibly accurate.',
            name: 'Sarah Johnson',
            role: 'Software Engineer',
            avatar: '👩‍💻',
        },
        {
            quote: 'Finally, a job board that actually shows me relevant positions. Saved me hours of searching!',
            name: 'Michael Chen',
            role: 'Data Analyst',
            avatar: '👨‍💼',
        },
        {
            quote: 'The domain-specific filtering made it so easy to find exactly what I was looking for.',
            name: 'Emily Rodriguez',
            role: 'Product Manager',
            avatar: '👩‍🎓',
        },
        {
            quote: 'I love that ApplyWizz only shows fresh jobs. No more wasting time on outdated listings!',
            name: 'David Kumar',
            role: 'DevOps Engineer',
            avatar: '👨‍🔬',
        },
    ];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary-bg">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl sm:text-5xl font-display font-bold text-center mb-16">
                    Helping Job Seekers <span className="gradient-text">Across America</span>
                </h2>

                {/* Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {metrics.map((metric, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-8 text-center hover:scale-105 transition-all duration-300 shadow-md"
                        >
                            <div className="text-5xl font-bold text-neon-green mb-3">
                                {metric.value}
                            </div>
                            <p className="text-text-secondary">{metric.label}</p>
                        </div>
                    ))}
                </div>

                {/* Testimonials */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-6 hover:scale-105 transition-all duration-300 shadow-md"
                        >
                            <div className="text-bright-blue text-4xl mb-3 opacity-50">"</div>
                            <p className="text-text-secondary mb-6 leading-relaxed italic text-sm">
                                {testimonial.quote}
                            </p>
                            <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                                <div className="w-10 h-10 bg-neon-green/10 rounded-full flex items-center justify-center text-xl">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">{testimonial.name}</p>
                                    <p className="text-xs text-text-muted">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurImpact;
