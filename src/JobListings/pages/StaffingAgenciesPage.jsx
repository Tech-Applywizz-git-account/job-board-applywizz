import CategoryPageTemplate from '../components/CategoryPageTemplate';

const StaffingAgenciesPage = () => {
    const breadcrumbItems = [
        { label: 'Home', link: '/' },
        { label: 'Job Listings', link: '/jobs' },
        { label: 'Staffing Agency Jobs' },
    ];

    const sections = [
        {
            title: 'What Do Staffing Agencies Do?',
            content: (
                <>
                    <p className="mb-4">
                        Staffing agencies (also called recruitment firms) connect job seekers with companies hiring
                        for temporary, contract, or permanent positions. They handle the entire hiring process — from
                        sourcing candidates to onboarding.
                    </p>
                    <p>
                        Working with agencies can give you access to unadvertised jobs and personalized career guidance
                        from experienced recruiters.
                    </p>
                </>
            ),
        },
        {
            title: 'Top Staffing Agencies',
            content: (
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                        <div className="text-4xl mb-3">🏢</div>
                        <h4 className="font-bold text-lg mb-2">Randstad</h4>
                        <p className="text-sm text-text-secondary">Global leader in HR services</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                        <div className="text-4xl mb-3">💼</div>
                        <h4 className="font-bold text-lg mb-2">Robert Half</h4>
                        <p className="text-sm text-text-secondary">Specialized professional staffing</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                        <div className="text-4xl mb-3">🎯</div>
                        <h4 className="font-bold text-lg mb-2">Insight Global</h4>
                        <p className="text-sm text-text-secondary">IT & tech staffing experts</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                        <div className="text-4xl mb-3">⚡</div>
                        <h4 className="font-bold text-lg mb-2">Apex Systems</h4>
                        <p className="text-sm text-text-secondary">Technology talent solutions</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                        <div className="text-4xl mb-3">🚀</div>
                        <h4 className="font-bold text-lg mb-2">TEKsystems</h4>
                        <p className="text-sm text-text-secondary">IT staffing & services</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                        <div className="text-4xl mb-3">💡</div>
                        <h4 className="font-bold text-lg mb-2">Adecco</h4>
                        <p className="text-sm text-text-secondary">Workforce solutions leader</p>
                    </div>
                </div>
            ),
        },
        {
            title: 'Types of Roles Through Agencies',
            content: (
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Contract roles:</strong> Short-term projects (3-12 months)</li>
                    <li><strong>Contract-to-hire:</strong> Trial period before permanent offer</li>
                    <li><strong>Direct hire:</strong> Permanent positions sourced by agencies</li>
                    <li><strong>Temp work:</strong> Short-term coverage (days to weeks)</li>
                </ul>
            ),
        },
        {
            title: 'How the Process Works',
            content: (
                <ol className="list-decimal list-inside space-y-3">
                    <li>Apply to agency-posted jobs on ApplyWizz</li>
                    <li>Agency recruiter reviews your application</li>
                    <li>Phone or video interview with recruiter</li>
                    <li>Recruiter submits you to client companies</li>
                    <li>Client interview (if selected)</li>
                    <li>Offer extended through the agency</li>
                </ol>
            ),
        },
    ];

    const faqs = [
        {
            question: 'Do staffing agencies charge job seekers?',
            answer: 'No! Staffing agencies are paid by the hiring companies, not by job seekers. Their services are completely free for candidates.',
        },
        {
            question: 'Can I work with multiple staffing agencies?',
            answer: 'Yes, you can register with multiple agencies to maximize your job opportunities. Just be transparent if you\'re submitted to the same role by different agencies.',
        },
    ];

    return (
        <CategoryPageTemplate
            pageTitle="Staffing Agency Jobs | Recruitment Firms | ApplyWizz"
            heading="Staffing Agency Jobs"
            subheading="Jobs posted by top recruitment and staffing firms. 12,000+ opportunities."
            breadcrumbItems={breadcrumbItems}
            sections={sections}
            faqs={faqs}
        />
    );
};

export default StaffingAgenciesPage;
