import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://spnkwuvimsrrjketymiq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwbmt3dXZpbXNycmprZXR5bWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1MzY1OTIsImV4cCI6MjA2MjExMjU5Mn0.K8Gx8P7YEGJ9PBzOpzCpv-uS3JMEGVNy8OT6mZgS-dA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
