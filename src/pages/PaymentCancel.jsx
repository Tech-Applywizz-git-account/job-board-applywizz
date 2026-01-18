import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { updateTransactionWithPayment, getTransaction } from '../lib/paymentService';

const PaymentCancel = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const updateTransaction = async () => {
            try {
                const jbId = searchParams.get('jbId');

                if (jbId) {
                    // Get transaction details
                    const transaction = await getTransaction(jbId);

                    // Update transaction as failed/cancelled
                    await updateTransactionWithPayment(jbId, {
                        status: 'failed',
                        method: transaction.payment_method,
                        account: transaction.payment_account,
                        transactionId: transaction.transaction_id,
                        planId: transaction.plan_id,
                        details: { cancelled: true, cancelledAt: new Date().toISOString() }
                    });
                }
            } catch (error) {
                console.error('Error updating cancelled transaction:', error);
            }
        };

        updateTransaction();
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl border border-yellow-500/50 p-8 text-center">
                {/* Cancel Icon */}
                <div className="text-6xl mb-4">⚠️</div>

                <h2 className="text-3xl font-bold text-white mb-4">Payment Cancelled</h2>

                <p className="text-gray-300 mb-6">
                    Your payment has been cancelled. No charges have been made to your account.
                </p>

                <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-xl p-4 mb-6">
                    <p className="text-yellow-300 text-sm">
                        If you encountered any issues during checkout, please contact our support team.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={() => navigate('/pricing')}
                        className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Try Again
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-3 px-6 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full transition-all duration-300 border border-gray-700"
                    >
                        Back to Home
                    </button>

                    <a
                        href="mailto:support@apply-wizz.me"
                        className="block w-full py-3 px-6 text-gray-400 hover:text-white transition-colors text-sm"
                    >
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;
