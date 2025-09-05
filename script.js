let users = [];
let db;

async function fetchDB() {
  // Fetch URL and anon key from static files (they must be served, not local-only)
  const supabaseUrl = "https://vjruyeayykeveptvdsot.supabase.co"
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqcnV5ZWF5eWtldmVwdHZkc290Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4NDY3NTQsImV4cCI6MjA3MjQyMjc1NH0.hzFd4sNWD7zfCrsQhW0_aP-BVycXLA9w8z2nBL83XMM";
  // Create client
  db = window.supabase.createClient(supabaseUrl, supabaseKey);

  // Replace "users" with your actual table name
  const { data, error } = await db.from('auth').select('*');
  if (error) {
    console.log('Supabase error:', error.message);
  }

  users = data || [];
}

async function run() {
  await fetchDB();
  users = JSON.stringify(users)
  document.getElementById("output").innerHTML = users
}

run();
