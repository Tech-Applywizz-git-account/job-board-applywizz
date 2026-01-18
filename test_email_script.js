// Test Email Sending Script (CommonJS)
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env file');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testEmail() {
    console.log('📧 Testing Email Function...');
    console.log(`URL: ${supabaseUrl}/functions/v1/send-payment-email`);

    const payload = {
        to: 'dinesh@applywizz.com', // Change this to your email
        jbId: 'TEST-JB-123',
        status: 'success',
        transaction: {
            full_name: 'Test User',
            email: 'dinesh@applywizz.com',
            jb_id: 'TEST-JB-123',
            plan_id: 'monthly',
            amount: 45,
            payment_method: 'paypal',
            payment_account: 'dubai',
            plan_started: new Date().toISOString(),
            plan_ended: new Date().toISOString()
        }
    };

    try {
        const { data, error } = await supabase.functions.invoke('send-payment-email', {
            body: payload
        });

        if (error) {
            console.error('❌ Function Error:', error);
            // Supabase functions often return the error details in the failed response body
            // but the client library might hide it. 
            // The console log above should show the error structure.
        } else {
            console.log('✅ Function Response:', data);
        }

    } catch (err) {
        console.error('❌ Unexpected Error:', err);
    }
}

testEmail();
