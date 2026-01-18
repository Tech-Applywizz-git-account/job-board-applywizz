import { supabase } from './supabaseClient';

export const sendOtp = async (email) => {
    const { data, error } = await supabase.functions.invoke('send-otp', {
        body: { email }
    });
    if (error) {
        console.error('Send OTP Error:', error);
        throw error;
    }
    return data;
};

export const verifyOtp = async (email, otp, hash) => {
    const { data, error } = await supabase.functions.invoke('verify-otp', {
        body: { email, otp, hash }
    });
    if (error) {
        console.error('Verify OTP Error:', error);
        throw error;
    }
    return data;
};
