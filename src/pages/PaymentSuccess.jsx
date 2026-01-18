import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { capturePayment, getTransaction } from '../lib/paymentService';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('processing'); // processing, success, error
    const [transaction, setTransaction] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const processPayment = async () => {
            try {
                const jbId = searchParams.get('jbId');
                const token = searchParams.get('token'); // PayPal token
                const paymentIntentId = searchParams.get('payment_intent'); // Stripe payment intent

                if (!jbId) {
                    throw new Error('Missing transaction ID');
                }

                // Get transaction details
                const txn = await getTransaction(jbId);

                if (!txn) {
                    throw new Error('Transaction not found');
                }

                // Capture payment based on method
                // Use token (from URL) for PayPal Order ID as it's most reliable
                const queryToken = searchParams.get('token');
                const queryPaymentIntent = searchParams.get('payment_intent');

                const captureData = txn.payment_method === 'paypal'
                    ? { orderId: queryToken || txn.transaction_id }
                    : { paymentIntentId: queryPaymentIntent || txn.transaction_id };

                const data = await capturePayment(
                    jbId,
                    txn.payment_method,
                    txn.payment_account,
                    captureData
                );

                // Refresh transaction data
                const updatedTxn = await getTransaction(jbId);
                setTransaction(updatedTxn);
                if (data.emailSent === false) {
                    console.warn('⚠️ Payment successful but email failed:', data.emailError);
                    // Optionally show a toast or message to user
                } else if (data.emailSent === true) {
                    console.log('📧 Confirmation email sent successfully');
                }

                setStatus('success');
            } catch (err) {
                console.error('Payment processing error:', err);
                setError(err.message);
                setStatus('error');
            }
        };

        processPayment();
    }, [searchParams]);

    if (status === 'processing') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-6"></div>
                    <h2 className="text-2xl font-bold text-white mb-2">Processing Your Payment...</h2>
                    <p className="text-gray-400">Please wait while we confirm your payment.</p>
                </div>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl border border-red-500/50 p-8 text-center">
                    <div className="text-6xl mb-4">❌</div>
                    <h2 className="text-3xl font-bold text-white mb-4">Payment Failed</h2>
                    <p className="text-gray-300 mb-6">{error || 'An error occurred while processing your payment.'}</p>
                    <button
                        onClick={() => navigate('/pricing')}
                        className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-all duration-300"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg rounded-2xl border border-green-500/50 p-8">
                {/* Success Icon */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4 animate-bounce">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-2">Payment Successful!</h2>
                    <p className="text-gray-300">Thank you for subscribing to Apply Wizz Job Board</p>
                </div>

                {/* Transaction Details */}
                {transaction && (
                    <div className="bg-white/5 rounded-xl p-6 mb-6 border border-gray-700/50">
                        <h3 className="text-xl font-bold text-white mb-4">Transaction Details</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Order Reference:</span>
                                <span className="text-white font-semibold">{transaction.jb_id}</span>
                            </div>

                            {/* Logic to find the best ID to display */}
                            {(() => {
                                // Try to get Capture ID from details first (most accurate for receipt)
                                let displayId = transaction.transaction_id; // Default to Order ID
                                try {
                                    // Parse if string, otherwise use as object
                                    const details = typeof transaction.payment_details === 'string'
                                        ? JSON.parse(transaction.payment_details)
                                        : transaction.payment_details;

                                    const captureId = details?.purchase_units?.[0]?.payments?.captures?.[0]?.id;
                                    if (captureId) displayId = captureId;
                                } catch (e) {
                                    // Ignore parse error
                                }

                                return displayId && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Transaction ID:</span>
                                        <span className="text-white font-semibold text-sm">{displayId}</span>
                                    </div>
                                );
                            })()}

                            <div className="flex justify-between">
                                <span className="text-gray-400">Plan:</span>
                                <span className="text-white font-semibold capitalize">{transaction.plan_id.replace('-', ' ')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Amount Paid:</span>
                                <span className="text-white font-semibold">${transaction.amount}</span>
                            </div>
                            {/* <div className="flex justify-between">
                                <span className="text-gray-400">Payment Method:</span>
                                <span className="text-white font-semibold capitalize">
                                    {transaction.payment_method} ({transaction.payment_account})
                                </span>
                            </div> */}
                            <div className="flex justify-between">
                                <span className="text-gray-400">Plan Started:</span>
                                <span className="text-white font-semibold">
                                    {new Date(transaction.plan_started).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Plan Ends:</span>
                                <span className="text-white font-semibold">
                                    {new Date(transaction.plan_ended).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Email Confirmation */}
                <div className="bg-blue-500/10 border border-blue-500/50 rounded-xl p-4 mb-6">
                    <p className="text-blue-300 text-sm text-center">
                        📧 A confirmation email has been sent to <span className="font-semibold">{transaction?.email}</span>
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <button
                        onClick={() => window.location.href = 'https://www.apply-wizz.me/login'}
                        className="flex-1 py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Access Your Account
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="flex-1 py-4 px-6 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full transition-all duration-300 border border-gray-700"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div >
    );
};

export default PaymentSuccess;
