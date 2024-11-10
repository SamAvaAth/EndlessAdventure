let character = document.getElementById("character");
let obstacle = document.getElementById("obstacle");
let isJumping = false;
let score = 0;

function jump() {
  if (isJumping) return;
  isJumping = true;
  
  let upInterval = setInterval(() => {
    if (character.offsetTop <= 120) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        if (character.offsetTop >= 250) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          character.style.bottom = character.offsetTop + 5 + "px";
        }
      }, 20);
    } else {
      character.style.bottom = character.offsetTop - 5 + "px";
    }
  }, 20);
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
    alert("Game Over! Score: " + score);
    score = 0;
  }
}

function updateScore() {
  score++;
  document.getElementById("score").innerText = "Score: " + score;
}

document.addEventListener("keydown", (event) => {
  if (event.key === " ") jump();
});

setInterval(checkCollision, 10);
setInterval(updateScore, 1000);
