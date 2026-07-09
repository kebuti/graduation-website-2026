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

// ==========================
// TIMELINE ANIMATION
// ==========================

const timelineItems = document.querySelectorAll(".timeline-item");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.3
});

timelineItems.forEach(item=>{

    observer.observe(item);

});

// ==========================
// ACTIVE NAVIGATION
// ==========================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});