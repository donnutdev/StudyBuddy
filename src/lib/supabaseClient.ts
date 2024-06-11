import { createClient } from '@supabase/supabase-js';

const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseTopicals = createClient(
    "https://qnpumhfafqmcymbxzuvc.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFucHVtaGZhZnFtY3ltYnh6dXZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY4MTI5MzQsImV4cCI6MTk5MjM4ODkzNH0.192lQ7NF66MhKTz7R7eV7damZuOKaHMMrBovQoS5fsc"
);


export const supabase = createClient(supabaseUrl, supabaseKey);