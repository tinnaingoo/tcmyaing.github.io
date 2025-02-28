// Fetch JSON data and display posts
async function fetchAndDisplayPosts() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    const postGrid = document.getElementById('post-content-grid');

    // Check if elements exist before proceeding
    if (!loadingIndicator || !postGrid) {
        console.error('Required DOM elements are missing.');
        return;
    }

    // Show loading indicator and clear the grid
    loadingIndicator.style.display = 'block';
    postGrid.innerHTML = '';

    try {
        // Fetch the JSON data
        const response = await fetch('/post/post-data.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const posts = await response.json();

        // Build HTML string for all posts at once (better performance)
        let postHTML = '';
        posts.forEach(post => {
            postHTML += `
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
                </div>`;
        });

        // Append all posts to the grid at once
        postGrid.innerHTML = postHTML;

        // Hide loading indicator after posts are loaded
        loadingIndicator.style.display = 'none';
    } catch (error) {
        console.error('Error fetching or displaying posts:', error.message);
        loadingIndicator.style.display = 'none';
        postGrid.innerHTML = `<p>Sorry, something went wrong: ${error.message}</p>`;
    }
}

// Call the function to fetch and display posts on page load
document.addEventListener('DOMContentLoaded', fetchAndDisplayPosts);

// Function to filter posts based on search input with debouncing
function filterPosts() {
    const searchInput = document.getElementById('searchInput');
    const postGrid = document.getElementById('post-content-grid');
    const noResultsMessage = document.getElementById('noResultsMessage');

    // Check if required elements exist
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

    // Show or hide no results message if it exists
    if (noResultsMessage) {
        noResultsMessage.style.display = foundResults ? 'none' : 'block';
    }
}

// Add debounced event listener to search input
let searchTimeout;
document.getElementById('searchInput')?.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(filterPosts, 300); // 300ms debounce
});

// Function to toggle filter popup
function toggleFilterPopup() {
    const filterPopup = document.getElementById('filterPopup');
    if (filterPopup) {
        filterPopup.style.display = filterPopup.style.display === 'block' ? 'none' : 'block';
    } else {
        console.warn('Filter popup element not found.');
    }
}

// Function to filter posts by category
function filterPostsByCategory(category) {
    const postGrid = document.getElementById('post-content-grid');
    if (!postGrid) {
        console.error('Post grid not found.');
        return;
    }

    const postCards = postGrid.getElementsByClassName('post-card');

    Array.from(postCards).forEach(postCard => {
        const postCategory = postCard.querySelector('.post-category').textContent;

        if (category === 'all' || postCategory === category) {
            postCard.style.display = 'block';
        } else {
            postCard.style.display = 'none';
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

// Optional: Close filter popup when clicking outside
document.addEventListener('click', (e) => {
    const filterPopup = document.getElementById('filterPopup');
    const filterButton = document.getElementById('filterButton'); // Assuming there's a button to open the popup
    if (filterPopup && filterButton && !filterPopup.contains(e.target) && e.target !== filterButton) {
        filterPopup.style.display = 'none';
    }
});



 // Navigation link တွေကို update လုပ်မယ့် function
    async function updateNavigation() {
        try {
            // JSON data ကို fetch နဲ့ ဆွဲယူမယ်
            const response = await fetch('/post/post-data.json');
            const postsData = await response.json();

            // Page က title ကို ယူမယ်
            const currentTitle = document.getElementById('post-title').textContent.trim();

            // JSON data ထဲက current title နဲ့ ကိုက်တဲ့ post ကို ရှာမယ်
            const currentPost = postsData.find(post => post.title === currentTitle);

            // Navigation link တွေကို update လုပ်မယ်
            if (currentPost) {
                // Previous Post
                const prevPostLink = document.getElementById('prevPostLink');
                const prevPostTitle = document.getElementById('prevPostTitle');
                if (currentPost['PrePost-Title'] && currentPost['PrePost-Url']) {
                    prevPostLink.href = `/${currentPost['PrePost-Url']}.html`;
                    prevPostTitle.textContent = currentPost['PrePost-Title'];
                } else {
                    prevPostLink.parentElement.style.display = 'none'; // Previous post မရှိရင် ဖျောက်မယ်
                }

                // Next Post
                const nextPostLink = document.getElementById('nextPostLink');
                const nextPostTitle = document.getElementById('nextPostTitle');
                if (currentPost['NextPost-Title'] && currentPost['NextPost-Url']) {
                    nextPostLink.href = `/${currentPost['NextPost-Url']}.html`;
                    nextPostTitle.textContent = currentPost['NextPost-Title'];
                } else {
                    nextPostLink.parentElement.style.display = 'none'; // Next post မရှိရင် ဖျောက်မယ်
                }
            } else {
                console.error('Current post not found in JSON data');
            }
        } catch (error) {
            console.error('Error fetching navigation data:', error);
        }
    }

    // Image Popup Modal Logic
    const modal = document.getElementById('myModal');
    const img = document.getElementById('post-img');
    const modalImg = document.getElementById('img01');
    const closeBtn = document.querySelector('.close');

    document.querySelectorAll('.post-text img').forEach(img => {
    img.addEventListener('click', function() {
        modal.style.display = 'flex';
        modalImg.src = this.src;
    });
    });

    // Image ကို နှိပ်တဲ့အခါ modal ဖွင့်မယ်
    img.addEventListener('click', function() {
        modal.style.display = 'block';
        modalImg.src = this.src; // Click လုပ်တဲ့ image ရဲ့ src ကို modal ထဲ ထည့်မယ်
    });

    // Close button ကို နှိပ်တဲ့အခါ modal ပိတ်မယ်
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Modal ပြင်ပကို နှိပ်ရင်လည်း ပိတ်မယ်
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Esc key နှိပ်ရင် modal ပိတ်မယ်
    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            modal.style.display = 'none';
        }
    });
    
    // Function ကို ခေါ်မယ်
    updateNavigation();
