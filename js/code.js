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

function maplbl() {
    const maplblText = "Map";
    typeWriter(maplblText);
}

function openingScroll() {
    const intro = "Welcome to the world of Cyber City, this is a world full of intrigue and mystery...";
    typeWriter(intro);
}

maplbl();  // This will start typing "Map"
setTimeout(openingScroll, 1000);  // Wait 1 second before starting the opening scroll
