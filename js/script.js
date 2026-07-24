document.body.classList.add("loading");
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
// ==========================
// WEBSITE LOADER
// ==========================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    const message = document.getElementById("loaderMessage");

    const messages = [

        "✨ Dream. Believe. Achieve.",

        "📚 Years of hard work...",

        "💜 Countless memories...",

        "🎉 One unforgettable graduation.",

        "🎓 Welcome to my Graduation Journey."

    ];

    let index = 0;

    message.textContent = messages[0];

    const interval = setInterval(() => {

        index++;

        if(index < messages.length){

            message.style.opacity = "0";

            setTimeout(() => {

                message.textContent = messages[index];

                message.style.opacity = "1";

            },200);

        }

    },800);   
setTimeout(() => {

    clearInterval(interval);

    loader.classList.add("loader-hidden");

    document.body.classList.remove("loading");

},2500);

});