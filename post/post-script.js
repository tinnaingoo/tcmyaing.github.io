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


// Fetch JSON data and display posts
async function fetchAndDisplayPosts() {
    try {
        // Fetch the JSON data
        const response = await fetch('/post/post-data.json');
        const posts = await response.json();

        // Get the container for posts
        const postGrid = document.getElementById('post-content-grid');

        // Clear existing content
        postGrid.innerHTML = '';

        // Loop through the posts and create HTML for each post
        posts.forEach(post => {
            const postCard = `
                <div class="post-card" data-category="${post.Category}">
                    <div class="post-image">
                        <img src="${post.ImageUrl}" alt="${post.ImageCaption}">
                    </div>
                    <div class="post-content">
                        <span class="post-category">${post.Category}</span>
                        <h2 class="post-title">${post.title}</h2>
                        <p class="post-excerpt">${post.Description}</p>
                        <div class="post-footer">
                            <a href="${post.PostUrl}.html" class="read-more">KEEP READING...</a>
                            <span class="post-meta">By <a href="#">${post.Author}</a> • ${post.Date}</span>
                        </div>
                    </div>
                </div>
            `;
            // Append the post card to the grid
            postGrid.innerHTML += postCard;
        });
    } catch (error) {
        console.error('Error fetching or displaying posts:', error);
    }
}

// Call the function to fetch and display posts
fetchAndDisplayPosts();

// Function to filter posts based on search input
function filterPosts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const postGrid = document.getElementById('post-content-grid');
    const postCards = postGrid.getElementsByClassName('post-card');
    const noResultsMessage = document.getElementById('noResultsMessage');

    let foundResults = false;

    // Loop through all posts and hide those that don't match the search query
    Array.from(postCards).forEach(postCard => {
        const title = postCard.querySelector('.post-title').textContent.toLowerCase();
        const description = postCard.querySelector('.post-excerpt').textContent.toLowerCase();
        const category = postCard.querySelector('.post-category').textContent.toLowerCase();

        if (title.includes(searchInput) || description.includes(searchInput) || category.includes(searchInput)) {
            postCard.style.display = 'block'; // Show matching posts
            foundResults = true; // At least one result found
        } else {
            postCard.style.display = 'none'; // Hide non-matching posts
        }
    });

    // Show or hide the no results message
    if (foundResults) {
        noResultsMessage.style.display = 'none'; // Hide the message if results are found
    } else {
        noResultsMessage.style.display = 'block'; // Show the message if no results are found
    }
}

// Add event listener to search input for real-time search
document.getElementById('searchInput').addEventListener('input', filterPosts);



// Function to toggle filter popup
function toggleFilterPopup() {
    const filterPopup = document.getElementById('filterPopup');
    filterPopup.style.display = filterPopup.style.display === 'block' ? 'none' : 'block';
}

// Function to filter posts by category
function filterPostsByCategory(category) {
    const postGrid = document.getElementById('post-content-grid');
    const postCards = postGrid.getElementsByClassName('post-card');

    // Loop through all posts and hide those that don't match the selected category
    Array.from(postCards).forEach(postCard => {
        const postCategory = postCard.querySelector('.post-category').textContent;

        if (category === "all" || postCategory === category) {
            postCard.style.display = 'block'; // Show matching posts
        } else {
            postCard.style.display = 'none'; // Hide non-matching posts
        }
    });
}

// Add event listeners to filter options
document.querySelectorAll('.filter-option').forEach(option => {
    option.addEventListener('click', function () {
        const selectedCategory = this.getAttribute('data-category');
        filterPostsByCategory(selectedCategory);
        toggleFilterPopup(); // Close the popup after selection
    });
});
