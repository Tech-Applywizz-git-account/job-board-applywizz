import { supabase } from './supabaseClient';
import { getPricingSettings } from './adminService';

/**
 * Payment service for handling job board transactions
 */

// Plan configurations
export const PLAN_CONFIGS = {
    'monthly': {
        duration: 1,
        unit: 'month',
        price: 45
    },
    '3-months': {
        duration: 3,
        unit: 'month',
        price: 119.99
    },
    '6-months': {
        duration: 6,
        unit: 'month',
        price: 224
    }
};

const getDynamicPlanPrice = async (planId) => {
    try {
        const prices = await getPricingSettings();
        const priceMap = {
            'monthly': prices.monthly,
            '3-months': prices.threeMonth,
            '6-months': prices.sixMonth
        };
        // Return dynamic price if available, else fallback to config
        const priceStr = priceMap[planId];
        if (priceStr) return parseFloat(priceStr);
        return PLAN_CONFIGS[planId]?.price || 0;
    } catch {
        return PLAN_CONFIGS[planId]?.price || 0;
    }
};

/**
 * Generate unique JB ID
 * Format: JB-1, JB-11, JB-100, etc.
 */
const generateJBId = async () => {
    try {
        // Get the latest transaction to determine next ID
        const { data, error } = await supabase
            .from('jobboard_transactions')
            .select('jb_id')
            .order('created_at', { ascending: false })
            .limit(1);

        if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
            throw error;
        }

        let nextNumber = 1;

        if (data && data.length > 0) {
            // Extract number from JB-XXX format
            const lastId = data[0].jb_id;
            const lastNumber = parseInt(lastId.replace('JB-', ''));
            nextNumber = lastNumber + 1;
        }

        return `JB-${nextNumber}`;
    } catch (error) {
        console.error('Error generating JB ID:', error);
        // Fallback to timestamp-based ID
        return `JB-${Date.now()}`;
    }
};

/**
 * Calculate plan end date
 */
const calculatePlanEndDate = (startDate, planId) => {
    const config = PLAN_CONFIGS[planId];
    if (!config) {
        throw new Error(`Invalid plan ID: ${planId}`);
    }

    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + config.duration);
    return endDate.toISOString();
};

/**
 * Create initial transaction record
 * This is called when user submits the payment form
 */
export const createTransaction = async (formData, planId) => {
    try {
        const dynamicPrice = await getDynamicPlanPrice(planId);
        // Check if user already exists
        const existingTxn = await getTransactionByEmail(formData.email);

        if (existingTxn) {
            console.log(`Found existing user ${existingTxn.jb_id}, upgrading subscription...`);
            // Update existing record with new details
            const jbId = existingTxn.jb_id;
            const now = new Date().toISOString();

            // Calculate potential end date (though it will be finalized after payment)
            const planEnded = calculatePlanEndDate(now, planId);

            const updateData = {
                full_name: formData.fullName,
                mobile_number: formData.mobileNumber,
                country_code: formData.countryCode,
                promo_code: formData.promoCode || null,
                plan_id: planId,
                amount: dynamicPrice,
                plan_started: null, // Reset until payment success
                plan_ended: null,   // Reset until payment success
                payment_status: 'pending',
                gender: formData.gender,
                location: formData.location,
                country: formData.country,
                updated_at: now
            };

            const { data, error } = await supabase
                .from('jobboard_transactions')
                .update(updateData)
                .eq('jb_id', jbId)
                .select()
                .single();

            if (error) throw error;
            return data;
        }

        // New user - Create new transaction
        const jbId = await generateJBId();
        const now = new Date().toISOString();

        const transactionData = {
            jb_id: jbId,
            full_name: formData.fullName,
            email: formData.email,
            country_code: formData.countryCode,
            mobile_number: formData.mobileNumber,
            promo_code: formData.promoCode || null,
            gender: formData.gender,
            location: formData.location,
            country: formData.country,
            plan_id: planId,
            plan_started: null, // Will be set after successful payment
            plan_ended: null, // Will be set after successful payment
            payment_status: 'pending',
            payment_method: null, // Will be set during payment
            payment_account: null, // Will be set during payment (dubai/india)
            transaction_id: null, // Will be set after payment
            amount: dynamicPrice,
            currency: 'USD',
            created_at: now,
            updated_at: now
        };

        const { data, error } = await supabase
            .from('jobboard_transactions')
            .insert([transactionData])
            .select()
            .single();

        if (error) throw error;

        return data;
    } catch (error) {
        console.error('Error creating transaction:', error);
        throw error;
    }
};

/**
 * Update transaction with payment details
 * This is called after payment is completed (success or failure)
 */
export const updateTransactionWithPayment = async (jbId, paymentData) => {
    try {
        const now = new Date().toISOString();
        const planStarted = paymentData.status === 'success' ? now : null;
        const planEnded = paymentData.status === 'success'
            ? calculatePlanEndDate(now, paymentData.planId)
            : null;

        const updateData = {
            payment_status: paymentData.status, // 'success' or 'failed'
            payment_method: paymentData.method, // 'paypal' or 'stripe'
            payment_account: paymentData.account, // 'dubai' or 'india'
            transaction_id: paymentData.transactionId,
            plan_started: planStarted,
            plan_ended: planEnded,
            payment_details: paymentData.details || null, // Additional payment details
            updated_at: now
        };

        const { data, error } = await supabase
            .from('jobboard_transactions')
            .update(updateData)
            .eq('jb_id', jbId)
            .select()
            .single();

        if (error) throw error;

        return data;
    } catch (error) {
        console.error('Error updating transaction:', error);
        throw error;
    }
};

/**
 * Upgrade/Renew existing subscription
 * Updates the same record instead of creating a new one
 */
export const upgradeSubscription = async (jbId, planId) => {
    try {
        const dynamicPrice = await getDynamicPlanPrice(planId);
        const now = new Date().toISOString();
        const planEnded = calculatePlanEndDate(now, planId);

        const updateData = {
            plan_id: planId,
            plan_started: now,
            plan_ended: planEnded,
            amount: PLAN_CONFIGS[planId].price,
            payment_status: 'pending', // Will be updated after payment
            updated_at: now
        };

        const { data, error } = await supabase
            .from('jobboard_transactions')
            .update(updateData)
            .eq('jb_id', jbId)
            .select()
            .single();

        if (error) throw error;

        return data;
    } catch (error) {
        console.error('Error upgrading subscription:', error);
        throw error;
    }
};

/**
 * Get transaction by JB ID
 */
export const getTransaction = async (jbId) => {
    try {
        const { data, error } = await supabase
            .from('jobboard_transactions')
            .select('*')
            .eq('jb_id', jbId)
            .single();

        if (error) throw error;

        return data;
    } catch (error) {
        console.error('Error fetching transaction:', error);
        throw error;
    }
};

/**
 * Get transaction by email
 */
export const getTransactionByEmail = async (email) => {
    try {
        const { data, error } = await supabase
            .from('jobboard_transactions')
            .select('*')
            .eq('email', email)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (error && error.code !== 'PGRST116') {
            throw error;
        }

        return data || null;
    } catch (error) {
        console.error('Error fetching transaction by email:', error);
        throw error;
    }
};

/**
 * Get transaction history by JB ID
 */
export const getTransactionHistory = async (jbId) => {
    try {
        const { data, error } = await supabase
            .from('jobboard_transaction_history')
            .select('*')
            .eq('jb_id', jbId)
            .order('archived_at', { ascending: false });

        if (error) throw error;

        return data;
    } catch (error) {
        console.error('Error fetching transaction history:', error);
        throw error;
    }
};

/**
 * Check if subscription is active
 */
export const isSubscriptionActive = (transaction) => {
    if (!transaction || transaction.payment_status !== 'success') {
        return false;
    }

    const now = new Date();
    const planEnded = new Date(transaction.plan_ended);

    return now < planEnded;
};

/**
 * Process payment through appropriate gateway
 */
export const processPayment = async (jbId, paymentMethod, paymentAccount) => {
    try {
        // Determine which edge function to call
        const functionName = `${paymentMethod}-create-${paymentAccount}`;

        const { data, error } = await supabase.functions.invoke(functionName, {
            body: { jbId }
        });

        if (error) throw error;

        return data;
    } catch (error) {
        console.error('Error processing payment:', error);
        throw error;
    }
};

/**
 * Capture payment (for PayPal and Stripe)
 */
export const capturePayment = async (jbId, paymentMethod, paymentAccount, captureData) => {
    try {
        // Use the shared capture function
        const functionName = `${paymentMethod}-capture`;

        const { data, error } = await supabase.functions.invoke(functionName, {
            body: {
                jbId,
                account: paymentAccount,
                ...captureData
            }
        });

        if (error) throw error;

        return data;
    } catch (error) {
        console.error('Error capturing payment:', error);
        throw error;
    }
};
