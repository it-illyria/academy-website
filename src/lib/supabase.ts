import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database types
export interface DbSubmission {
  id: string;
  type: "enrollment" | "contact" | "newsletter" | "referral";
  data: Record<string, string>;
  status: "new" | "contacted" | "resolved";
  created_at: string;
}
