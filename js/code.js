const speed = 50;  // Adjust typing speed here (milliseconds)

function typeWriter(text) {
  let index = 0; // Reset the index for each new text
  function type() {
    if (index < text.length) {
      document.getElementById("typewriter").innerHTML += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  }
  type(); // Start typing
}

