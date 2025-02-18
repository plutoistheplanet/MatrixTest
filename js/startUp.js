var i = 0;

function move() {
  if (i == 0) {
    i = 1; // Ensure the move function doesn't run multiple times simultaneously
    var elem = document.getElementById("myBar"); // Get the progress bar element
    var width = 1;
    var id = setInterval(frame, 10); // Set an interval for updating the progress bar

    function frame() {
      if (width >= 100) {
        clearInterval(id); // Stop the animation when it reaches 100%
        setTimeout(function() {
          // Redirect to the next page after the animation is complete
          window.location.href = "test.html"; // Adjust to your desired target page
        }, 500); // Optional delay (500ms) before redirecting for better user experience
      } else {
        width++;
        elem.style.width = width + "%"; // Update the width of the progress bar
      }
    }
  }
}
move();