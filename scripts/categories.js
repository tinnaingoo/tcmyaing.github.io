// /scripts/categories.js
async function loadCategories() {
    try {
        const response = await fetch('/post/post-data.json');
        const postsData = await response.json();
        // Unique categories တွေကို ဆွဲထုတ်မယ်
        const categories = [...new Set(postsData.flatMap(post => post.Category))];
        const categoriesList = document.getElementById('categoriesList');

        categories.forEach(category => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="/post/category/${category.toLowerCase().replace(' ', '-')}.html">${category}</a>`;
            categoriesList.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadCategories);
