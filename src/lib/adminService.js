import { supabase } from './supabaseClient';

/**
 * Admin service for managing payment gateway settings and transactions
 */

// Payment gateway combinations
export const PAYMENT_COMBINATIONS = [
    { method: 'paypal', account: 'dubai', label: 'PayPal Dubai', color: 'blue' },
    { method: 'paypal', account: 'india', label: 'PayPal India', color: 'blue' },
    { method: 'stripe', account: 'dubai', label: 'Stripe Dubai', color: 'purple' },
    { method: 'stripe', account: 'india', label: 'Stripe India', color: 'purple' },
];

/**
 * Get current payment gateway settings
 */
export const getPaymentSettings = async () => {
    try {
        const { data, error } = await supabase
            .from('admin_settings')
            .select('*')
            .in('setting_key', ['payment_method', 'payment_account']);

        if (error) throw error;

        const settings = {};
        data.forEach(item => {
            settings[item.setting_key] = item.setting_value;
        });

        return {
            method: settings.payment_method || 'paypal',
            account: settings.payment_account || 'dubai'
        };
    } catch (error) {
        console.error('Error fetching payment settings:', error);
        return { method: 'paypal', account: 'dubai' };
    }
};

/**
 * Update payment gateway settings
 */
export const updatePaymentSettings = async (method, account) => {
    try {
        // Update payment method
        const { error: methodError } = await supabase
            .from('admin_settings')
            .update({ setting_value: method, updated_at: new Date().toISOString() })
            .eq('setting_key', 'payment_method');

        if (methodError) throw methodError;

        // Update payment account
        const { error: accountError } = await supabase
            .from('admin_settings')
            .update({ setting_value: account, updated_at: new Date().toISOString() })
            .eq('setting_key', 'payment_account');

        if (accountError) throw accountError;

        return { success: true, method, account };
    } catch (error) {
        console.error('Error updating payment settings:', error);
        throw error;
    }
};

/**
 * Get all transactions with optional filters
 */
export const getTransactions = async (filters = {}) => {
    try {
        let query = supabase
            .from('jobboard_transactions')
            .select('*')
            .order('created_at', { ascending: false });

        // Apply status filter
        if (filters.status && filters.status !== 'all') {
            query = query.eq('payment_status', filters.status);
        }

        // Apply payment method filter
        if (filters.method && filters.method !== 'all') {
            query = query.eq('payment_method', filters.method);
        }

        // Apply payment account filter
        if (filters.account && filters.account !== 'all') {
            query = query.eq('payment_account', filters.account);
        }

        // Apply search filter
        if (filters.search) {
            query = query.or(`jb_id.ilike.%${filters.search}%,email.ilike.%${filters.search}%,full_name.ilike.%${filters.search}%`);
        }

        const { data, error } = await query;

        if (error) throw error;

        return data || [];
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error;
    }
};

/**
 * Get transaction statistics
 */
export const getTransactionStats = async () => {
    try {
        const { data: allTransactions, error } = await supabase
            .from('jobboard_transactions')
            .select('*');

        if (error) throw error;

        const stats = {
            total: allTransactions.length,
            success: allTransactions.filter(t => t.payment_status === 'success').length,
            failed: allTransactions.filter(t => t.payment_status === 'failed').length,
            pending: allTransactions.filter(t => t.payment_status === 'pending').length,
            totalRevenue: allTransactions
                .filter(t => t.payment_status === 'success')
                .reduce((sum, t) => sum + parseFloat(t.amount), 0),
            byMethod: {
                paypal: allTransactions.filter(t => t.payment_method === 'paypal' && t.payment_status === 'success').length,
                stripe: allTransactions.filter(t => t.payment_method === 'stripe' && t.payment_status === 'success').length,
            },
            byAccount: {
                dubai: allTransactions.filter(t => t.payment_account === 'dubai' && t.payment_status === 'success').length,
                india: allTransactions.filter(t => t.payment_account === 'india' && t.payment_status === 'success').length,
            },
            byPlan: {
                monthly: allTransactions.filter(t => t.plan_id === 'monthly' && t.payment_status === 'success').length,
                '3-months': allTransactions.filter(t => t.plan_id === '3-months' && t.payment_status === 'success').length,
                '6-months': allTransactions.filter(t => t.plan_id === '6-months' && t.payment_status === 'success').length,
            }
        };

        return stats;
    } catch (error) {
        console.error('Error fetching transaction stats:', error);
        throw error;
    }
};

/**
 * Get transaction by JB-ID
 */
export const getTransactionById = async (jbId) => {
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
 * Get pricing settings
 */
export const getPricingSettings = async () => {
    try {
        const { data, error } = await supabase
            .from('admin_settings')
            .select('*')
            .in('setting_key', ['price_monthly', 'price_3_months', 'price_6_months']);

        if (error) throw error;

        const prices = {};
        data.forEach(item => {
            prices[item.setting_key] = item.setting_value;
        });

        return {
            monthly: prices.price_monthly || '45',
            threeMonth: prices.price_3_months || '119.99',
            sixMonth: prices.price_6_months || '224'
        };
    } catch (error) {
        console.error('Error fetching pricing settings:', error);
        return { monthly: '45', threeMonth: '119.99', sixMonth: '224' };
    }
};

/**
 * Update pricing settings
 */
export const updatePricingSettings = async (prices) => {
    try {
        const updates = [
            { setting_key: 'price_monthly', setting_value: prices.monthly },
            { setting_key: 'price_3_months', setting_value: prices.threeMonth },
            { setting_key: 'price_6_months', setting_value: prices.sixMonth }
        ];

        // Perform inserts/updates
        // Using upsert for each item. Assuming setting_key is unique or primary key.
        for (const update of updates) {
            const { error } = await supabase
                .from('admin_settings')
                .upsert({
                    setting_key: update.setting_key,
                    setting_value: update.setting_value,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'setting_key' });

            if (error) throw error;
        }

        return { success: true };
    } catch (error) {
        console.error('Error updating pricing settings:', error);
        throw error;
    }
};

/**
 * Admin User Management Functions
 */

/**
 * Simple password hashing (for demo - use bcrypt in production)
 */
const hashPassword = async (password) => {
    // For production, use bcrypt or similar
    // This is a simple demo hash
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

/**
 * Verify admin login
 */
export const verifyAdminLogin = async (email, password) => {
    try {
        const passwordHash = await hashPassword(password);

        // Convert email to lowercase for case-insensitive comparison
        const normalizedEmail = email.toLowerCase().trim();

        const { data, error } = await supabase
            .from('admin_users')
            .select('*')
            .ilike('email', normalizedEmail) // Case-insensitive search
            .eq('password_hash', passwordHash)
            .eq('is_active', true)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return { success: false, error: 'Invalid credentials' };
            }
            throw error;
        }

        // Update last login
        await supabase
            .from('admin_users')
            .update({ last_login: new Date().toISOString() })
            .eq('id', data.id);

        return { success: true, admin: data };
    } catch (error) {
        console.error('Error verifying admin login:', error);
        return { success: false, error: 'Login failed' };
    }
};

/**
 * Get all admin users
 */
export const getAdminUsers = async () => {
    try {
        const { data, error } = await supabase
            .from('admin_users')
            .select('id, email, created_at, last_login, is_active')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching admin users:', error);
        throw error;
    }
};

/**
 * Create new admin user
 */
export const createAdminUser = async (email, password) => {
    try {
        const passwordHash = await hashPassword(password);

        // Normalize email to lowercase for consistency
        const normalizedEmail = email.toLowerCase().trim();

        const { data, error } = await supabase
            .from('admin_users')
            .insert([{
                email: normalizedEmail,
                password_hash: passwordHash,
                is_active: true,
                created_at: new Date().toISOString()
            }])
            .select()
            .single();

        if (error) {
            if (error.code === '23505') {
                throw new Error('Admin user with this email already exists');
            }
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error creating admin user:', error);
        throw error;
    }
};

/**
 * Delete admin user
 */
export const deleteAdminUser = async (adminId) => {
    try {
        const { error } = await supabase
            .from('admin_users')
            .delete()
            .eq('id', adminId);

        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Error deleting admin user:', error);
        throw error;
    }
};

/**
 * Toggle admin user active status
 */
export const toggleAdminStatus = async (adminId, isActive) => {
    try {
        const { error } = await supabase
            .from('admin_users')
            .update({ is_active: isActive })
            .eq('id', adminId);

        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Error toggling admin status:', error);
        throw error;
    }
};

/**
 * Update admin user password
 */
export const updateAdminPassword = async (adminId, newPassword) => {
    try {
        const passwordHash = await hashPassword(newPassword);

        const { error } = await supabase
            .from('admin_users')
            .update({
                password_hash: passwordHash,
                updated_at: new Date().toISOString()
            })
            .eq('id', adminId);

        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Error updating admin password:', error);
        throw error;
    }
};

