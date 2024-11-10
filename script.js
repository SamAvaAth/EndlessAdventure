let character = document.getElementById("character");
let obstacle = document.getElementById("obstacle");
let isJumping = false;
let gravity = 0.5;
let velocity = 0;
let isGameOver = false;
let score = 0;

// Adjust character's initial position so it starts on the platform
character.style.bottom = "10vh";

// Function to make the character jump
function jump() {
  if (isJumping) return;
  isJumping = true;
  velocity = -10; // Upward jump velocity
}

// Apply gravity and update character position
function applyGravity() {
  if (isJumping || character.offsetTop < window.innerHeight - character.offsetHeight - document.getElementById("platform").offsetHeight) {
    // Increase downward velocity due to gravity
    velocity += gravity;
    // Update character's position based on velocity
    character.style.bottom = `${parseFloat(character.style.bottom) - velocity}px`;
  }

  // Check if character has reached the platform (ground level)
  if (character.offsetTop >= window.innerHeight - character.offsetHeight - document.getElementById("platform").offsetHeight) {
    // Place character back on the platform
    character.style.bottom = "10vh";
    // Stop downward movement
    velocity = 0;
    isJumping = false; // Reset jump state
  }
}

// Check for collision with the obstacle
function checkCollision() {
  let characterRect = character.getBoundingClientRect();
  let obstacleRect = obstacle.getBoundingClientRect();

  if (
    characterRect.right > obstacleRect.left &&
    characterRect.left < obstacleRect.right &&
    characterRect.bottom > obstacleRect.top &&
    characterRect.top < obstacleRect.bottom
  ) {
    isGameOver = true;
    alert("Game Over! Score: " + score);
    score = 0;
    resetGame();
  }
}

// Update score if the game is ongoing
function updateScore() {
  if (!isGameOver) {
    score++;
    console.log("Score:", score); // Display score in console
  }
}

// Reset game state for replay
function resetGame() {
  character.style.bottom = "10vh";
  isJumping = false;
  velocity = 0;
  isGameOver = false;
}

// Event listener for jumping with the spacebar
document.addEventListener("keydown", (event) => {
  if (event.key === " ") jump();
});

// Main game loop
setInterval(() => {
  if (!isGameOver) {
    applyGravity();
    checkCollision();
  }
}, 20);

setInterval(updateScore, 1000);
