let score = 0;
let question, correctAnswer;
let userAnswer = '';
let submitButtonX, submitButtonY, submitButtonWidth = 100, submitButtonHeight = 30;
let columns = [];
let fontSize = 20;
let matrixStream = [];

// Generate initial question
function generateQuestion() {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operation = Math.random() > 0.5 ? '+' : '-';

    question = `${num1} ${operation} ${num2}`;
    correctAnswer = operation === '+' ? num1 + num2 : num1 - num2;
}

// Matrix background setup
function setupMatrix() {
    for (let i = 0; i < width / fontSize; i++) {
        matrixStream.push(new Stream(i * fontSize));
    }
}

function setup() {
    createCanvas(400, 600);
    textFont('monospace');
    textSize(32);
    submitButtonX = width / 2 - submitButtonWidth / 2;
    submitButtonY = height - 80;
    generateQuestion();
    setupMatrix();
}

function draw() {
    background(0, 150); // Semi-transparent background for matrix effect

    // Draw matrix background effect
    for (let stream of matrixStream) {
        stream.update();
        stream.render();
    }

    // Display the question and current score
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(24);
    text(`Score: ${score}`, width / 2, 50);
    text(`Question: ${question}`, width / 2, 100);
    textSize(32);
    text(userAnswer, width / 2, 150);

    // Draw the Submit Answer button
    drawSubmitButton();
}

function drawSubmitButton() {
    fill(255);
    rect(submitButtonX, submitButtonY, submitButtonWidth, submitButtonHeight);
    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    text("Submit Answer", submitButtonX + submitButtonWidth / 2, submitButtonY + submitButtonHeight / 2);
}

function mousePressed() {
    // Check if submit button is clicked
    if (
        mouseX > submitButtonX &&
        mouseX < submitButtonX + submitButtonWidth &&
        mouseY > submitButtonY &&
        mouseY < submitButtonY + submitButtonHeight
    ) {
        checkAnswer();
    }
}

function keyPressed() {
    if (keyCode >= 48 && keyCode <= 57) { // Numeric keys (0-9)
        userAnswer += key;
    } else if (keyCode === BACKSPACE) { // Backspace key
        userAnswer = userAnswer.slice(0, -1);
    }
}

function checkAnswer() {
    if (parseInt(userAnswer) === correctAnswer) {
        score++;
    } else {
        score = max(0, score - 1); // Decrement score, but not below zero
    }
    userAnswer = '';
    generateQuestion();
}

// Class for a single falling number in the matrix effect
class Symbol {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.value;
        this.switchInterval = round(random(2, 20));
    }

    setToRandomSymbol() {
        if (frameCount % this.switchInterval === 0) {
            this.value = String(floor(random(0, 10)));
        }
    }

    rain() {
        this.y = (this.y >= height) ? 0 : this.y + this.speed;
    }
}

// Class for streams of symbols in the matrix effect
class Stream {
    constructor(x) {
        this.symbols = [];
        this.totalSymbols = round(random(5, 30));
        this.speed = random(2, 5);
        this.x = x;
        this.init();
    }

    init() {
        let y = random(-1000, 0);
        for (let i = 0; i < this.totalSymbols; i++) {
            let symbol = new Symbol(this.x, y, this.speed);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= fontSize;
        }
    }

    render() {
        for (let i = 0; i < this.symbols.length; i++) {
            fill(0, 255, 70);
            text(this.symbols[i].value, this.symbols[i].x, this.symbols[i].y);
            this.symbols[i].rain();
            this.symbols[i].setToRandomSymbol();
        }
    }

    update() {
        for (let symbol of this.symbols) {
            symbol.rain();
            symbol.setToRandomSymbol();
        }
    }
}
