const AboutFAQ = () => {
    const faqs = [
        {
            question: 'Is ApplyWizz free to use?',
            answer: 'Yes! ApplyWizz is completely free for job seekers. We believe everyone deserves access to relevant job opportunities without barriers.',
        },
        {
            question: 'How does the matching algorithm work?',
            answer: 'We analyze your resume to understand your skills, experience, and qualifications. Then we compare this against job requirements to calculate a relevance score (0-100) for each position. Jobs are ranked so you see the most relevant opportunities first.',
        },
        {
            question: 'Where do the jobs come from?',
            answer: 'We aggregate jobs from 5+ major sources including LinkedIn Easy Apply, Indeed, company career portals, contract job boards, and staffing agencies. This gives you access to 70,000+ opportunities in one place.',
        },
        {
            question: 'How often are jobs updated?',
            answer: 'Our platform updates hourly to ensure you only see fresh job postings. We automatically remove jobs older than 24 hours so you never waste time on stale listings.',
        },
        {
            question: 'What locations are supported?',
            answer: 'ApplyWizz currently focuses on jobs in the United States, with opportunities across all 50 states. We support remote, hybrid, and on-site positions nationwide.',
        },
        {
            question: 'Can I save jobs or set up alerts?',
            answer: 'Yes! Once you create a profile, you can save jobs to review later and set up customized job alerts based on your preferences. You will get notified when new matching jobs are posted.',
        },
        {
            question: 'Do employers see my profile?',
            answer: 'Your profile is private. Employers only see your information when you actively apply to their jobs. We never share your data without your explicit consent.',
        },
    ];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary-bg">
            <div className="max-w-7xl mx-auto">
                <div className="max-w-4xl mr-auto">
                    <h2 className="text-4xl sm:text-5xl font-display font-bold mb-16">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                                <h3 className="text-lg font-bold mb-3 text-bright-blue">{faq.question}</h3>
                                <p className="text-text-secondary leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutFAQ;
