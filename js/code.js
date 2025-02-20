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

const inventoryGrid = document.getElementById("inventory-grid");

// Sample inventory array (empty cells = null)
let inventory = [null, null, null, null, null, null, null, null, null, null, null, null];

// Sample items
const items = {
    "can": "media/img/items/energycan.png",
    "page": "media/img/items/page.png",
    "dagger": "media/img/items/dagger.png"
};

// Function to render the inventory grid
function renderInventory() {
    inventoryGrid.innerHTML = ""; // Clear the grid

    for (let i = 0; i < inventory.length; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        if (inventory[i]) {
            const img = document.createElement("img");
            img.src = inventory[i];
            img.alt = "Item";
            cell.appendChild(img);
        }

        inventoryGrid.appendChild(cell);
    }
}

// Function to add an item to the inventory
function addItem(itemName) {
    const emptySlot = inventory.indexOf(null);
    if (emptySlot !== -1) {
        inventory[emptySlot] = items[itemName]; // Add item image path
        renderInventory();
    } else {
        alert("Inventory is full!");
    }
}

// Function to remove an item (example: removes first found item)
function removeItem(itemName) {
    const itemIndex = inventory.findIndex(imgPath => imgPath === items[itemName]);
    if (itemIndex !== -1) {
        inventory[itemIndex] = null;
        renderInventory();
    }
}

// Initialize the grid
renderInventory();

// Example: Add an item (run in the console or trigger via a button)
addItem("can");
addItem("page");
addItem("dagger");