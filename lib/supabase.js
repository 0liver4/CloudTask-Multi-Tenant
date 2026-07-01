import { createClient } from "@supabase/supabase-js";

const baseUrl = process.env.NEXT_BASE_URL
const supabaseUrl = process.env.NEXT_SUPABASE_URL;
const supabaseKey = process.env.NEXT_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);