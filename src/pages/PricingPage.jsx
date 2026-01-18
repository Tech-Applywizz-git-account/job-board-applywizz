import { useState, useEffect } from 'react';
import PaymentForm from '../components/PaymentForm';
import { createTransaction, processPayment } from '../lib/paymentService';
import { getPaymentSettings, getPricingSettings } from '../lib/adminService';

const PricingPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [prices, setPrices] = useState({ monthly: '45', threeMonth: '119.99', sixMonth: '224' });

    useEffect(() => {
        // Trigger fade-in animation on mount
        setIsVisible(true);
        // Fetch pricing
        const loadPrices = async () => {
            const settings = await getPricingSettings();
            setPrices(settings);
        };
        loadPrices();
    }, []);

    const handlePayNowClick = (plan) => {
        setSelectedPlan(plan);
        setShowPaymentForm(true);
    };

    const handleClosePaymentForm = () => {
        setShowPaymentForm(false);
        setSelectedPlan(null);
    };

    const handlePaymentFormSubmit = async (formData) => {
        setIsProcessing(true);

        try {
            // Step 1: Create transaction record
            const transaction = await createTransaction(formData, selectedPlan.id);
            console.log('Transaction created:', transaction);

            // Step 2: Get payment gateway settings from admin
            const paymentSettings = await getPaymentSettings();

            // Default to PayPal Dubai if settings fail
            const paymentMethod = paymentSettings?.method || 'paypal';
            const paymentAccount = paymentSettings?.account || 'dubai';

            console.log('Using payment gateway:', paymentMethod, paymentAccount);

            const paymentResult = await processPayment(
                transaction.jb_id,
                paymentMethod,
                paymentAccount
            );

            console.log('Payment initiated:', paymentResult);

            // Step 3: Redirect to payment gateway or handle payment flow
            if (paymentResult.approvalUrl) {
                window.location.href = paymentResult.approvalUrl;
            } else if (paymentResult.clientSecret) {
                // Handle Stripe payment
                // You'll need to integrate Stripe Elements here
                console.log('Stripe payment:', paymentResult);
            }

        } catch (error) {
            console.error('Payment error:', error);
            alert('Payment failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const pricingPlans = [
        {
            id: 'monthly',
            title: 'Monthly',
            subtitle: 'Perfect for getting started',
            price: '$' + prices.monthly,
            period: '/mo',
            billing: 'Billed monthly • No commitment',
            discount: null,
            badge: null,
            features: [
                'Unlimited job links daily',
                'AI-powered job matching',
                'Resume optimization tools',
                'Priority customer support'
            ],
            cta: 'Start 1 Month Trial',
            highlighted: false
        },
        {
            id: '3-months',
            title: '3 Months',
            subtitle: 'Best for testing commitment',
            price: '$' + prices.threeMonth,
            period: 'total',
            billing: 'Billed upfront • Save 10%',
            discount: '10% OFF',
            badge: 'MOST POPULAR',
            features: [
                'Unlimited job links daily',
                'AI-powered job matching',
                'Resume optimization tools',
                'Priority customer support',
                'Early access to new features'
            ],
            cta: 'Save 10% Now',
            highlighted: true
        },
        {
            id: '6-months',
            title: '6 Months',
            subtitle: 'Best for serious job hunters',
            price: '$' + prices.sixMonth,
            period: 'total',
            billing: 'Billed upfront • Save 17%',
            discount: '17% OFF',
            badge: null,
            features: [
                'Unlimited job links daily',
                'AI-powered job matching',
                'Resume optimization tools',
                'Priority customer support',
                'Early access to new features',
                'Priority job alerts (24h)',
                'Dedicated account manager'
            ],
            cta: 'Get Best Value (17% OFF)',
            highlighted: false
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white">
            {/* Hero Section */}
            <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Simple. Fair. Proven.
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Choose the plan that fits your job search journey
                    </p>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="pb-24 px-4 sm:px-6 lg:px-8">
                <div className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                    {pricingPlans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative group transition-all duration-300 hover:scale-105 hover:shadow-2xl ${plan.highlighted
                                ? 'md:-mt-4 md:mb-4'
                                : ''
                                }`}
                        >
                            {/* Most Popular Badge */}
                            {plan.badge && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                        ⭐ {plan.badge}
                                    </div>
                                </div>
                            )}

                            {/* Card */}
                            <div
                                className={`relative h-full rounded-2xl p-8 backdrop-blur-lg bg-white/10 border transition-all duration-300 ${plan.highlighted
                                    ? 'border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:shadow-[0_0_50px_rgba(234,179,8,0.5)]'
                                    : 'border-gray-700/50 hover:border-blue-500/50'
                                    }`}
                            >
                                {/* Glassmorphism overlay */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

                                {/* Content */}
                                <div className="relative z-10 h-full flex flex-col">
                                    {/* Header */}
                                    <div className="mb-8">
                                        <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                                        <p className="text-gray-400 text-sm">{plan.subtitle}</p>
                                    </div>

                                    {/* Price */}
                                    <div className="mb-6">
                                        <div className="flex items-baseline mb-2">
                                            <span className="text-5xl font-extrabold">{plan.price}</span>
                                            <span className="text-xl text-gray-400 ml-1">{plan.period}</span>
                                        </div>
                                        <p className="text-sm text-gray-400">{plan.billing}</p>
                                    </div>

                                    {/* Features */}
                                    <ul className="mb-8 space-y-4 flex-grow">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <svg
                                                    className="w-6 h-6 text-blue-400 mr-3 flex-shrink-0 mt-0.5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                                <span className="text-gray-300">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA Button */}
                                    <button
                                        className={`w-full py-4 px-6 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 ${plan.highlighted
                                            ? 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 shadow-lg hover:shadow-2xl'
                                            : 'bg-blue-600 hover:bg-blue-500 shadow-lg hover:shadow-xl'
                                            }`}
                                        onClick={() => handlePayNowClick(plan)}
                                    >
                                        {plan.cta}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Additional Info Section */}
            <div className="pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-8 border border-gray-700/50">
                        <h3 className="text-2xl font-bold mb-4">All Plans Include</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
                            <div>
                                <div className="text-3xl mb-2">🚀</div>
                                <p className="font-semibold">Instant Access</p>
                                <p className="text-sm text-gray-400">Start applying immediately</p>
                            </div>
                            <div>
                                <div className="text-3xl mb-2">💯</div>
                                <p className="font-semibold">No Hidden Fees</p>
                                <p className="text-sm text-gray-400">What you see is what you pay</p>
                            </div>
                            <div>
                                <div className="text-3xl mb-2">🔒</div>
                                <p className="font-semibold">Secure & Private</p>
                                <p className="text-sm text-gray-400">Your data is always protected</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Form Modal */}
            {showPaymentForm && selectedPlan && (
                <PaymentForm
                    plan={selectedPlan}
                    onClose={handleClosePaymentForm}
                    onSubmit={handlePaymentFormSubmit}
                />
            )}
        </div>
    );
};

export default PricingPage;
