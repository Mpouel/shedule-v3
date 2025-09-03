let users = [];
let db;

async function fetchDB() {
  // Fetch URL and anon key from static files (they must be served, not local-only)
  const supabaseUrl = (
    await fetch('/storage/api.url').then((res) => res.text())
  ).trim();
  const supabaseKey = (
    await fetch('/storage/api.key').then((res) => res.text())
  ).trim();

  // Create client
  db = window.supabase.createClient(supabaseUrl, supabaseKey);

  // Replace "users" with your actual table name
  const { data, error } = await db.from('users').select('*');

  if (error) {
    console.log('Supabase error:', error.message);
  }

  users = data || [];
}

async function run() {
  await fetchDB();
  console.log('Users from DB:', users);
}

run();
