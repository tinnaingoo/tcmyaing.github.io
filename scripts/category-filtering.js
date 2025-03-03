function filterPostsByCategory(category) {
    const postGrid = document.getElementById('post-content-grid');
    const noResultsMessage = document.getElementById('noResultsMessage');

    if (!postGrid) {
        console.error('Post grid not found.');
        return;
    }

    const postCards = postGrid.getElementsByClassName('post-card');
    const categoryTags = document.querySelectorAll('.category-tag');
    let hasResults = false;

    // အရင် highlight တွေကို ဖယ်မယ်
    categoryTags.forEach(tag => tag.classList.remove('highlighted'));

    // Post တွေကို Filter လုပ်မယ်
    Array.from(postCards).forEach(postCard => {
        const categories = postCard.getAttribute('data-category'); // Space-separated string အတိုင်း ထားမယ်

        if (category === 'all' || categories.includes(category)) {
            postCard.style.display = 'block';
            hasResults = true;
        } else {
            postCard.style.display = 'none';
        }
    });

    // Category ကို highlight လုပ်မယ် (category !== 'all' ဆိုရင်)
    if (category !== 'all') {
        categoryTags.forEach(tag => {
            if (tag.getAttribute('data-category') === category) {
                tag.classList.add('highlighted');
            }
        });
    }

    if (noResultsMessage) {
        noResultsMessage.style.display = hasResults ? 'none' : 'block';
    }
}
