let score = 0;
let question, correctAnswer;
let userAnswer = '';
let submitButtonX, submitButtonY, submitButtonWidth = 100, submitButtonHeight = 30;

// Generate initial question
function generateQuestion() {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operation = Math.random() > 0.5 ? '+' : '-';

    question = `${num1} ${operation} ${num2}`;
    correctAnswer = operation === '+' ? num1 + num2 : num1 - num2;
}

function setup() {
    createCanvas(400, 600);
    textFont('monospace');
    textSize(32);
    submitButtonX = width / 2 - submitButtonWidth / 2;
    submitButtonY = height - 80;
    generateQuestion();
}

function draw() {
    background(135, 206, 235); // Light blue background

    // Display the question and current score
    fill(0);
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
