import CategoryPageTemplate from '../components/CategoryPageTemplate';

const CareerPortalsPage = () => {
    const breadcrumbItems = [
        { label: 'Home', link: '/' },
        { label: 'Job Listings', link: '/jobs' },
        { label: 'Career Portal Jobs' },
    ];

    const sections = [
        {
            title: 'What are Career Portal Jobs?',
            content: (
                <>
                    <p className="mb-4">
                        Career Portal jobs are positions posted directly on a company's official career website.
                        These are direct applications where you submit your resume and information straight to the employer,
                        bypassing third-party platforms.
                    </p>
                    <p>
                        Career portals often provide the most detailed job descriptions, company culture insights,
                        and direct communication with hiring teams. Many top companies including Google, Microsoft, Amazon,
                        and thousands of others maintain their own career portals.
                    </p>
                </>
            ),
        },
        {
            title: 'How to Apply to Career Portal Jobs',
            content: (
                <>
                    <ol className="list-decimal list-inside space-y-3">
                        <li><strong>Find the right job:</strong> Browse our curated list of career portal opportunities</li>
                        <li><strong>Click "View Job":</strong> You'll be directed to the official company career page</li>
                        <li><strong>Create an account:</strong> Most companies require you to create a candidate profile</li>
                        <li><strong>Upload your resume:</strong> Submit your most up-to-date resume and information</li>
                        <li><strong>Track your application:</strong> Monitor status through the company's portal</li>
                    </ol>
                </>
            ),
        },
        {
            title: 'Benefits of Career Portal Applications',
            content: (
                <>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Direct connection with hiring teams and recruiters</li>
                        <li>Most comprehensive job descriptions and requirements</li>
                        <li>Access to company culture, benefits, and team information</li>
                        <li>Application tracking and status updates</li>
                        <li>Often higher response rates than third-party platforms</li>
                        <li>Build relationships directly with target companies</li>
                    </ul>
                </>
            ),
        },
        {
            title: 'Top Companies with Career Portals',
            content: (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-secondary-bg p-4 rounded-lg text-center font-semibold">Google Careers</div>
                        <div className="bg-secondary-bg p-4 rounded-lg text-center font-semibold">Microsoft Careers</div>
                        <div className="bg-secondary-bg p-4 rounded-lg text-center font-semibold">Amazon Jobs</div>
                        <div className="bg-secondary-bg p-4 rounded-lg text-center font-semibold">Apple Careers</div>
                        <div className="bg-secondary-bg p-4 rounded-lg text-center font-semibold">Meta Careers</div>
                        <div className="bg-secondary-bg p-4 rounded-lg text-center font-semibold">Tesla Careers</div>
                        <div className="bg-secondary-bg p-4 rounded-lg text-center font-semibold">Netflix Jobs</div>
                        <div className="bg-secondary-bg p-4 rounded-lg text-center font-semibold">Salesforce Careers</div>
                    </div>
                </>
            ),
        },
    ];

    const faqs = [
        {
            question: 'Are career portal jobs better than jobs on LinkedIn or Indeed?',
            answer: 'Career portal jobs aren\'t necessarily "better," but they offer direct access to the employer and often provide more detailed information. They\'re ideal if you\'re targeting specific companies.',
        },
        {
            question: 'Do I need to create separate accounts for each company?',
            answer: 'Yes, most companies require you to create a candidate profile on their career portal. However, once created, your profile is saved for future applications to that company.',
        },
        {
            question: 'How long does it take to hear back from career portal applications?',
            answer: 'Response times vary by company, but typically you can expect an initial response within 1-2 weeks for active positions. Some companies provide automated updates.',
        },
        {
            question: 'Can I apply to the same company through multiple portals?',
            answer: 'It\'s best to apply through one channel only. If a job appears on both the career portal and LinkedIn, apply through the career portal for direct access.',
        },
    ];

    return (
        <CategoryPageTemplate
            pageTitle="Career Portal Job Listings | ApplyWizz"
            heading="Direct Career Portal Jobs"
            subheading="Apply directly on official company websites. 25,000+ jobs available."
            breadcrumbItems={breadcrumbItems}
            sections={sections}
            faqs={faqs}
        />
    );
};

export default CareerPortalsPage;
