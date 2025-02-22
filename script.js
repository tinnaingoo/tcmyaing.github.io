// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function toggleMenu() {
    const navMenu = document.getElementById("navMenu");
    const hamburger = document.querySelector(".hamburger");

    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
}
