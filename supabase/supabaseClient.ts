// supabase/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase URL and anon/public key
const supabaseUrl = 'https://zfbjptlmwbvbtucazrzi.supabase.co';
const supabaseAnonKey = 'sb_publishable_afvGo6Yoc7bKgg1TZ4SrdA_LRfvmPxw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
