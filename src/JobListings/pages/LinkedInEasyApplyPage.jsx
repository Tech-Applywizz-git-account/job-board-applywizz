import CategoryPageTemplate from '../components/CategoryPageTemplate';

const LinkedInEasyApplyPage = () => {
    const breadcrumbItems = [
        { label: 'Home', link: '/' },
        { label: 'Job Listings', link: '/jobs' },
        { label: 'LinkedIn Easy Apply Jobs' },
    ];

    const sections = [
        {
            title: 'What is LinkedIn Easy Apply?',
            content: (
                <>
                    <p className="mb-4">
                        LinkedIn Easy Apply allows you to apply to jobs with just one click using your LinkedIn profile.
                        No need to fill out long application forms or upload your resume repeatedly — your LinkedIn profile
                        serves as your application.
                    </p>
                    <p>
                        With over 22,000+ Easy Apply jobs on ApplyWizz, you can apply to dozens of positions in minutes,
                        dramatically increasing your chances of landing interviews.
                    </p>
                </>
            ),
        },
        {
            title: 'Benefits of LinkedIn Easy Apply',
            content: (
                <>
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Apply in seconds:</strong> One-click applications save massive amounts of time</li>
                        <li><strong>Higher application volume:</strong> Apply to more jobs, get more interviews</li>
                        <li><strong>Profile visibility:</strong> Recruiters can view your full LinkedIn profile</li>
                        <li><strong>Easy tracking:</strong> All applications tracked in one place on LinkedIn</li>
                        <li><strong>Mobile-friendly:</strong> Apply from anywhere using the LinkedIn app</li>
                    </ul>
                </>
            ),
        },
        {
            title: 'How LinkedIn Easy Apply Works',
            content: (
                <>
                    <div className="bg-secondary-bg p-6 rounded-xl">
                        <ol className="list-decimal list-inside space-y-3">
                            <li>Browse Easy Apply jobs on ApplyWizz</li>
                            <li>Click "View Job" to open on LinkedIn</li>
                            <li>Click the "Easy Apply" button</li>
                            <li>Review auto-filled information from your profile</li>
                            <li>Submit with one click — done!</li>
                        </ol>
                    </div>
                </>
            ),
        },
        {
            title: 'LinkedIn Profile Tips for Easy Apply',
            content: (
                <>
                    <p className="mb-4">To maximize your Easy Apply success:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Keep your LinkedIn profile complete and up-to-date</li>
                        <li>Add a professional headshot</li>
                        <li>Include detailed work experience with accomplishments</li>
                        <li>List relevant skills and get endorsements</li>
                        <li>Request recommendations from colleagues</li>
                        <li>Enable "Open to Work" for recruiter visibility</li>
                    </ul>
                </>
            ),
        },
    ];

    const faqs = [
        {
            question: 'Is Easy Apply less effective than traditional applications?',
            answer: 'No! Easy Apply is just a faster application method. Recruiters review Easy Apply applications the same way as traditional ones. The key is having a strong LinkedIn profile.',
        },
        {
            question: 'Will my LinkedIn profile be shared with employers?',
            answer: 'Yes, when you use Easy Apply, employers can view your full public LinkedIn profile along with your application.',
        },
        {
            question: 'Can I customize my Easy Apply application?',
            answer: 'Some Easy Apply postings allow you to add a cover letter or additional documents. You\'ll see these options before submitting.',
        },
    ];

    return (
        <CategoryPageTemplate
            pageTitle="LinkedIn Easy Apply Jobs | Apply in One Click | ApplyWizz"
            heading="LinkedIn Easy Apply Jobs"
            subheading="Apply to 22,000+ jobs with one click."
            breadcrumbItems={breadcrumbItems}
            sections={sections}
            faqs={faqs}
        />
    );
};

export default LinkedInEasyApplyPage;
