// Domain data for all 73+ domains
export const domains = [
    {
        id: 'software-engineering',
        name: 'Software Engineering',
        slug: 'software-engineering',
        totalJobs: 2340,
        icon: '💻',
        description: 'Build the future with cutting-edge technology. From startups to Fortune 500 companies, software engineers are in high demand across all industries.',
        growthTrend: '+15% year-over-year growth',
        whyApplyWizz: 'ApplyWizz matches your skills, experience, and preferences to the most relevant software engineering opportunities, saving you hours of searching.',

        jobTypes: [
            { title: 'Senior Software Engineer', count: 800 },
            { title: 'Full-Stack Developer', count: 650 },
            { title: 'Backend Engineer', count: 540 },
            { title: 'Frontend Engineer', count: 480 },
            { title: 'DevOps Engineer', count: 350 },
            { title: 'Cloud Engineer', count: 280 },
        ],

        experienceLevels: {
            entry: 300,
            mid: 1200,
            senior: 600,
            lead: 180,
            executive: 60,
        },

        workTypes: {
            remote: 1400,
            hybrid: 680,
            onsite: 260,
        },

        popularSkills: [
            'Python', 'JavaScript', 'AWS', 'Docker', 'Kubernetes',
            'React', 'Java', 'Go', 'Rust', 'TypeScript', 'Node.js',
            'PostgreSQL', 'MongoDB', 'GraphQL', 'CI/CD'
        ],

        salaryRanges: {
            entry: '$80K - $120K',
            mid: '$130K - $180K',
            senior: '$180K - $250K+',
            executive: '$250K+',
        },

        resources: [
            'How to Land Your First Software Engineering Job',
            'Top 10 Software Engineer Interview Questions',
            'Best Tools for Remote Software Engineers',
            'Salary Negotiation Guide for Developers',
        ],

        applicationTips: [
            'Highlight specific projects and quantifiable achievements',
            'Include GitHub profile and portfolio links',
            'Tailor your tech stack to each job description',
            'Prepare for coding challenges and system design questions',
        ],

        faqs: [
            {
                question: 'What skills do I need to be a software engineer?',
                answer: 'Core skills include programming languages (Python, JavaScript, Java), data structures, algorithms, version control (Git), and problem-solving. Modern roles also require cloud platforms (AWS, Azure), containerization (Docker), and frameworks (React, Node.js).',
            },
            {
                question: 'What\'s the average software engineer salary?',
                answer: 'Salaries vary by experience and location. Entry-level: $80K-$120K, Mid-level: $130K-$180K, Senior: $180K-$250K+. Tech hubs like San Francisco and Seattle typically offer 20-30% higher compensation.',
            },
            {
                question: 'How long does it take to get hired?',
                answer: 'The average hiring process takes 2-6 weeks from application to offer. This includes: initial screen (1 week), technical interviews (1-2 weeks), and final rounds (1-2 weeks). ApplyWizz helps you apply faster to increase your chances.',
            },
            {
                question: 'Should I apply to remote or on-site roles?',
                answer: 'Consider your priorities: remote offers flexibility and broader opportunities, while on-site provides in-person collaboration and networking. Many developers find hybrid roles offer the best of both worlds.',
            },
        ],
    },

    {
        id: 'data-science',
        name: 'Data Science',
        slug: 'data-science',
        totalJobs: 1850,
        icon: '📊',
        description: 'Transform data into insights. Data scientists are revolutionizing decision-making across healthcare, finance, e-commerce, and more.',
        growthTrend: '+22% year-over-year growth',
        whyApplyWizz: 'Find data science roles that match your specialization—whether ML engineering, analytics, or research—across companies of all sizes.',

        jobTypes: [
            { title: 'Senior Data Scientist', count: 620 },
            { title: 'Machine Learning Engineer', count: 540 },
            { title: 'Data Analyst', count: 380 },
            { title: 'ML Ops Engineer', count: 210 },
            { title: 'Research Scientist', count: 100 },
        ],

        experienceLevels: {
            entry: 250,
            mid: 980,
            senior: 480,
            lead: 110,
            executive: 30,
        },

        workTypes: {
            remote: 1100,
            hybrid: 550,
            onsite: 200,
        },

        popularSkills: [
            'Python', 'R', 'SQL', 'TensorFlow', 'PyTorch', 'Pandas',
            'NumPy', 'Scikit-learn', 'Tableau', 'Power BI', 'Spark',
            'Hadoop', 'AWS SageMaker', 'Azure ML', 'Statistical Analysis'
        ],

        salaryRanges: {
            entry: '$90K - $130K',
            mid: '$140K - $190K',
            senior: '$190K - $280K+',
            executive: '$280K+',
        },

        resources: [
            'Data Science Portfolio Projects That Get You Hired',
            'Machine Learning Interview Preparation Guide',
            'Top Data Science Certifications for 2026',
        ],

        applicationTips: [
            'Showcase end-to-end ML projects with measurable impact',
            'Include Kaggle competitions and open-source contributions',
            'Demonstrate both technical skills and business understanding',
            'Prepare to discuss model selection, evaluation, and deployment',
        ],

        faqs: [
            {
                question: 'What\'s the difference between Data Scientist and Data Analyst?',
                answer: 'Data Analysts focus on descriptive analysis and reporting using SQL and BI tools. Data Scientists build predictive models using ML/AI, requiring programming, statistics, and domain expertise.',
            },
            {
                question: 'Do I need a PhD to be a data scientist?',
                answer: 'No! While PhDs are common in research roles, most industry positions accept Master\'s degrees or even Bachelor\'s with relevant experience. Focus on building a strong portfolio of projects.',
            },
        ],
    },

    {
        id: 'product-management',
        name: 'Product Management',
        slug: 'product-management',
        totalJobs: 1420,
        icon: '🎯',
        description: 'Drive product strategy and execution. Product Managers bridge technology, business, and design to create products users love.',
        growthTrend: '+18% year-over-year growth',
        whyApplyWizz: 'Discover PM roles at startups, mid-size companies, and tech giants that align with your product expertise and career stage.',

        jobTypes: [
            { title: 'Senior Product Manager', count: 520 },
            { title: 'Product Manager', count: 450 },
            { title: 'Technical Product Manager', count: 280 },
            { title: 'Associate Product Manager', count: 120 },
            { title: 'Group Product Manager', count: 50 },
        ],

        experienceLevels: {
            entry: 150,
            mid: 720,
            senior: 420,
            lead: 100,
            executive: 30,
        },

        workTypes: {
            remote: 850,
            hybrid: 460,
            onsite: 110,
        },

        popularSkills: [
            'Product Strategy', 'Roadmap Planning', 'User Research', 'A/B Testing',
            'Agile/Scrum', 'SQL', 'Analytics', 'Figma', 'Jira', 'Confluence',
            'Data Analysis', 'Stakeholder Management', 'Go-to-Market Strategy'
        ],

        salaryRanges: {
            entry: '$100K - $140K',
            mid: '$150K - $200K',
            senior: '$200K - $300K+',
            executive: '$300K+',
        },

        resources: [
            'Product Manager Interview Frameworks',
            'Building a Product Management Portfolio',
            'From Engineer to Product Manager: Transition Guide',
        ],

        applicationTips: [
            'Highlight products you shipped with measurable outcomes',
            'Demonstrate user-centric thinking and data-driven decisions',
            'Show cross-functional leadership and communication skills',
            'Prepare product case studies and prioritization frameworks',
        ],

        faqs: [
            {
                question: 'What background do I need for Product Management?',
                answer: 'PMs come from diverse backgrounds: engineering, design, consulting, MBA programs, or internal transitions. Key is demonstrating product thinking, technical understanding, and user empathy.',
            },
            {
                question: 'Technical PM vs Product Manager - what\'s the difference?',
                answer: 'Technical PMs work on highly technical products (APIs, developer tools, infrastructure) and need deeper engineering knowledge. Product Managers focus more on user-facing features and business strategy.',
            },
        ],
    },
];

// Additional domains (abbreviated data)
export const allDomains = [
    ...domains,
    { id: 'marketing', name: 'Marketing', slug: 'marketing', totalJobs: 1680, icon: '📢' },
    { id: 'design', name: 'UX/UI Design', slug: 'design', totalJobs: 940, icon: '🎨' },
    { id: 'sales', name: 'Sales', slug: 'sales', totalJobs: 2100, icon: '💼' },
    { id: 'finance', name: 'Finance', slug: 'finance', totalJobs: 1350, icon: '💰' },
    { id: 'hr', name: 'Human Resources', slug: 'hr', totalJobs: 820, icon: '👥' },
    { id: 'devops', name: 'DevOps', slug: 'devops', totalJobs: 1190, icon: '⚙️' },
    { id: 'customer-success', name: 'Customer Success', slug: 'customer-success', totalJobs: 760, icon: '🤝' },
    { id: 'project-management', name: 'Project Management', slug: 'project-management', totalJobs: 1050, icon: '📋' },
];
