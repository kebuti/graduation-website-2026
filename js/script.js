console.log("JavaScript is working!");
// Graduation Date

const graduationDate = new Date("August 7, 2026 12:00:00").getTime();


// Update Countdown

function updateCountdown() {

    const now = new Date().getTime();

    const difference = graduationDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24))
        /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (difference % (1000 * 60 * 60))
        /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (difference % (1000 * 60))
        /
        1000
    );


    document.getElementById("days").textContent = days;

    document.getElementById("hours").textContent = hours;

    document.getElementById("minutes").textContent = minutes;

    document.getElementById("seconds").textContent = seconds;

}

setInterval(updateCountdown,1000);

updateCountdown();