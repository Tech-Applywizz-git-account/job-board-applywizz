import { useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import FilterBar from '../components/FilterBar';
import JobCard from '../components/JobCard';
import { sampleJobs } from '../data/jobsData';

const CategoryPageTemplate = ({
    pageTitle,
    heading,
    subheading,
    breadcrumbItems,
    sections,
    faqs
}) => {
    useEffect(() => {
        document.title = pageTitle;
        window.scrollTo(0, 0);
    }, [pageTitle]);

    return (
        <div className="pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <Breadcrumb items={breadcrumbItems} />

                {/* Page Header */}
                <div className="mb-12">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-4">
                        {heading}
                    </h1>
                    <p className="text-xl text-text-secondary max-w-3xl">
                        {subheading}
                    </p>
                </div>

                {/* Educational Content Sections */}
                {sections && sections.map((section, index) => (
                    <div key={index} className="mb-12 bg-white rounded-2xl p-8 shadow-md border border-gray-200">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">{section.title}</h2>
                        <div className="prose prose-lg max-w-none text-text-secondary">
                            {section.content}
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter Bar - Sticky */}
            <FilterBar />

            {/* Job Listings Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {sampleJobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>

                {/* Load More */}
                <div className="text-center">
                    <button className="btn-secondary text-lg px-10">
                        Load More Jobs
                    </button>
                </div>
            </div>

            {/* FAQ Section */}
            {faqs && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                    <div className="bg-secondary-bg rounded-2xl p-8">
                        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {faqs.map((faq, index) => (
                                <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                                    <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                                    <p className="text-text-secondary">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* CTA */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                <div className="text-center bg-white rounded-3xl p-12 shadow-xl border-2 border-neon-green/20">
                    <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
                        Start Applying Today
                    </h2>
                    <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
                        Join thousands of job seekers who found their perfect role through ApplyWizz
                    </p>
                    <button className="btn-primary text-lg px-10">
                        Browse All Jobs
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryPageTemplate;
