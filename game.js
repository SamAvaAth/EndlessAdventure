let player;
let platforms = [];
let gravity = 0.4;
let jumpPower = -10;
let platformSpacing = 100;
let score = 0;

// Reset button properties
let resetButtonX = 10;
let resetButtonY = 50;
let resetButtonWidth = 100;
let resetButtonHeight = 30;

function setup() {
    createCanvas(400, 600);
    player = new Player();
    initializePlatforms();
}

function draw() {
    background(135, 206, 235); // Light blue sky

    // Update and display the player
    player.update();
    player.display();

    // Update and display platforms
    for (let i = platforms.length - 1; i >= 0; i--) {
        platforms[i].display();

        // Check if player lands on a platform
        if (platforms[i].collidesWith(player) && player.yVelocity > 0) {
            player.jump();
            score++;
        }

        // Remove off-screen platforms and add new ones at the top
        if (platforms[i].isOffScreen()) {
            platforms.splice(i, 1);
            platforms.push(new Platform(random(width - 80), -platformSpacing, 80));
        }
    }

    // If the player falls off the bottom of the screen, reset the game
    if (player.y > height) {
        resetGame();
    }

    // Draw the score
    fill(0);
    textSize(24);
    text(`Score: ${score}`, 10, 30);

    // Draw the reset button
    drawResetButton();
}

class Player {
    constructor() {
        this.size = 20;
        this.x = width / 2;
        this.y = height - 50;
        this.yVelocity = 0;
    }

    update() {
        // Apply gravity
        this.yVelocity += gravity;
        this.y += this.yVelocity;

        // Move platforms down if the player moves upward past a certain point
        if (this.y < height / 2) {
            this.y = height / 2;
            for (let platform of platforms) {
                platform.y += abs(this.yVelocity); // Shift platforms down
            }
        }

        // Prevent player from going out of bounds
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
    }

    jump() {
        this.yVelocity = jumpPower;
    }

    display() {
        fill(255, 0, 0);
        ellipse(this.x, this.y, this.size);
    }
}

class Platform {
    constructor(x, y, width) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = 10;
    }

    display() {
        fill(0, 255, 0);
        rect(this.x, this.y, this.width, this.height);
    }

    isOffScreen() {
        return this.y > height;
    }

    collidesWith(player) {
        return (
            player.x > this.x &&
            player.x < this.x + this.width &&
            player.y + player.size / 2 >= this.y &&
            player.y + player.size / 2 <= this.y + this.height
        );
    }
}

function initializePlatforms() {
    platforms = [];
    let y = height;
    while (y > -height) {
        platforms.push(new Platform(random(width - 80), y, 80));
        y -= platformSpacing;
    }
}

function resetGame() {
    player = new Player();
    initializePlatforms();
    score = 0;
}

function drawResetButton() {
    fill(255);
    rect(resetButtonX, resetButtonY, resetButtonWidth, resetButtonHeight);
    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    text("Reset Game", resetButtonX + resetButtonWidth / 2, resetButtonY + resetButtonHeight / 2);
}

// Detect if the reset button is clicked
function mousePressed() {
    if (
        mouseX > resetButtonX &&
        mouseX < resetButtonX + resetButtonWidth &&
        mouseY > resetButtonY &&
        mouseY < resetButtonY + resetButtonHeight
    ) {
        resetGame();
    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        player.x -= 50;
    } else if (keyCode === RIGHT_ARROW) {
        player.x += 50;
    }
}
