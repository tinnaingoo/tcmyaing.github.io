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


function ShowSearchBox() {
        let logo = document.querySelector('.logo');
        let searchContainer = document.querySelector('.search-container');
        let searchButton = document.getElementById('sbutton');
        let icon = searchButton.querySelector('i');

        if (searchContainer.classList.contains('show')) {
            // Hide search and show logo again
            searchContainer.classList.remove('show');
            logo.classList.remove('hide');
            icon.classList.replace('fa-close', 'fa-search');
        } else {
            // Show search and hide logo
            searchContainer.classList.add('show');
            logo.classList.add('hide');
            icon.classList.replace('fa-search', 'fa-close');
        }
    }
