import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export class Supabase {
  public supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
}
