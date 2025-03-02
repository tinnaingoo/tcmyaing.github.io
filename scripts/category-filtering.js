// ===== 3. Category Filtering =====
// Filter popup ကို toggle လုပ်ဖို့ function
function toggleFilterPopup() {
    const filterPopup = document.getElementById('filterPopup');
    if (filterPopup) {
        filterPopup.style.display = filterPopup.style.display === 'block' ? 'none' : 'block';
    } else {
        console.warn('Filter popup element not found.');
    }
}

// Category အလိုက် posts ကို filter လုပ်ဖို့ function
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

// Filter option တွေကို click လုပ်ရင် filter လုပ်ဖို့
document.querySelectorAll('.filter-option').forEach(option => {
    option.addEventListener('click', function () {
        const selectedCategory = this.getAttribute('data-category');
        filterPostsByCategory(selectedCategory);
        toggleFilterPopup();
    });
});
