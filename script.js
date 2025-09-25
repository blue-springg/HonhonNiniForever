// Friendship start date
const startDate = new Date('2021-06-11T00:00:00');

// Function to update friendship timer
function updateTimer() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// Function to update clocks
function updateClocks() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };

    const now = new Date();
    document.getElementById('honhon-time').textContent = now.toLocaleString('en-US', options);

    const niniTime = new Date(now.getTime() - 30 * 60 * 1000); // 30 minutes behind
    document.getElementById('nini-time').textContent = niniTime.toLocaleString('en-US', options);
}

// Update every second
setInterval(() => {
    updateTimer();
    updateClocks();
}, 1000);

// Initial update
updateTimer();
updateClocks();
