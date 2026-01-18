import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValueProposition from './components/ValueProposition';
import HowItWorks from './components/HowItWorks';
import FeaturedJobs from './components/FeaturedJobs';
import JobTypeCategories from './components/JobTypeCategories';
import DomainGrid from './components/DomainGrid';
import TrustSection from './components/TrustSection';
import CTABanner from './components/CTABanner';
import Footer from './components/Footer';

// Job Listings imports
import JobListingsHub from './JobListings/pages/JobListingsHub';
import CareerPortalsPage from './JobListings/pages/CareerPortalsPage';
import LinkedInEasyApplyPage from './JobListings/pages/LinkedInEasyApplyPage';
import IndeedEasyApplyPage from './JobListings/pages/IndeedEasyApplyPage';
import W2ContractsPage from './JobListings/pages/W2ContractsPage';
import C2CContractsPage from './JobListings/pages/C2CContractsPage';
import StaffingAgenciesPage from './JobListings/pages/StaffingAgenciesPage';
import SponsoredJobsPage from './JobListings/pages/SponsoredJobsPage';

// Domain imports
import DomainsHub from './Domains/pages/DomainsHub';
import SoftwareEngineeringPage from './Domains/pages/SoftwareEngineeringPage';
import DataSciencePage from './Domains/pages/DataSciencePage';
import ProductManagementPage from './Domains/pages/ProductManagementPage';

// About import
import AboutPage from './About/pages/AboutPage';

// Signup import
import Signup from './pages/Signup';

// Pricing import
import PricingPage from './pages/PricingPage';

// Payment pages
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';

// Admin page
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import ClientOnboarding from './pages/ClientOnboarding';

// Homepage Component
const Homepage = () => {
  return (
    <>
      <Hero />
      <ValueProposition />
      <HowItWorks />
      <FeaturedJobs />
      <JobTypeCategories />
      <DomainGrid />
      <TrustSection />
      <CTABanner />
    </>
  );
};

// AppContent component that uses useLocation (must be inside Router)
const AppContent = () => {
  const location = useLocation();
  const hideNavbarAndFooter = location.pathname === '/payment/success' ||
    location.pathname === '/payment/cancel' ||
    location.pathname === '/admin' ||
    location.pathname === '/admin-login' ||
    location.pathname === '/onboard';

  return (
    <div className="min-h-screen bg-primary-bg">
      {!hideNavbarAndFooter && <Navbar />}
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<Homepage />} />

        {/* About Page */}
        <Route path="/about" element={<AboutPage />} />

        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />

        {/* Pricing Page */}
        <Route path="/pricing" element={<PricingPage />} />

        {/* Payment Pages */}
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/cancel" element={<PaymentCancel />} />

        {/* Admin Dashboard */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/onboard" element={<ClientOnboarding />} />

        {/* Job Listings Hub */}
        <Route path="/jobs" element={<JobListingsHub />} />

        {/* Job Category Pages */}
        <Route path="/jobs/career-portals" element={<CareerPortalsPage />} />
        <Route path="/jobs/linkedin-easy-apply" element={<LinkedInEasyApplyPage />} />
        <Route path="/jobs/indeed-easy-apply" element={<IndeedEasyApplyPage />} />
        <Route path="/jobs/w2-contracts" element={<W2ContractsPage />} />
        <Route path="/jobs/c2c-contracts" element={<C2CContractsPage />} />
        <Route path="/jobs/staffing-agencies" element={<StaffingAgenciesPage />} />
        <Route path="/jobs/sponsored" element={<SponsoredJobsPage />} />

        {/* Domains Hub */}
        <Route path="/domains" element={<DomainsHub />} />

        {/* Domain Category Pages */}
        <Route path="/domains/software-engineering" element={<SoftwareEngineeringPage />} />
        <Route path="/domains/data-science" element={<DataSciencePage />} />
        <Route path="/domains/product-management" element={<ProductManagementPage />} />
      </Routes>
      {!hideNavbarAndFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
