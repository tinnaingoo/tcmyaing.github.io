// Toggle Search Container on Mobile
const sbutton = document.getElementById("sbutton");
const searchContainer = document.querySelector(".search-container");
const logo = document.querySelector(".logo");
const searchInput = document.getElementById("searchInput");

sbutton.addEventListener("click", function () {
    searchContainer.classList.toggle("active");
    logo.classList.toggle("hide");
    sbutton.classList.toggle("active");

    // Clear search input when closing the search container
    if (!searchContainer.classList.contains("active")) {
        searchInput.value = ""; // Clear the input field
        filterPosts(); // Optionally, reset the filtered posts
    }
    
});
