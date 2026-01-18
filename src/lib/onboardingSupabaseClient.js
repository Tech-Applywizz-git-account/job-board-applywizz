import { createClient } from '@supabase/supabase-js';

// Access environment variables
const supabaseUrl = import.meta.env.VITE_ONBOARDING_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_ONBOARDING_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = import.meta.env.VITE_ONBOARDING_SUPABASE_SERVICE_ROLE_KEY;

// Check if keys are available
if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
    console.error('Missing Onboarding Supabase environment variables! Check your .env file.');
}

// Client with Service Role - capable of Admin actions (Use with caution on client-side)
export const onboardSupabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

// Standard Client
export const onboardSupabase = createClient(supabaseUrl, supabaseAnonKey);
