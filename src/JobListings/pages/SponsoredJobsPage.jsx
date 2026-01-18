import CategoryPageTemplate from '../components/CategoryPageTemplate';

const SponsoredJobsPage = () => {
    const breadcrumbItems = [
        { label: 'Home', link: '/' },
        { label: 'Job Listings', link: '/jobs' },
        { label: 'Sponsored Jobs' },
    ];

    const sections = [
        {
            title: 'What Are Sponsored Jobs?',
            content: (
                <>
                    <p className="mb-4">
                        Sponsored jobs are premium listings where employers pay for enhanced visibility. These jobs appear
                        at the top of search results and are marked with a "Sponsored" or "Featured" label.
                    </p>
                    <p>
                        <strong className="text-bright-blue">Important:</strong> Sponsored status only affects visibility —
                        the application process and hiring criteria remain exactly the same. These are real jobs from real companies.
                    </p>
                </>
            ),
        },
        {
            title: 'Benefits of Sponsored Jobs',
            content: (
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Higher visibility:</strong> Companies investing in promotion are actively hiring</li>
                    <li><strong>Faster hiring:</strong> Employers often fill sponsored roles more quickly</li>
                    <li><strong>Serious employers:</strong> Paid promotion indicates commitment to finding talent</li>
                    <li><strong>Well-funded roles:</strong> Companies with marketing budgets typically have strong hiring budgets</li>
                </ul>
            ),
        },
        {
            title: 'Equal Application Process',
            content: (
                <div className="bg-blue-50 border-l-4 border-bright-blue p-6 rounded">
                    <p className="mb-3">
                        <strong>All applicants are treated equally.</strong> Sponsored status does NOT mean:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>You need to pay to apply (applications are always free)</li>
                        <li>The job requirements are different</li>
                        <li>You'll be favored or disadvantaged in any way</li>
                    </ul>
                    <p className="mt-4 font-semibold">
                        Apply with confidence — sponsored jobs offer the same opportunities as regular listings.
                    </p>
                </div>
            ),
        },
    ];

    const faqs = [
        {
            question: 'Are sponsored jobs legitimate?',
            answer: 'Yes! Sponsored jobs are real positions from verified employers. The "sponsored" label just means the employer paid for premium placement.',
        },
        {
            question: 'Should I prioritize sponsored jobs?',
            answer: 'Not necessarily. While sponsored jobs indicate active hiring, focus on roles that match your skills and career goals, regardless of sponsorship status.',
        },
    ];

    return (
        <CategoryPageTemplate
            pageTitle="Sponsored Jobs | Featured Opportunities | ApplyWizz"
            heading="Sponsored / Featured Jobs"
            subheading="Premium job listings with enhanced visibility. 3,000+ featured opportunities."
            breadcrumbItems={breadcrumbItems}
            sections={sections}
            faqs={faqs}
        />
    );
};

export default SponsoredJobsPage;
