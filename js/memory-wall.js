import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    serverTimestamp,
    updateDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// ==========================
// ELEMENTS
// ==========================

const form = document.getElementById("memoryForm");

const submitButton = form.querySelector("button");

const photo = document.getElementById("photo");

const previewImage = document.getElementById("previewImage");

const name = document.getElementById("name");

const relationship = document.getElementById("relationship");

const caption = document.getElementById("caption");

const locationInput = document.getElementById("location");

const memoryList = document.getElementById("memoryList");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxCaption = document.getElementById("lightboxCaption");

const closeLightbox = document.getElementById("closeLightbox");

const toast = document.getElementById("toast");

const confetti = document.getElementById("confetti");

const memoryCount = document.getElementById("memoryCount");

const photoCount = document.getElementById("photoCount");

const relationshipCount = document.getElementById("relationshipCount");

const locationCount = document.getElementById("locationCount");

const searchInput = document.getElementById("searchInput");

// Stores every memory from Firestore
let allMemories = [];

// Stores memories after search/filter
let filteredMemories = [];

const filterRelationship =
document.getElementById("filterRelationship");

console.log("Memory Wall Ready!");

// ==========================
// IMAGE PREVIEW
// ==========================

photo.addEventListener("change", () => {

    const file = photo.files[0];

    if(file){

        previewImage.src = URL.createObjectURL(file);

        previewImage.style.display = "block";

    }

});

// ==========================
// UPLOAD MEMORY
// ==========================

form.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const image = photo.files[0];

    if(!image){

        showToast("Please choose a photo.");

        return;

    }

    submitButton.disabled = true;

    submitButton.innerHTML = "⏳ Uploading...";

    try{

        const formData = new FormData();

        formData.append("file", image);

        formData.append("upload_preset","graduation_uploads");

        formData.append("folder","memory-wall");

        const response = await fetch(

            "https://api.cloudinary.com/v1_1/eqgm7w66/image/upload",

            {

                method:"POST",

                body:formData

            }

        );

        const data = await response.json();

        await addDoc(collection(db,"memoryWall"),{

            name:name.value,

            relationship:relationship.value,

            caption:caption.value,

            location:locationInput.value,

            image:data.secure_url,

            likes: 0,

            date:serverTimestamp()


        });

        await loadMemories();

        showToast(`💜 Thank you, ${name.value}!`);

        launchConfetti();

        form.reset();

        previewImage.src="";

        previewImage.style.display="none";

        submitButton.innerHTML="✅ Memory Shared!";

        setTimeout(()=>{

            submitButton.disabled=false;

            submitButton.innerHTML="💜 Share My Memory";

        },2000);

    }

    catch(error){

        console.error(error);

        submitButton.disabled=false;

        submitButton.innerHTML="💜 Share My Memory";

        showToast("❌ Upload failed. Please try again.");

    }

});

// ==========================
// LOAD MEMORIES
// ==========================

async function loadMemories(){

    const q=query(

        collection(db,"memoryWall"),

        orderBy("date","desc")

    );

    const snapshot=await getDocs(q);

    allMemories = [];

        memoryList.innerHTML = "";

         // Create Sets
    const relationships = new Set();

    const locations = new Set();


    animateCounter(memoryCount, snapshot.size);

animateCounter(photoCount, snapshot.size);


  allMemories = [];

snapshot.forEach((document)=>{

   const memory = document.data();

memory.id = document.id;

allMemories.push(memory);

    relationships.add(memory.relationship);

    if(memory.location){

        locations.add(memory.location);

    }

});

displayMemories(allMemories);

animateCounter(relationshipCount, relationships.size);

animateCounter(locationCount, locations.size);

}


loadMemories();

function displayMemories(memories){

    memoryList.innerHTML = "";

    memories.forEach((memory)=>{

        console.log("Memory ID:", memory.id);

        const card = document.createElement("div");

        card.classList.add("memory-card");

        card.innerHTML = `

        <div class="memory-image">

            <img src="${memory.image}" alt="${memory.caption}">

        </div>

        <div class="memory-info">

            <h3>${memory.name}</h3>

            <span class="relationship">

                ${memory.relationship}

            </span>

            <p>${memory.caption}</p>

            <div class="memory-footer">

                <span>

                    📍 ${memory.location || "Unknown"}

                </span>

                <span>

                    📅 ${
                        memory.date?.toDate
                        ? memory.date.toDate().toLocaleDateString()
                        : "Just now"
                    }

                </span>

            </div>

           <div class="memory-actions">

    <button class="view-btn">
        🔍 View
    </button>

    <button class="download-btn">
        ⬇ Download
    </button>

    <button class="share-btn">
        📤 Share
    </button>
     <button class="like-btn">

        ❤️ ${memory.likes || 0}

        

    </button>

</div>

        `;

        memoryList.appendChild(card);

        const image = card.querySelector("img");

        const viewBtn = card.querySelector(".view-btn");

        const downloadBtn = card.querySelector(".download-btn");

const shareBtn = card.querySelector(".share-btn");

const likeBtn = card.querySelector(".like-btn");



        function openLightbox(){

            lightbox.classList.add("show");

            lightboxImage.src = memory.image;

            lightboxCaption.innerHTML = `

                <h2>${memory.name}</h2>

               <p>${memory.caption}</p>

<hr>

<p>

<strong>${memory.relationship}</strong>

</p>

<p>

📍 ${memory.location || "Unknown"}

</p>

            `;

        }

        image.addEventListener("click", openLightbox);

        viewBtn.addEventListener("click", openLightbox);

        downloadBtn.addEventListener("click", () => {      

    const link = document.createElement("a");

    link.href = memory.image;

    link.download = `Memory-${memory.name}.jpg`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

});

shareBtn.addEventListener("click", async () => {

    if (navigator.share) {

        await navigator.share({

            title: "Moreen Kebuti Graduation Memory",

            text: `${memory.name} shared a graduation memory.`,

            url: memory.image

        });

    } else {

        await navigator.clipboard.writeText(memory.image);

        showToast("📋 Image link copied!");

    }

});
likeBtn.addEventListener("click", async (event) => {

    // Check if this browser has already liked this memory
    if(localStorage.getItem(memory.id)){

        showToast("💜 You have already liked this memory.");

        return;

    }

    const memoryRef = doc(db, "memoryWall", memory.id);

    const currentLikes = memory.likes || 0;

    await updateDoc(memoryRef, {

        likes: currentLikes + 1

    });

    // Save that this browser has liked it
    localStorage.setItem(memory.id, "liked");

    // Update button immediately
    memory.likes = currentLikes + 1;

    likeBtn.innerHTML = `❤️ ${memory.likes}`;
    launchHeart(event.clientX, event.clientY);

    // Disable the button
    likeBtn.disabled = true;
    likeBtn.style.opacity = "0.6";

});
    });

}
// ==========================
// LIGHTBOX
// ==========================

closeLightbox.addEventListener("click",()=>{

    lightbox.classList.remove("show");

});

lightbox.addEventListener("click",(event)=>{

    if(event.target===lightbox){

        lightbox.classList.remove("show");

    }

});

document.addEventListener("keydown",(event)=>{

    if(event.key==="Escape"){

        lightbox.classList.remove("show");

    }

});

// ==========================
// TOAST
// ==========================

function showToast(message){

    toast.textContent=message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}

function launchHeart(x,y){

    const heart=document.createElement("div");

    heart.className="floating-heart";

    heart.innerHTML="❤️";

    heart.style.left=x+"px";

    heart.style.top=y+"px";

    document.body.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },1200);

}
// ==========================
// CONFETTI
// ==========================

function launchConfetti(){

    const colors=[

        "#6A1B9A",

        "#9C27B0",

        "#D8B4FE",

        "#C084FC",

        "#F3E8FF"

    ];

    for(let i=0;i<80;i++){

        const piece=document.createElement("div");

        piece.classList.add("confetti-piece");

        piece.style.background=

        colors[Math.floor(Math.random()*colors.length)];

        piece.style.left=Math.random()*100+"vw";

        piece.style.animationDelay=Math.random()+"s";

        piece.style.width=Math.random()*10+8+"px";

        piece.style.height=piece.style.width;

        confetti.appendChild(piece);

        setTimeout(()=>{

            piece.remove();

        },4000);

    }

}

function animateCounter(element, target){

    let current = 0;

    const increment = Math.ceil(target / 30);

    const timer = setInterval(() => {

        current += increment;

        if(current >= target){

            current = target;

            clearInterval(timer);

        }

        element.textContent = current;

    },30);

}// ==========================
// WELCOME CELEBRATION
// ==========================
window.addEventListener("load", () => {

    setTimeout(() => {

        launchConfetti();

        showToast("🎓 Welcome to Moreen's Graduation Memory Wall! 💜");

    }, 800);

});

const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {

    if(window.scrollY > 300){

        scrollTopBtn.classList.add("show");

    }else{

        scrollTopBtn.classList.remove("show");

    }

});

scrollTopBtn.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});