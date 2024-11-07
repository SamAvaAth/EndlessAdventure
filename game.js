let userAnswer = '';
let correctAnswer = 3;
let feedback = '';

let submitButtonX, submitButtonY, submitButtonWidth = 100, submitButtonHeight = 30;
let refreshButtonX, refreshButtonY, refreshButtonWidth = 100, refreshButtonHeight = 30;

function setup() {
    createCanvas(400, 300);
    textSize(32);

    // Position buttons
    submitButtonX = width / 2 - submitButtonWidth - 10;
    submitButtonY = height - 80;
    refreshButtonX = width / 2 + 10;
    refreshButtonY = height - 80;
}

function draw() {
    background(0);

    // Display the equation and user input
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(24);
    text("Solve: 1 + 2", width / 2, 100);
    text("Your Answer: " + userAnswer, width / 2, 150);
    text(feedback, width / 2, 200);

    // Draw the Submit and Refresh buttons
    drawSubmitButton();
    drawRefreshButton();
}

// Draw the Submit Answer button
function drawSubmitButton() {
    fill(255);
    rect(submitButtonX, submitButtonY, submitButtonWidth, submitButtonHeight);
    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    text("Submit", submitButtonX + submitButtonWidth / 2, submitButtonY + submitButtonHeight / 2);
}

// Draw the Refresh button
function drawRefreshButton() {
    fill(255);
    rect(refreshButtonX, refreshButtonY, refreshButtonWidth, refreshButtonHeight);
    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    text("Refresh", refreshButtonX + refreshButtonWidth / 2, refreshButtonY + refreshButtonHeight / 2);
}

// Handle mouse clicks for buttons
function mousePressed() {
    // Check if Submit button is clicked
    if (
        mouseX > submitButtonX &&
        mouseX < submitButtonX + submitButtonWidth &&
        mouseY > submitButtonY &&
        mouseY < submitButtonY + submitButtonHeight
    ) {
        checkAnswer();
    }
    
    // Check if Refresh button is clicked
    if (
        mouseX > refreshButtonX &&
        mouseX < refreshButtonX + refreshButtonWidth &&
        mouseY > refreshButtonY &&
        mouseY < refreshButtonY + refreshButtonHeight
    ) {
        refreshGame();
    }
}

// Handle keyboard input for the answer
function keyPressed() {
    if (keyCode >= 48 && keyCode <= 57) { // Numeric keys (0-9)
        userAnswer += key;
    } else if (keyCode === BACKSPACE) { // Backspace key
        userAnswer = userAnswer.slice(0, -1);
    }
}

// Check the answer when "Submit" is clicked
function checkAnswer() {
    if (parseInt(userAnswer) === correctAnswer) {
        feedback = "Correct!";
    } else {
        feedback = "Incorrect, try again.";
    }
}

// Reset the game when "Refresh" is clicked
function refreshGame() {
    userAnswer = '';
    feedback = '';
}
