// video-slider.js
async function loadVideoSlider() {
    try {
        // JSON ဖိုင်ကို fetch လုပ်မယ်
        const response = await fetch('/post/slider-data.json');
        const sliderData = await response.json();

        // Slider container ကို ရှာမယ်
        const slidesContainer = document.getElementById('videoSlides');

        // ရှိပြီးသား အကြောင်းအရာကို ရှင်းမယ်
        slidesContainer.innerHTML = '';

        // JSON ထဲက ဒေတာတွေကို ထည့်မယ်
        sliderData.forEach((slide, index) => {
            const slideElement = document.createElement('a');
            slideElement.href = slide.linkUrl;
            slideElement.target = '_blank';
            slideElement.className = 'slide';
            // ပထမ slide ကို active အဖြစ်သတ်မှတ်မယ် (လိုအပ်ရင်)
            if (index === 0) slideElement.classList.add('active');

            slideElement.innerHTML = `
                <img src="${slide.imageUrl}" alt="${slide.caption}">
                <div class="caption">${slide.caption}</div>
            `;
            slidesContainer.appendChild(slideElement);
        });

        // Slider ကို initialize လုပ်မယ် (မင်းရဲ့ existing script ကို ထည့်သွင်းမယ်)
        initializeSlider();
    } catch (error) {
        console.error('Error loading slider data:', error);
    }
}

// Existing slider ကို အလုပ်လုပ်အောင် ပြန်သုံးမယ်
function initializeSlider() {
    let currentIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    if (totalSlides === 0) return; // Slide မရှိရင် ဘာမှမလုပ်ဘူး

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
    }

    // ပထမ slide ကို ပြမယ်
    showSlide(currentIndex);

    // Global ထဲကို function တွေ ထည့်ပေးမယ်၊ HTML onclick က ခေါ်လို့ရအောင်
    window.nextSlide = nextSlide;
    window.prevSlide = prevSlide;

    // Optional: Auto-slide လုပ်ချင်ရင်
    // setInterval(nextSlide, 5000); // 5 စက္ကန့်ခြား တစ်ခါရွှေ့မယ်
}

// စာမျက်နှာ load ဖြစ်တဲ့အခါ run မယ်
document.addEventListener('DOMContentLoaded', loadVideoSlider);
