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
    const noResultsMessage = document.getElementById('noResultsMessage');

    if (!postGrid) {
        console.error('Post grid not found.');
        return;
    }

    const postCards = postGrid.getElementsByClassName('post-card');
    let hasResults = false;

    Array.from(postCards).forEach(postCard => {
        // data-category ကို ဖတ်ပြီး space နဲ့ ခွဲထားတဲ့ array အဖြစ် ပြောင်းမယ်
        const categories = postCard.getAttribute('data-category').split(' ');

        // Category က 'all' ဖြစ်တာပဲဖြစ်ဖြစ်၊ ရွေးထားတဲ့ category က post ရဲ့ categories ထဲမှာ ပါတာပဲဖြစ်ဖြစ် ပြမယ်
        if (category === 'all' || categories.includes(category)) {
            postCard.style.display = 'block';
            hasResults = true;
        } else {
            postCard.style.display = 'none';
        }
    });

    // ရလဒ်မရှိရင် မက်ဆေ့ချ် ပြမယ်
    if (noResultsMessage) {
        noResultsMessage.style.display = hasResults ? 'none' : 'block';
    }
}

// Filter option တွေကို click လုပ်ရင် filter လုပ်ဖို့
document.querySelectorAll('.filter-option').forEach(option => {
    option.addEventListener('click', function () {
        const selectedCategory = this.getAttribute('data-category');
        filterPostsByCategory(selectedCategory);
        toggleFilterPopup();
    });
});
