import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nhpbaeqjnenqrnwpivyl.supabase.co'; // substitua pela sua URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ocGJhZXFqbmVucXJud3BpdnlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2NDMxNzcsImV4cCI6MjA2OTIxOTE3N30.FudOdpoZz2_L7YUSnDr9jt7vkXvckI1vGMNtAGuGU-E'; // substitua pela sua anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
