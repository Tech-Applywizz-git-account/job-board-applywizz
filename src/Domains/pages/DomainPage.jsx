import { useEffect } from 'react';
import Breadcrumb from '../../JobListings/components/Breadcrumb';
import FilterBar from '../../JobListings/components/FilterBar';
import JobCard from '../../JobListings/components/JobCard';
import { sampleJobs } from '../../JobListings/data/jobsData';

// Domain Section Components
import DomainIntro from '../components/DomainIntro';
import JobTypesSection from '../components/JobTypesSection';
import ExperienceLevelsSection from '../components/ExperienceLevelsSection';
import WorkTypesSection from '../components/WorkTypesSection';
import PopularSkillsSection from '../components/PopularSkillsSection';
import SalarySection from '../components/SalarySection';
import ResourcesSection from '../components/ResourcesSection';
import ApplicationTipsSection from '../components/ApplicationTipsSection';
import FAQSection from '../components/FAQSection';
import DomainCTA from '../components/DomainCTA';

const DomainPage = ({ domain }) => {
    useEffect(() => {
        document.title = `${domain.name} Jobs | Hiring Now | ApplyWizz`;
        window.scrollTo(0, 0);
    }, [domain.name]);

    const breadcrumbItems = [
        { label: 'Home', link: '/' },
        { label: 'Domains', link: '/domains' },
        { label: `${domain.name} Jobs` },
    ];

    return (
        <div className="pt-24 pb-20">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Breadcrumb items={breadcrumbItems} />

                {/* Page Header */}
                <div className="mb-12">
                    <div className="flex items-center space-x-4 mb-4">
                        <span className="text-6xl">{domain.icon}</span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold">
                            {domain.name} Jobs
                        </h1>
                    </div>
                    <p className="text-xl text-text-secondary max-w-4xl mb-4">
                        {domain.totalJobs}+ jobs across all experience levels • {domain.growthTrend}
                    </p>
                </div>

                {/* Domain Introduction */}
                <DomainIntro domain={domain} />

                {/* Job Types Available */}
                <JobTypesSection domain={domain} />

                {/* Experience Levels Breakdown */}
                <ExperienceLevelsSection domain={domain} />

                {/* Work Type Breakdown */}
                <WorkTypesSection domain={domain} />
            </div>

            {/* Filter Bar */}
            <FilterBar />

            {/* Featured Jobs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <h2 className="text-3xl font-bold mb-8">Featured {domain.name} Jobs</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {sampleJobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
                <div className="text-center">
                    <button className="btn-secondary text-lg px-10">
                        Load More Jobs
                    </button>
                </div>
            </div>

            {/* Popular Skills */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                <PopularSkillsSection domain={domain} />
            </div>

            {/* Salary Expectations */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                <SalarySection domain={domain} />
            </div>

            {/* Resources */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                <ResourcesSection domain={domain} />
            </div>

            {/* Application Tips */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                <ApplicationTipsSection domain={domain} />
            </div>

            {/* FAQ */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                <FAQSection domain={domain} />
            </div>

            {/* Final CTA */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                <DomainCTA domain={domain} />
            </div>
        </div>
    );
};

export default DomainPage;
