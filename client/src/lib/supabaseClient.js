// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.REACT_APP_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.REACT_APP_PUBLIC_SUPABASE_ANON_KEY;

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);


import { createClient } from '@supabase/supabase-js';

// Accessing environment variables from .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // For Vite
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // For Vite

// Creating the supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
