// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Toggle Menu Function
function toggleMenu() {
    const navMenu = document.getElementById("navMenu");
    const hamburger = document.querySelector(".hamburger");

    if (navMenu && hamburger) {
        navMenu.classList.toggle("active");
        hamburger.classList.toggle("active");
    }
}

// Back to Top Button
const backToTopBtn = document.getElementById("backToTopBtn");

if (backToTopBtn) {
    // Show the button when the user scrolls down 200px
    window.onscroll = function() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    };

    // Scroll to the top when the button is clicked
    backToTopBtn.addEventListener("click", function() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
    });
}
