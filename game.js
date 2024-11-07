let player;
let platforms = [];
let gravity = 0.6;
let gameSpeed = 3;

function setup() {
    createCanvas(800, 400);
    player = new Player();
    platforms.push(new Platform(width / 2, height - 20, 150));
}

function draw() {
    background(135, 206, 235);  // Light blue sky
    player.update();
    player.display();

    // Update and display platforms
    for (let i = platforms.length - 1; i >= 0; i--) {
        platforms[i].update();
        platforms[i].display();

        // Remove off-screen platforms and create new ones
        if (platforms[i].isOffScreen()) {
            platforms.splice(i, 1);
            platforms.push(new Platform(width, random(height - 100, height - 20), random(100, 200)));
        }
        
        // Check for collision with the player
        if (platforms[i].collidesWith(player)) {
            player.landOnPlatform(platforms[i]);
        }
    }
}

class Player {
    constructor() {
        this.size = 20;
        this.x = width / 4;
        this.y = height / 2;
        this.yVelocity = 0;
        this.onGround = false;
    }

    update() {
        this.yVelocity += gravity;
        this.y += this.yVelocity;

        if (this.y > height) {
            this.y = height;
            this.yVelocity = 0;
            this.onGround = true;
        }
    }

    jump() {
        if (this.onGround) {
            this.yVelocity = -12;
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
        this.x -= gameSpeed;
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

function keyPressed() {
    if (key === ' ') {
        player.jump();
    }
}
