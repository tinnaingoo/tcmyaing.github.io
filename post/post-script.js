// Fetch JSON data and display posts
async function fetchAndDisplayPosts() {
    try {
        // Fetch the JSON data
        const response = await fetch('/post/post-data.json');
        const posts = await response.json();

        // Get the container for posts
        //const postGrid = document.getElementById('post-content-grid');

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
                        <h2 class="post-title" style="text-align: center;">${post.title}</h2>
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


document.addEventListener('DOMContentLoaded', function() {
    // Define the current post title
    const currentPostTitle = "Why should you be interested in technology?";

    // Fetch the JSON data
    fetch('/post/post-data.json')
        .then(response => response.json())
        .then(data => {
            // Find the current post in the data
            const currentIndex = data.findIndex(post => post.title === currentPostTitle);

            if (currentIndex !== -1) {
                // Update Previous Post
                if (data[currentIndex].PrePost-Title && data[currentIndex].PrePost-Url) {
                    const prevPostLink = document.getElementById('prevPostLink');
                    const prevPostTitle = document.getElementById('prevPostTitle');
                    prevPostLink.href = data[currentIndex].PrePost-Url;
                    prevPostTitle.textContent = data[currentIndex].PrePost-Title;
                } else {
                    // Hide the previous post link if not available
                    document.querySelector('.prev-post').style.display = 'none';
                }

                // Update Next Post
                if (data[currentIndex].NextPost-Title && data[currentIndex].NextPost-Url) {
                    const nextPostLink = document.getElementById('nextPostLink');
                    const nextPostTitle = document.getElementById('nextPostTitle');
                    nextPostLink.href = data[currentIndex].NextPost-Url;
                    nextPostTitle.textContent = data[currentIndex].NextPost-Title;
                } else {
                    // Hide the next post link if not available
                    document.querySelector('.next-post').style.display = 'none';
                }
            }
        })
        .catch(error => console.error('Error fetching post data:', error));
});
