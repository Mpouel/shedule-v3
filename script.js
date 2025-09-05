let users = [];
let user = "caleb"
let db, ics, icsd, userd, currentDay, todayEvent

async function fetchDB() {
  // Fetch URL and anon key from static files (they must be served, not local-only)
  supabaseKey = await fetch("storage/api.key.key").then(res => res.text());
  supabaseUrl = await fetch("storage/api.url.key").then(res => res.text());
  // Create client
  db = window.supabase.createClient(supabaseUrl, supabaseKey);

  // Replace "users" with your actual table name
  const { data, error } = await db.from('auth').select('*');
  if (error) {
    return;
  }

  users = data || [];
}

function setVars() {
  userd = users.find(usr => usr.name === user);
  ics = userd.ics
}

async function fetchDay() {
  await fetch(ics)
      .then(response => response.text())
      .then(data => {icsd = data;})
      .catch(error => console.error('Error fetching ICS file:', error));
  const events = icsd.toJson();
  const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const td = event => event.DTSTART?.startsWith(today);
  todayEvent = events.find(td);
  currentDay = todayEvent.SUMMARY.slice(1, 2);
  localStorage.currentSchoolDay = currentDay;
}

async function run() {
  await fetchDB();
  setVars();
  await fetchDay();
  $i("output").innerHTML = "day" + currentDay
}

run();
