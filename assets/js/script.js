// Select elements
const images     = document.querySelectorAll(".project-gallery-images img");
const lightbox   = document.getElementById("lightbox");
const lightboxImg= document.querySelector(".lightbox-img");
const closeBtn   = document.querySelector(".close");
const prevBtn    = document.querySelector(".prev");
const nextBtn    = document.querySelector(".next");

if (images.length && lightbox && lightboxImg && closeBtn && prevBtn && nextBtn) {
  let currentIndex = 0;

  // Show image in lightbox
  function openLightbox(index) {
    currentIndex = index;
    // Prefer higher-res if you add data-full on img tags
    const src = images[currentIndex].dataset.full || images[currentIndex].currentSrc || images[currentIndex].src;
    lightboxImg.src = src;
    lightbox.classList.add("open"); // triggers CSS transition
    document.body.style.overflow = "hidden";
  }

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  // Navigation
  function showPrev(e) {
    if (e) e.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    const src = images[currentIndex].dataset.full || images[currentIndex].currentSrc || images[currentIndex].src;
    lightboxImg.src = src;
  }

  function showNext(e) {
    if (e) e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
    const src = images[currentIndex].dataset.full || images[currentIndex].currentSrc || images[currentIndex].src;
    lightboxImg.src = src;
  }

  // Event listeners
  images.forEach((img, index) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => openLightbox(index));
  });

  closeBtn.addEventListener("click", (e) => { e.stopPropagation(); closeLightbox(); });
  prevBtn.addEventListener("click", showPrev);
  nextBtn.addEventListener("click", showNext);

  // Prevent clicks on the image from closing the lightbox
  lightboxImg.addEventListener("click", (e) => e.stopPropagation());

  // Close on outside click
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard controls
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape")     closeLightbox();
    if (e.key === "ArrowLeft")  showPrev();
    if (e.key === "ArrowRight") showNext();
  });
} else {
  console.warn("Lightbox: some required elements were not found in the DOM.");
}
