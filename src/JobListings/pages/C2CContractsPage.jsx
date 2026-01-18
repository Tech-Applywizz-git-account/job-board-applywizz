import CategoryPageTemplate from '../components/CategoryPageTemplate';

const C2CContractsPage = () => {
    const breadcrumbItems = [
        { label: 'Home', link: '/' },
        { label: 'Job Listings', link: '/jobs' },
        { label: 'C2C Contract Jobs' },
    ];

    const sections = [
        {
            title: 'What is C2C (Corp-to-Corp)?',
            content: (
                <>
                    <p className="mb-4">
                        C2C (Corp-to-Corp) means you work as an independent contractor through your own corporation or LLC.
                        The client company contracts with your business entity, not you personally. This offers maximum
                        flexibility and typically higher rates.
                    </p>
                    <p className="font-semibold text-bright-blue">
                        Note: C2C requires you to handle your own taxes, insurance, and business expenses.
                    </p>
                </>
            ),
        },
        {
            title: 'Benefits of C2C Contracting',
            content: (
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Higher rates:</strong> Typically 20-40% higher than W2 contracts</li>
                    <li><strong>Tax deductions:</strong> Write off business expenses, home office, equipment</li>
                    <li><strong>Flexibility:</strong> Work on your own terms and scheduleult</li>
                    <li><strong>Multiple clients:</strong> Can work for several companies simultaneously</li>
                    <li><strong>Business growth:</strong> Build your consulting business over time</li>
                </ul>
            ),
        },
        {
            title: 'Requirements for C2C',
            content: (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
                    <p className="font-semibold mb-3">Before pursuing C2C contracts, you need:</p>
                    <ol className="list-decimal list-inside space-y-2">
                        <li>Your own LLC or S-Corp registered</li>
                        <li>Employer Identification Number (EIN) from the IRS</li>
                        <li>Business liability insurance</li>
                        <li>Business bank account</li>
                        <li>Understanding of quarterly tax payments</li>
                    </ol>
                </div>
            ),
        },
    ];

    const faqs = [
        {
            question: 'Is C2C better than W2?',
            answer: 'It depends on your situation. C2C offers higher pay and flexibility but requires more administrative work and self-discipline. Best for experienced contractors.',
        },
        {
            question: 'Do I need a lawyer to set up C2C?',
            answer: 'Not necessarily, but it\'s recommended to consult with a business attorney and accountant to ensure proper setup and tax compliance.',
        },
    ];

    return (
        <CategoryPageTemplate
            pageTitle="C2C Contract Jobs | Corp-to-Corp Opportunities"
            heading="C2C Contract Jobs — Higher Rates, Maximum Flexibility"
            subheading="4,500+ independent contractor roles with competitive rates."
            breadcrumbItems={breadcrumbItems}
            sections={sections}
            faqs={faqs}
        />
    );
};

export default C2CContractsPage;
