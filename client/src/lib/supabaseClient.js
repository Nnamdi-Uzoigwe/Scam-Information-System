import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase credentials are missing!");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// import { createClient } from '@supabase/supabase-js';

// // Accessing environment variables from .env
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // For Vite
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // For Vite

// // Creating the supabase client instance
// export const supabase = createClient(supabaseUrl, supabaseAnonKey);
