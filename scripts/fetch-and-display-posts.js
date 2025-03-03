async function fetchAndDisplayPosts() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    const postGrid = document.getElementById('post-content-grid');

    if (!loadingIndicator || !postGrid) {
        console.error('Required DOM elements are missing.');
        return;
    }

    loadingIndicator.style.display = 'block';
    postGrid.innerHTML = '';

    try {
        const response = await fetch('/post/post-data.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const posts = await response.json();

        let postHTML = '';
        posts.forEach(post => {
            const categories = post.Category.join(' '); // Space-separated string for data-category
            const categoryDisplay = post.Category
                .map(cat => `<span class="category-item" data-category="${cat}">${cat}</span>`)
                .join(', '); // Comma-separated clickable categories

            postHTML += `
                <div class="post-card" data-category="${categories}">
                    <div class="post-image">
                        <img src="${post.ImageUrl}" alt="${post.ImageCaption}">
                    </div>
                    <div class="post-content">
                        <div class="post-category">${categoryDisplay}</div>
                        <h2 class="post-title" style="text-align: center;">${post.title}</h2>
                        <p class="post-excerpt">${post.Description}</p>
                        <div class="post-footer">
                            <a href="${post.PostUrl}.html" class="read-more">KEEP READING...</a>
                            <span class="post-meta">By <a href="#">${post.Author}</a> • ${post.Date}</span>
                        </div>
                    </div>
                </div>`;
        });

        postGrid.innerHTML = postHTML;
        loadingIndicator.style.display = 'none';

        // Category items တွေကို clickable ဖြစ်အောင် လုပ်မယ်
        document.querySelectorAll('.category-item').forEach(item => {
            item.addEventListener('click', function () {
                const selectedCategory = this.getAttribute('data-category');
                filterPostsByCategory(selectedCategory); // Filter function ကို ခေါ်မယ်
            });
        });
    } catch (error) {
        console.error('Error fetching or displaying posts:', error.message);
        loadingIndicator.style.display = 'none';
        postGrid.innerHTML = `<p>Sorry, something went wrong: ${error.message}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayPosts);
