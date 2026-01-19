import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { onboardSupabase, onboardSupabaseAdmin } from '../lib/onboardingSupabaseClient';
import { supabase } from '../lib/supabaseClient'; // Main DB Client
import { uploadResumeToS3 } from '../lib/s3Service';

const ClientOnboarding = () => {
    const [searchParams] = useSearchParams();
    const jbIdRaw = searchParams.get('jb_id');

    // Decode the obfuscated JB-ID (e.g. 74-66-45-50 back to JB-2)
    const jbIdFromUrl = (() => {
        if (!jbIdRaw) return null;
        // Check if encoded (only numbers and dashes, no letters)
        if (/^[0-9-]+$/.test(jbIdRaw) && !/[a-zA-Z]/.test(jbIdRaw)) {
            try {
                return jbIdRaw.split('-').map(code => String.fromCharCode(parseInt(code))).join('');
            } catch (e) {
                console.warn("Failed to decode JB-ID", e);
                return jbIdRaw;
            }
        }
        return jbIdRaw;
    })();
    const [isAutoFilled, setIsAutoFilled] = useState(false);
    const [isLoadingFromUrl, setIsLoadingFromUrl] = useState(false);

    // Ref for dropdown click-outside detection
    const jobRoleDropdownRef = useRef(null);

    const [formData, setFormData] = useState({
        full_name: '',
        company_email: '',
        personal_email: '',
        whatsapp_number: '',
        callable_phone: '',
        gender: '',
        experience: '',
        job_role_preferences: [],
        alternate_job_roles: '',
        highest_education: '',
        university_name: '',
        cumulative_gpa: '',
        graduation_year: '',
        main_subject: '',
        visa_type: '',
        sponsorship: false,
        state_of_residence: '',
        zip_or_country: '',
        location_preferences: '',
        work_preferences: '', // Remote, Hybrid, On-site, All
        willing_to_relocate: false,
        add_ons_info: ['job-links'],
        start_date: '', // Prefilled from plan_started
        desired_start_date: '',
        end_date: '', // End date for availability
        no_of_applications: '',
        exclude_companies: '',
        salary_range: '',
        applywizz_id: '',
        resume_url: '',
        linked_in_url: '',
        github_url: '',
        badge_value: '',
        is_over_18: false,
        eligible_to_work_in_us: false,
        authorized_without_visa: false,
        require_future_sponsorship: false,
        can_perform_essential_functions: false,
        worked_for_company_before: false,
        discharged_for_policy_violation: false,
        referred_by_agency: false,
        can_work_3_days_in_office: false,
        convicted_of_felony: false,
        felony_explanation: '',
        pending_investigation: false,
        willing_background_check: false,
        willing_drug_screen: false,
        failed_or_refused_drug_test: false,
        uses_substances_affecting_duties: false,
        substances_description: '',
        can_provide_legal_docs: false,
        is_hispanic_latino: false,
        race_ethnicity: '',
        veteran_status: '',
        disability_status: '',
        has_relatives_in_company: false,
        relatives_details: ''
    });

    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isJobRoleDropdownOpen, setIsJobRoleDropdownOpen] = useState(false);
    const [jobRoleSearchTerm, setJobRoleSearchTerm] = useState('');
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [manualJbId, setManualJbId] = useState(''); // For manual JB ID entry
    const [isFetchingDetails, setIsFetchingDetails] = useState(false);

    // Options
    const GENDER_OPTIONS = ["Male", "Female", "Other", "Prefer Not to Say"];
    const WORK_AUTH_OPTIONS = ["F1", "H1B", "Green Card", "Citizen", "H4EAD", "Other"];
    const WORK_PREF_OPTIONS = ["Remote", "Hybrid", "On-site", "All"];
    const EDUCATION_OPTIONS = ["High School", "Associate Degree", "Bachelor's Degree", "Master's Degree", "PhD", "Other"];
    const JOB_ROLE_OPTIONS = [
        "Active Directory", "Anti Money Laundering (AML)", "Biotechnology", "Biotechnology Internship",
        "Business Analyst", "Business Intelligence Engineer", "CLINICAL DATA ANALYST", "Clinical Research Coordinator",
        "Computer Science", "Computer Science Internship", "Construction Management", "CRM Sales", "Cyber security",
        "Cybersecurity for UK", "Data Analyst", "Data Analyst Internships", "Data Engineer", "Data science early grad",
        "Data Science for Germany", "Data Scientist", "Data engineer", "Machine learning Developer", "DevOps",
        "Electrical Engineer", "Electrical Project", "Electronic Health Records (EHR)", "Embedded software",
        "Embedded Software Engineer", "Environmental Health and Safety (EHS)", "Financial analyst",
        "Financial Analyst & KYC Analyst & AML", "Financial Data Analyst", "Full Stack", "Generative AI",
        "Health care data analyst", "Healthcare data analyst", "Health care business analyst",
        "Healthcare data engineer", "Healthcare Data Science", "HR Recruiter", "Java Developer", "Java Full Stack",
        "Manufacturing engineer (Mechanical)", "Mechanical Engineer", "Medical Coding", ".Net", "Network Engineer",
        "Payroll Analyst", "Project Management", "Project Management Internship", "python developer",
        "Quality Engineer", "Regulatory Affairs", "Safety Analyst", "Salesforce Developer", "SAP",
        "Sap basis and security", "SAP MM", "Scrum Master", "ServiceNow Developer", "Software Developer",
        "Software Engineer", "Supply Chain", "Tax analyst", "UX Designer", "Workday Analyst"
    ];

    const filteredJobRoles = JOB_ROLE_OPTIONS.filter(role =>
        role.toLowerCase().includes(jobRoleSearchTerm.toLowerCase())
    );

    // Fetch client details from Supabase
    const fetchClientDetails = async (jbIdToFetch) => {
        if (!jbIdToFetch) {
            alert("Please enter a JB ID");
            return Promise.reject(new Error("No JB ID provided"));
        }

        setIsFetchingDetails(true);
        try {
            const { data, error } = await supabase
                .from('jobboard_transactions')
                .select('*')
                .eq('jb_id', jbIdToFetch)
                .single();

            if (error) throw error;

            if (data) {
                setFormData(prev => ({
                    ...prev,
                    full_name: data.full_name || '',
                    company_email: data.email || '',
                    personal_email: data.email || '',
                    applywizz_id: data.jb_id || '',
                    gender: data.gender || '',
                    state_of_residence: data.location || '',
                    zip_or_country: data.country || '',
                    start_date: data.plan_started ? data.plan_started.split('T')[0] : new Date().toISOString().split('T')[0],
                    whatsapp_number: data.mobile_number || '',
                    callable_phone: data.mobile_number || ''
                }));
                // Only show alert if manually fetched (not from URL)
                if (!jbIdFromUrl) {
                    alert(`✅ Details loaded for ${data.full_name}!`);
                }
                return Promise.resolve(data);
            } else {
                alert("No client found with this JB ID");
                return Promise.reject(new Error("No client found"));
            }
        } catch (err) {
            console.error("Error fetching transaction:", err);
            alert(`Failed to load client details: ${err.message}`);
            return Promise.reject(err);
        } finally {
            setIsFetchingDetails(false);
        }
    };


    // Auto-fetch if jb_id is in URL (from email link)
    useEffect(() => {
        if (jbIdFromUrl) {
            setIsLoadingFromUrl(true);
            setManualJbId(jbIdFromUrl);
            fetchClientDetails(jbIdFromUrl).then(() => {
                setIsAutoFilled(true);
                setIsLoadingFromUrl(false);
            }).catch(() => {
                setIsLoadingFromUrl(false);
            });
        }
    }, [jbIdFromUrl]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (jobRoleDropdownRef.current && !jobRoleDropdownRef.current.contains(event.target)) {
                setIsJobRoleDropdownOpen(false);
            }
        };

        // Add event listener when dropdown is open
        if (isJobRoleDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isJobRoleDropdownOpen]);

    // Handle manual fetch button click
    const handleFetchDetails = () => {
        fetchClientDetails(manualJbId);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setResumeFile(e.target.files[0]);
        }
    };

    const handleJobRoleToggle = (role) => {
        setFormData(prev => {
            const currentRoles = prev.job_role_preferences;
            if (currentRoles.includes(role)) {
                return { ...prev, job_role_preferences: currentRoles.filter(r => r !== role) };
            } else {
                return { ...prev, job_role_preferences: [...currentRoles, role] };
            }
        });
    };

    const handleDirectOnboard = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // A. Upload Resume to S3
            let uploadedResumeKey = formData.resume_url;
            if (resumeFile) {
                if (!formData.applywizz_id) throw new Error("JB ID is required before uploading resume.");
                uploadedResumeKey = await uploadResumeToS3(resumeFile, formData.applywizz_id);
            } else if (!uploadedResumeKey) {
                throw new Error("Please upload a resume file.");
            }

            // B. Prepare payload for ApplyWizz API
            const apiPayload = {
                // Required fields
                full_name: formData.full_name,
                email: formData.company_email || formData.personal_email,
                phone: formData.whatsapp_number || formData.callable_phone,
                experience: String(formData.experience), // Ensure string
                applywizz_id: formData.applywizz_id,
                gender: formData.gender,
                state_of_residence: formData.state_of_residence,
                zip_or_country: formData.zip_or_country,
                resume_s3_path: uploadedResumeKey,
                start_date: formData.start_date || formData.desired_start_date,
                job_role_preferences: formData.job_role_preferences,
                visa_type: formData.visa_type,
                location_preferences: Array.isArray(formData.location_preferences)
                    ? formData.location_preferences
                    : formData.location_preferences ? [formData.location_preferences] : [],
                salary_range: formData.salary_range,
                // Ensure work_preferences is a single string and VALID (Remote/Hybrid/On-site/All)
                work_preferences: (() => {
                    const rawPref = Array.isArray(formData.work_preferences)
                        ? formData.work_preferences[0]
                        : (formData.work_preferences || "Remote");

                    const allowedPrefs = ['Remote', 'Hybrid', 'On-site', 'All'];
                    // Case-insensitive match check
                    const match = allowedPrefs.find(p => p.toLowerCase() === String(rawPref).toLowerCase());
                    return match || "Remote"; // Default to Remote if invalid
                })(),
                sponsorship: Boolean(formData.sponsorship),

                // Optional fields
                github_url: formData.github_url || "",
                linked_in_url: formData.linked_in_url || "",
                end_date: formData.end_date || "",
                willing_to_relocate: Boolean(formData.willing_to_relocate),
                alternate_job_roles: formData.alternate_job_roles
                    ? (Array.isArray(formData.alternate_job_roles)
                        ? formData.alternate_job_roles
                        : formData.alternate_job_roles.split(',').map(r => r.trim()))
                    : []
            };

            // C. Submit to ApplyWizz API
            const apiUrl = "https://ticketingtoolapplywizz.vercel.app/api/direct-onboard";
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiPayload)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("❌ API Error Response Body:", errorText);
                try {
                    const errorJson = JSON.parse(errorText);
                    throw new Error(errorJson.detail || errorJson.message || `API Error: ${response.status}`);
                } catch (e) {
                    throw new Error(`API Error: ${response.status} - ${errorText.substring(0, 200)}`);
                }
            }

            const result = await response.json();
            console.log("API Response:", result);

            alert("Onboarding Completed Successfully! ✅\n\nYour profile has been submitted to ApplyWizz.");

        } catch (error) {
            console.error("Onboarding Error:", error);
            alert(`Error: ${error.message}\n\nPlease check your information and try again.`);
        } finally {
            setLoading(false);
        }
    };

    if (isLoadingData) {
        return <div className="min-h-screen flex items-center justify-center text-xl font-bold text-gray-600">Loading Client Details...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-5 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-blue-700 to-indigo-800 px-8 py-10 text-center">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight">Job Board</h1>
                    <p className="mt-3 text-blue-100 text-lg">Detailed Profile Setup</p>
                </div>

                <form onSubmit={handleDirectOnboard} className="p-10 space-y-10">

                    {/* JB ID Entry Section */}
                    {/* <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                            </svg>
                            Enter JB ID to Fetch Client Details
                        </h3>
                        <div className="flex gap-4 items-end">
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">JB ID *</label>
                                <input
                                    type="text"
                                    value={manualJbId}
                                    onChange={(e) => setManualJbId(e.target.value.trim())}
                                    placeholder="e.g. JB-12345"
                                    className="w-full bg-white border-2 border-blue-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow-md"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleFetchDetails}
                                disabled={isFetchingDetails || !manualJbId}
                                className={`px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg ${isFetchingDetails || !manualJbId
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 transform hover:-translate-y-0.5'
                                    }`}
                            >
                                {isFetchingDetails ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Fetching...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Fetch Details
                                    </>
                                )}
                            </button>
                        </div>
                        <p className="mt-3 text-sm text-gray-600 flex items-center">
                            <svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            Enter the JB ID and click "Fetch Details" to auto-populate Full Name, Email, and Mobile Number
                        </p>
                    </div> */}

                    {/* Read-Only Pre-filled Section */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">Account Details (Pre-filled)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-70">
                            <InputField label="JB ID" value={formData.applywizz_id} disabled readOnly />
                            <InputField label="Full Name" value={formData.full_name} disabled readOnly />
                            <InputField label="Email" value={formData.company_email} disabled readOnly />
                            <InputField label="Mobile Number" value={formData.whatsapp_number} disabled readOnly />
                            <InputField label="Gender" value={formData.gender} disabled readOnly />
                            <InputField label="Location" value={formData.state_of_residence} disabled readOnly />
                            <InputField label="Country" value={formData.zip_or_country} disabled readOnly />
                            <InputField label="Started At" value={formData.start_date} disabled readOnly />
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Service Opted</label>
                                <span className="inline-flex items-center px-4 py-2 border border-blue-200 rounded-full shadow-sm text-sm font-medium bg-blue-100 text-blue-800">Job Links</span>
                            </div>
                        </div>
                    </div>

                    {/* Editable Section */}
                    <div>
                        <h3 className="flex items-center text-2xl font-bold text-gray-800 border-b pb-3 mb-6">
                            Profile Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Job Role Dropdown */}
                            <div ref={jobRoleDropdownRef} className="relative">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Target Job Roles *</label>
                                <div
                                    className="w-full bg-white border border-gray-300 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer flex justify-between items-center transition-shadow shadow-sm hover:shadow-md"
                                    onClick={() => setIsJobRoleDropdownOpen(!isJobRoleDropdownOpen)}
                                >
                                    <span className="truncate">
                                        {formData.job_role_preferences.length > 0
                                            ? formData.job_role_preferences.join(', ')
                                            : "Select Job Roles"}
                                    </span>
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                                {isJobRoleDropdownOpen && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                                        <div className="sticky top-0 bg-gray-50 p-2 border-b border-gray-200">
                                            <input type="text" placeholder="Search roles..." className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm outline-none" value={jobRoleSearchTerm} onChange={(e) => setJobRoleSearchTerm(e.target.value)} onClick={(e) => e.stopPropagation()} />
                                        </div>
                                        {filteredJobRoles.map(role => (
                                            <label key={role} className="flex items-center px-4 py-2 hover:bg-blue-50 cursor-pointer">
                                                <input type="checkbox" checked={formData.job_role_preferences.includes(role)} onChange={() => handleJobRoleToggle(role)} className="mr-3 w-5 h-5 text-blue-600 rounded" />
                                                <span className="text-gray-700">{role}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <InputField label="Years of Experience *" name="experience" value={formData.experience} onChange={handleInputChange} required placeholder="e.g. 5 Years" />
                            <InputField label="Salary Range" name="salary_range" value={formData.salary_range} onChange={handleInputChange} placeholder="e.g. 100k-120k" />

                            <SelectField label="Highest Education" name="highest_education" value={formData.highest_education} onChange={handleInputChange} options={EDUCATION_OPTIONS} />
                            <InputField label="University Name" name="university_name" value={formData.university_name} onChange={handleInputChange} />

                            <SelectField label="Work Authorization *" name="visa_type" value={formData.visa_type} onChange={handleInputChange} options={WORK_AUTH_OPTIONS} required />

                            <div className="space-y-3 pt-6">
                                <CheckboxField label="Requires Sponsorship" name="sponsorship" checked={formData.sponsorship} onChange={handleInputChange} />
                                <CheckboxField label="Authorized without Visa?" name="authorized_without_visa" checked={formData.authorized_without_visa} onChange={handleInputChange} />
                            </div>

                            <SelectField label="Work Preference *" name="work_preferences" value={formData.work_preferences} onChange={handleInputChange} options={WORK_PREF_OPTIONS} required />



                            <InputField label="Personal Email" name="personal_email" value={formData.personal_email} onChange={handleInputChange} type="email" placeholder="your.personal@email.com" />

                            <InputField label="Alternate Job Roles" name="alternate_job_roles" value={formData.alternate_job_roles} onChange={handleInputChange} placeholder="e.g. Backend Developer, DevOps Engineer" />

                            <InputField label="LinkedIn URL" name="linked_in_url" value={formData.linked_in_url} onChange={handleInputChange} placeholder="https://linkedin.com/in/yourprofile" />

                            <InputField label="GitHub URL" name="github_url" value={formData.github_url} onChange={handleInputChange} placeholder="https://github.com/yourusername" />

                            <InputField label="Desired Start Date" name="desired_start_date" value={formData.desired_start_date} onChange={handleInputChange} type="date" />

                            <InputField label="End Date (Availability)" name="end_date" value={formData.end_date} onChange={handleInputChange} type="date" />

                            <div className="space-y-3 pt-6">
                                <CheckboxField label="Willing to Relocate" name="willing_to_relocate" checked={formData.willing_to_relocate} onChange={handleInputChange} />
                                <CheckboxField label="Can work 3 days in office?" name="can_work_3_days_in_office" checked={formData.can_work_3_days_in_office} onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>

                    {/* Uploads */}
                    <div>
                        <h3 className="flex items-center text-2xl font-bold text-gray-800 border-b pb-3 mb-6">
                            Uploads & Exclusions
                        </h3>

                        <div className="grid grid-cols-1 gap-6">
                            {/* File Upload */}
                            <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 text-center hover:bg-gray-100 transition-colors group">
                                <label className="cursor-pointer block">
                                    <span className="block text-gray-700 font-semibold mb-2">Upload Resume (PDF) *</span>
                                    <div className="flex justify-center mt-3">
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            onChange={handleFileChange}
                                            className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                                        />
                                    </div>
                                </label>
                                {resumeFile && <p className="mt-2 text-sm text-green-600 font-medium">Selected: {resumeFile.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Exclude Companies</label>
                                <textarea name="exclude_companies" value={formData.exclude_companies} onChange={handleInputChange} className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none" placeholder="e.g. Facebook, Google, Amazon"></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-8">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 text-xl font-bold rounded-xl shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'}`}
                        >
                            {loading ? 'Submitting...' : 'Complete Registration'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

// UI Components
const InputField = ({ label, type = "text", ...props }) => (
    <div className={props.disabled ? "opacity-75" : ""}>
        <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
        <input type={type} {...props} className={`w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-sm ${props.disabled ? 'bg-gray-100 cursor-not-allowed' : 'hover:shadow-md'}`} />
    </div>
);

const SelectField = ({ label, options, ...props }) => (
    <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
        <div className="relative">
            <select {...props} className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                <option value="">Select Option</option>
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        </div>
    </div>
);

const CheckboxField = ({ label, ...props }) => (
    <label className="flex items-center cursor-pointer space-x-3">
        <input type="checkbox" {...props} className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
        <span className="text-gray-700 font-medium text-sm">{label}</span>
    </label>
);

export default ClientOnboarding;

