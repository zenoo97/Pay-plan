import {createClient} from '@supabase/supabase-js';

const supabaseUrl = 'https://zkuyrlbktpitafidmtru.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprdXlybGJrdHBpdGFmaWRtdHJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYwMzI1NTMsImV4cCI6MjA0MTYwODU1M30.JN5yvZT60jU9vTych9Ft_xm1NrjN582eCKh_MQjI_Ls';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
