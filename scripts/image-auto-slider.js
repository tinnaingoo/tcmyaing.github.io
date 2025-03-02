// 4. Image Slider
(function imageSlider() {
    let currentSlide = 0;

    function showSlide(index) {
        const slides = document.querySelector(".slides");
        const totalSlides = document.querySelectorAll(".slide").length;

        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }

        slides.style.transform = `translateX(${-currentSlide * 100}%)`;
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Auto Slide
    setInterval(nextSlide, 10000); // Change slide every 10 seconds

    // Expose functions globally if needed
    window.nextSlide = nextSlide;
    window.prevSlide = prevSlide;
})();

// 5. Swipe Functionality for Slider
(function sliderSwipe() {
    let startX = 0;
    let endX = 0;

    const slider = document.querySelector(".slider");

    if (slider) {
        slider.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
        });

        slider.addEventListener("touchmove", (e) => {
            endX = e.touches[0].clientX;
            e.preventDefault(); // Prevent scrolling issues on swipe
        });

        slider.addEventListener("touchend", () => {
            if (startX - endX > 50) {
                nextSlide(); // Swipe left
            } else if (endX - startX > 50) {
                prevSlide(); // Swipe right
            }
        });
    }
})();
