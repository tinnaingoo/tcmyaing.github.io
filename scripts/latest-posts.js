// latest-posts.js
async function updateLatestPosts() {
    try {
        // JSON ဖိုင်ကို fetch လုပ်မယ်
        const response = await fetch('/post/post-data.json');
        const postsData = await response.json();

        // Date အလိုက် အသစ်ဆုံးကို ရှေ့ဆုံးထားဖို့ sort လုပ်မယ်
        postsData.sort((a, b) => new Date(b.Date) - new Date(a.Date));

        // နောက်ဆုံး ၁၀ ခုကို ရွေးမယ်
        const latestPosts = postsData.slice(0, 10);

        // DOM ထဲကို ထည့်ဖို့ list ကို ရှာမယ်
        const latestPostsList = document.getElementById('latestPostsList');

        // ရှိပြီးသား အကြောင်းအရာကို ရှင်းမယ် (optional)
        latestPostsList.innerHTML = '';

        // Latest posts တွေကို ထည့်မယ်
        latestPosts.forEach(post => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `/${post.PostUrl}.html`; // Post URL ကို သုံးမယ်
            a.textContent = post.title; // ခေါင်းစဉ်ကို ပြမယ်
            a.title = post.title; // Hover လုပ်ရင် ခေါင်းစဉ်ပြဖို့
            li.appendChild(a);
            latestPostsList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching latest posts:', error);
    }
}

// စာမျက်နှာ load ဖြစ်တဲ့အခါ run မယ်
document.addEventListener('DOMContentLoaded', updateLatestPosts);
