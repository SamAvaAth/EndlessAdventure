let player;
let platforms = [];
let gravity = 0.6;
let playerSpeed = 3;
let jumpPower = -12;
let platformSpacing = 2;  // Distance between platforms

function setup() {
    createCanvas(800, 400);
    player = new Player();
    // Initialize the first few platforms
    let x = 100;
    while (x < width * 2) {
        platforms.push(new Platform(x, random(height - 100, height - 20), random(100, 150)));
        x += platformSpacing;
    }
}

function draw() {
    background(135, 206, 235);  // Light blue sky

    // Update and display the player
    player.update();
    player.display();

    // Update and display platforms
    for (let i = platforms.length - 1; i >= 0; i--) {
        platforms[i].update();
        platforms[i].display();

        // Remove off-screen platforms on the left and add new ones on the right
        if (platforms[i].isOffScreen()) {
            platforms.splice(i, 1);
            let newX = platforms[platforms.length - 1].x + platformSpacing;
            platforms.push(new Platform(newX, random(height - 100, height - 20), random(100, 150)));
        }

        // Check for collision with the player
        if (platforms[i].collidesWith(player)) {
            player.landOnPlatform(platforms[i]);
        }
    }

    // If the player falls off-screen, reset the game
    if (player.y > height) {
        resetGame();
    }
}

class Player {
    constructor() {
        this.size = 20;
        this.x = 100;  // Fixed horizontal position for the player
        this.y = height / 2;
        this.yVelocity = 0;
        this.onGround = false;
    }

    update() {
        // Apply gravity
        this.yVelocity += gravity;
        this.y += this.yVelocity;

        // Move the player horizontally to the right
        this.x += playerSpeed;

        // Loop player position to give the appearance of moving platforms
        if (this.x > width / 2) {
            for (let platform of platforms) {
                platform.x -= playerSpeed;
            }
            this.x = width / 2;
        }
    }

    jump() {
        if (this.onGround) {
            this.yVelocity = jumpPower;
            this.onGround = false;
        }
    }

    landOnPlatform(platform) {
        if (this.yVelocity > 0) {
            this.yVelocity = 0;
            this.y = platform.y - this.size / 2;
            this.onGround = true;
        }
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

    update() {
        // Platform stays fixed, but the player’s movement gives the illusion of scrolling
    }

    isOffScreen() {
        return this.x + this.width < 0;
    }

    collidesWith(player) {
        return (
            player.x + player.size / 2 > this.x &&
            player.x - player.size / 2 < this.x + this.width &&
            player.y + player.size / 2 >= this.y &&
            player.y - player.size / 2 <= this.y + this.height
        );
    }

    display() {
        fill(0, 255, 0);
        rect(this.x, this.y, this.width, this.height);
    }
}

function resetGame() {
    player = new Player();
    platforms = [];
    let x = 100;
    while (x < width * 2) {
        platforms.push(new Platform(x, random(height - 100, height - 20), random(100, 150)));
        x += platformSpacing;
    }
}

function keyPressed() {
    if (key === ' ') {
        player.jump();
    }
}
