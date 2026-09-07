import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tymnadzwoqmcxlsdlccr.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5bW5hZHp3b3FtY3hsc2RsY2NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3NzM0MzcsImV4cCI6MjEwNDM0OTQzN30.cjrjCi3Q_FpNG138m0HGNi5HlI8jutcx9D-6FgrvRZw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
