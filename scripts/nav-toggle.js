// 2. Hamburger Menu Toggle
(function hamburgerMenu() {
    function toggleMenu() {
        const navMenu = document.getElementById("navMenu");
        const hamburger = document.querySelector(".hamburger");

        if (navMenu && hamburger) {
            navMenu.classList.toggle("active");
            hamburger.classList.toggle("active");
        }
    }

    // Expose toggleMenu globally if needed
    window.toggleMenu = toggleMenu;
})();
