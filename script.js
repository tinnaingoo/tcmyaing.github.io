
// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Toggle Menu Function
function toggleMenu() {
    const navMenu = document.getElementById("navMenu");
    const hamburger = document.querySelector(".hamburger");

    if (navMenu && hamburger) {
        navMenu.classList.toggle("active");
        hamburger.classList.toggle("active");
    }
}

// Toggle Search Container on Mobile
const sbutton = document.getElementById("sbutton");
const searchContainer = document.querySelector(".search-container");
const logo = document.querySelector(".logo");

sbutton.addEventListener("click", function () {
    searchContainer.classList.toggle("active");
    logo.classList.toggle("hide");
    sbutton.classList.toggle("active");
});


// Back to Top Button
const backToTopBtn = document.getElementById("backToTopBtn");

if (backToTopBtn) {
    // Show the button when the user scrolls down 200px
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    };

    // Scroll to the top when the button is clicked
    backToTopBtn.addEventListener("click", function() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
    });
}


let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelector(".slides");
    const totalSlides = document.querySelectorAll(".slide").length;

    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    slides.style.transform = `translateX(${-currentSlide * 100}%)`;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Auto Slide
setInterval(nextSlide, 10000); // Change slide every 10 seconds


// Swipe Functionality for Slider
let startX = 0;
let endX = 0;

const slider = document.querySelector(".slider");

slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

slider.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
});

slider.addEventListener("touchend", () => {
    if (startX - endX > 50) {
        nextSlide(); // Swipe left
    } else if (endX - startX > 50) {
        prevSlide(); // Swipe right
    }
});


// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
}

// Fetch JSON data and display posts
async function fetchAndDisplayPosts() {
    try {
        // Fetch the JSON data
        const response = await fetch('/post/post-data.json');
        const posts = await response.json();

        // Get the container for posts
        const postGrid = document.getElementById('post-content-grid');

        // Clear existing content
        postGrid.innerHTML = '';

        // Loop through the posts and create HTML for each post
        posts.forEach(post => {
            const postCard = `
                <div class="post-card">
                    <div class="post-image">
                        <img src="${post.ImageUrl}" alt="${post.ImageCaption}">
                    </div>
                    <div class="post-content">
                        <span class="post-category">${post.Category}</span>
                        <h2 class="post-title">${post.title}</h2>
                        <p class="post-excerpt">${post.Description}</p>
                        <div class="post-footer">
                            <a href="${post.PostUrl}" class="read-more">KEEP READING...</a>
                            <span class="post-meta">By <a href="#">${post.Author}</a> • ${post.Date}</span>
                        </div>
                    </div>
                </div>
            `;
            // Append the post card to the grid
            postGrid.innerHTML += postCard;
        });
    } catch (error) {
        console.error('Error fetching or displaying posts:', error);
    }
}

// Call the function to fetch and display posts
fetchAndDisplayPosts();

