// Friendship start date
const startDate = new Date('2021-06-11T00:00:00');

// Friendship quotes
const friendshipQuotes = [
    "A friend like you, Nini, makes every moment brighter! 🌟",
    "Honhon & Nini: Two hearts, one friendship, across timezones! 💖",
    "Distance means nothing when our friendship is everything. 😊",
    "From Instagram to forever, we're unstoppable! 🚀",
    "Honhon & Nini: Best friends, best vibes, always and forever! 💕"
];

// DOM elements
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const honhonTimeEl = document.getElementById('honhon-time');
const niniTimeEl = document.getElementById('nini-time');
const memoryQuoteBtn = document.getElementById('memory-quote');
const quoteDisplayEl = document.getElementById('quote-display');

// Function to update friendship timer
function updateTimer() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
}

// Function to update clocks
function updateClocks() {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        timeZone: 'Asia/Tehran' // Honhon's timezone
    };

    const now = new Date();
    honhonTimeEl.textContent = now.toLocaleString('en-US', { ...options, timeZone: 'Asia/Tehran' });

    const niniTime = new Date(now.getTime() - 30 * 60 * 1000); // Doha, 30 minutes behind
    niniTimeEl.textContent = niniTime.toLocaleString('en-US', { ...options, timeZone: 'Asia/Qatar' });
}

// Function to show random friendship quote
function showFriendshipQuote() {
    const quote = friendshipQuotes[Math.floor(Math.random() * friendshipQuotes.length)];
    quoteDisplayEl.textContent = quote;
}

// Event listener for quote button
memoryQuoteBtn.addEventListener('click', showFriendshipQuote);

// Update every second
setInterval(() => {
    updateTimer();
    updateClocks();
}, 1000);

// Initial update
updateTimer();
updateClocks();
showFriendshipQuote();
