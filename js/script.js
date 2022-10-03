//1# select elements
const lightbox   = document.querySelector(".gallery-lightbox");
const galleryBox = Array.from(lightbox.querySelectorAll(".gallery-lightbox__box"));
//console.log(galleryBox);
const lightboxPopup = document.querySelector(".gallery-lightbox__popup");
const optionsHeader = lightboxPopup.querySelector(".gallery-lightbox__popup--options");
//console.log(optionsHeader);
const optionsLinks = Array.from(optionsHeader.querySelectorAll(".option-link"));
// const optionsLinks = Array.from(optionsHeader.children);
//console.log(optionsLinks);
const fullscreenOption = optionsHeader.querySelector(".fullscreen");
const zoomOutOption = optionsHeader.querySelector(".zoom-out");
const zoomInOption = optionsHeader.querySelector(".zoom-in");
const closeOption = optionsHeader.querySelector(".close");
const downloadOption = optionsHeader.querySelector(".download");
let zoomLevel = 1;
let zoomInc = 0.05;
const fullViewContainer = lightboxPopup.querySelector(".gallery-lightbox__popup--content");
const fullView = lightboxPopup.querySelector(".fullview");
const fullViewCaption = lightboxPopup.querySelector("p");
const leftArrow = lightboxPopup.querySelector(".arrow--left");
const rightArrow = lightboxPopup.querySelector(".arrow--right");
//rightArrow = 2;
//console.log(rightArrow);
let active = lightbox.querySelector(".gallery-lightbox__box.active");
let nextGallery, prevGallery, galleryDirection, index;

//2# Function to start lightbox

const startLightbox = () => {
     // Get full size image
     const fullSize = active.dataset.fullsize;
     //const fullSize = active.getAttribute("data-fullsize");
     //console.log(fullSize);

     // Caption
     const caption = active.dataset.caption;
     //console.log(caption);

//     // index
      index = Number(active.dataset.index);
      //console.log(index);

     // Place image inside the full view container
     fullView.innerHTML = `<img src="${fullSize}">`;
     fullViewCaption.textContent = caption;

     // Options download and Zoom In and Out
     downloadOption.href = fullSize;
     zoomInOption.setAttribute("data-zoom-level",zoomLevel);
     zoomOutOption.setAttribute("data-zoom-level",zoomLevel);
     
     // Reste zoom
    fullView.style.transform = "";

//     // Reset fullscreen
//     fullView.style.width = "";
//     fullView.style.height = "";
//     fullViewContainer.classList.remove("fullscreen");
}
//  startLightbox()

// // Gallery Box
 galleryBox.forEach((gallery) => {

     gallery.addEventListener("click", (e) => {
         e.preventDefault()
         if (!gallery.classList.contains("active")){
            //console.log("Doesn't contain active class");
             active.classList.remove("active");
         }
         gallery.classList.add("active");
         nextGallery = lightbox.querySelector("gallery-lightbox__box.active");

         // Newly active gallery
         active = lightbox.querySelector(".gallery-lightbox__box.active");
         lightboxPopup.classList.add("active");
         
         zoomLevel = 1;

         //start lightbox
         startLightbox();
    });
 });

rightArrow.addEventListener("click", () => changeGallery("right"));
leftArrow.addEventListener("click", () => changeGallery("left"));

function changeGallery(direction) {
    (direction === "right") ? index++ : index--;
    if (direction === "right" && index >= galleryBox.length) index = 0;
//     console.log(index);
//     console.log(galleryBox.length);
    if (direction === "left" && index < 0) index = galleryBox.length - 1;

    galleryDirection = galleryBox[index];
    active.classList.remove("active");
    galleryDirection.classList.add("active");
    active = lightbox.querySelector(".gallery-lightbox__box.active");
    zoomLevel = 1;
    startLightbox();
}


// Options
optionsLinks.forEach((link) => {
    link.addEventListener("click", (e) => e.preventDefault());
});

// Zooming in
zoomInOption.addEventListener("click", function () {
     // zoomLevel = zoomLevel + zoomInc;
     // console.log(zoomLevel);
     zoomLevel += zoomInc;

    if (zoomLevel >= 1.4) {
        zoomLevel = zoomLevel - 0.01;
        this.classList.add("disabled");
        return;
    }

//     //console.log(zoomLevel);
      this.setAttribute("data-zoom-level", zoomLevel);
     //  console.log(this);
      // update zoom out
     zoomOutOption.setAttribute("data-zoom-level", zoomLevel); 
     zoomOutOption.classList.remove("disabled");
     fullView.style.transform = `scale(${zoomLevel})`;
//     //console.log(this);
});

// // Zoom out
zoomOutOption.addEventListener("click", function () {
//     //zoomLevel = zoomLevel + zoomInc;
     zoomLevel -= zoomInc;

    if (zoomLevel < 0.6) {
        zoomLevel = zoomLevel + 0.01;
        this.classList.add("disabled");
        return;
    }

//     //console.log(zoomLevel);
     this.setAttribute("data-zoom-level", zoomLevel);
//      // update zoom In
     zoomInOption.setAttribute("data-zoom-level", zoomLevel); 
     zoomInOption.classList.remove("disabled");
     fullView.style.transform = `scale(${zoomLevel})`;
//     //console.log(this);
});

// // Fullscreen
// fullscreenOption.addEventListener("click", () => {
//     const optionsHeaderHeight = optionsHeader.clientHeight;
//     //console.log(optionsHeaderHeight);
//     fullViewContainer.classList.toggle("fullscreen");
//     if (fullViewContainer.classList.toggle.contains("fullscreen")) {
//         fullView.style.width  = "100vw";
//         fullView.style.height = `calc(100vh - ${optionsHeaderHeight}px)`;  
//         zoomLevel = 1;
//         fullView.style.transform = `scale(${zoomLevel})`;
//     } else {
//         fullView.style.width = "";
//         fullView.style.height = "";
//     } 
// });

// // Closing gallery
// lightboxPopup.addEventListener("mouseup", (e) => {
//     const target = e.target;
//     if (!target,classList.contains("gallery-lightbox__poup")) return;
//     lightboxPopup. classList.remove("active");
// });


// Closing gallery
closeOption.addEventListener("click", (e) => {
//     const target = e.target;
//     if (!target.classList.contains("gallery-lightbox__poup")) return;
    lightboxPopup. classList.remove("active");
});















