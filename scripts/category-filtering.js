// Category အလိုက် posts ကို filter လုပ်ဖို့ function
function filterPostsByCategory(category) {
    const postGrid = document.getElementById('post-content-grid');
    const noResultsMessage = document.getElementById('noResultsMessage');

    if (!postGrid) {
        console.error('Post grid not found.');
        return;
    }

    const postCards = postGrid.getElementsByClassName('post-card');
    let hasResults = false;

    Array.from(postCards).forEach(postCard => {
        const categories = postCard.getAttribute('data-category').split(' ');

        if (category === 'all' || categories.includes(category)) {
            postCard.style.display = 'block';
            hasResults = true;
        } else {
            postCard.style.display = 'none';
        }
    });

    if (noResultsMessage) {
        noResultsMessage.style.display = hasResults ? 'none' : 'block';
    }
}
