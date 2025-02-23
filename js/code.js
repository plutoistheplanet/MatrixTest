let playerHealth = 100;
let maxPlayerHealth = 100;

const speed = 50;  // Adjust typing speed here (milliseconds)

// function typeWriter(targetID ,text) {
//   let index = 0; // Reset the index for each new text
//   function type() {
//     if (index < text.length) {
//       document.getElementById(targetID).innerHTML += text.charAt(index);
//       index++;
//       setTimeout(type, speed);
//     }
//   }
//   type(); // Start typing
// }
function typeWriter(targetID, text) {
  const targetElement = document.getElementById(targetID);
  targetElement.innerHTML = ""; // Clear content before typing

  let index = 0;
  let tempHTML = "";
  
  function type() {
    if (index < text.length) {
      if (text[index] === "<") {
        // Detect and extract the full HTML tag
        let tagEnd = text.indexOf(">", index);
        if (tagEnd !== -1) {
          tempHTML += text.substring(index, tagEnd + 1);
          index = tagEnd + 1; // Move index past the tag
        }
      } else {
        tempHTML += text[index]; // Add normal character
        index++;
      }

      targetElement.innerHTML = tempHTML; // Update the element
      setTimeout(type, speed); // Adjust speed
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
    "letterOpener": "media/img/items/letterOpener.png"
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
        document.getElementById("popup").style.display = "flex";
        inventory[emptySlot] = items[itemName]; // Add item image path
        renderInventory();
    } else {
        alert("Inventory is full!");
    }
}
function closePopup() {
  document.getElementById("popup").style.display = "none"; // Hide the popup
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

function populateDialogue(dialogue) {
  const dialogueBox = document.getElementById("dialogue");
  dialogueBox.innerHTML = "";
  //dialogueBox.innerHTML = dialogue;

  typeWriter("dialogue", dialogue);
}
function populateAnswers(answer1, answer2, answer3, answer4) {
  const selectedButton1 = document.getElementById("option1");
  selectedButton1.innerText = answer1;
  const selectedButton2 = document.getElementById("option2");
  selectedButton2.innerText = answer2;
  const selectedButton3 = document.getElementById("option3");
  selectedButton3.innerText = answer3;
  const selectedButton4 = document.getElementById("option4");
  selectedButton4.innerText = answer4;
}

let rooms = [
  {
    roomName: "1",
    img: "media/img/backround/darkRoom.jpg",
    scenario: `You spot a man crouched in the corner of the room.
    <br/><br/>He looks...feral. 
    <br/><br/>His ears prick up as he senses your presence.
    <br/><br/>What do you do?`,
    interaction: [
      { 
        option: "Attack the man", 
        response: `The man recoils in fear as you raise your fist, throwing
        an object before scuttling through the door.`,
        healthEffect: 0,
        item: "can"
      },
      { 
        option: "Offer a hand?",
        response: `A guttural shriek pierces the room as you offer your hand.
        <br /> The man pounces and your flesh is wounded. <br /><br /> You have lost some health.<br/>`,
        healthEffect: -30,
        item: null
      },
      { 
        option: "Give him water",
        response: `The man scurries towards you, snatching the water from your
        hand and hungrily lapping it up.
        <br/>He mutters an unknown language and presents you with an item covered in cloth.`,
        healthEffect: 0,
        item: "can"
      },
      { 
        option: "Run", 
        response: `The man appears...hungry, It's best that you quietly slip away...`,
        healthEffect: 0,
        item: null
      }
    ]
  },
  {
    roomName: "2",
    img: "media/img/backround/darkAlley.jpg",
    scenario: `<br/><br/>You leave the room, hoping not to meet the feral man again. 
    <br/><br/>After walking down a sidestreet, you spy a glittering object behind a dumpster.
    <br/><br/> What do you do?`,
    interaction: [
      { 
        option: "Look behind the dumpster", 
        response: `You find an old book covered in dust.
        <br/><br/>On of the pages has some strange symbols on it...`,
        healthEffect: 0,
        item: "page"
      },
      { 
        option: "Pick up the item", 
        response: `You pick up a letter opener. It might be useful later.`,
        healthEffect: 0,
        item:"letterOpener"
      },
      { 
        option: "Open the dumpster",
        response: `You open the dumpster and a rat jumps out at you!`,
        healthEffect: -10,
        item:null
      },
      {
        option: "Ignore the dumpster", 
        response: `You walk away, leaving whatever was behind the dumpster undiscovered.`,
        healthEffect: 0,
        item: null
      }
    ]
  },
  {
    roomName: "3",
    img: "media/img/backround/darkAlley.jpg",
    scenario: `You venture further down the street.
    <br/><br/>Ahead you hear the distinct murmur of the undead grow nearer.
    <br/><br/>To your right is a door`,
    interaction: [
      { 
        option: "Carry on forward.", 
        response: `The undead strike as you approach the corner.
        <br/><br/>You scrape your knee as you clammer to escape.
        <br/><br/>You open the door you passed and lock it behind you.`,
        healthEffect: 0,
        item:"page"
      },
      { 
        option: "Open the door.", 
        response: `You enter the room.`,
        healthEffect: 0,
        item:null
      },
      {
        option: "Kick the door down.", 
        response: `The zombies hear your movements and attack.
        <br/><br/>You scramble through the doorway and block it with a chair.`,
        healthEffect: -20,
        item:null
      },
      { 
        option: "Knock on the door.", 
        response: `The zombies hear your movements and attack.
        <br/><br/>You scramble through the doorway and block it with a chair.`,
        healthEffect: -30,
        item:null
      }
    ]
  },
  {
    roomName: "4",
    img: "media/img/backround/darkRoom.jpg",
    scenario: `Hoping to leave the feral man in your wake. 
    After walking down a sidestreet, you spy a glittering object behind a dumpster.<br /> What do you do?`,
    interaction: [
      { 
        option: "Bazinga", 
        response: `You find an old book covered in dust. It seems important.`, 
        healthEffect: 0,
        item:null
      },
      { 
        option: "Pick up the item", 
        response: `You pick up a shiny coin. It might be useful later.`,
        healthEffect:0,
        item:null
       },
      { 
        option: "Open the dumpster", 
        response: `You open the dumpster and a rat jumps out at you!`,
        healthEffect:0,
        item:null
      },
      { 
        option: "Ignore the dumpster",
        response: `You walk away, leaving whatever was behind the dumpster undiscovered.`,
        healthEffect:0,
        item:null
      }
    ]
  }
];
function updateMap(){
  let roomNumber = parseInt(rooms[currentRoomNo].roomName);
  room = rooms[currentRoomNo].roomName;
}
function updateItems(item){
  if(item != null) {
    addItem(item);
  }
}
function updateHealth(health){
  if(playerHealth + health < 0) {
    //game over
    playerHealth = 0;
    alert("You died");
  }
  if(playerHealth + health > maxPlayerHealth) {
    //dont add more than max
    playerHealth = maxPlayerHealth;
  }
  if(playerHealth + health < maxPlayerHealth && playerHealth + health > 0) {
    playerHealth = playerHealth + health;
  }
  document.getElementById("healthBar").innerText = "Health - " + playerHealth;
}
let response = "";
let currentRoomNo = 0;
document.getElementById("option1").addEventListener("click", function () {
  response = rooms[currentRoomNo].interaction[0].response;
  item = rooms[currentRoomNo].interaction[0].item;
  updateHealth(rooms[currentRoomNo].interaction[0].healthEffect);
  updateItems(item);
  buttonClick(); 
});
document.getElementById("option2").addEventListener("click", function () {
  response = rooms[currentRoomNo].interaction[1].response;
  item = rooms[currentRoomNo].interaction[1].item;
  updateHealth(rooms[currentRoomNo].interaction[1].healthEffect);
  updateItems(item);
  buttonClick();
});
document.getElementById("option3").addEventListener("click", function () {
  response = rooms[currentRoomNo].interaction[2].response;
  item = rooms[currentRoomNo].interaction[2].item;
  updateHealth(rooms[currentRoomNo].interaction[2].healthEffect);
  updateItems(item);
  buttonClick();
});
document.getElementById("option4").addEventListener("click", function () {
  response = rooms[currentRoomNo].interaction[3].response;
  item = rooms[currentRoomNo].interaction[3].item;
  updateHealth(rooms[currentRoomNo].interaction[3].healthEffect);
  updateItems(item);
  buttonClick();
});
function startUp(response) {
  document.getElementById("imageBox").src = rooms[currentRoomNo].img;
  populateDialogue(response + rooms[currentRoomNo].scenario);
  populateAnswers(rooms[currentRoomNo].interaction[0].option, rooms[currentRoomNo].interaction[1].option, rooms[currentRoomNo].interaction[2].option, rooms[currentRoomNo].interaction[3].option);  
}
function buttonClick() {
  let myResponse = response;
  response = "";
  currentRoomNo++;
  startUp(myResponse);
  updateMap();
}
updateHealth(0);
startUp(response);