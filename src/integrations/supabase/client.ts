// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dvtcnjvsuuylcjswgmkn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dGNuanZzdXV5bGNqc3dnbWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMDAwNjksImV4cCI6MjA2NDY3NjA2OX0.hSTWAPTZYIQSwSA0W0nxtqwt5hUbqLkD0lRIZADPlKw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);