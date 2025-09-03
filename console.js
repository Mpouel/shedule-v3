console.log = function (...log) {
  let con = document.getElementById('console');
  if (!con) return; // prevent errors if #console doesn't exist

  let logg = document.createElement('div');
  logg.className = 'log-line'; // optional class for styling
  logg.textContent = log.join(' '); // safer than innerHTML
  con.appendChild(logg);

  // Auto-scroll to bottom
  con.scrollTop = con.scrollHeight;
};
