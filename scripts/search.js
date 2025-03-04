// /scripts/search.js
async function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('sbutton');
    const searchResults = document.getElementById('searchResults');

    let postsData = [];

    // JSON ကနေ ဒေတာကို တစ်ခါတည်း ဖတ်ထားမယ်
    try {
        const response = await fetch('/post/post-data.json');
        postsData = await response.json();
    } catch (error) {
        console.error('Error loading post data:', error);
    }

    // Search input မှာ ရိုက်တိုင်း ရှာမယ်
    searchInput.addEventListener('input', () => {
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
    });

    // Search button နှိပ်ရင်လည်း အလုပ်လုပ်မယ်
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim().toLowerCase();
        if (query) {
            searchResults.innerHTML = '';
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
            searchResults.style.display = 'block';
        }
    });

    // Search bar အပြင်ဘက် နှိပ်ရင် dropdown ဖွက်မယ်
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', initSearch);
