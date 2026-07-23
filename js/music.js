const music = document.getElementById("bgMusic");
const button = document.getElementById("musicBtn");
const equalizer = document.getElementById("equalizer");

if (music && button) {

    // Restore playback position
    const savedTime = localStorage.getItem("musicTime");
    if (savedTime) {
        music.currentTime = parseFloat(savedTime);
    }

    // Restore play state
    const wasPlaying = localStorage.getItem("musicPlaying") === "true";
if (wasPlaying) {

    music.play().catch(() => {});

    button.textContent = "⏸";

    button.classList.add("playing");

    equalizer.classList.add("active");

}

    // Save position
    setInterval(() => {
        localStorage.setItem("musicTime", music.currentTime);
    }, 1000);

    // Toggle music
    button.addEventListener("click", () => {

       if (music.paused) {

    music.play();

    button.textContent = "⏸";

    button.classList.add("playing");

    equalizer.classList.add("active");

    localStorage.setItem("musicPlaying", "true");



        } else {
music.pause();

button.textContent = "▶";

button.classList.remove("playing");

equalizer.classList.remove("active");

localStorage.setItem("musicPlaying", "false");
        }

    });

}