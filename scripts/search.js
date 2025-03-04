// /scripts/search.js
let searchTimeout;
let postsData = [];

async function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('sbutton');
    const searchContainer = document.querySelector('.search-container');
    const searchResults = document.getElementById('searchResults');
    const logo = document.querySelector('.logo');

    // JSON ကနေ ဒေတာကို တစ်ခါတည်း ဖတ်ထားမယ်
    try {
        const response = await fetch('/post/post-data.json');
        postsData = await response.json();
    } catch (error) {
        console.error('Error loading post data:', error);
    }

    // Filter posts function
    function filterPosts() {
        const query = searchInput.value.trim().toLowerCase();
        searchResults.innerHTML = ''; // ရှိပြီးသား ရလဒ်တွေကို ရှင်းမယ်

        if (query.length > 0) {
            const results = postsData.filter(post =>
                post.title.toLowerCase().includes(query) ||
                post.Description.toLowerCase().includes(query)
            );

            if (results.length > 0) {
                results.forEach(post => {
                    const resultItem = document.createElement('div');
                    resultItem.className = 'result-item';
                    resultItem.innerHTML = `<a href="/${post.PostUrl}.html">${post.title}</a>`;
                    searchResults.appendChild(resultItem);
                });
            } else {
                searchResults.innerHTML = '<div class="no-results">No results found</div>';
            }
            searchResults.style.display = 'block'; // Dropdown ပြမယ်
        } else {
            searchResults.style.display = 'none'; // ဘာမှ မရိုက်ရင် ဖွက်မယ်
        }
    }

    // Debounced search input event listener
    searchInput?.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(filterPosts, 300); // 300ms debounce
    });

    // Toggle Search Container on Mobile
    searchButton.addEventListener('click', function() {
        searchContainer.classList.toggle('active');
        logo.classList.toggle('hide');
        searchButton.classList.toggle('active');

        // Clear search input when closing the search container
        if (!searchContainer.classList.contains('active')) {
            searchInput.value = ''; // Clear the input field
            filterPosts(); // Reset the filtered posts (dropdown ဖွက်မယ်)
        } else {
            searchInput.focus(); // Search ဖွင့်တဲ့အခါ input ကို focus ထားမယ်
        }
    });

    // Search button နှိပ်ရင်လည်း ရှာမယ် (optional)
    searchButton.addEventListener('click', (e) => {
        if (searchContainer.classList.contains('active')) {
            filterPosts(); // ဖွင့်ထားရင် ရှာမယ်
        }
    });

    // Search bar အပြင်ဘက် နှိပ်ရင် dropdown ဖွက်မယ်
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target) && !searchButton.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', initSearch);
