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


// Toggle Search Container on Mobile
const sbutton = document.getElementById("sbutton");
const searchContainer = document.querySelector(".search-container");
const logo = document.querySelector(".logo");
const searchInput = document.getElementById("searchInput");

sbutton.addEventListener("click", function () {
    searchContainer.classList.toggle("active");
    logo.classList.toggle("hide");
    sbutton.classList.toggle("active");

    // Clear search input when closing the search container
    if (!searchContainer.classList.contains("active")) {
        searchInput.value = ""; // Clear the input field
        filterPosts(); // Optionally, reset the filtered posts
    }
    
});
