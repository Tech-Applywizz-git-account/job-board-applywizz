import CategoryPageTemplate from '../components/CategoryPageTemplate';

const IndeedEasyApplyPage = () => {
    const breadcrumbItems = [
        { label: 'Home', link: '/' },
        { label: 'Job Listings', link: '/jobs' },
        { label: 'Indeed Easy Apply Jobs' },
    ];

    const sections = [
        {
            title: 'What is Indeed Easy Apply?',
            content: (
                <p>
                    Indeed Easy Apply is a streamlined application process that lets you apply to jobs on Indeed
                    with a single click. Similar to LinkedIn's Easy Apply, it uses your Indeed profile and uploaded
                    resume to automatically fill application forms, making the job search process much faster.
                </p>
            ),
        },
        {
            title: 'How It Works',
            content: (
                <ol className="list-decimal list-inside space-y-2">
                    <li>Create or update your Indeed profile with your latest resume</li>
                    <li>Browse ApplyWizz for Indeed Easy Apply jobs</li>
                    <li>Click to view the job on Indeed</li>
                    <li>Hit the "Easy Apply" button and submit instantly</li>
                </ol>
            ),
        },
    ];

    const faqs = [
        {
            question: 'Do I need an Indeed account?',
            answer: 'Yes, you need to create a free Indeed account and upload your resume to use Easy Apply.',
        },
        {
            question: 'Can employers see my full resume?',
            answer: 'Yes, employers receive the resume you have uploaded to your Indeed profile.',
        },
    ];

    return (
        <CategoryPageTemplate
            pageTitle="Indeed Easy Apply Jobs | Quick Applications | ApplyWizz"
            heading="Indeed Easy Apply Jobs"
            subheading="Quick-apply job listings on Indeed. 18,000+ jobs available."
            breadcrumbItems={breadcrumbItems}
            sections={sections}
            faqs={faqs}
        />
    );
};

export default IndeedEasyApplyPage;
