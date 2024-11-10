let character = document.getElementById("character");
let obstacle = document.getElementById("obstacle");
let isJumping = false;
let gravity = 0.5;
let velocity = 0;
let isGameOver = false;
let score = 0;

function jump() {
  if (isJumping) return;
  isJumping = true;
  velocity = -10; // Jump velocity
}

function applyGravity() {
  if (!isJumping) {
    velocity += gravity; // Apply gravity to the velocity
  }
  character.style.bottom = character.offsetTop - velocity + "px";

  // Check if the character has reached the platform
  if (character.offsetTop >= window.innerHeight - character.offsetHeight - document.getElementById("platform").offsetHeight) {
    character.style.bottom = "10vh"; // Align character with the platform
    isJumping = false;
    velocity = 0; // Reset velocity when on the platform
  }
}

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

function updateScore() {
  if (!isGameOver) {
    score++;
    console.log("Score:", score); // Display score in console
  }
}

function resetGame() {
  character.style.bottom = "10vh";
  isJumping = false;
  velocity = 0;
  isGameOver = false;
}

document.addEventListener("keydown", (event) => {
  if (event.key === " ") jump();
});

setInterval(() => {
  if (!isGameOver) {
    applyGravity();
    checkCollision();
  }
}, 20);

setInterval(updateScore, 1000);
