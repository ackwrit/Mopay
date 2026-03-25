import { createClient } from "@supabase/supabase-js";


const supabaseUrl = 'https://smhhboxxouevphxehkuw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtaGhib3h4b3VldnBoeGVoa3V3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxMzUwODAsImV4cCI6MjA4OTcxMTA4MH0.cwyjLtN0EzlLgSNx44lug8Ng2KOpTY8YSYE5lX4U3xM';

export const supabase = createClient(supabaseUrl,supabaseKey);

