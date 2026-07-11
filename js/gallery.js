// Select all gallery images
const galleryImages = document.querySelectorAll(".gallery-item img");

// Select the lightbox
const lightbox = document.getElementById("lightbox");

// Select the image inside the lightbox
const lightboxImage = document.getElementById("lightboxImage");

// Select navigation buttons
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

// Keep track of the current image
let currentIndex = 0;
// Select the close button
const closeButton = document.querySelector(".close");


// Make every image clickable
galleryImages.forEach(function(image, index){

    image.addEventListener("click", function(){

        currentIndex = index;

        lightboxImage.src = image.src;

        lightbox.classList.add("show");

    });

});
function showImage(index){

    lightboxImage.classList.add("fade");

    setTimeout(function(){

        lightboxImage.src = galleryImages[index].src;

        lightboxImage.classList.remove("fade");

    },150);

}


// Close the lightbox
closeButton.addEventListener("click", function(){

    lightbox.classList.remove("show");

});

// Close when clicking outside the image
lightbox.addEventListener("click", function(event){

    if(event.target === lightbox){

        lightbox.classList.remove("show");

    }

});
nextButton.addEventListener("click", function(){

    currentIndex++;

    if(currentIndex >= galleryImages.length){

        currentIndex = 0;

    }

    showImage(currentIndex);

});

prevButton.addEventListener("click", function(){

    currentIndex--;

    if(currentIndex < 0){

        currentIndex = galleryImages.length - 1;

    }

    showImage(currentIndex);

});

// Keyboard shortcuts
document.addEventListener("keydown", function(event){

    // Only work if lightbox is open
    if(!lightbox.classList.contains("show")){
        return;
    }

    if(event.key === "ArrowRight"){

        nextButton.click();

    }

    else if(event.key === "ArrowLeft"){

        prevButton.click();

    }

    else if(event.key === "Escape"){

        lightbox.classList.remove("show");

    }

});