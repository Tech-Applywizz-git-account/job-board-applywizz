import CategoryPageTemplate from '../components/CategoryPageTemplate';

const W2ContractsPage = () => {
    const breadcrumbItems = [
        { label: 'Home', link: '/' },
        { label: 'Job Listings', link: '/jobs' },
        { label: 'W2 Contract Jobs' },
    ];

    const sections = [
        {
            title: 'What is a W2 Contract?',
            content: (
                <>
                    <p className="mb-4">
                        A W2 contract position means you work as an employee of a staffing company or consulting firm,
                        not as an independent contractor. You receive a W2 tax form at year-end, and the employer handles
                        payroll taxes, benefits, and may offer healthcare.
                    </p>
                    <p>
                        W2 contracts typically last 3-12 months and can convert to full-time employment. They offer
                        stability with contract flexibility.
                    </p>
                </>
            ),
        },
        {
            title: 'W2 vs C2C Comparison',
            content: (
                <div className="overflow-x-auto">
                    <table className="w-full bg-white rounded-lg overflow-hidden">
                        <thead className="bg-secondary-bg">
                            <tr>
                                <th className="px-6 py-4 text-left font-bold">Feature</th>
                                <th className="px-6 py-4 text-left font-bold">W2 Contract</th>
                                <th className="px-6 py-4 text-left font-bold">C2C Contract</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr>
                                <td className="px-6 py-4 font-semibold">Tax Handling</td>
                                <td className="px-6 py-4">Employer withholds taxes</td>
                                <td className="px-6 py-4">You pay taxes quarterly</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-semibold">Benefits</td>
                                <td className="px-6 py-4">Often included</td>
                                <td className="px-6 py-4">Self-provided</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-semibold">Hourly Rate</td>
                                <td className="px-6 py-4">Lower ($50-80/hr typical)</td>
                                <td className="px-6 py-4">Higher ($80-150/hr typical)</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-semibold">Best For</td>
                                <td className="px-6 py-4">Stability seekers</td>
                                <td className="px-6 py-4">Experienced contractors</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ),
        },
        {
            title: 'Benefits Overview',
            content: (
                <ul className="list-disc list-inside space-y-2">
                    <li>Healthcare and insurance often provided</li>
                    <li>Paid holidays and vacation time (varies by company)</li>
                    <li>No quarterly tax filings — handled by employer</li>
                    <li>Potential for conversion to full-time employment</li>
                    <li>Unemployment eligibility in most states</li>
                </ul>
            ),
        },
    ];

    const faqs = [
        {
            question: 'Can W2 contracts convert to full-time?',
            answer: 'Yes! Many W2 contracts include a "temp-to-perm" option where you can convert to a full-time employee after the contract period.',
        },
        {
            question: 'Do I get benefits on W2 contracts?',
            answer: 'It depends on the staffing company. Many offer healthcare, 401k, and paid time off, though benefits may not be as comprehensive as full-time roles.',
        },
    ];

    return (
        <CategoryPageTemplate
            pageTitle="W2 Contract Jobs | Full-Time Contracts with Benefits"
            heading="W2 Contract Jobs — Full-Time Contracts with Benefits"
            subheading="5,000+ jobs with healthcare, payroll tax, and benefits."
            breadcrumbItems={breadcrumbItems}
            sections={sections}
            faqs={faqs}
        />
    );
};

export default W2ContractsPage;
