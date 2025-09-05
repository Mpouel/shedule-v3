function getCurrentSchoolDay() {
    const events = parseICS(window.ics);
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const todayEvent = events.find(event => event.DTSTART?.startsWith(today));
    localStorage.currentSchoolDay = todayEvent.SUMMARY.slice(1, 2)
}

function parseICS(icsString) {
    try {
        return icsString.split('\n').reduce((events, line) => {
            line = line.trim();
            if (line === 'BEGIN:VEVENT') event = {};
            else if (line === 'END:VEVENT') {
                if (event?.SUMMARY?.startsWith('[') && !event.DESCRIPTION?.match(/^(Complété|À faire)/) && event.LOCATION === undefined) {
                    events.push(event);
                }
            } else if (event) {
                const match = /^([A-Z]+):(.*)$/.exec(line);
                if (match) event[match[1]] = match[2];
            }
            return events;
        }, []);    
    } catch {
        // polyfill for the function that are using it
        const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
        return [
            {
                DTSTART:new Date().toISOString().split('T')[0].replace(/-/g, ''),
                SUMMARY:'[1]' // default
            }
        ]
    }
}

function lockDay() {

}


fetch('days.ics')
    .then(response => response.text())
    .then(data => {
        window.ics = data;
        const events = parseICS(window.ics);
        const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const todayEvent = events.find(event => event.DTSTART?.startsWith(today));
        localStorage.currentSchoolDay = todayEvent.SUMMARY.slice(1, 2)
        getCurrentSchoolDay() // to be sure
        setTimeout(()=> {
            getCurrentSchoolDay() // to be sure
            scheduleNotifications();
            document.getElementById('start').remove()
        },2000) // wait a bit
    })
    .catch(error => console.error('Error fetching ICS file:', error));