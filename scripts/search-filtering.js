// ===== 2. Search Filtering =====
// Search input နဲ့ posts တွေကို filter လုပ်ဖို့ function
function filterPosts() {
    const searchInput = document.getElementById('searchInput');
    const postGrid = document.getElementById('post-content-grid');
    const noResultsMessage = document.getElementById('noResultsMessage');

    if (!searchInput || !postGrid) {
        console.error('Search input or post grid not found.');
        return;
    }

    const searchTerm = searchInput.value.toLowerCase();
    const postCards = postGrid.getElementsByClassName('post-card');
    let foundResults = false;

    Array.from(postCards).forEach(postCard => {
        const title = postCard.querySelector('.post-title').textContent.toLowerCase();
        const description = postCard.querySelector('.post-excerpt').textContent.toLowerCase();
        const category = postCard.querySelector('.post-category').textContent.toLowerCase();

        if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
            postCard.style.display = 'block';
            foundResults = true;
        } else {
            postCard.style.display = 'none';
        }
    });

    if (noResultsMessage) {
        noResultsMessage.style.display = foundResults ? 'none' : 'block';
    }
}

// Debounced search input event listener
let searchTimeout;
document.getElementById('searchInput')?.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(filterPosts, 300); // 300ms debounce
});

    // Toggle Search Container on Mobile
const sbutton = document.getElementById("sbutton");
const searchContainer = document.querySelector(".search-container");
const logo = document.querySelector(".logo");
const searchInput = document.getElementById("searchInput");

sbutton.addEventListener("click", function() {
    searchContainer.classList.toggle("active");
    logo.classList.toggle("hide");
    sbutton.classList.toggle("active");

    // Clear search input when closing the search container
    if (!searchContainer.classList.contains("active")) {
        searchInput.value = ""; // Clear the input field
        filterPosts(); // Optionally, reset the filtered posts
    }
    
});
