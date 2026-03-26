import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uoyvbfervkuovsuxsyyb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVveXZiZmVydmt1b3ZzdXhzeXliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyOTA3NjYsImV4cCI6MjA3Nzg2Njc2Nn0.L-mT4xbRM_P8-FzUwWa3bgivW2q9SwCCdCz4SYxP6ak";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
